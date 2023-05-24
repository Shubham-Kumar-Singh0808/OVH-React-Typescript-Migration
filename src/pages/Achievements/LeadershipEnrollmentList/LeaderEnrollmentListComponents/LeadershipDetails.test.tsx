import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import LeadershipDetails from './LeadershipDetails'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockLeadershipDetails } from '../../../../test/data/LeadershipEnrollmentListData'

const mockSetShowLeadershipDetails = jest.fn()
const mockSetCurrentIndex = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <LeadershipDetails
      currentIndex={0}
      setCurrentIndex={mockSetCurrentIndex}
      setShowLeadershipDetails={mockSetShowLeadershipDetails}
    />
  </div>
)

describe('Leadership Details', () => {
  describe('status=Approved Render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          leadershipEnrollmentList: {
            isLoading: ApiLoadingState.succeeded,
            leadershipList: mockLeadershipDetails,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('all information and questions are rendered', () => {
      expect(screen.getAllByTestId('test-question-check')).toHaveLength(14)
    })
    test('back button functioning', () => {
      const backBtn = screen.getByTestId('back-btn')
      expect(backBtn).toBeEnabled()
      userEvent.click(backBtn)
      expect(mockSetShowLeadershipDetails).toHaveBeenCalledTimes(1)
    })
  })
})
