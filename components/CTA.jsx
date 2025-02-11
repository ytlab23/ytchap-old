import React from 'react';
import CTAButton from './CTAButton';

const CTA = ({ text, buttonText, className = '' }) => {
  return (
    <div className={`text-center bg-gradient-to-r from-purple-600 to-violet-600 rounded-xl p-8 shadow-lg transform hover:scale-105 transition-transform duration-300 ${className}`}>
      <p className="text-2xl text-white font-bold tracking-wide leading-relaxed">
        {text}
      </p>
      <CTAButton text={buttonText} />
    </div>
  );
};

export default CTA;
