import React from "react";

export const Button = ({
  children,
  type = "button",
  variant = "default", // default | secondary | outline | destructive | ghost
  size = "md",
  className = "",
  disabled = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
