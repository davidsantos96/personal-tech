import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${theme.colors.backgroundDark};
    font-family: ${theme.fonts.display};
    color: ${theme.colors.text.white};
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  * {
    box-sizing: border-box;
  }

  /* Scrollbar override */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  /* Material Symbols override for fill */
  .material-symbols-outlined.filled {
    font-variation-settings: 'FILL' 1;
  }
`;
