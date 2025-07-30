import React from 'react';
import '../styles/Button.css'; 

const Button = ({ children, onClick, type = "button", style = {}, className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`custom-button ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};

export default Button;