/**
 * Create theme objects for each theme and define css variables for each theme.
 * You can construct your themes using any css properties and the sky is the limit.
 */

export interface ThemeProps {
  background: string;
  text: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
}

export const darkTheme: ThemeProps = {
  background: "var(--dark-background)",
  text: "var(--dark-text)",
  primaryColor: "var(--primary-color)",
  secondaryColor: "var(--secondary-color)",
  fontFamily: "var(--font-family)",
};

export const lightTheme: ThemeProps = {
  background: "var(--light-background)",
  text: "var(--light-text)",
  primaryColor: "var(--primary-color)",
  secondaryColor: "var(--secondary-color)",
  fontFamily: "var(--font-family)",
};
