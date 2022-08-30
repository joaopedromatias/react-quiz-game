import GlobalStyle from './utils/GlobalStyle';
import { Box } from './components/shared/Box'
import { Title } from './components/shared/Title';
import { ThemeToggle } from './components/shared/ThemeToggle';
import { ReducerProvider } from './ReducerProvider';

const App: React.FC = (): JSX.Element => {
  return (
          <ThemeToggle>
            <GlobalStyle/>
              <ReducerProvider>
                <Title/>
                <Box/>
              </ReducerProvider>
            </ThemeToggle>
    )
}

export default App;