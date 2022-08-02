import React from "react";
import ButtonWrapper from "./Button.styles";

interface ButtonProps {
  text?: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <ButtonWrapper>
      <button className="styled-button">
        {text ? text : "no prop value provided"}
      </button>
    </ButtonWrapper>
  );
};

// export const MemoizedButton = React.memo(Button);
// export { Button };
export default Button;
