import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    index: number;
    name: string;
    color: string;
    background: string;
  }
}
