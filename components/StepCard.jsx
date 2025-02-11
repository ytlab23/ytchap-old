'use client';
import TextWithLinks from './TextWithLinks';

const StepCard = ({ step, index }) => {
  return (
    <div className="step-card">
      <div className="step-number">
        <span>{index + 1}</span>
      </div>
      <div className="step-content">
        <p>
          {index === 0 ? (
            <TextWithLinks 
              text={step}
              keywords={{
                'YTChap.com': 'https://ytchap.com'
              }}
            />
          ) : step}
        </p>
      </div>
    </div>
  );
};

export default StepCard;
