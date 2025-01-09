import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

test('renders notes', async () => {
  mockedAxios.get.mockResolvedValue({
    data: [
      {
        title: 'first',
        contents: ['one', 'two'],
      },
      {
        title: 'second',
        contents: ['three', 'four'],
      },
    ],
  });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText('first')).toBeInTheDocument();
    expect(screen.getByText('second')).toBeInTheDocument();

    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
    expect(screen.getByText('three')).toBeInTheDocument();
    expect(screen.getByText('four')).toBeInTheDocument();
  });
});
