import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import MyReviewTabs from './MyReviewTabs'
import EmployeeRatingDetails from './RatingDetailsTab/EmployeeRatingDetails'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { mockReviewPageData } from '../../../test/data/myReviewData'

describe('My Profile Tabs Component Testing', () => {
  test('should render MyReview Tabs component with out crashing', async () => {
    render(<MyReviewTabs />, {
      preloadedState: {
        authentication: {
          authenticatedUser: { role: 'admin' },
        },
        myReview: {
          pageDetails: mockReviewPageData,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })

    expect(screen.getByText('Review Form')).toBeInTheDocument()
    expect(screen.getByText('Rating Details')).toBeInTheDocument()
    userEvent.click(screen.getAllByTestId('myReviewNavLink')[1])
    await waitFor(() => {
      expect(render(<EmployeeRatingDetails />)).toBeTruthy()
    })
  })
})
