import '@testing-library/jest-dom'
import React from 'react'
import StarOfTheMonth from './StarOfTheMonth'
import { render, screen } from '../../../test/testUtils'
import { mockAchievementsList } from '../../../test/data/employeeAchievementsData'

describe('Star of the Month Component Testing', () => {
  render(<StarOfTheMonth />, {
    preloadedState: {
      achievements: {
        achievementsData: mockAchievementsList,
      },
    },
  })
  screen.debug()
  test('should render Star Of the Month Awardees without crashing', () => {
    expect(screen.getByText('Mamatha Thunam')).toBeInTheDocument()
    expect(screen.getByText('Venkata Kolla')).toBeInTheDocument()
    expect(screen.getByText('Vinesh Merugu')).toBeInTheDocument()
    expect(screen.getByText('Sandeep Kumar')).toBeInTheDocument()
  })
})
