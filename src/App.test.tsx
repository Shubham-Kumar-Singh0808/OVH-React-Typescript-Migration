import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('App should render without crashing', async () => {
  render(<App />)
  const linkElement = screen.getByText(/Loading.../i)
  expect(await linkElement).toBeInTheDocument()
})
