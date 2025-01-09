import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import nock from 'nock';

test('renders notes', async () => {
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

test('renders paginated notes', async () => {
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
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
  ]);
  nock('http://localhost:8080').defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'x-requested-with',
  }).options('/v1/paginated/notes?start=40&end=40').reply(200);
  nock('http://localhost:8080').defaultReplyHeaders({
    'access-control-allow-origin': '*',
    'access-control-allow-headers': 'x-requested-with',
  }).get('/v1/paginated/notes?start=40&end=40').reply(200, [
    {
      title: 'first',
      contents: ['one', 'two'],
    },
    {
      title: 'first',
      contents: ['one', 'two'],
    },
  ]);

  render(<App />);

  await waitFor(() => {
    const notes = screen.getAllByText('first');
    expect(notes).toHaveLength(40);
  });

  await waitFor(() => {
    const notesList = screen.getByTestId('notes-list');
    fireEvent.scroll(notesList, { target: { scrollY: 1000 } });
  });

  await waitFor(() => {
    const notes = screen.getAllByText('first');
    expect(notes).toHaveLength(42);
  });
});
