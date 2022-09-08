import '@testing-library/jest-dom'
import React from 'react'
import UpcomingEvents from './UpcomingEvents'
import { render, screen } from '../../../test/testUtils'
import { mockUpcomingEvents } from '../../../test/data/trainingsAndEventsData'

describe('Upcoming Events Component Testing', () => {
  render(<UpcomingEvents />, {
    preloadedState: {
      trainingsAndEvents: {
        upcomingTrainingsAndEvents: mockUpcomingEvents,
      },
    },
  })
  test('should render Upcoming Events without crashing', () => {
    expect(screen.getByText('Health Campp')).toBeInTheDocument()
    expect(screen.getByText('Raybiztech - 1')).toBeInTheDocument()
    expect(screen.getByText('Vivekananda - 2nd Floor')).toBeInTheDocument()
  })
})
