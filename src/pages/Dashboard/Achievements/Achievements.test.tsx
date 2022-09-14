import '@testing-library/jest-dom'
import React from 'react'
import Achievements from './Achievements'
import { render, screen } from '../../../test/testUtils'
import { mockAchievementsList } from '../../../test/data/employeeAchievementsData'

describe('Achievements Component Testing', () => {
  render(<Achievements />, {
    preloadedState: {
      achievements: {
        achievementsData: mockAchievementsList,
      },
    },
  })
  screen.debug()
  test('should render Employees Achievements without crashing', () => {
    expect(screen.getByText('Star of the Month')).toBeInTheDocument()
    expect(screen.getByText('Special Award')).toBeInTheDocument()
    expect(screen.getByText('Service Awards')).toBeInTheDocument()
  })
})
