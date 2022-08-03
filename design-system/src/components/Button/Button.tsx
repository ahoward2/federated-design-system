import React from "react";
import ButtonWrapper from "./Button.styles";

interface ButtonProps {
  children?: React.ReactNode;
}

const Button = ({ children }: ButtonProps) => {
  return (
    <ButtonWrapper>
      <button className="styled-button">
        {children ? children : "no prop value provided"}
      </button>
    </ButtonWrapper>
  );
};

// export const MemoizedButton = React.memo(Button);
// export { Button };
export default Button;
