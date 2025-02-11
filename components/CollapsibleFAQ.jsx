'use client';
import { useState } from 'react';
import TextWithLinks from './TextWithLinks';

const CollapsibleFAQ = ({ title, content, index, tipComponent, keywords }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="faq-button"
        aria-expanded={isOpen}
      >
        <h2>
          {index + 1}. {title}
        </h2>
        <svg
          className={`faq-icon ${isOpen ? 'open' : ''}`}
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4L12 20M4 12L20 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div className={`faq-content ${isOpen ? 'open' : ''}`}>
        <p className="ml-8"><TextWithLinks text={content} keywords={keywords} /></p>
        {tipComponent && isOpen && tipComponent}
      </div>
    </div>
  );
};

export default CollapsibleFAQ;
