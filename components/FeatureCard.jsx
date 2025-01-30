'use client';

const FeatureCard = ({ title, content, index, iconPath }) => {
  // Split the paths by 'M' and filter out empty strings
  const paths = iconPath.split('M').filter(Boolean).map(path => 'M' + path.trim());

  return (
    <div className="feature-card">
      <div className="feature-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {paths.map((path, i) => (
            <path
              key={i}
              d={path}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>
      <div className="feature-content">
        <h2>
          {index + 1}. {title}
        </h2>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
