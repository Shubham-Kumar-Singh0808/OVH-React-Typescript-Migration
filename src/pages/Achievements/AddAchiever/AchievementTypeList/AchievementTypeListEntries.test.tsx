import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AchievementTypeListEntries from './AchievementTypeListEntries'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { mockAchievementTypeList } from '../../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { emptyString } from '../../AchievementConstants'
import { NewAchievementStatus } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const mockNewAchievementTypeNameHandler = jest.fn()
const mockNewAchievementStatusHandler = jest.fn()
const mockNewSelectedOrderHandler = jest.fn()
const mockNewSelectedTimeReqHandler = jest.fn()
const mockNewSelectedDateReqHandler = jest.fn()
const mockAddButtonHandler = jest.fn()
const mockAchievementClearButtonHandler = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchievementTypeListEntries
      isAddButtonEnabled={false}
      setAddButtonEnabled={jest.fn()}
      userNewSelectedAchievementType={emptyString}
      newAchievementTypeNameHandler={mockNewAchievementTypeNameHandler}
      newUserSelectedStatus={NewAchievementStatus.Active}
      newAchievementStatusHandler={mockNewAchievementStatusHandler}
      newUserSelectedOrder={emptyString}
      newSelectedOrderHandler={mockNewSelectedOrderHandler}
      newUserSelectedTimeReq={false}
      newSelectedTimeReqHandler={mockNewSelectedTimeReqHandler}
      newUserSelectedDateReq={false}
      newSelectedDateReqHandler={mockNewSelectedDateReqHandler}
      addButtonHandler={mockAddButtonHandler}
      achievementClearButtonHandler={mockAchievementClearButtonHandler}
    />
  </div>
)

const confirmToRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AchievementTypeListEntries
      isAddButtonEnabled={true}
      setAddButtonEnabled={jest.fn()}
      userNewSelectedAchievementType={'achieve2'}
      newAchievementTypeNameHandler={mockNewAchievementTypeNameHandler}
      newUserSelectedStatus={NewAchievementStatus.Active}
      newAchievementStatusHandler={mockNewAchievementStatusHandler}
      newUserSelectedOrder={'44'}
      newSelectedOrderHandler={mockNewSelectedOrderHandler}
      newUserSelectedTimeReq={false}
      newSelectedTimeReqHandler={mockNewSelectedTimeReqHandler}
      newUserSelectedDateReq={false}
      newSelectedDateReqHandler={mockNewSelectedDateReqHandler}
      addButtonHandler={mockAddButtonHandler}
      achievementClearButtonHandler={mockAchievementClearButtonHandler}
    />
  </div>
)

const addButtonId = 'add-btn-id'
const clearButtonId = 'clear-btn-id'

const achievementNameInputId = 'ach-name-input'
const achievementStatusActiveId = 'ach-status-input-active'
const achievementStatusInactiveId = 'ach-status-input-inactive'
const achievementOrderInputId = 'ach-order-input'
const achievementTimeInputId = 'ach-time-check'
const achievementDateInputId = 'ach-date-check'

describe('Achievement Type List Entries', () => {
  describe('Initial Render', () => {
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
    test('Initially buttons are rendered', () => {
      const addBtn = screen.getByTestId(addButtonId)
      expect(addBtn).toBeDisabled()
      const clearBtn = screen.getByTestId(clearButtonId)
      expect(clearBtn).toBeEnabled()
    })
    test('Input labels are rendered', () => {
      const achievementName = screen.getByTestId('ach-name')
      const achievementStatus = screen.getByTestId('ach-status')
      const achievementOrder = screen.getByTestId('ach-order')
      const achievementTimePeriod = screen.getByTestId('ach-time')
      const achievementDate = screen.getByTestId('ach-date')

      expect(achievementName).toHaveTextContent('Achievement Type Name:*')
      expect(achievementStatus).toHaveTextContent('Status:*')
      expect(achievementOrder).toHaveTextContent('Order:*')
      expect(achievementTimePeriod).toHaveTextContent('Time Period Required:*')
      expect(achievementDate).toHaveTextContent('Date Required:*')
    })
    test('Input is being taken and add button is functioning', () => {
      const addButton = screen.getByTestId(addButtonId)
      expect(addButton).toBeDisabled()

      const achievementName = screen.getByTestId(achievementNameInputId)
      const achievementStatusActive = screen.getByTestId(
        achievementStatusActiveId,
      ) as HTMLInputElement

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
      expect(mockNewAchievementTypeNameHandler).toHaveBeenCalled()

      expect(achievementOrder).toHaveValue(emptyString)
      userEvent.type(achievementOrder, '88')
      expect(mockNewSelectedOrderHandler).toHaveBeenCalled()

      expect(achievementStatusActive.checked).toEqual(true)
      expect(achievementStatusInactive.checked).toEqual(false)
      userEvent.click(achievementStatusInactive)
      expect(mockNewAchievementStatusHandler).toHaveBeenCalledTimes(1)

      expect(achievementTime.checked).toEqual(false)
      userEvent.click(achievementTime)
      expect(mockNewSelectedTimeReqHandler).toHaveBeenCalledTimes(1)

      expect(achievementDate.checked).toEqual(false)
      userEvent.click(achievementDate)

      userEvent.click(addButton)
    })
    test('clear button functionality', () => {
      const clearBtn = screen.getByTestId(clearButtonId)
      expect(clearBtn).toBeEnabled()
      userEvent.click(clearBtn)
      expect(mockAchievementClearButtonHandler).toHaveBeenCalledTimes(1)
    })
    test('"Unique order" error', () => {
      const achievementOrder = screen.getByTestId(achievementOrderInputId)
      userEvent.type(achievementOrder, '1')
    })
    test('"unique achievement" error', () => {
      const achievementName = screen.getByTestId(achievementNameInputId)
      userEvent.type(achievementName, '12Nov20221')
    })
  })

  describe('add button', () => {
    beforeEach(() => {
      render(confirmToRender, {
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
    test('add button functionality working', () => {
      expect(screen.getByTestId(addButtonId)).toBeEnabled()
      userEvent.click(screen.getByTestId(addButtonId))
      expect(mockAddButtonHandler).toHaveBeenCalledTimes(1)
      expect(mockAchievementClearButtonHandler).toHaveBeenCalledTimes(1)
    })
  })
})
