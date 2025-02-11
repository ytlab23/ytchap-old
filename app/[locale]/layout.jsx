/* eslint-disable react/jsx-key */
import { Roboto, Jacques_Francois } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import initTranslations from '../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';
import CTA from '@/components/CTA';
import TipBox from '@/components/TipBox';
import CollapsibleFAQ from '@/components/CollapsibleFAQ';
import { IconPaths } from '@/components/Icons';
import FeatureCard from '@/components/FeatureCard';
import { TbFreeRights } from "react-icons/tb";
import StepCard from '@/components/StepCard';
import SimpleSlider from '@/components/SimpleSlider';
import { MdContentPasteGo } from "react-icons/md";
import { BiBookContent } from "react-icons/bi";
import { CiWarning } from "react-icons/ci";
import { LuView } from "react-icons/lu";
import { CiExport } from "react-icons/ci";
import { AiOutlineProject } from "react-icons/ai";
import { FaYoutube, FaGraduationCap, FaChalkboardTeacher, FaBookReader, FaUniversity, FaUserGraduate } from 'react-icons/fa';
import { MdSubtitles, MdOndemandVideo, MdOutlineSchool, MdTranslate, MdAccessibility, MdSpeed } from 'react-icons/md';
import { CiUser } from "react-icons/ci";
import { BiTimeFive, BiSearchAlt2 } from 'react-icons/bi';
import { SiYoutubegaming } from 'react-icons/si';
import { TbLanguage } from 'react-icons/tb';
import { AiOutlineTranslation, AiFillExperiment } from 'react-icons/ai';
import { IoShareSocialOutline } from 'react-icons/io5';
import { BsBookmarkStar, BsKeyboard } from 'react-icons/bs';
import { RiUserSearchLine } from 'react-icons/ri';
import TextWithLinks from '@/components/TextWithLinks';
import BackToTop from '@/components/BackToTop';
import Footer from '@/components/Footer';

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

const roboto = Roboto({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
});

const i18nNamespaces = ['nav', 'homepage'];
export default async function RootLayout({ children, params: { locale } }) {
  const { resources, t } = await initTranslations(locale, i18nNamespaces);
  const { t: tMeta } = await initTranslations(locale, ['meta']);

  // Convert the features object into an array
  const featuresList = Object.entries(t('homepage:features', { returnObjects: true })).map(
    ([key, value]) => ({
      title: value.title,
      content: value.content,
    })
  );

  // Get the how-to steps array directly
  const howToList = t('homepage:how-to-steps', { returnObjects: true });

  // Convert the benefits object into an array
  const benefitsList = Object.entries(t('homepage:benefits', { returnObjects: true })).map(
    ([key, value]) => ({
      title: value.title,
      content: value.content,
    })
  );

  // Convert the who-should-use object into an array
  const whoShouldList = Object.entries(t('homepage:who-should-use', { returnObjects: true })).map(
    ([key, value]) => ({
      title: value.title,
      content: value.content,
    })
  );

  // Convert the why-ytchap object into an array
  const whyList = Object.entries(t('homepage:why-ytchap', { returnObjects: true })).map(
    ([key, value]) => ({
      title: value.title,
      content: value.content,
    })
  );

  // Convert the faqs object into an array
  const faqsList = Object.entries(t('homepage:faqs', { returnObjects: true })).map(
    ([key, value]) => ({
      title: value.title,
      content: value.content,
    })
  );

  return (
    <html lang={locale} dir={dir(locale)}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" sizes="any" />
        <link rel="alternate" href={`/${locale}`} hrefLang={locale} />
        <title>{tMeta('title')}</title>
        <meta name="description" content={tMeta('description')} />
      </head>
      <body className={`${roboto.className} p-2 md:p-6 flex flex-col bg-[#121316]`}>
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
              <h1>{t('homepage:about-us-title')}</h1>
              <p>{t('homepage:about-us-intro1')}</p>
              <p>{t('homepage:about-us-intro2')}</p>
            </div>
            <div className="flex flex-col gap-y-4">
              <h1>{t('homepage:what-is-ytchap-title')}</h1>
              {/* Utilisation avec les mots-clés par défaut */}
              <p>
                <TextWithLinks 
                  text={t('homepage:what-is-ytchap-p1')} 
                  keywords={{
                    'YouTube': 'https://youtube.com',
                  }}
                />
              </p>
              
              {/* Utilisation avec des mots-clés personnalisés */}
              <p>
                <TextWithLinks 
                  text={t('homepage:what-is-ytchap-p2')} 
                  keywords={{
                    'YTChap.com': 'https://ytchap.com',
                  }}
                  className="text-purple-600 hover:text-blue-800 hover:underline"
                />
              </p>
              
              {/* Utilisation sans liens */}
              <p>{t('homepage:what-is-ytchap-p3')}</p>
            </div>
            {/* Second CTA after features */}
          <CTA 
            text={t('homepage:cta-text-2')} 
            buttonText={t('homepage:cta-button')}
            className="max-w-[800px]"
          />
            <div className="flex flex-col gap-y-4">
              <h1>{t('homepage:features-main-title')}</h1>
              <p>{t('homepage:features-intro')}</p>
              <div className="features-grid">
                {featuresList.map((feature, indx) => {
                  const icons = [
                    <MdSubtitles className="w-10 h-10" />, // For chapters/subtitles
                    <TbFreeRights className="w-10 h-10" />, // For translation
                    <BiTimeFive className="w-10 h-10" />, // For time navigation
                    <FaYoutube className="w-10 h-10" />, // For YouTube integration
                    <CiExport className="w-10 h-10" />, // For search functionality
                    <BsBookmarkStar className="w-10 h-10" />, // For bookmarking
                    <MdSpeed className="w-10 h-10" />, // For speed control
                    <IoShareSocialOutline className="w-10 h-10" />, // For sharing
                    <BsKeyboard className="w-10 h-10" /> // For keyboard shortcuts
                  ];
                  return (
                    <FeatureCard
                      key={feature.title}
                      index={indx}
                      title={feature.title}
                      content={feature.content}
                      iconPath={icons[indx % icons.length]}
                    />
                  );
                })}
              </div>
            </div>
          </section>
          <section
            className="px-4 w-full flex flex-col items-center gap-y-6 max-w-[800px]"
            id="how-it-works"
          >
            <div className="flex flex-col gap-y-4">
              <h1>{t('homepage:how-to-title')}</h1>
              <p>{t('homepage:how-to-intro')}</p>
              <div className="steps-container">
                {howToList.map((item, indx) => (
                  <StepCard key={item} step={item} index={indx} />
                ))}
              </div>
            </div>
          </section>
          <CTA 
            text={t('homepage:cta-text-4')} 
            buttonText={t('homepage:cta-button')}
            className="max-w-[800px]"
          />
          

          <section
            className="px-4 w-full flex flex-col items-center gap-y-6 max-w-[800px]"
            id="benefits"
          >
            <div className="flex flex-col gap-y-4 w-full">
              <h1>{t('homepage:benefits-title')}</h1>
              <p>{t('homepage:benefits-intro')}</p>
              <div className="features-grid max-w-[1200px] mx-auto">
                {benefitsList.map((benefit, indx) => (
                  <FeatureCard
                    key={benefit.title}
                    index={indx}
                    title={benefit.title}
                    content={benefit.content}
                    iconPath={[
                      <MdOndemandVideo className="w-10 h-10" />,
                      <MdAccessibility className="w-10 h-10" />,
                      <RiUserSearchLine className="w-10 h-10" />,
                      <LuView className="w-10 h-10" />,
                      <MdOutlineSchool className="w-10 h-10" />,
                      <AiOutlineProject className="w-10 h-10" />,
                      <AiFillExperiment className="w-10 h-10" />,
                      <CiWarning className="w-10 h-10" />,
                      <BiBookContent className="w-10 h-10" />,
                      <MdContentPasteGo className="w-10 h-10" />,
                      <FaBookReader className="w-10 h-10" />
                    ][indx % 11]}
                  />
                ))}
              </div>
            </div>
          </section>

          <section
            className="px-4 w-full flex flex-col items-center gap-y-6 max-w-[800px]"
            id="why-ytchap"
          >
            <div className="flex flex-col gap-y-4 w-full">
              <h1>{t('homepage:who-should-use-title')}</h1>
              <p>{t('homepage:who-should-use-intro')}</p>
              <div className="features-grid max-w-[1200px] mx-auto">
                {whoShouldList.map((feature, indx) => (
                  <FeatureCard
                    key={feature.title}
                    index={indx}
                    title={feature.title}
                    content={feature.content}
                    iconPath={[
                      <CiUser className="w-10 h-10" />, 
                      <FaUserGraduate className="w-10 h-10" />,// For students
                      <BiSearchAlt2 className="w-10 h-10" />, // For content creators
                      <FaBookReader className="w-10 h-10" />, // For researchers
                      <FaUniversity className="w-10 h-10" />, // For educational institutions
                      <FaChalkboardTeacher className="w-10 h-10" /> // For academics
                    ][indx % 6]}
                  />
                ))}
              </div>
              <h1>{t('homepage:why-ytchap-title')}</h1>
              <p>{t('homepage:why-ytchap-intro')}</p>
              <SimpleSlider features={whyList} />
            </div>
          </section>
          
          <section
            className="px-4 w-full flex flex-col items-center gap-y-6 max-w-[800px]"
            id="faqs"
          >
            <div className="flex flex-col gap-y-4">
              <h1>{t('homepage:faqs-title')}</h1>
              <p>{t('homepage:faqs-intro')}</p>
              <div className="flex flex-col gap-y-4">
                {Object.entries(t('homepage:faqs', { returnObjects: true })).map(([key, faq], indx) => {
                  // Check if this is one of our special FAQs that needs a tip
                  const needsTip = key === 'what-are-timestamps3' || key === 'what-are-chapters4';
                  const tipComponent = needsTip ? (
                    <TipBox 
                      title={t(`homepage:faqs.${key}.tip-title`)}
                      content={t(`homepage:faqs.${key}.tip-content`)}
                      keywords={{
                        'YouTube Ads': 'https://www.youtube.com/ads',
                        'LenosTube': 'https://www.lenostube.com/en/',
                        'Canva': 'https://www.canva.com',
                        'IFTTT': 'https://ifttt.com/',
                        'VidIQ': 'https://vidiq.com/',
                        'AnswerThePublic': 'https://answerthepublic.com/',
                        'TubePilot': 'https://tubepilot.ai/'
                      }}
                    />
                  ) : null;

                  return (
                    <CollapsibleFAQ
                      key={key}
                      index={indx}
                      title={faq.title}
                      content={faq.content}
                      keywords={key === 'what-are-chapters' ? {
                        'YouTube chapters': 'https://support.google.com/youtube/answer/9884579',
                        'capítulos de YouTube': 'https://support.google.com/youtube/answer/9884579',
                        'YouTube capítulos': 'https://support.google.com/youtube/answer/9884579',

                        'YouTube capitoli': 'https://support.google.com/youtube/answer/9884579',

                        'Les chapitres YouTube': 'https://support.google.com/youtube/answer/9884579',
                        'YouTube-Kapitel': 'https://support.google.com/youtube/answer/9884579',
                      } : null}
                      tipComponent={tipComponent}
                    />
                  );
                })}
              </div>
              <h1>{t('homepage:final-words-title')}</h1>
              <p>
              <TextWithLinks 
                  text={t('homepage:final-words-content')} 
                  keywords={{
                    'YTChap': 'https://ytchap.com',
                  }}
                  className="text-purple-600 hover:text-blue-800 hover:underline"
                />
              </p>
              {/* Final CTA */}
              <CTA 
                text={t('homepage:cta-text')} 
                buttonText={t('homepage:cta-button')}
                className="mt-12 mb-8"
              />
            </div>
          </section>
          <Footer />
        </div>
        <BackToTop />
      </body>
    </html>
  );
}
