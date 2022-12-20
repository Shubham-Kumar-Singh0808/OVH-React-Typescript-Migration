import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AddAchiever from './AddAchiever'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { mockAchievementTypeList } from '../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { emptyString, selectAchievementType } from '../AchievementConstants'
import { mockActiveEmployeeList } from '../../../test/data/AddAchieverData'

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddAchiever />
  </div>
)

const addButtonId = 'add-ach-btn'

const achievementTypeId = 'ach-name-sel'
const addAchieverButton = 'add-achiever-btn'
const achievementType = 'Test Achievement 2'

describe('Add Achiever Render', () => {
  describe('Initial render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            achievementTypeList: mockAchievementTypeList,
            isLoading: ApiLoadingState.succeeded,
          },
          addAchiever: {
            isLoading: ApiLoadingState.succeeded,
            activeEmployeeList: mockActiveEmployeeList,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()

    test('labels are rendered', () => {
      const name = screen.getByTestId('ach-name-label')
      expect(name).toHaveTextContent('Achievement Type')
    })
    test('details entered successfully', () => {
      const achOptions = screen.getAllByTestId('ach-name-opt')
      expect(achOptions).toHaveLength(11)
    })
    test('add new achievement type button is rendered', () => {
      const addBtn = screen.getByTestId(addButtonId)
      expect(addBtn).toBeEnabled()
      userEvent.click(addBtn)
      const backButton = screen.getByTestId('back-btn')
      userEvent.click(backButton)
    })
    test('new achiever input possible', async () => {
      const achievementName = screen.getByTestId(achievementTypeId)
      userEvent.selectOptions(achievementName, achievementType)
      expect(achievementName).toHaveValue(achievementType)

      const empName = screen.getByPlaceholderText('Employee Name')
      userEvent.type(empName, 'Pradeep Namburu')

      const timePeriod = screen.getByTestId('timep-inp')
      userEvent.type(timePeriod, '4')
      expect(timePeriod).toHaveValue('4')

      const dates = screen.getAllByPlaceholderText('MM-YYYY')
      fireEvent.click(dates[0])
      await waitFor(() =>
        fireEvent.change(dates[0], { target: { value: '02-2022' } }),
      )
      fireEvent.click(dates[1])
      // await waitFor(() =>
      //   fireEvent.change(dates[1], { target: { value: '12-2022' } }),
      // )

      userEvent.click(screen.getByTestId(addAchieverButton))
      await waitFor(() => {
        expect(screen.findByText('Achievement Added Successfully')).toBeTruthy()
      })
    })
    test('date error message displayed', async () => {
      const achievementName = screen.getByTestId(achievementTypeId)
      userEvent.selectOptions(achievementName, achievementType)
      expect(achievementName).toHaveValue(achievementType)

      const dates = screen.getAllByPlaceholderText('MM-YYYY')
      fireEvent.click(dates[0])
      await waitFor(() =>
        fireEvent.change(dates[0], { target: { value: '02-2022' } }),
      )
      fireEvent.click(dates[1])
      await waitFor(() =>
        fireEvent.change(dates[1], { target: { value: '01-2022' } }),
      )

      expect(
        screen.findByText('To month should be greater than From month'),
      ).toBeTruthy()
    })
    test('clear button is functioning', () => {
      userEvent.click(screen.getByTestId('clear-btn'))
      expect(screen.getByTestId(achievementTypeId)).toHaveValue(
        selectAchievementType,
      )
      expect(screen.getByPlaceholderText('Employee Name')).toHaveValue(
        emptyString,
      )
      expect(screen.getByTestId('add-achiever-btn')).toBeDisabled()
    })
  })
})
