import React from "react";

export const Input = ({ label, error, className = "", id, ...props }) => {
  const inputId = id || props.name;

  return (
    <div className="form-group">
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`form-input ${error ? "has-error" : ""} ${className}`}
        {...props}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};

