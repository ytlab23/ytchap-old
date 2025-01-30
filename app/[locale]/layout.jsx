import { Roboto, Jacques_Francois } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/NavBar';
import initTranslations from '../i18n';
import TranslationsProvider from '@/components/TranslationsProvider';
import i18nConfig from '@/i18nConfig';
import { dir } from 'i18next';

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
              <p>{t('homepage:what-is-ytchap-p1')}</p>
              <p>{t('homepage:what-is-ytchap-p2')}</p>
              <p>{t('homepage:what-is-ytchap-p3')}</p>
            </div>
            <div className="flex flex-col gap-y-4">
              <h1>{t('homepage:features-main-title')}</h1>
              <p>{t('homepage:features-intro')}</p>
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
              <h1>{t('homepage:how-to-title')}</h1>
              <p>{t('homepage:how-to-intro')}</p>
              <div className="flex flex-col gap-y-4 ml-4">
                {howToList.map((item, indx) => (
                  <p key={item}>
                    {indx + 1}. {item}
                  </p>
                ))}
              </div>
              <h1>{t('homepage:benefits-title')}</h1>
              <p>{t('homepage:benefits-intro')}</p>
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
              <h1>{t('homepage:who-should-use-title')}</h1>
              <p>{t('homepage:who-should-use-intro')}</p>
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
              <h1>{t('homepage:why-ytchap-title')}</h1>
              <p>{t('homepage:why-ytchap-intro')}</p>
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
              <h1>{t('homepage:faqs-title')}</h1>
              <p>{t('homepage:faqs-intro')}</p>
              <div className="flex flex-col gap-y-4 ml-4">
                {faqsList.map((feature, indx) => (
                  <div key={feature.title} className="flex flex-col gap-y-4">
                    <h2>
                      {indx + 1}. {feature.title}
                    </h2>
                    <p className="ml-8">{feature.content}</p>
                  </div>
                ))}
              </div>
              <h1>{t('homepage:final-words-title')}</h1>
              <p>{t('homepage:final-words-content')}</p>
            </div>
          </section>
        </div>
      </body>
    </html>
  );
}
