import '@testing-library/jest-dom'

import React from 'react'
import AchievementTypeList from './AchievementTypeList'
import { cleanup, fireEvent, render, screen } from '../../../../test/testUtils'
import { mockAchievementTypeList } from '../../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const mockBackButtonHandler = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchievementTypeList backButtonHandler={mockBackButtonHandler} />
  </div>
)

describe('Achievement Type List Testing', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            dateSortedList: mockAchievementTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    afterEach(cleanup)
    test('back button is rendered and functional', () => {
      const backBtn = screen.getByTestId('back-btn')
      expect(backBtn).toBeTruthy()
      expect(backBtn).toBeEnabled()
      expect(backBtn).toHaveClass('btn-ovh me-1')
      fireEvent.click(backBtn)
      expect(mockBackButtonHandler).toHaveBeenCalledTimes(1)
    })
    test('Total number of records are displayed', () => {
      const tag = screen.getByTestId('tot-rec-num')
      expect(tag).toHaveTextContent('Total Records: 10')
    })
    test('scroll functionality not enabled', () => {
      const col = screen.getByTestId('scroll-col')
      expect(col).not.toHaveClass('custom-scroll')
    })
  })
})
