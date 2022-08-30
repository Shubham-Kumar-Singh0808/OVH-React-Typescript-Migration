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
  test('should render the "Time In Office" header', () => {
    const timeInOfficeTitle = screen.getByRole('heading', {
      name: 'Time In Office',
    })
    expect(timeInOfficeTitle).toBeTruthy()
  })
  test('should render the "Trainings" header', () => {
    const trainingsTitle = screen.getByRole('heading', {
      name: 'Trainings',
    })
    expect(trainingsTitle).toBeTruthy()
  })
  test('should render the "Birthdays" header', () => {
    const birthdaysTitle = screen.getByRole('heading', {
      name: 'Birthdays',
    })
    expect(birthdaysTitle).toBeTruthy()
  })
  test('should render the "Service Award" header', () => {
    const serviceAwardTitle = screen.getByRole('heading', {
      name: 'Service Award',
    })
    expect(serviceAwardTitle).toBeTruthy()
  })
  test('should render the "Holidays" header', () => {
    const holidaysTitle = screen.getByRole('heading', {
      name: 'Holidays',
    })
    expect(holidaysTitle).toBeTruthy()
  })
})
