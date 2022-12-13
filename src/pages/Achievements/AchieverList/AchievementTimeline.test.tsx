import React from 'react'
import '@testing-library/jest-dom'
import AchievementTimeline from './AchievementTimeline'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockAchievementTimeline } from '../../../test/data/AchieverListData'

const mockSetAchievementTimeline = jest.fn()
const backButton = 'back-btn'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchievementTimeline setAchievementTimeline={mockSetAchievementTimeline} />
  </div>
)

describe('Achievement Timeline Rendering', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          achieverList: {
            achievementHistoryTimeline: mockAchievementTimeline,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('Back button is rendered', () => {
      expect(screen.getByTestId(backButton)).toBeEnabled()
    })
    test('Clicking the back button', async () => {
      const button = screen.getByTestId(backButton)
      fireEvent.click(button)
      await waitFor(() => {
        expect(mockSetAchievementTimeline).toHaveBeenCalledTimes(1)
      })
    })
    test('Timestamp value is rendered', () => {
      const timestamp = screen.getByTestId('sh-time-stamp-0')
      expect(timestamp).toHaveTextContent('12-Dec-2022 03:54:43 PM')
    })
    test('render modified by name with the persist type', () => {
      const value = screen.getByTestId('modifiedByValue-0')
      expect(value).toHaveTextContent('Hr Manager -')
      const persist = screen.getByTestId('persist-0')
      expect(persist).toHaveTextContent('Updated')
    })
    test('render the compulsory details - employee name, achievement type', () => {
      expect(screen.getByTestId('Achievement Type')).toBeInTheDocument()
      expect(screen.getByTestId('Employee Name')).toBeInTheDocument()
    })
  })
})
