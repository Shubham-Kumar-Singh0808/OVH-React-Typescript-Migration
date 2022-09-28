import React from 'react'
import Dashboard from './Dashboard'
import { render, screen } from '../../test/testUtils'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { mockLeaveSummary } from '../../test/data/leaveSummaryData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Dashboard />
  </div>
)
describe('Dashboard Sections Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        authentication: {
          authenticatedUser: {
            employeeName: 'admin',
            employeeId: '1980',
            userName: 'admin',
            role: 'admin',
            tenantKey: 'RAYBIZTECH',
            token: 'test',
            designation: 'Software Developer',
          },
        },
      },
    })
  })
  screen.debug()
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
