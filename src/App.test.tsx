import { render, screen } from '@testing-library/react'
import React from 'react'
import Dashboard from './pages/Dashboard/Dashboard'

test('App should render without crashing', () => {
  render(<Dashboard />)

  expect(screen.getByText('Dashboard')).toBeInTheDocument()
})
