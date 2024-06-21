import Form from '@/components/Form';
import { getSummery } from '../../api/api';
import Header from '@/components/Header';
import TranslationsProvider from '@/components/TranslationsProvider';
import initTranslations from '../i18n';

const i18nNamespaces = ['form'];
export default async function Home({ params: { locale } }) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <main className="flex flex-col gap-y-20">
      <Header locale={locale} />
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={locale}
        resources={resources}
      >
        <Form getSummery={getSummery} locale={locale} />
      </TranslationsProvider>
    </main>
  );
}
