import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { ajax } from 'rxjs/ajax';
import { Observable } from 'rxjs';
import nock from 'nock';
import { JSDOM } from 'jsdom';

// jest.mock('rxjs/ajax');
// const mockedAjax = ajax as jest.Mocked<typeof ajax>;

const { window } = new JSDOM('', { url: 'http://localhost:8080' });

test('renders notes', async () => {
  // mockedAjax.get.mockResolvedValue(Observable.of({
  //   data: [
  //     {
  //       title: 'first',
  //       contents: ['one', 'two'],
  //     },
  //     {
  //       title: 'second',
  //       contents: ['three', 'four'],
  //     },
  //   ]
  // }));

  nock('http://localhost:8080').defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'x-requested-with',
  }).options('/v1/paginated/notes?start=0&end=40').reply(200);
  nock('http://localhost:8080').defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'x-requested-with',
  }).get('/v1/paginated/notes?start=0&end=40').reply(200, [
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'second',
      contents: ['three', 'four'],
    },
  ]);

  render(<App />);

  await waitFor(() => {
    const first = screen.getByText('first');
    expect(first).toBeInTheDocument();
    first.click();
  });

  await waitFor(() => {
    expect(screen.getByText('one')).toBeInTheDocument();
    expect(screen.getByText('two')).toBeInTheDocument();
    const second = screen.getByText('second');
    expect(second).toBeInTheDocument();
    second.click();
  });

  await waitFor(() => {
    expect(screen.getByText('three')).toBeInTheDocument();
    expect(screen.getByText('four')).toBeInTheDocument();
  });
});
