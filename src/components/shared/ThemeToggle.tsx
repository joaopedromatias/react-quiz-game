import React, { useEffect } from 'react';
import styled from 'styled-components';
import { LightTheme, DarkTheme, themes } from '../../utils/Theme';
import { ThemeProvider, Theme } from 'styled-components';
import { Storage } from '../../services/StorageService';
import { SunIcon } from '../icons/SunIcon';
import { MoonIcon } from '../icons/MoonIcon';
import { LogEvent } from '../../services/LogEvent';

interface Props {
  children: React.ReactNode;
}

export const ThemeToggle: React.FC<Props> = ({ children }): JSX.Element => {
  const getUserTheme = (): Theme => {
    const userPreferredTheme = Storage.getItem('theme');
    const currentTheme: Theme = themes.find((theme) => theme.name === userPreferredTheme) || DarkTheme;
    return currentTheme;
  };

  const [theme, setTheme] = React.useState<Theme>(getUserTheme());

  useEffect(() => {
    Storage.setItem('theme', theme.name);
  }, [theme]);

  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <div
          onClick={() => {
            setTheme(theme.index === 0 ? DarkTheme : LightTheme);
            LogEvent.send('theme', 'change', `${theme.name === 'light' ? 'dark' : 'light'}`, 0);
          }}
        >
          <div className='container'>{theme.name === 'light' ? <SunIcon /> : <MoonIcon />}</div>
        </div>
      </Wrapper>
      {children}
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  div {
    position: absolute;
    top: 7px;
    right: 6px;
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
