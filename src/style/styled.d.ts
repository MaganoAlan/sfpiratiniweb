import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: {
        700: string;
        600: string;
        400: string;
      };
      secondary: {
        600: string;
      };
      white: string;
      green: {
        700: string;
        500: string;
        300: string;
      };
      gray: {
        700: string;
        600: string;
        500: string;
        400: string;
        300: string;
        200: string;
        100: string;
      };
    };
    fonts: {
      varela: string;
      alata: string;
    };
  }
}
