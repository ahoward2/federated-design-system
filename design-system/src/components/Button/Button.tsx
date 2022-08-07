import React from "react";
import ButtonWrapper from "./Button.styles";

interface ButtonProps {
  children?: React.ReactNode | string | JSX.Element | HTMLElement;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <ButtonWrapper>
      <button className="styled-button">
        {children ? children : "no text value provided"}
      </button>
    </ButtonWrapper>
  );
};

export default Button;
