import OpenAI from "openai";
import { config } from "dotenv";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import { JSDOM } from "jsdom";
import xml2js from "xml2js";

// Load environment variables from .env file
config();

// Initialize OpenAI/DeepSeek client
const openai = new OpenAI({
  baseURL: process.env.DEEPSEEK_BASE_URL, // DeepSeek API Base URL
  apiKey: process.env.DEEPSEEK_API_KEY,   // DeepSeek API Key
});

// request time delay function
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// get data function
export const get_data_axios = async (url) => {
  "use server";
  try {
    await delay(3000); // Making a delay before request
    const agent = new HttpsProxyAgent(
      `http://${process.env.PACKET_USERNAME}:${process.env.PACKET_PASSWORD}@${process.env.PACKET_IP}:${process.env.PACKET_PORT}`
    );
    const response = await axios.get(url, { httpsAgent: agent });
    return response.data;
  } catch (error) {
    console.error("get data error --->", error);
    throw new Error("Invalid link or error while fetching, please try again");
  }
};

// Replace the geminiResponseHandler function to interact with DeepSeek
export const deepSeekResponseHandler = async (
  subSubtitle,
  generateType,
  chapterType,
  sumLang
) => {
  const promptWithLangSimple = `
  Task: Convert Video Transcript Segment into YouTube-Like Chapters (Language: ${sumLang})

  Given the following segment of a video transcript:

${subSubtitle}

Your task is to convert this segment into a YouTube-like chapter format with timestamps and titles only. Follow these guidelines:

Timestamps: Include timestamps indicating the start of each section.
Chapter Titles: Create chapter titles for each section.

Navigation and Reference: The goal is to facilitate easier navigation and reference within the video for viewers.

Chapter Interval: Chapter intervals should not be detailed and at least 5 minutes apart.

Summary: After creating the chapters, provide a very short summarized description of this segment based on the transcript.

Please note:
Chapter intervals should not be detailed and at least 5 minutes apart.

The chapter format should look like this: (timestamp) - Chapter Title and in ${sumLang}.

Return the response in the following format:
{
  "chapters": ["chapter1", "chapter2", ...],
  "segmentSummary": "summary"
}
`;

  const summeryPrompt = `Given the following combined segmented transcript summaries:
  ${subSubtitle}

  Generate a concise summary of the entire content of the video based on the combined segmented transcript summaries I gave you. 
  Make the summary in ${sumLang}.
  `;

  const prompt = generateType === "summary" ? summeryPrompt : promptWithLangSimple;

  try {
    const response = await openai.completions.create({
      model: "text-davinci-003", // You can use the relevant model available on DeepSeek
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.7,
    });

    return response.choices[0].text.trim(); // Return the generated text
  } catch (error) {
    console.error("Error calling DeepSeek API: ", error);
    throw new Error("Failed to generate response from DeepSeek API");
  }
};

// generate summary and chapters
export const generateSummary = async (subtitles, chapterType, sumLang) => {
  "use server";
  try {
    let gptResponses = { chapters: [], summery: "" };
    for (let sub of subtitles) {
      let gptResponse = await deepSeekResponseHandler(
        sub,
        "chapter",
        chapterType,
        sumLang
      );
      const first = gptResponse.indexOf("{");
      const last = gptResponse.indexOf("}");
      gptResponse = gptResponse.slice(first, last + 1);
      gptResponse = JSON.parse(gptResponse);
      gptResponses.chapters.push(...gptResponse.chapters);
      gptResponses.summery += gptResponse.segmentSummary;
    }

    const videoSummary = await deepSeekResponseHandler(
      gptResponses.summery,
      "summary",
      chapterType,
      sumLang
    );
    if (videoSummary) {
      gptResponses.summery = videoSummary;
    }
    return gptResponses;
  } catch (error) {
    console.log("generateSummary error -->", error.message);
    throw new Error(`${error.message}`);
  }
};

// Fetch transcript from YouTube (unchanged)
export const fetchTranscript = async (url) => {
  "use server";
  try {
    const isValidYouTubeUrl = (url) => {
      const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
      return pattern.test(url);
    };
    const urlValidator = isValidYouTubeUrl(url);

    if (!urlValidator) {
      throw new Error(
        `Invalid Url. Please provide a valid url https://www.youtube.com/...`
      );
    }

    const html = await get_data_axios(url);
    const dom = new JSDOM(html);
    const scripts = dom.window.document.querySelectorAll("script");

    let captions = [];

    for (let script of scripts) {
      if (script.innerHTML.includes("captionTracks")) {
        const start = script.innerHTML.indexOf("captionTracks");
        const end = script.innerHTML.indexOf("]", start);

        const jsonString = script.innerHTML
          .slice(start, end + 1)
          .replace('captionTracks":', "");
        captions = JSON.parse(jsonString);
        break;
      }
    }

    if (captions.length > 0) {
      const selected_caption = captions[0];
      const subtitles_data = await get_data_axios(selected_caption.baseUrl);

      let subtitle = [];
      xml2js.parseString(subtitles_data, async (err, result) => {
        if (err) {
          console.log("xml2js parse error --->", err);
          return "Error parsing XML.";
        } else {
          let maxSecond = 1000;
          let arr = [];
          let cutedArr = "";
          result.transcript.text.forEach((item) => {
            const totalSeconds = Math.floor(Number(item.$.start));
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
            const remainingSeconds = Math.round(totalSeconds % 60);

            const time = `${hours < 10 ? "0" : ""}${hours}:${
              minutes < 10 ? "0" : ""
            }${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
            const lines = item._;

            if (totalSeconds < maxSecond) {
              cutedArr += `${time} ${lines}. `;
              cutedArr = cutedArr.replace(/&#39;/g, "'");
            } else {
              arr.push(cutedArr);
              cutedArr = "";
              maxSecond += 1000;
            }
          });
          if (cutedArr.length > 12000) {
            arr.push(cutedArr);
          } else {
            arr[arr.length - 1] = arr[arr.length - 1] + cutedArr;
          }

          subtitle = arr;
        }
      });

      return subtitle;
    } else {
      console.log("No captions available for this page");
      throw new Error("No captions Found");
    }
  } catch (error) {
    console.error("Invalid link or error while fetching", error.message);
    throw new Error(`${error.message}`);
  }
};

// Get summary for the video
export const getSummery = async (url, chapterType, sumLang) => {
  "use server";
  try {
    const transcript = await fetchTranscript(url);
    const summary = await generateSummary(transcript, chapterType, sumLang);
    return summary;
  } catch (error) {
    console.log("getSummery error -->", error.message);
    return error.message;
  }
};
