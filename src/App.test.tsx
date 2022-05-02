import { render, screen } from '@testing-library/react'

import Dashboard from './pages/dashboard/Dashboard'
import React from 'react'

test('App should render without crashing', async () => {
  render(<Dashboard />)

  expect(screen.getByText('Dashboard')).toBeInTheDocument()
})
