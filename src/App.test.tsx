import React from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import { render, screen } from './test/testUtils'

test('App should render without crashing', () => {
  render(
    <>
      <Dashboard />
    </>,
  )
  expect(screen.getByText('Dashboard')).toBeInTheDocument()
})
