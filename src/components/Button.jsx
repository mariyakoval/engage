import React from 'react';
import '../styles/Button.css';

const Button = ({ children, onClick, type = "button", style = {}, className = "", variant }) => {
  let base = "custom-button";
  if (variant === "ai") base = "custom-button-ai";
  if (variant === "security") base = "custom-button-security";
  if (variant === "democracy") base = "custom-button-democracy";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;