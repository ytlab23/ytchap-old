'use client';

import React from 'react';

const CTAButton = ({ text }) => {
  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="mt-6 bg-white text-purple-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-colors duration-200"
    >
      {text}
    </button>
  );
};

export default CTAButton;
