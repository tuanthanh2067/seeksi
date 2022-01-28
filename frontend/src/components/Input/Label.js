import React from "react";

const Label = ({ id, label, error, required = false }) => {
  return (
    <div>
      <label id={id} className={`text-medium-gray font-bold`}>
        {label} {required && <span className="text-primary">*</span>}
      </label>
      {error && <p className={`text-primary text-xs `}>{error}</p>}
    </div>
  );
};

export default Label;
