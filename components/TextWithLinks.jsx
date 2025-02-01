'use client';

import React from 'react';
import Link from 'next/link';

const TextWithLinks = ({ text, keywords = null, className = 'text-purple-600 hover:text-purple-800 hover:underline' }) => {
  // Utiliser les mots-clés par défaut si aucun n'est fourni
  const defaultKeywords = {
    'YTChap.com': 'https://ytchap.com'
  };

  const activeKeywords = keywords || defaultKeywords;

  // Créer un pattern qui correspond à tous les mots-clés
  const pattern = new RegExp(
    `(${Object.keys(activeKeywords)
      .map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|')})`,
    'g'
  );
  
  // Diviser le texte en parties
  const parts = text.split(pattern);
  
  return (
    <>
      {parts.map((part, index) => {
        // Si la partie est un mot-clé, la transformer en lien
        if (activeKeywords[part]) {
          return (
            <Link 
              key={index}
              href={activeKeywords[part]}
              className={className}
              target="_blank"
              rel="noopener noreferrer"
            >
              {part}
            </Link>
          );
        }
        // Sinon, retourner le texte tel quel
        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
};

export default TextWithLinks;
