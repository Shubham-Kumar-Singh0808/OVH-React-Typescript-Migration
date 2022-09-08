import '@testing-library/jest-dom'
import React from 'react'
import UpcomingTrainings from './UpcomingTrainings'
import { render, screen } from '../../../test/testUtils'
import { mockUpcomingTrainings } from '../../../test/data/trainingsAndEventsData'

describe('Upcoming Trainings Component Testing', () => {
  render(<UpcomingTrainings />, {
    preloadedState: {
      trainingsAndEvents: {
        upcomingTrainingsAndEvents: mockUpcomingTrainings,
      },
    },
  })
  test('should render Upcoming Trainings without crashing', () => {
    expect(screen.getByText('Training')).toBeInTheDocument()
    expect(screen.getByText('Aurobindo - 1st Floor')).toBeInTheDocument()
    expect(screen.getByText('Raybiztech - 1')).toBeInTheDocument()
  })
})
