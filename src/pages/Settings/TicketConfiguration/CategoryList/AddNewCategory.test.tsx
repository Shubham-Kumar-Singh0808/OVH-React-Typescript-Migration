import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AddNewCategory from './AddNewCategory'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockCategoryList,
  mockDepartments,
} from '../../../../test/data/ticketConfigurationData'
import { mockUserAccessToFeaturesData } from '../../../../test/data/userAccessToFeaturesData'

const selectDepartmentName = 'tc-dept-name'
const categoryNameInput = 'category-name-input'
const mealTypeInput = 'tc-ch-mealType'
const addButtonElement = 'tc-add-button'
const clearButtonElement = 'tc-clear-button'

describe('Add Sub-Category Component Testing', () => {
  describe('render all inputs without crashing', () => {
    beforeEach(() => {
      render(<AddNewCategory />, {
        preloadedState: {
          ticketConfiguration: {
            isLoading: ApiLoadingState.succeeded,
            category: mockCategoryList,
            departments: mockDepartments,
            isLoadingFilterOptions: ApiLoadingState.succeeded,
          },
          userAccessToFeatures: {
            userAccessToFeatures: mockUserAccessToFeaturesData,
          },
        },
      })
    })
    afterEach(cleanup)
    test('should render Department Select', () => {
      expect(screen.getByTestId(selectDepartmentName)).toBeTruthy()
    })
    test('should render category Name input Element', () => {
      expect(screen.getByTestId(categoryNameInput)).toBeTruthy()
    })
    test('should render mealType input', () => {
      expect(screen.getByTestId(mealTypeInput)).toBeTruthy()
    })
    test('should render Add button', () => {
      expect(screen.getByTestId(addButtonElement)).toBeTruthy()
    })
    test('should render Clear button', () => {
      expect(screen.getByTestId(clearButtonElement)).toBeTruthy()
    })
    it('should render Add button as enabled and Clear Button as disabled initially', () => {
      expect(screen.getByTestId(addButtonElement)).toBeDisabled()
      expect(screen.getByTestId(clearButtonElement)).toBeEnabled()
    })

    test('should enable add button, when all mandatory fields are entered', async () => {
      const deptNameElement = screen.getByTestId(selectDepartmentName)
      userEvent.selectOptions(deptNameElement, ['Accounts'])
      expect(deptNameElement).toHaveValue('4')

      const categoryName = screen.getByTestId(categoryNameInput)
      userEvent.type(categoryName, 'Test')
      expect(categoryName).toHaveValue('Test')

      const mealTypeEle = screen.getByTestId(mealTypeInput)
      userEvent.click(mealTypeEle)
      expect(mealTypeEle).toBeChecked()

      const addSubCategoryButton = screen.getByTestId(addButtonElement)
      expect(addSubCategoryButton).toBeEnabled()
      await waitFor(() => {
        userEvent.click(addSubCategoryButton)
        userEvent.selectOptions(deptNameElement, ['Select Department'])
        expect(categoryName).toHaveValue('')
        expect(mealTypeEle).not.toBeChecked()
        expect(addSubCategoryButton).toBeDisabled()
      })
    })
    test('should clear all the input fields upon clicking clear button', async () => {
      const deptNameEle = screen.getByTestId(selectDepartmentName)
      userEvent.selectOptions(deptNameEle, ['Administrative'])
      expect(deptNameEle).toHaveValue('2')

      const categoryElement = screen.getByTestId(categoryNameInput)
      userEvent.type(categoryElement, 'testing')
      expect(categoryElement).toHaveValue('testing')

      const mealTypeElem = screen.getByTestId(mealTypeInput)
      userEvent.click(mealTypeElem)
      expect(mealTypeElem).toBeChecked()

      const clearButtonEle = screen.getByTestId(clearButtonElement)
      userEvent.click(clearButtonEle)
      userEvent.clear(categoryElement)

      await waitFor(() => {
        userEvent.selectOptions(deptNameEle, ['Select Department'])
        expect(categoryElement).toHaveValue('')
        expect(mealTypeElem).not.toBeChecked()
      })
    })

    test('should render error message when duplicate category name is entered', async () => {
      const deptNameEl = screen.getByTestId(selectDepartmentName)
      userEvent.selectOptions(deptNameEl, ['Administrative'])
      expect(deptNameEl).toHaveValue('2')

      const categoryElement = screen.getByTestId(categoryNameInput)
      userEvent.type(categoryElement, 'testing')
      expect(categoryElement).toHaveValue('testing')
      const addSubCategoryBtn = screen.getByTestId(addButtonElement)
      await waitFor(() => {
        expect(
          screen.getByText('Category Name Already Exist'),
        ).toBeInTheDocument()
        expect(addSubCategoryBtn).toBeDisabled()
      })
    })
  })
})
