import { DefaultTheme } from 'styled-components';

export const LightTheme: DefaultTheme = {
  name: 'light',
  index: 0,
  color: '#000',
  background: '#eee',
};

export const DarkTheme: DefaultTheme = {
  name: 'dark',
  index: 1,
  color: '#fff',
  background: '#212121',
};

export const themes: Array<DefaultTheme> = [LightTheme, DarkTheme];
