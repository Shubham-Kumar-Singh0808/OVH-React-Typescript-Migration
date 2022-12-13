import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import AchieverListFilterOptions from './AchieverListFilterOptions'
import {
  cleanup,
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEventList } from '../../../test/data/eventListData'
import {
  mockAchievementTypeList,
  mockAchieverList,
} from '../../../test/data/AchieverListData'

const mockAchievementChangeHandler = jest.fn()
const mockSelectDateHandler = jest.fn()
const mockSetFromDate = jest.fn()
const mockSetToDate = jest.fn()
const mockSetViewButton = jest.fn()
const mockClearButtonHandler = jest.fn()
const mockFilterHandler = jest.fn()

const history = createMemoryHistory()

const customDate = 'Custom Date'
const selectMonth = 'Select Month'
const currentMonth = 'Current Month'
const defaultAchievement = 'Select Achievement Type'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <AchieverListFilterOptions
        currentSelectedOption={selectMonth}
        selectedOptionChangeHandler={mockSelectDateHandler}
        currentAchievement={defaultAchievement}
        achievementChangeHandler={mockAchievementChangeHandler}
        achieverFromDate={''}
        setAchieverFromDate={mockSetFromDate}
        achieverToDate={''}
        setAchieverToDate={mockSetToDate}
        isViewButtonEnabled={false}
        setViewButton={mockSetViewButton}
        clearButtonHandler={mockClearButtonHandler}
        filterHandler={mockFilterHandler}
      />
    </Router>
  </div>
)

const selectCustomMonthState = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <AchieverListFilterOptions
        currentSelectedOption={customDate}
        selectedOptionChangeHandler={mockSelectDateHandler}
        currentAchievement={defaultAchievement}
        achievementChangeHandler={mockAchievementChangeHandler}
        achieverFromDate={''}
        setAchieverFromDate={mockSetFromDate}
        achieverToDate={''}
        setAchieverToDate={mockSetToDate}
        isViewButtonEnabled={false}
        setViewButton={mockSetViewButton}
        clearButtonHandler={mockClearButtonHandler}
        filterHandler={mockFilterHandler}
      />
    </Router>
  </div>
)

const errorDateState = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <Router history={history}>
      <AchieverListFilterOptions
        currentSelectedOption={customDate}
        selectedOptionChangeHandler={mockSelectDateHandler}
        currentAchievement={''}
        achievementChangeHandler={mockAchievementChangeHandler}
        achieverFromDate={'02/01/2022'}
        setAchieverFromDate={mockSetFromDate}
        achieverToDate={'01/01/2022'}
        setAchieverToDate={mockSetToDate}
        isViewButtonEnabled={false}
        setViewButton={mockSetViewButton}
        clearButtonHandler={mockClearButtonHandler}
        filterHandler={mockFilterHandler}
      />
    </Router>
  </div>
)

const selectOptionID = 'select-date-type'
const achievementOptionID = 'achievement-type-select'

const viewButton = 'view-btn-id'
const clearButton = 'clear-btn-id'

describe('Render', () => {
  describe('Initial', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            achievementTypeList: mockAchievementTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    afterEach(cleanup)

    test('view button disabled and clear button enabled', () => {
      expect(screen.getByTestId(viewButton)).toBeDisabled()
      expect(screen.getByTestId(clearButton)).toBeEnabled()
    })

    test('select month render', () => {
      const dateOptionSelect = screen.findByTestId(selectOptionID)
      expect(dateOptionSelect).toBeTruthy()
    })

    it('select month should display the correct number of options and values', () => {
      expect(screen.getAllByTestId('select-month-options')).toHaveLength(3)
      expect(
        screen.getAllByTestId('select-month-options-default'),
      ).toHaveLength(1)
    })

    it('should correctly set default option for select month option', () => {
      expect(screen.getByTestId('select-month-options-default')).toHaveValue(
        'Select Month',
      )
    })

    test('Should Correctly Change values on selecting', async () => {
      const meetingStatus = screen.getByTestId(selectOptionID)
      fireEvent.select(meetingStatus, [currentMonth])
      await waitFor(() =>
        fireEvent.change(meetingStatus, {
          target: { value: currentMonth },
        }),
      )
      expect(mockSelectDateHandler).toHaveBeenCalledTimes(1)
      expect(meetingStatus).toHaveTextContent(currentMonth)
    })

    test('Achievement Type Select option is present', () => {
      const achievementType = screen.findByTestId(achievementOptionID)
      expect(achievementType).toBeTruthy()
    })

    test('selecting an option from achievement type only', async () => {
      const achievement = 'Achievement'
      const achievementOptions = screen.getByTestId(achievementOptionID)
      expect(achievementOptions).toHaveValue(defaultAchievement)
      expect(screen.getAllByTestId('achievement-option-fetched')).toHaveLength(
        10,
      )

      fireEvent.select(achievementOptions, achievement)
      await waitFor(() =>
        fireEvent.change(achievementOptions, {
          target: { value: achievement },
        }),
      )
      expect(achievementOptions).toHaveTextContent(achievement)
      expect(mockSetViewButton).toHaveBeenCalledTimes(1)
    })
  })

  describe('Selecting "Custom Date" from "Select Month" Options', () => {
    beforeEach(() => {
      render(selectCustomMonthState, {
        preloadedState: {
          commonAchievements: {
            achievementTypeList: mockAchievementTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    afterEach(cleanup)
    test('Select custom option from "Select Month" option should show date options', () => {
      const option = screen.getByTestId(selectOptionID)
      expect(option).toHaveValue('Custom Date')
      expect(screen.getAllByPlaceholderText('MM-YYYY')).toHaveLength(2)
      expect(screen.getByTestId(viewButton)).toBeDisabled()
    })
    test('Correct entering of dates and view button enabled', async () => {
      expect(screen.getByTestId(viewButton)).toBeDisabled()
      const dateOptions = screen.getAllByPlaceholderText('MM-YYYY')
      fireEvent.click(dateOptions[0])
      await waitFor(() =>
        fireEvent.change(dateOptions[0], {
          target: { value: '02-2022' },
        }),
      )
      fireEvent.click(dateOptions[1])
      await waitFor(() =>
        fireEvent.change(dateOptions[1], {
          target: { value: '12-2022' },
        }),
      )
      expect(mockSetViewButton).toHaveBeenCalledTimes(2)
    })
  })

  describe('error date for custom date option', () => {
    beforeEach(() => {
      render(errorDateState, {
        preloadedState: {
          commonAchievements: {
            achievementTypes: mockAchievementTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      })
    })
    afterEach(cleanup)
    test('Error message should be displayed', async () => {
      const dateOptions = screen.getAllByPlaceholderText('MM-YYYY')
      fireEvent.click(dateOptions[0])
      // eslint-disable-next-line sonarjs/no-identical-functions
      await waitFor(() =>
        fireEvent.change(dateOptions[0], {
          target: { value: '02-2022' },
        }),
      )
      fireEvent.click(dateOptions[1])
      await waitFor(() =>
        fireEvent.change(dateOptions[0], {
          target: { value: '01-2022' },
        }),
      )
      expect(screen.getByTestId('error-msg-date')).toBeInTheDocument()
      expect(mockSetViewButton).toHaveBeenCalledTimes(2)
    })
  })
})
