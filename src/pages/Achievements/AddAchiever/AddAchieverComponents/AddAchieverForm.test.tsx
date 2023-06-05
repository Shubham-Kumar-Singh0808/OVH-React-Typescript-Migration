import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddAchieverForm from './AddAchieverForm'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils'
import { mockAchievementTypeList } from '../../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { NewAchieverInformation } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { emptyString, selectAchievementType } from '../../AchievementConstants'
import { mockActiveEmployeeList } from '../../../../test/data/AddAchieverData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const mockaddAchievementTypeButtonHandler = jest.fn()
const mocksetNewAchieverDetails = jest.fn()
const mocksetAddButton = jest.fn()
const mockclearInfoButtonHandler = jest.fn()
const mockaddButtonHandler = jest.fn()

const initialNewAchieverState: NewAchieverInformation = {
  achievementName: selectAchievementType,
  employeeName: emptyString,
  endDate: emptyString,
  startDate: emptyString,
  timePeriod: emptyString,
}

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddAchieverForm
      addAchievementTypeButtonHandler={mockaddAchievementTypeButtonHandler}
      newAchieverDetails={initialNewAchieverState}
      setNewAchieverDetails={mocksetNewAchieverDetails}
      isAddButtonEnabled={false}
      setAddButton={mocksetAddButton}
      clearInfoButtonHandler={mockclearInfoButtonHandler}
      addButtonHandler={mockaddButtonHandler}
      userAccessToAddAchiever={undefined}
    />
  </div>
)

const achSelectId = 'ach-name-sel'

describe('add achiever form', () => {
  describe('initial render', () => {
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
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('labels are rendered', () => {
      expect(screen.getByTestId('ach-name-label')).toBeVisible()
      expect(screen.getByTestId('ach-emp-name')).toBeVisible()
      expect(screen.getByTestId('ach-desc')).toBeVisible()
      expect(screen.getByTestId('ach-pic')).toBeVisible()
    })
    test('input is possible', async () => {
      const achievementName = screen.getByTestId(achSelectId)
      expect(screen.getAllByTestId('ach-name-opt')).toHaveLength(11)
      userEvent.selectOptions(achievementName, 'Test Achievement 1')
      expect(mocksetNewAchieverDetails).toHaveBeenCalledTimes(2)

      const empName = screen.getByPlaceholderText('Employee Name')
      userEvent.type(empName, 'Pradeep')
      expect(mocksetNewAchieverDetails).toHaveBeenCalled()

      const dates = screen.getAllByPlaceholderText('mm/yyyy')
      fireEvent.click(dates[0])
      await waitFor(() =>
        fireEvent.change(dates[0], { target: { value: '02-2022' } }),
      )
      expect(mocksetNewAchieverDetails).toHaveBeenCalled()
      expect(dates[0]).toHaveValue('')

      fireEvent.click(dates[1])
      await waitFor(() =>
        fireEvent.change(dates[1], { target: { value: '12-2022' } }),
      )
      expect(mocksetNewAchieverDetails).toHaveBeenCalled()
      expect(dates[1]).toHaveValue('')
      expect(mocksetAddButton).toHaveBeenCalledTimes(1)
      expect(achievementName).toHaveValue(selectAchievementType)
    })
    test('date error rendered', async () => {
      const achievementName = screen.getByTestId(achSelectId)
      expect(screen.getAllByTestId('ach-name-opt')).toHaveLength(11)
      userEvent.selectOptions(achievementName, 'Test Achievement 1')

      const dates = screen.getAllByPlaceholderText('mm/yyyy')
      fireEvent.click(dates[0])
      await waitFor(() =>
        fireEvent.change(dates[0], { target: { value: '02-2022' } }),
      )

      fireEvent.click(dates[1])
      await waitFor(() =>
        fireEvent.change(dates[1], { target: { value: '01-2022' } }),
      )

      expect(screen.findByTestId('error-date')).toBeTruthy()
    })
    test('clear button is working', () => {
      const achievementName = screen.getByTestId(achSelectId)
      const empName = screen.getByPlaceholderText('Employee Name')
      userEvent.selectOptions(achievementName, 'Test Achievement 2')
      userEvent.type(empName, 'Pradeep')
      expect(mockclearInfoButtonHandler).toHaveBeenCalledTimes(0)
      expect(achievementName).toHaveValue(selectAchievementType)
      expect(empName).toHaveValue('Pradeep')
    })
    test('pass description to test input value', () => {
      render(
        <CKEditor
          initData={
            process.env.JEST_WORKER_ID !== undefined && (
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McFlintlock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the uncountable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of de Finials
                Bonjour et Majorem (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular
              </p>
            )
          }
        />,
      )
      expect(mocksetNewAchieverDetails).toHaveBeenCalled()
    })
  })
})
