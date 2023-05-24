import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import LeadershipDetails from './LeadershipDetails'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockLeadershipDetails,
  mockLeadershipDetails2,
} from '../../../../test/data/LeadershipEnrollmentListData'

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

const approveBtnId = 'approve-btn'
const rejectBtnId = 'reject-btn'
const finalBtnId = 'final-btn'

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

  describe('should render the component', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          leadershipEnrollmentList: {
            isLoading: ApiLoadingState.succeeded,
            leadershipList: mockLeadershipDetails2,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('correct number of details are rendered', () => {
      expect(screen.getAllByTestId('test-question-check')).toHaveLength(13)
    })
    test('buttons are rendered', () => {
      expect(screen.getByTestId(approveBtnId)).toBeEnabled()
      expect(screen.getByTestId(rejectBtnId)).toBeEnabled()
    })
    test('click approve button', () => {
      const approveButton = screen.getByTestId(approveBtnId)
      userEvent.click(approveButton)
      expect(screen.getByTestId('modal-content')).toHaveTextContent(
        'Do you really want to',
      )
      expect(screen.getByTestId('emp-name')).toHaveTextContent('Admin Support?')
      expect(screen.getByTestId('app-rej')).toHaveTextContent('Approve')
      const textArea = screen.getByTestId('text-area-comments')
      expect(textArea).toBeVisible()
      userEvent.type(textArea, 'typing here')

      const finalButton = screen.getByTestId(finalBtnId)
      expect(finalButton).toHaveTextContent('Approve')
      userEvent.click(finalButton)
    })
  })
})
