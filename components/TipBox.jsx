import React from 'react';
import TextWithLinks from './TextWithLinks';

const TipBox = ({ title, content, keywords }) => {
  return (
    <div className="mt-4 p-6 bg-gradient-to-r from-purple-900/10 to-violet-900/10 rounded-lg border border-purple-200/20">
      <div className="flex items-center gap-2 mb-3">
        <svg 
          className="w-5 h-5 text-purple-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <span className="font-semibold text-purple-300">{title}</span>
      </div>
      <p className="text-gray-300 ml-7"><TextWithLinks text={content} keywords={keywords} className="text-purple-400 hover:text-purple-300 hover:underline" /></p>
    </div>
  );
};

export default TipBox;
