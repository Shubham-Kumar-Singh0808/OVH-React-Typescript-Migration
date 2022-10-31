import '@testing-library/jest-dom'
import React from 'react'
import QualificationDetails from './QualificationDetails'
import { render, screen } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

describe('EventList Component Testing', () => {
  render(<QualificationDetails />, {
    preloadedState: {
      userAccessToFeatures: {
        userAccessToFeatures: mockUserAccessToFeaturesData,
      },
    },
  })
  screen.debug()
  test('should render Qualifications Tab without crashing', () => {
    expect(screen.getByText('Qualifications')).toBeInTheDocument()
    expect(screen.getByText('Certifications')).toBeInTheDocument()
    expect(screen.getByText('Skills')).toBeInTheDocument()
  })
})
