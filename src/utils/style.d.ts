import 'styled-components';

declare module 'styled-components' {

  interface DefaultTheme {
    index: number
    name: string
    color: string
    background: string
  }

  export interface Theme extends DefaultTheme { 

  }
}