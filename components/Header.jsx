import React from 'react';
import initTranslations from '@/app/i18n';

const Header = async ({ locale }) => {
  const { t: tHome } = await initTranslations(locale, ['homepage']);
  return (
    <div className="w-full flex justify-center sm:px-4">
      <h1 className="text-center text-[3rem] md:text-[4rem] font-bold max-w-[900px]">
        {tHome('header-title')}
      </h1>
    </div>
  );
};

export default Header;
