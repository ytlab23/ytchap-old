'use client';

const FeatureCard = ({ title, content, index, iconPath }) => {
  return (
    <div className="feature-card">
      <div className="feature-content">
        <h2 className="flex items-center gap-4">
          <span className="feature-icon flex items-center justify-center w-16 h-16 rounded-lg bg-[#1E1E1E]">
            {iconPath}
          </span>
          {index + 1}. {title}
        </h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
