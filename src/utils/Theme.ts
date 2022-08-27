import { Theme } from "styled-components"

export const LightTheme: Theme = {
    name: 'light',
    index: 0,
    color: '#000', 
    background: '#eee'
}

export const DarkTheme: Theme = {
    name: 'dark',
    index: 1,
    color: '#fff',
    background: '#212121'
}

export const themes: Array<Theme> = [LightTheme, DarkTheme];