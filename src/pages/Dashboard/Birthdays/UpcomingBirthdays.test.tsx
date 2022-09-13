import '@testing-library/jest-dom'
import React from 'react'
import UpcomingBirthdays from './UpcomingBirthdays'
import { render, screen } from '../../../test/testUtils'
import { mockUpcomingBirthdays } from '../../../test/data/upcomingBirthdaysData'

describe('UpcomingBirthdays Component Testing', () => {
  //   beforeEach(() => {
  render(<UpcomingBirthdays />, {
    preloadedState: {
      upcomingEmployeeBirthday: {
        upcomingBirthdays: mockUpcomingBirthdays,
      },
    },
    // })
  })
  test('should render Upcoming employees Birthdays without crashing', () => {
    expect(screen.getByText('Madhav Reddy Patlola')).toBeInTheDocument()
    expect(screen.getByText('Sandeep Kumar')).toBeInTheDocument()
    expect(screen.getByText('Venkata Ananda Chanapathi')).toBeInTheDocument()
  })
})
