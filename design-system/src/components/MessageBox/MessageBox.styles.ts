import styled from "styled-components";

const MessageBoxWrapper = styled.div`
  border-radius: 4px;
  border-style: solid;
  color: ${({ theme }) => theme.secondaryColor};
  border-color: ${({ theme }) => theme.secondaryColor};
  background-color: ${({ theme }) => theme.background};
  padding: 0.5rem 1rem;
`;

export default MessageBoxWrapper;
