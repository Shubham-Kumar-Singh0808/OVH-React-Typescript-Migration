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

describe('Add Achiever Render', () => {
  describe('Initial render', () => {
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
    screen.debug()

    test('labels are rendered', () => {
      const name = screen.getByTestId('ach-name-label')
      expect(name).toHaveTextContent('Achievement Type')
    })
    test('details entered successfully', () => {
      const achOptions = screen.getAllByTestId('ach-name-opt')
      expect(achOptions).toHaveLength(11)
    })
    test('add button is rendered', () => {
      const addBtn = screen.getByTestId(addButtonId)
      expect(addBtn).toBeEnabled()
      userEvent.click(addBtn)
    })
    test('new achiever input possible', async () => {
      const achievementName = screen.getByTestId(achievementTypeId)
      userEvent.selectOptions(achievementName, 'Test Achievement 2')
      expect(achievementName).toHaveValue('Test Achievement 2')

      const empName = screen.getByPlaceholderText('Employee Name')
      userEvent.type(empName, 'Pradeep')

      const timePeriod = screen.getByTestId('timep-inp')
      userEvent.type(timePeriod, '4')
      expect(timePeriod).toHaveValue('4')

      const dates = screen.getAllByPlaceholderText('MM-YYYY')
      fireEvent.click(dates[0])
      await waitFor(() =>
        fireEvent.change(dates[0], { target: { value: '02-2022' } }),
      )
      fireEvent.click(dates[1])
      await waitFor(() =>
        fireEvent.change(dates[1], { target: { value: '07-2022' } }),
      )
    })
  })
})
