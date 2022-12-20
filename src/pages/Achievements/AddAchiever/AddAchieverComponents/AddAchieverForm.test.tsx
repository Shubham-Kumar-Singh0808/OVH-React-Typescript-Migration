import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddAchieverForm from './AddAchieverForm'
import { cleanup, render, screen } from '../../../../test/testUtils'
import { mockAchievementTypeList } from '../../../../test/data/AchieverListData'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { NewAchieverInformation } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { emptyString, selectAchievementType } from '../../AchievementConstants'
import { mockActiveEmployeeList } from '../../../../test/data/AddAchieverData'

const mockaddAchievementTypeButtonHandler = jest.fn()
const mocksetNewAchieverDetails = jest.fn()
const mocksetAddButton = jest.fn()
const mockclearInfoButtonHandler = jest.fn()
const mockaddButtonHandler = jest.fn()

const initialNewAchieverState: NewAchieverInformation = {
  achievementName: selectAchievementType,
  croppedImageData: emptyString,
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
    />
  </div>
)

const toRender1 = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddAchieverForm
      addAchievementTypeButtonHandler={mockaddAchievementTypeButtonHandler}
      newAchieverDetails={{
        ...initialNewAchieverState,
        achievementName: 'Test Achievement 2',
        employeeName: 'Pradeep Namburu',
      }}
      setNewAchieverDetails={mocksetNewAchieverDetails}
      isAddButtonEnabled={false}
      setAddButton={mocksetAddButton}
      clearInfoButtonHandler={mockclearInfoButtonHandler}
      addButtonHandler={mockaddButtonHandler}
    />
  </div>
)

const addButtonId = 'add-achiever-btn'
const clearButtonId = 'clear-btn'

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
        },
      })
    })
    afterEach(cleanup)
    test('buttons are rendered', () => {
      expect(screen.getByTestId(addButtonId)).toBeDisabled()
      expect(screen.getByTestId(clearButtonId)).toBeEnabled()
    })
    test('labels are rendered', () => {
      expect(screen.getByTestId('ach-name-label')).toBeVisible()
      expect(screen.getByTestId('ach-emp-name')).toBeVisible()
      expect(screen.getByTestId('ach-desc')).toBeVisible()
      expect(screen.getByTestId('ach-pic')).toBeVisible()
    })
    test('input is possible', () => {
      const achievementName = screen.getByTestId('ach-name-sel')
      expect(screen.getAllByTestId('ach-name-opt')).toHaveLength(11)
      userEvent.selectOptions(achievementName, 'Test Achievement')
      expect(mocksetNewAchieverDetails).toHaveBeenCalledTimes(2)

      const empName = screen.getByPlaceholderText('Employee Name')
      userEvent.type(empName, 'Pradeep')
      expect(mocksetNewAchieverDetails).toHaveBeenCalled()
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
    })
  })
})
