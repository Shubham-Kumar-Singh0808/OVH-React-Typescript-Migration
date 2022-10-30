import '@testing-library/jest-dom'

import React from 'react'
import MyProfileTabs from './MyProfileTabs'
import { render, screen } from '../../../test/testUtils'

describe('My Profile Tabs Component Testing', () => {
  test('should render My Profile Tabs component with out crashing', () => {
    render(<MyProfileTabs />, {
      preloadedState: {
        authentication: {
          authenticatedUser: { role: 'admin' },
        },
      },
    })

    expect(screen.getByText('General Information')).toBeInTheDocument()
  })
})
