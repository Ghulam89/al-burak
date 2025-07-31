import React from "react";

const Button = ({
  type = "button",
  label,
  disabled = false,
  className = "",
  onClick,
  Icons,
  rIcons,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`px-6 py-2.5  flex text-sm items-center justify-center gap-2 
      transition-all duration-300 ease-in-out transform 
      hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed
      ${className}`}
      disabled={disabled}
    >
      {Icons && <span className="text-lg">{Icons}</span>}
      {label}
      {rIcons && <span className="text-lg">{rIcons}</span>}
    </button>
  );
};

export default Button;
