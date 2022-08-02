import styled from "styled-components";

const ButtonWrapper = styled.div`
  > .styled-button {
    cursor: pointer;
    border-radius: 4px;
    border-style: solid;
    font-size: 16px;
    font-family: ${({ theme }) => theme.fontFamily};
    border-color: ${({ theme }) => theme.primaryColor};
    background-color: ${({ theme }) => theme.primaryColor};
    padding: 0.5rem 1rem;
  }
`;

export default ButtonWrapper;
