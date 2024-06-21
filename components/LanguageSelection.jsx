'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';
import { AiOutlineGlobal } from 'react-icons/ai';

const LanguageSelection = () => {
  const languageItems = [
    { title: 'English', link: 'en' },
    { title: 'Spanish', link: 'es' },
    { title: 'Portuguese', link: 'pt' },
    { title: 'Italian', link: 'it' },
    { title: 'French', link: 'fr' },
    { title: 'Arabic', link: 'ar' },
    { title: 'German', link: 'de' },
  ];
  // const [showLanguages, setShowLanguages] = useState(false);
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e) => {
    const newLocale = e.target.value;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };
  return (
    <div className="flex relative items-center ">
      <AiOutlineGlobal size={26} className="min-w-[40px]" />
      <select
        onChange={handleChange}
        value={currentLocale}
        className="bg-transparent text-white"
      >
        {languageItems.map((lang) => (
          <option
            key={lang.link}
            value={lang.link}
            className="bg-black text-white"
          >
            {lang.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelection;
