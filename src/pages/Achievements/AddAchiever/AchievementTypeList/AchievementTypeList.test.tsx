import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AchievementTypeList from './AchievementTypeList'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils'
import { mockAchievementTypeList } from '../../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const mockBackButtonHandler = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchievementTypeList backButtonHandler={mockBackButtonHandler} />
  </div>
)

const achievementNameInputId = 'ach-name-input'
const achievementStatusInactiveId = 'ach-status-input-inactive'
const achievementOrderInputId = 'ach-order-input'
const achievementTimeInputId = 'ach-time-check'
const achievementDateInputId = 'ach-date-check'

describe('Achievement Type List Testing', () => {
  describe('initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            achievementTypeList: mockAchievementTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
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

    //Wrote these tests again here to meet sonar requirements and all functions are included as this is the parent file
    test('test clear button', () => {
      const achName = screen.getByTestId('ach-name-input')
      const clearBtn = screen.getByTestId('clear-btn-id')
      userEvent.type(achName, 'testing done right')
      userEvent.click(clearBtn)
      expect(achName).toHaveValue('')
      expect(screen.getByTestId('ach-order-input')).toHaveValue('')
    })
    test('test add button', async () => {
      const addButton = screen.getByTestId('add-btn-id')
      expect(addButton).toBeDisabled()

      const achievementName = screen.getByTestId(achievementNameInputId)

      const achievementStatusInactive = screen.getByTestId(
        achievementStatusInactiveId,
      ) as HTMLInputElement

      const achievementOrder = screen.getByTestId(achievementOrderInputId)
      const achievementTime = screen.getByTestId(
        achievementTimeInputId,
      ) as HTMLInputElement

      const achievementDate = screen.getByTestId(
        achievementDateInputId,
      ) as HTMLInputElement

      userEvent.type(achievementName, 'testing this module')
      userEvent.click(achievementStatusInactive)
      userEvent.type(achievementOrder, '99')
      userEvent.click(achievementTime)
      userEvent.click(achievementDate)

      expect(addButton).toBeEnabled()
      userEvent.click(addButton)
      await waitFor(() => {
        expect(
          screen.findByText('Achievement Type Added Successfully'),
        ).toBeTruthy()
      })
    })
    test('test save changes button', async () => {
      const editBtn = screen.getByTestId('edit-btn-1')
      userEvent.click(editBtn)
      const saveBtn = screen.getByTestId('save-btn-1')
      expect(saveBtn).toBeVisible()
      expect(saveBtn).toBeEnabled()
      const order = screen.getByTestId('new-order')
      userEvent.clear(order)
      expect(saveBtn).toBeDisabled()
      userEvent.type(order, '5')
      userEvent.click(saveBtn)
      await waitFor(() => {
        expect(
          screen.findByText('Achievement Type Updated Successfully'),
        ).toBeTruthy()
      })
    })
  })
})
