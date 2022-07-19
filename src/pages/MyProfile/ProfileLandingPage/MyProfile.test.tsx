import '@testing-library/jest-dom'

import React from 'react'
import MyProfile from './MyProfile'
import { render, screen } from '../../../test/testUtils'
import { mockLoggedInEmployeeData } from '../../../test/data/myProfileData'

describe('My Profile Component Testing', () => {
  test('should render My Profile component with out crashing', () => {
    render(<MyProfile />, {
      preloadedState: {
        getLoggedInEmployeeData: {
          generalInformation: mockLoggedInEmployeeData,
        },
      },
    })

    expect(screen.getByText('Profile Details')).toBeInTheDocument()
  })
})
