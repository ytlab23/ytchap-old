'use client';
import React, { useState } from 'react';
import { RiMenuFill } from 'react-icons/ri';
import { MdClose } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import LanguageSelection from './LanguageSelection';
import Image from 'next/image';
import logo from '../app/ytchaplogo.png';

const NavBar = () => {
  const { t: tNav } = useTranslation();
  const [showNav, setShowNav] = useState(false);
  const navList = JSON.parse(
    tNav('nav-items').replace(/'/g, '"').replace(/،/g, ',')
  );
  const linkList = ['about-us', 'how-it-works', 'why-ytchap', 'faqs'];
  const navItems = navList.map((item, indx) => ({
    title: item,
    link: linkList[indx],
  }));
  return (
    <div className="flex justify-around items-center w-full ">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <a href="/" className="text-2xl font-bold">
          <Image src={logo} alt="Ytchap logo" className="max-w-[200px]" />
        </a>
        <LanguageSelection />
      </div>
      {!showNav ? (
        <RiMenuFill
          size={26}
          className="cursor-pointer block md:hidden min-w-[40px]"
          onClick={() => {
            setShowNav(!showNav);
          }}
        />
      ) : (
        <MdClose
          size={26}
          className="cursor-pointer block md:hidden min-w-[40px]"
          onClick={() => {
            setShowNav(!showNav);
          }}
        />
      )}

      <div
        className={`navbar gap-8 flex flex-col justify-center items-center absolute ${
          showNav ? 'top-[5rem]' : 'top-[-100%]'
        } left-0 bg-[#121316]/90 w-[100%] h-[90vh] rounded-b-3xl z-10 md:flex-row md:bg-none md:w-auto md:h-auto md:relative md:top-0`}
      >
        {navItems.map((item) => {
          return (
            <a
              key={item.title}
              href={`#${item.link}`}
              className="font-light text-sm border-b hover:border-b-violet-950"
              onClick={() => {
                setShowNav(false);
              }}
            >
              {item.title.toUpperCase()}
            </a>
          );
        })}
      </div>
      {/* <div className="px-4 py-2 border border-[#483b68] rounded-2xl contact">
        <a href="#" className="text-sm">
          {tNav('contact-us')}
        </a>
      </div> */}
    </div>
  );
};

export default NavBar;
