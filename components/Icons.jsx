'use client';

import { BiTime } from 'react-icons/bi';
import { FaUserFriends } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { RiSettings4Fill } from 'react-icons/ri';
import { MdLanguage } from 'react-icons/md';
import { TbStarsFilled } from 'react-icons/tb';

export const IconPaths = {
  time: <BiTime className="w-6 h-6" />,
  accessibility: <FaUserFriends className="w-6 h-6" />,
  analytics: <IoStatsChart className="w-6 h-6" />,
  automation: <RiSettings4Fill className="w-6 h-6" />,
  language: <MdLanguage className="w-6 h-6" />,
  quality: <TbStarsFilled className="w-6 h-6" />
};
