import React from 'react'
import Dashboard from './Dashboard'
import UpcomingProbationaryEndDates from './ProbationaryList/UpcomingProbationaryEndDates'
import { render, screen } from '../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../test/data/userAccessToFeaturesData'

// const toRender = (
//   <div>
//     <div id="backdrop-root"></div>
//     <div id="overlay-root"></div>
//     <div id="root"></div>
//     <Dashboard />
//   </div>
// )
describe('Dashboard Sections Testing', () => {
  describe('should render All Sections of Dashboard Page', () => {
    beforeEach(() => {
      render(<Dashboard />, {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1000',
              userName: 'admin.staging',
              role: 'admin',
              tenantKey: 'RAYBIZTECH',
              token: 'test',
              designation: 'Software Developer',
            },
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
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
    test('should render the "Upcoming Probationary End Dates" header', () => {
      const upcomingProbationaryEndDatesTitle = screen.getByRole('heading', {
        name: 'Upcoming Probationary End Dates',
      })
      expect(upcomingProbationaryEndDatesTitle).toBeTruthy()
    })
  })

  describe('should render Probationary Section when LoggedIn user is HR', () => {
    beforeEach(() => {
      render(<Dashboard />, {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'HR H',
              employeeId: '1993',
              userName: 'hr.staging',
              role: 'HR',
              tenantKey: 'RAYBIZTECH',
              token: 'test',
              designation: 'HR Executive',
            },
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    test('should render upcoming probationary section with HR Role', () => {
      expect(render(<UpcomingProbationaryEndDates />))
    })
  })

  describe('should render Probationary Section when LoggedIn user is HR Manager', () => {
    beforeEach(() => {
      render(<Dashboard />, {
        preloadedState: {
          authentication: {
            authenticatedUser: {
              employeeName: 'Hr Manager',
              employeeId: '1997',
              userName: 'hrmanager.staging',
              role: 'HR Manager',
              tenantKey: 'RAYBIZTECH',
              token: 'test',
              designation: 'Senior Manager, Human Resource',
            },
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    test('should render upcoming probationary section with HR Manager Role', () => {
      expect(render(<UpcomingProbationaryEndDates />))
    })
  })
})
