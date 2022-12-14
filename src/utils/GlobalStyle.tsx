import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    --btn-bg: #771ec1;
    --btn-bg-disabled: #9d9dac;
    --btn-bg-hover: #9f4ae4;
    --btn-text-hover: #f5f5f5;
    --black: #000;
    --white: #fff;
    --dark-gray: #333;
    --light-gray: #ddd;
    --btn-text-disabled: #e4e0e0;
    --answer-checked: #7217b3;
    --answer-checked-hover: #601397;
    --answer-input-checked-bg: #ca7ed9;
    --title-text: #235ccf;
    --right: #1d7d2d;
    --wrong: #bd1f1f;
    --highest-score-light: #0d9555;
    --highest-score-dark: #13bb6c;
    --select-input-bg-light: #eeeded;
    --select-input-bg-dark: #434141;
    --question-choice-thumb: #0c26ce;
    --modal-bg: #ae1313;
    --modal-border-light: #9e9b9b;
    --modal-border-dark: #111825;
    --link-color: #4d85ec;
    --footer-bg-light: #dadada;
    --footer-bg-dark: #171717;
    --footer-color-light: #131313;
    --footer-color-dark: #d1d1d1;
    --username-light: #000000;
    --username-dark: #43a7e9;
    --icons-main-color: #878787;
    --scroll-bar-thumb: #505050;
    --bg-scroll-bar: #393939;
    --fb-hover-color: #1870E5;
    --tt-hover-color: #27A1D5;

}

html { 
  background-color: ${({ theme: { background } }) => background};
  color: ${({ theme: { color } }) => color};
  @media (max-width: 600px) {
    font-size: 1.1rem;
  }
}

body {
  text-align: center;
  margin: 0;
  width: 100vw;
  height: 100vh;
  background-image: ${({ theme }) =>
    theme.name === 'light'
      ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='120' fill='%23dddddd' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpath d='M54.5,201.5c-9.2-9.2-3.1-28.5-7.8-39.8S24,140.5,24,128s17.8-22,22.7-33.7-1.4-30.6,7.8-39.8S83,51.4,94.3,46.7,115.5,24,128,24s22,17.8,33.7,22.7,30.6-1.4,39.8,7.8,3.1,28.5,7.8,39.8S232,115.5,232,128s-17.8,22-22.7,33.7,1.4,30.6-7.8,39.8-28.5,3.1-39.8,7.8S140.5,232,128,232s-22-17.8-33.7-22.7S63.7,210.7,54.5,201.5Z' fill='none' stroke='%23dddddd' stroke-linecap='round' stroke-linejoin='round' stroke-width='16'%3E%3C/path%3E%3Ccircle cx='128' cy='180' r='12'%3E%3C/circle%3E%3Cpath d='M128,144v-8a28,28,0,1,0-28-28' fill='none' stroke='%23dddddd' stroke-linecap='round' stroke-linejoin='round' stroke-width='16'%3E%3C/path%3E%3C/svg%3E")`
      : `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='120' fill='%23191919' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpath d='M54.5,201.5c-9.2-9.2-3.1-28.5-7.8-39.8S24,140.5,24,128s17.8-22,22.7-33.7-1.4-30.6,7.8-39.8S83,51.4,94.3,46.7,115.5,24,128,24s22,17.8,33.7,22.7,30.6-1.4,39.8,7.8,3.1,28.5,7.8,39.8S232,115.5,232,128s-17.8,22-22.7,33.7,1.4,30.6-7.8,39.8-28.5,3.1-39.8,7.8S140.5,232,128,232s-22-17.8-33.7-22.7S63.7,210.7,54.5,201.5Z' fill='none' stroke='%23191919' stroke-linecap='round' stroke-linejoin='round' stroke-width='16'%3E%3C/path%3E%3Ccircle cx='128' cy='180' r='12'%3E%3C/circle%3E%3Cpath d='M128,144v-8a28,28,0,1,0-28-28' fill='none' stroke='%23191919' stroke-linecap='round' stroke-linejoin='round' stroke-width='16'%3E%3C/path%3E%3C/svg%3E")`};
  background-repeat: space;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  overflow-y: auto;
}

div#root { 
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100vw;
}

button, select, input:focus { 
  outline: none;
}

.box {
  font-family: 'Lato', sans-serif;
  transition: all linear .08s;
  background-color: ${({ theme: { background } }) => background};
  display: block;
  width: 550px;
  border-radius: 0.5rem;
  border: 1px solid ${({ theme }) =>
    theme.name === 'light' ? 'var(--modal-border-dark)' : 'var(--modal-border-light)'};
  box-shadow: 1.5px 1.5px 3px;
  margin-bottom: 30px;
  max-height: 600px;
  overflow-y: auto;
  scrollbar-color: ${({ theme }) => (theme.name === 'light' ? '' : 'var(--scroll-bar-thumb) var(--bg-scroll-bar)')} ;
  scrollbar-width: thin;
  ::-webkit-scrollbar { 
    background: ${({ theme }) => (theme.name === 'light' ? '' : 'var(--bg-scroll-bar)')};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme.name === 'light' ? '' : 'var(--scroll-bar-thumb)')};
    border-radius: 10px;
  }

  @media (max-width: 600px) {
    width: 85vw;
    max-height: none;
  }
}
`;

export default GlobalStyle;
