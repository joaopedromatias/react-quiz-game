import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.dataLayer = [];
})

describe('application tests', () => { 
  
  const titleText = /quiz game/i;
  const startButtonText = /start/i;

  it('should render the application with the title and with the start button', async () => {
    render(<App/>);
      
    const title = screen.getByText(titleText);
    const startButton = await screen.findByText(startButtonText);
  
    expect(title).toBeInTheDocument();  
    expect(startButton).toBeInTheDocument();
  });

  it('should show the loading icon after the play button is pressed', async () => { 
    render(<App/>);

    const startButton = screen.getByRole('button', {name: startButtonText});

    fireEvent.click(startButton);

    const loadingIcon = screen.getByTestId('loading-icon');
    expect(loadingIcon).toBeInTheDocument();
  })
})