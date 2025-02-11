'use client';
import { useState } from 'react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
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
      <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
        <div className="faq-answer-content">{answer}</div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "What is YTChap?",
      answer: "YTChap is a tool that helps you generate and manage YouTube video chapters efficiently. It uses AI to analyze video content and create meaningful chapter markers."
    },
    {
      question: "How does it work?",
      answer: "Simply paste a YouTube video URL, select your preferred language and complexity level, and YTChap will automatically generate well-structured chapters for your video."
    },
    {
      question: "Which languages are supported?",
      answer: "YTChap supports multiple languages including English, Spanish, French, Italian, German, and Portuguese."
    }
  ];

  return (
    <div className="faq-container">
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
