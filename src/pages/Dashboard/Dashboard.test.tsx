import React from 'react'
import Dashboard from './Dashboard'
import { render, screen } from '../../test/testUtils'

describe('Dashboard Sections Testing', () => {
  beforeEach(() => {
    render(<Dashboard />)
  })
  test('should render the "Job Vacancies" header', () => {
    const jobOpeningsTitle = screen.getByRole('heading', {
      name: 'Job Openings',
    })
    expect(jobOpeningsTitle).toBeTruthy()
  })
  test('should render the "Earned Leaves" header', () => {
    const earnedLeavesTitle = screen.getByRole('heading', {
      name: 'Earned Leaves',
    })
    expect(earnedLeavesTitle).toBeTruthy()
  })
  test('should render the "Time In Office" title', () => {
    expect(screen.getByText('Time in Office')).toBeInTheDocument()
  })
  test('should render the "Trainings" header', () => {
    const trainingsTitle = screen.getByRole('heading', {
      name: 'Upcoming Trainings',
    })
    expect(trainingsTitle).toBeTruthy()
  })
  test('should render the "Upcoming Events" header', () => {
    const trainingsTitle = screen.getByRole('heading', {
      name: 'Upcoming Events',
    })
    expect(trainingsTitle).toBeTruthy()
  })
  test('should render the "Birthdays" header', () => {
    const birthdaysTitle = screen.getByRole('heading', {
      name: 'Upcoming Birthdays',
    })
    expect(birthdaysTitle).toBeTruthy()
  })
  test('should render the "Holidays" header', () => {
    const holidaysTitle = screen.getByRole('heading', {
      name: 'Upcoming Holidays',
    })
    expect(holidaysTitle).toBeTruthy()
  })
})
