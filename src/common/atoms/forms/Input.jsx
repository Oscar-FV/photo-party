import React from "react";

const Input = ({ type = "text", placeholder, size, color, disabled = false }) => {
  const colorClass = color ? `input-${color}` : "";
  const sizeClass = size ? `input-${size}` : "";

  return (
    <input
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      className={`input input-bordered w-full ${colorClass} ${sizeClass}`}
    />
  );
};

export default Input