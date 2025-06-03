import React from "react";
import "./Button.css"; // 공통 버튼 스타일을 여기에서 정의

const Button = ({
  onClick,
  type = "primary",
  text,
  className = "",
  ...props
}) => {
  // 버튼 스타일에 따라 클래스 추가
  const buttonClass = `button ${type} ${className}`;

  return (
    <button className={buttonClass} onClick={onClick} {...props}>
      {text}
    </button>
  );
};

export default Button;
