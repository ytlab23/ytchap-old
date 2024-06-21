import { Roboto, Jacques_Francois } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import initTranslations from '../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
// import { NextSeo } from 'next/seo';
// import Head from 'next/head';

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const roboto = Roboto({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const i18nNamespaces = ['nav'];
export default async function RootLayout({ children, params: { locale } }) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const { t: tMeta } = await initTranslations(locale, ['meta']);

  const featuresList = [
    {
      title: 'Easy chapter creation',
      content:
        'YTChap has an easy-to-use interface that allows you to quickly create chapters (with timestamps) for your videos. With a few clicks, you can divide your videos into readily digestible sections.',
    },
    {
      title: 'Free to Use',
      content:
        'YTChap.com is totally free to use. It means anyone can use it for chapter creation without any hassle.',
    },
    {
      title: 'Customizable Chapter Titles',
      content:
        'Customize your chapter titles to accurately reflect the content they represent. This personalization guarantees that your audience understands exactly what to expect from each portion of your video.',
    },
    {
      title: 'Timestamp Integration',
      content:
        'Easily incorporate timestamps into your chapters. This feature enables viewers to move directly to the section of the video they are interested in, hence boosting user experience and engagement.',
    },
    {
      title: 'Export Options',
      content:
        'Export your chapter data in a variety of formats for simple integration into YouTube descriptions, fixed comments, and social media sharing. You can copy all the generated chapters with just one click.',
    },
    {
      title: 'Multilingual Support',
      content:
        'Create chapters in multiple languages like English, Spanish, French, Italian, Dutch, Portuguese, etc. to appeal to a worldwide audience. YTChap supports a variety of languages, guaranteeing that no viewer is left out. You can then translate your video into multiple languages from YouTube studio, and paste the appropriate chapters in different languages.',
    },
    {
      title: 'User-Friendly Interface',
      content:
        'While choosing an online tool, you must always keep ease of usage in mind. YTChap.com is simple to navigate and use, regardless of your level of technical knowledge. And it is fully responsive on any device or web-browser.',
    },
    {
      title: 'Unlimited Usage',
      content:
        'Tired of waiting to refill daily restriction quotas? Well, yet another key highlight of YTChap.com is that you can use it as much as you want without any restriction.',
    },
    {
      title: 'Highly accurate',
      content:
        'The given chapters’ content (and the related timestamps) are accurate. This is because the developers behind YTChap worked hard to fine-tune the AI to be as accurate as possible.',
    },
  ];

  const howToList = [
    'Visit the YTChap.com website.',
    'Drop the link to the video you wish to make chapters for. YTChap supports a variety of video formats for your convenience.',
    'Choose the language of the chapter from the list. Currently, the tool offers six options: English, Spanish, French, Italian, German, Arabic and Portuguese.',
    'Click on ‘Generate Captions’ and let our AI get to work.',
    'If you like, customize the chapter titles and check the segmentation.',
    'Export the chapters in your preferred format, such as copying the content with one click.',
    'Integrate the chapters into your YouTube video description or pin them as a comment.',
  ];

  const benefitsList = [
    {
      title: 'Better viewer engagement',
      content:
        'Chapters improve the engagement of your videos, by making it easy for viewers to find and go to the stuff that interests them the most. This enhanced involvement can result in longer viewing times and higher audience retention.',
    },
    {
      title: 'Improved user experience',
      content:
        'By structuring your video clearly, you can improve the entire user experience. Viewers can easily scroll around your content, which is very useful for lengthy YouTube videos.',
    },
    {
      title: 'Increase in SEO',
      content: `Using chapters and timestamps can help your video's SEO. Search engines such as Google frequently display crucial moments from videos immediately in search results, improving the likelihood of drawing more viewers. The chapter titles act as tiny labels that deliver more metadata and help improve your video’s rank in search results, making it easier to find.`,
    },
    {
      title: 'Higher Viewer Retention',
      content:
        'When viewers can readily discover the information they require, they are more likely to stay with your video longer, lowering bounce rates and boosting viewer retention.',
    },
    {
      title: 'Professional presentation',
      content:
        'Chapters offer your videos a professional appearance and feel. This additional degree of organization might help you establish credibility and authority as a content provider. Using chapters in a video is indicative of attention to detail and professionalism!',
    },
    {
      title: 'Efficient content consumption',
      content:
        'Chapters allow the viewer to zip through pertinent sections in educational or tutorial videos which can be revisited easily, thus enhancing the usefulness and value of your content as a reference.',
    },
    {
      title: 'Real-Time Analysis',
      content:
        'With the help of our tool, you can understand which sections of your video are most popular so you can make future content according to what people want. This is possible by matching YouTube Studio data, with the chapters information.',
    },
    {
      title: 'Increased Attention Span',
      content:
        'Viewers are more likely to watch the entire video or stay longer on your channel when they can easily identify parts of interest to them.',
    },
    {
      title: 'Better organization of content',
      content:
        'When  dividing your material into chapters, people can better understand and follow what you are saying. The video will be  more organized.',
    },
    {
      title: 'Accessibility',
      content:
        'chapters can be used as a way through which viewers with disabilities such as visual impairment or cognitive impairment can navigate through the video.',
    },
    {
      title: 'Content Repurposing',
      content:
        'Also, chapters serve as guidelines for content recycling in different formats like blog posts, YouTube Shorts and social media posts.',
    },
  ];

  const whoShouldList = [
    {
      title: 'YouTube creators',
      content: `No matter if you're a vlogger, gamer, or educator, YTChap can help you increase viewer engagement and retention by making your videos easier to navigate.`,
    },
    {
      title: 'Educational Channels',
      content:
        'YTChap is an easy way for students and viewers to find and go back to particular points in their YouTube tutorials, seminars or how-to videos.',
    },
    {
      title: 'Product reviewers',
      content: `YTChap can be used by reviewers to divide their videos into sections such as unboxing, features, pros and cons and final verdict making it easy for the viewer to get the information he/she wants.`,
    },
    {
      title: 'Webinar hosts',
      content:
        'Our tool helps audiences navigate through different topics or speakers in long webinars or live broadcasts, thus improving the overall viewing experience.',
    },
    {
      title: 'Corporate Trainer',
      content:
        'Corporate training videos may be long and complicated. But trainers can use YTChap.com so that employees can learn from shorter clips designed around specific topics.',
    },
    {
      title: 'Podcaster and Interviewer',
      content:
        'Podcasts and interview videos can break down distinct subjects with chapters that make it simple for viewers to jump right into the areas they find most interesting.',
    },
  ];

  const whyList = [
    {
      title: 'Made for YouTube Creators',
      content: `YTChap is tailored for YouTube creators. It does so by providing YouTube chapters and timestamps that are YouTube-format ready.`,
    },
    {
      title: 'Enables viewer control',
      content:
        'YTChap.com is unique in that it gives viewers control over their viewing experience, as opposed to typical linear video formats. The ability to browse straight to key areas allows viewers to interact more deeply with the information and find value more efficiently.',
    },
    {
      title: 'Improves Discoverability',
      content: `By using the chapters generated by YTChap, you provide the YouTube algorithms with additional metadata, and videos can be recommended more often and exposed to a wider audience. Not just on YouTube, but also on search engines like Google.`,
    },
    {
      title: 'Multifaceted Integration',
      content: `This enables YTChap.com users to incorporate chapters in various aspects of their content strategy, and not just the video description. You could use the generated chapters as pinned comments and social network posts. The chapter's information can also be used to generate YouTube shorts or other types of short-form content.`,
    },
    {
      title: 'International Reach',
      content:
        'Many languages are supported by YTChap, enabling YouTube creators to connect with different global audiences.',
    },
    {
      title: 'Regular Updates',
      content:
        'YTChap is not a finished product. As YouTube evolves, and through user feedback, we work regularly on improving the accuracy and quality of the chapters. Updates are released regularly.',
    },
  ];

  const faqsList = [
    {
      title: 'What are YouTube chapters?',
      content: `YouTube chapters are a feature that allows content creators to divide their videos into separate parts through individual timestamps. As a result, viewers can jump right into the portions that interest them without wasting much time. It is automatically generated based on the timestamps in the description.`,
    },
    {
      title: 'What are YouTube timestamps?',
      content:
        'YouTube timestamps are a table of contents for your YouTube video to make it easier for users to find specific parts of the video. It is mainly seen in longer videos to improve the user experience. Apart from YouTube AI automaitcally, timestamps can be manually added by content creators themselves. YouTube timestamps follow the format minute:second, i.e., 00:25 or 1:44.',
    },
    {
      title: 'How to create chapters for YouTube videos with YTChap?',
      content: `You can create chapters on YouTube with YTChap in a simple manner. Just paste the link to the video, choose the language and mode, add timestamps and titles, and then export the chapters to use in your video description, comments, or social media posts.`,
    },
    {
      title: 'Are the timestamps generated by YTChap accurate?',
      content: `Yes, of course. Once you drop the link to the video, our system will understand its context and generate a relevant timestamp to attract more viewers to your content. The A.I. has been tested and refined to provide the most accurate results. And the best part is that the entire process just takes a few seconds to finish.`,
    },
    {
      title: 'How to add chapters to YouTube videos?',
      content:
        'First of all, log in to your YouTube account. Then, go to the description section of the video you want to add chapters to, and write or paste your chapters (along with timestamps). Make sure that the first timestamp starts at 00:00, and that the description  has at least 3 timestamps. Good news, the chapters generated by YTChap, already come in this format.',
    },
    {
      title: 'Do YouTube chapters increase views?',
      content:
        'Yes, absolutely. Here are some ways how YouTube chapters can help you increase view count:',
      otherContent: [
        'It helps in boosting the search engine positioning of a video by providing additional context and keywords.',
        'Provides a clear structure for the video, which can improve the user experience and make them share your content.',
        'Creators can drive in more search engine traffic by fine-tuning relevant keywords to the YouTube chapters section.',
      ],
    },
    {
      title: `How does YTChap.com help my video's SEO?`,
      content: `YTChap boosts SEO by adding more info. Each chapter title serves as a mini-tag, assisting YouTube's algorithm in better understanding the content of your video, potentially increasing its discoverability.`,
    },
    {
      title: `Is YTChap.com free to use?`,
      content: `Yes, it is. YTChap believes in providing equal opportunities for all creators, which is why all its features are available completely free of charge. There are no hidden fees or premium tiers.`,
    },
    {
      title: `Can I change the chapters after I publish my video?`,
      content: `Yes, you may update the chapters at any moment. Simply change your video description or comments to include the new timestamps and titles, and YouTube will update the chapters accordingly.`,
    },
  ];

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
        <link rel="alternate" href={`/${locale}`} hrefLang={locale} />
        <title>{tMeta('title')}</title>
        <meta name="description" content={tMeta('description')} />
      </head>
      <body
        className={`${roboto.className} p-2 md:p-6 flex flex-col bg-[#121316]`}
      >
        <div className="flex flex-col gap-y-20">
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            <NavBar />
          </TranslationsProvider>
          <div className="flex justify-center items-center w-full min-h-[80vh]">
            {children}
          </div>
        </div>

        <div className="content-container h-full py-8 flex flex-col gap-y-8 w-full items-center bg-[#121316] mt-20">
          <section
            className="px-4 w-full flex flex-col items-center gap-y-6 max-w-[800px]"
            id="about-us"
          >
            <div className="flex flex-col gap-y-4">
              <h1>About us</h1>
              <p>
                You know that as a content creator, it is important for you to
                keep your audience interested and make it easy for them to view
                through the parts of your YouTube videos they are most attracted
                to. YTChap.com makes this process simple.
              </p>
              <p>
                Yes, YTChap makes it quite simple to add chapters to the
                information boxes of your videos on Youtube, static comments or
                social network posts. Let’s see what opportunities YTChap offers
                and how it can help you to gain better results.
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <h1>What is YTChap?</h1>
              <p>
                YTChap is an exclusive online platform that improves navigation
                and viewing capabilities of videos, especially those on sites
                like YouTube. Creators can divide their videos into chapters
                using this tool, thereby granting viewers relatively easier
                access to particular areas of the content based on their
                preferences. And the best part is that you can use it fully for
                free.
              </p>
              <p>
                Basic features of YTChap.com include a clean interface where
                YouTube creators can create chapters and timestamps for their
                videos, with ease. These are accompanied by timestamps linked to
                each chapter, enabling viewers to quickly click and jump right
                into the desired portion.
              </p>
              <p>
                This function is especially useful for lengthier videos or those
                that cover a wide range of topics, where viewers may want to
                skip ahead to specific content. By structuring content into
                chapters, content creators like you can increase audience
                engagement, watch time, and overall user experience. In short,
                boost their YouTube SEO and views!
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <h1>9 Main Features Of YTChap</h1>
              <p>
                YTChap.com comes up with a lot of unique features to stand out
                from the competitors. Here are some of them:
              </p>
              <div className="flex flex-col gap-y-4 ml-4">
                {featuresList.map((feature, indx) => (
                  <div key={feature.title} className="flex flex-col gap-y-4">
                    <h2>
                      {indx + 1}. {feature.title}
                    </h2>
                    <p className="ml-8">{feature.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section
            className="px-4 w-full flex flex-col items-center gap-y-6 max-w-[800px]"
            id="how-it-works"
          >
            <div className="flex flex-col gap-y-4">
              <h1>How to Add Chapters to a YouTube Video Using YTChap?</h1>
              <p>
                As mentioned earlier, you can add chapters to YouTube videos
                using YTChap simply. All you need to have is the link to the
                video for which you want to create the chapters and timestamps.
                Check out the steps:
              </p>
              <div className="flex flex-col gap-y-4 ml-4">
                {howToList.map((item, indx) => (
                  <p key={item}>
                    {indx + 1}. {item}
                  </p>
                ))}
              </div>
              <h1>11 Benefits of Creating YouTube Chapters with YTChap</h1>
              <p>
                You might be thinking of why going through these extra steps,
                when we can simply upload a video to YouTube, without adding
                chapters and timestamps. So, is it worth it? A tool like
                YTChap.com is useful due to the wide range of benefits it
                provides. Here are some of them:
              </p>
              <div className="flex flex-col gap-y-4 ml-4">
                {benefitsList.map((feature, indx) => (
                  <div key={feature.title} className="flex flex-col gap-y-4">
                    <h2>
                      {indx + 1}. {feature.title}
                    </h2>
                    <p className="ml-8">{feature.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className="px-4 w-full flex flex-col items-center gap-y-6 max-w-[800px]"
            id="why-ytchap"
          >
            <div className="flex flex-col gap-y-4">
              <h1>Who Should Use YTChap?</h1>
              <p>
                YTChap.com is not a tool just for creative content creators.
                Anyone who is involved in sharing ideas through videos can use
                our tool. Here are some specific sects that may find our tool
                most useful:
              </p>
              <div className="flex flex-col gap-y-4 ml-4">
                {whoShouldList.map((feature, indx) => (
                  <div key={feature.title} className="flex flex-col gap-y-4">
                    <h2>
                      {indx + 1}. {feature.title}
                    </h2>
                    <p className="ml-8">{feature.content}</p>
                  </div>
                ))}
              </div>
              <h1>So, Why use YTChap?</h1>
              <p>
                YTChap.com emerges as the top tool for creating and adding
                chapters to videos due to many reasons. {`Let's`} look at what
                distinguishes YTChap when making Chapters, and why it stands out
                in the world of video improvement tools.
              </p>
              <div className="flex flex-col gap-y-4 ml-4">
                {whyList.map((feature, indx) => (
                  <div key={feature.title} className="flex flex-col gap-y-4">
                    <h2>
                      {indx + 1}. {feature.title}
                    </h2>
                    <p className="ml-8">{feature.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className="px-4 w-full flex flex-col items-center gap-y-6 max-w-[800px]"
            id="faqs"
          >
            <div className="flex flex-col gap-y-4">
              <h1>Frequently Answered Questions (FAQs)</h1>
              <p>
                YTChap.com is not a tool just for creative content creators.
                Anyone who is involved in sharing ideas through videos can use
                our tool. Here are some specific sects that may find our tool
                most useful:
              </p>
              <div className="flex flex-col gap-y-4 ml-4">
                {faqsList.map((feature, indx) => (
                  <div key={feature.title} className="flex flex-col gap-y-4">
                    <h2>
                      {indx + 1}. {feature.title}
                    </h2>
                    <p className="ml-8">{feature.content}</p>

                    {feature.otherContent && (
                      <ul className="flex flex-col gap-y-4 ml-8 list-disc">
                        {feature.otherContent.map((item, indx) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <h1>Final Words</h1>
              <p>
                Nowadays, putting in some normal videos on YouTube might not be
                enough to capture attention and gain reach. You need to try out
                all ways to improve user experience. And, YTChap is one useful
                tool for that. With our tool, you can classify your video into
                different segments for easy navigation in your preferred
                language within seconds. And, that too, for free. Get started
                with YTChap.com today, and generate chapters and timestamps for
                your video, for free!
              </p>
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}
