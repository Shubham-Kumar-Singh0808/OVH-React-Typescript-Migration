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
  expect(screen.getByText('Time in Office')).toBeInTheDocument()
  expect(screen.getByText('Job Openings')).toBeInTheDocument()
  expect(screen.getByText('Upcoming Trainings')).toBeInTheDocument()
  expect(screen.getByText('Upcoming Events')).toBeInTheDocument()
  expect(screen.getByText('Upcoming Birthdays')).toBeInTheDocument()
  expect(screen.getByText('Upcoming Holidays')).toBeInTheDocument()
})
