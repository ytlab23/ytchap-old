'use client';

const StepCard = ({ step, index }) => {
  return (
    <div className="step-card">
      <div className="step-number">
        <span>{index + 1}</span>
      </div>
      <div className="step-content">
        <p>{step}</p>
      </div>
    </div>
  );
};

export default StepCard;
