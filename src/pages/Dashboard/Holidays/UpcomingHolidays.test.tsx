import '@testing-library/jest-dom'
import React from 'react'
import UpcomingHolidays from './UpcomingHolidays'
import { mockUpcomingHolidays } from '../../../test/data/upcomingHolidaysData'
import { render, screen } from '../../../test/testUtils'

describe('UpcomingHolidays Component Testing', () => {
  render(<UpcomingHolidays />, {
    preloadedState: {
      holidays: {
        upcomingHolidays: mockUpcomingHolidays,
      },
    },
  })
  test('should render Upcoming Holidays without crashing', () => {
    expect(screen.getByText('New year')).toBeInTheDocument()
    expect(screen.getByText('Makara Sankranti')).toBeInTheDocument()
    expect(screen.getByText('Republic Day')).toBeInTheDocument()
  })
})
