import '@testing-library/jest-dom'
import React from 'react'
import SpecialAward from './SpecialAward'
import { render, screen } from '../../../test/testUtils'
import { mockAchievementsList } from '../../../test/data/employeeAchievementsData'

describe('Special Awards Component Testing', () => {
  render(<SpecialAward />, {
    preloadedState: {
      achievements: {
        achievementsData: mockAchievementsList,
      },
    },
  })
  screen.debug()
  test('should render Special Awardees without crashing', () => {
    expect(screen.getByText('Sai Krishna Oggu')).toBeInTheDocument()
    expect(screen.getByText('Srikanth Pasupuleti')).toBeInTheDocument()
    expect(screen.getByText('Vasavi Nukarapu')).toBeInTheDocument()
    expect(screen.getByText('Siva Gorintla')).toBeInTheDocument()
  })
})
