// @ts-nocheck

import { createGlobalStyle, withTheme } from "styled-components";

const globalStyle = createGlobalStyle`
 :root {
    //dark-mode
    --dark-background: #1A1B27;
    --dark-text: #F5F5F7; 

    //light-mode
    --light-background: #f2f2f2;
    --light-text: #2E0509;

    //shared
    --primary-color: #3BF02E;
    --secondary-color: #ec4899;
    --font-family: 'Roboto', sans-serif;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
  }

  body  {
    -webkit-font-smoothing: antialiased;
    height: 100vh;
    width: 100vw;
    font-family: ${({ theme }) => theme.fontFamily};
    margin: 0 auto;
    background-color: ${({ theme }) => theme.background};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 {
    font-size: 3.375rem;
    color: ${({ theme }) => theme.text};
  }
  h2 {
    font-size: 2.25rem;
    color: ${({ theme }) => theme.text};
  } 

`;

export default withTheme(globalStyle);