import { render, screen } from '@testing-library/react';
import App from './App';

it('render the application with the title and with the start button', async () => {
  render(<App/>);
  
  const titleText = /quiz game/i;
  const startButtonText = /start/i;

  const title = screen.getByText(titleText);
  const startButton = await screen.findByText(startButtonText);

  expect(title).toBeInTheDocument();  
  expect(startButton).toBeInTheDocument();
});