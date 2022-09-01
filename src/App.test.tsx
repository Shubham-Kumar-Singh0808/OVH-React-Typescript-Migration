import React from 'react'
import Dashboard from './pages/Dashboard/Dashboard'
import { render, screen } from './test/testUtils'

test('App should render without crashing', () => {
  render(
    <>
      <Dashboard />
    </>,
  )
  expect(screen.getByText('Earned Leaves')).toBeInTheDocument()
  expect(screen.getByText('Time In Office')).toBeInTheDocument()
  expect(screen.getByText('Job Openings')).toBeInTheDocument()
  expect(screen.getByText('Trainings')).toBeInTheDocument()
  expect(screen.getByText('Birthdays')).toBeInTheDocument()
  expect(screen.getByText('Service Award')).toBeInTheDocument()
  expect(screen.getByText('Holidays')).toBeInTheDocument()
})
