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
import StepCard from '@/components/StepCard';

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
            {/* First CTA after main content */}
          <CTA 
            text={t('homepage:cta-text-1')} 
            buttonText={t('homepage:cta-button')}
            className="mx-auto max-w-[800px]"
          />
            <div className="flex flex-col gap-y-4">
              <h1>{t('homepage:what-is-ytchap-title')}</h1>
              <p>{t('homepage:what-is-ytchap-p1')}</p>
              <p>{t('homepage:what-is-ytchap-p2')}</p>
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
                  // Map features to icons
                  const icons = ['automation', 'language', 'time', 'quality', 'accessibility', 'analytics'];
                  return (
                    <FeatureCard
                      key={feature.title}
                      index={indx}
                      title={feature.title}
                      content={feature.content}
                      iconPath={IconPaths[icons[indx % icons.length]]}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* Third CTA after how-it-works */}
          <CTA 
            text={t('homepage:cta-text-3')} 
            buttonText={t('homepage:cta-button')}
            className="max-w-[800px]"
          />

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
            id="why-ytchap"
          >
            <div className="flex flex-col gap-y-4">
              <h1>{t('homepage:who-should-use-title')}</h1>
              <p>{t('homepage:who-should-use-intro')}</p>
              <div className="features-grid">
                {whoShouldList.map((feature, indx) => (
                  <FeatureCard
                    key={feature.title}
                    index={indx}
                    title={feature.title}
                    content={feature.content}
                    iconPath={IconPaths[['quality', 'analytics', 'automation', 'language'][indx % 4]]}
                  />
                ))}
              </div>
              <CTA 
                text={t('homepage:cta-text-5')} 
                buttonText={t('homepage:cta-button')}
                className="max-w-[800px]"
              />
              <h1>{t('homepage:why-ytchap-title')}</h1>
              <p>{t('homepage:why-ytchap-intro')}</p>
              <div className="features-grid">
                {whyList.map((feature, indx) => (
                  <FeatureCard
                    key={feature.title}
                    index={indx}
                    title={feature.title}
                    content={feature.content}
                    iconPath={IconPaths[['time', 'accessibility', 'analytics', 'automation'][indx % 4]]}
                  />
                ))}
              </div>
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
                    />
                  ) : null;

                  return (
                    <CollapsibleFAQ
                      key={key}
                      index={indx}
                      title={faq.title}
                      content={faq.content}
                      tipComponent={tipComponent}
                    />
                  );
                })}
              </div>
              <h1>{t('homepage:final-words-title')}</h1>
              <p>{t('homepage:final-words-content')}</p>
              {/* Final CTA */}
              <CTA 
                text={t('homepage:cta-text')} 
                buttonText={t('homepage:cta-button')}
                className="mt-12 mb-8"
              />
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}
