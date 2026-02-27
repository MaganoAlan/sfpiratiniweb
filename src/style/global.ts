import { createGlobalStyle } from "styled-components";
import VarelaRound from "../assets/fonts/Varela_Round/VarelaRound-Regular.ttf";
// import Roboto from "../assets/fonts/Roboto-Regular.woff2";
export const GlobalStyle = createGlobalStyle`
   @font-face {
      font-family: 'Varela Round';
      src: url(${VarelaRound}) format('woff2');
      font-weight: normal;
      font-style: normal;
      font-display: swap; /* Boa prática para performance */
    }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-family: 'Varela Round', sans-serif;
  }

`;
