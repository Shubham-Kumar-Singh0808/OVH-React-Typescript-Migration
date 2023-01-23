import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import AddNomineeForm from './AddNomineeForm'
import { cleanup, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { emptyString, selectAchievementType } from '../AchievementConstants'
import { mockAchievementTypeList } from '../../../test/data/AchieverListData'
import { mockNominationFormDetails } from '../../../test/data/AddNomineeData'
import { mockActiveEmployeeList } from '../../../test/data/AddAchieverData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { TextDanger } from '../../../constant/ClassName'
import { mockGeneralInformationData } from '../../../test/data/generalInformationData'

const mockSelectAchievementType = jest.fn()
const mockSelectNominatedEmployeeName = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <AddNomineeForm
      achievementType={selectAchievementType}
      nominatedEmployeeName={emptyString}
      setAchievementType={mockSelectAchievementType}
      setNominatedEmployeeName={mockSelectNominatedEmployeeName}
    />
  </div>
)

const addBtnId = 'add-btn-id'
const clearBtnId = 'clear-btn-id'

const achTypeExample = 'Service Award'

describe('add nominee form', () => {
  describe('render', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            isLoading: ApiLoadingState.succeeded,
            achievementTypeList: mockAchievementTypeList,
          },
          addNominee: {
            isLoading: ApiLoadingState.succeeded,
            nominationFormDetails: mockNominationFormDetails,
          },
          addAchiever: {
            isLoading: ApiLoadingState.succeeded,
            activeEmployeeList: mockActiveEmployeeList,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
          getLoggedInEmployeeData: {
            generalInformation: mockGeneralInformationData,
          },
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1983',
              userName: 'admin',
              role: 'admin',
              tenantKey: 'abc',
              token: 'test',
              designation: 'developer',
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('Buttons are rendered', () => {
      expect(screen.getByTestId(addBtnId)).toBeDisabled()
      expect(screen.getByTestId(clearBtnId)).toBeEnabled()
    })
    test('labels are correctly rendered', () => {
      const empName = screen.getByTestId('ach-emp-name')
      const achType = screen.getByTestId('ach-type-label')
      const cycle = screen.getByTestId('cycle-label')
      const fromMonth = screen.getByTestId('fromMonth-label')
      const toMonth = screen.getByTestId('toMonth-label')

      expect(screen.getByTestId('ach-star')).toHaveClass(TextDanger)

      expect(empName).toHaveTextContent('Employee Name :*')
      expect(achType).toHaveTextContent('Achievement Type:*')
      expect(cycle).toHaveTextContent('Cycle:*')
      expect(fromMonth).toHaveTextContent('From Month:*')
      expect(toMonth).toHaveTextContent('To Month:*')
      expect(screen.getAllByTestId('question-label')).toHaveLength(4)
      expect(screen.getByTestId('ques-star-1')).toHaveClass(TextDanger)
      expect(screen.getByTestId('ques-error-1')).toHaveClass(TextDanger)
    })
    test('input being rendered', () => {
      const empName = screen.getByPlaceholderText('Employee Name')
      const achievementType = screen.getByTestId('ach-name-sel')
      const cycle = screen.getByTestId('cycle-read')
      const fromMonth = screen.getByTestId('fromMonth-read')
      const toMonth = screen.getByTestId('toMonth-read')

      userEvent.type(empName, 'Pranav Gupta')

      userEvent.selectOptions(achievementType, achTypeExample)
      expect(mockSelectAchievementType).toHaveBeenCalledTimes(1)

      expect(cycle).toHaveAttribute('readOnly')
      expect(cycle).toHaveValue(undefined)
      expect(fromMonth).toHaveAttribute('readOnly')
      expect(fromMonth).toHaveValue(undefined)
      expect(toMonth).toHaveAttribute('readOnly')
      expect(toMonth).toHaveValue(undefined)
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
      userEvent.click(screen.getByTestId(addBtnId))
    })
    test('clear button functionality', () => {
      const empName = screen.getByPlaceholderText('Employee Name')
      const achievementType = screen.getByTestId('ach-name-sel')
      userEvent.type(empName, 'Pranav Gupta')

      userEvent.selectOptions(achievementType, achTypeExample)
      userEvent.click(screen.getByTestId(clearBtnId))
      expect(mockSelectAchievementType).toHaveBeenCalledTimes(2)
      expect(mockSelectNominatedEmployeeName).toHaveBeenCalledTimes(3)
    })
  })
  describe('User Feature Validation', () => {
    beforeEach(() => {
      render(toRender, {
        preloadedState: {
          commonAchievements: {
            isLoading: ApiLoadingState.succeeded,
            achievementTypeList: mockAchievementTypeList,
          },
          addNominee: {
            isLoading: ApiLoadingState.succeeded,
            nominationFormDetails: mockNominationFormDetails,
          },
          addAchiever: {
            isLoading: ApiLoadingState.succeeded,
            activeEmployeeList: mockActiveEmployeeList,
          },
          authentication: {
            authenticatedUser: {
              employeeName: 'admin',
              employeeId: '1983',
              userName: 'admin',
              role: 'admin',
              tenantKey: 'abc',
              token: 'test',
              designation: 'developer',
            },
          },
        },
      })
    })
    afterEach(cleanup)
    screen.debug()
    test('add button is not visible', () => {
      expect(screen.getByTestId('add-inv')).toBeVisible()
    })
  })
})
