import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0; 
  }

  html,
  body {
    box-sizing: border-box;
    border: 0;
    font-size: 62.5%; 
  }

  a {
	color: inherit;
	text-decoration: none;
  }

  button {
	border: transparent;
	cursor: pointer;
  background-color: transparent;
  }
`;

export default GlobalStyle;
