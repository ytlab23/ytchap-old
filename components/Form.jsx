'use client';
import { useState } from 'react';
import ResultContainer from './ResultContainer';
import CopyHandler from './CopyHandler';
import Video from '../components/Video';
import { useTranslation } from 'react-i18next';

const Form = ({ locale }) => {
  const { t: tForm } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('');
  const [copyText, setCopyText] = useState('Copy');
  const [descText, setDescText] = useState('Copy');
  const [errorText, setErrorText] = useState('');
  const [desc, setDesc] = useState('');
  const [showDesc, setShowDesc] = useState(false);
  const [error, setError] = useState(false);
  const options = [
    { label: 'Simple', value: 'simple' },
    { label: 'Complex', value: 'complex' },
  ];
  const langOptions = [
    { label: '🇺🇸', value: 'English' },
    { label: '🇪🇸', value: 'Spanish' },
    { label: '🇫🇷', value: 'French' },
    { label: '🇮🇹', value: 'italian' },
    { label: '🇩🇪', value: 'German' },
    { label: '🇵🇹', value: 'Portuguese' },
  ];
  const [chapterType, setChapterType] = useState(options[0].value);
  const [language, setLanguage] = useState(langOptions[0].value);

  // const chapterTypeHandler = (option) => {
  //   setChapterType(option.value);
  // };

  const [vidId, setVidId] = useState('');

  function extractVideoIdSimple(url) {
    const params = new URLSearchParams(url.split('?')[1]);
    return params.get('v');
  }

  const languageHandler = (option) => {
    setLanguage(option.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/summary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          url: url, 
          chapterType: chapterType, 
          sumLang: language 
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error);
      }

      const data = await response.json();
      if (typeof data !== 'string') {
        setLoading(false);
        setError(false);
        setDesc(data.summery);
        setData(data.chapters);
      } else {
        setLoading(false);
        setError(true);
        setErrorText(data);
      }
    } catch (error) {
      setLoading(false);
      setError(true);
      setErrorText('An error occurred');
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-y-6">
      <div className="flex flex-col gap-y-8 justify-center items-center gap-x-2">
        <h2 className=" text-primary font-normal text-lg">
          {tForm('selector-text')}
        </h2>
        <div className="flex gap-x-4">
          {langOptions.map((item) => {
            return (
              <h2
                key={item.value}
                className={` text-primary font-normal text-lg opacity-90 cursor-pointer px-2 py-1 rounded-lg ${
                  language === item.value && 'bg-[#ac56ff]'
                }`}
                onClick={() => {
                  languageHandler(item);
                }}
              >
                {item.label}
              </h2>
            );
          })}
        </div>
      </div>
      <div className="max-w-[800px] min-w-[100%] md:min-w-[500px] flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="https://www.youtube.com/watch?v="
          className="w-full bg-[#121316]/50 py-4 px-8 border border-white/30 rounded-full outline-none"
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          type="button"
          className="btn py-3 px-6 rounded-full outline-none text-sm"
          onClick={async () => {
            if (url !== '') {
              setError(false);
              setCopyText('Copy');
              setDescText('Copy');
              setShowDesc(false);
              setData([]);
              setVidId('');
              setLoading(true);
              const videoIdSimple = extractVideoIdSimple(url);
              setVidId(videoIdSimple);
              
              try {
                const response = await fetch('https://ytaichapters.onrender.com/api/summary', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ 
                    url: url.trim(), 
                    chapterType: chapterType, 
                    sumLang: language 
                  }),
                });

                if (!response.ok) {
                  const error = await response.json();
                  throw new Error(error.error);
                }

                const data = await response.json();
                if (typeof data !== 'string') {
                  setLoading(false);
                  setError(false);
                  setDesc(data.summery);
                  setData(data.chapters);
                } else {
                  setLoading(false);
                  setError(true);
                  setErrorText(data);
                }
              } catch (error) {
                setLoading(false);
                setError(true);
                setErrorText(error.message || 'An error occurred');
              }
            } else {
              setError(true);
              setErrorText('Please provide a link');
            }
          }}
        >
          {loading ? (
            <span className="loader"></span>
          ) : (
            `${tForm('caption-btn-title')}`
          )}
        </button>
      </div>
      {error && <p className="text-sm text-red-600 text-left">{errorText}</p>}
      {data?.length > 0 && (
        <div className="flex flex-col items-center my-4 bg-back md:p-8 px-4 py-8 rounded-lg w-full gap-y-16">
          <div className="w-[650px] max-w-[100%] flex flex-col gap-y-8">
            <h2 className="text-xl font-bold">Chapters</h2>
            <ResultContainer>
              <div className="flex flex-col gap-y-2 text-left">
                {data?.map((item, index) => (
                  <p className="text-sm text-primary" key={index}>
                    {item}
                  </p>
                ))}
              </div>
              <CopyHandler
                setCopyText={setCopyText}
                setDescText={setDescText}
                copyData={data?.join('\n')}
                format="timestamps"
                title={copyText}
              />
            </ResultContainer>
          </div>

          <div className="w-[650px] max-w-[100%] flex flex-col gap-y-8">
            <div className="w-full flex justify-between">
              <h2 className="text-xl font-bold">{tForm('summary-title')}</h2>
              <button
                className="btn px-6 py-3 text-back font-normal text-sm rounded-xl max-w-[250px]"
                onClick={() => {
                  setShowDesc(true);
                }}
              >
                {tForm('summary-btn-title')}
              </button>
            </div>

            {showDesc && (
              <ResultContainer>
                <p className="text-sm text-primary text-left">{desc}</p>
                <CopyHandler
                  setCopyText={setCopyText}
                  setDescText={setDescText}
                  copyData={desc}
                  format="desc"
                  title={descText}
                />
              </ResultContainer>
            )}
          </div>
        </div>
      )}
      {vidId && <Video vidId={vidId} />}
    </div>
  );
};

export default Form;
