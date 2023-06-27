import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import MyProfileTabs from './MyProfileTabs'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

describe('My Profile Tabs Component Testing', () => {
  test('should render My Profile Tabs component with out crashing', async () => {
    render(<MyProfileTabs isViewingAnotherEmployee={false} />, {
      preloadedState: {
        authentication: {
          authenticatedUser: { role: 'admin' },
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })

    expect(screen.getByText('General Information')).toBeInTheDocument()
    expect(screen.getByText('General')).toBeInTheDocument()
    userEvent.click(screen.getAllByTestId('profileNavLink')[2])
    await waitFor(() => {
      expect(screen.getByText('Family Details')).toBeInTheDocument()
    })
  })
})
