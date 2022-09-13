import '@testing-library/jest-dom'
import React from 'react'
import ServiceAwards from './ServiceAwards'
import { render, screen } from '../../../test/testUtils'
import { mockAchievementsList } from '../../../test/data/employeeAchievementsData'

describe('Service Awards Component Testing', () => {
  render(<ServiceAwards />, {
    preloadedState: {
      achievements: {
        achievementsData: mockAchievementsList,
      },
    },
  })
  screen.debug()
  test('should render Service Awardees without crashing', () => {
    expect(screen.getByText('Pawan Adivi')).toBeInTheDocument()
    expect(screen.getByText('Bhavani Gidugu')).toBeInTheDocument()
    expect(screen.getByText('Leela Hari')).toBeInTheDocument()
    expect(screen.getByText('Naveen Kunchakuri')).toBeInTheDocument()
  })
})
