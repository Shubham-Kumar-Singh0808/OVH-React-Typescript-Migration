import '@testing-library/jest-dom'
import React from 'react'
import TimeInOffice from './TimeInOffice'
import { render, screen } from '../../../test/testUtils'
import { mockWeeklyTimeInOffice } from '../../../test/data/weeklyTimeInOfficeData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

describe('TimeInOffice Component Testing', () => {
  render(<TimeInOffice />, {
    preloadedState: {
      weeklyTimeInOffice: {
        timeInOffice: mockWeeklyTimeInOffice,
      },
      userAccessToFeatures: {
        userAccessToFeatures: mockUserAccessToFeaturesData,
      },
    },
  })
  test('should render Employee Weekly TimeInOffice Details without crashing', () => {
    expect(screen.getByText('24')).toBeInTheDocument()
    expect(screen.getByText('F')).toBeInTheDocument()
    expect(screen.getAllByText('08:00')[0]).toBeInTheDocument()
  })
})
