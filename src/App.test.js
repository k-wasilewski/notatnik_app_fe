import { render, screen } from '@testing-library/react';
import App from './App';

test('renders siemanko', () => {
  render(<App />);

  const text = screen.getByText(/siemanko/i);

  expect(text).toBeInTheDocument();
});
