import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import AddNewSubCategory from './AddNewSubCategory'
import { render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockTicketConfigurationSubCategoryList,
  mockDepartments,
  mockTicketConfigurationCategory,
  mockAddSubCategory,
} from '../../../../test/data/ticketConfigurationData'

const selectDepartment = 'department-name'
const selectCategory = 'category-name'
const subCategoryInput = 'sub-category-input'
const estimatedTimeHoursInput = 'tc-estimatedTimeHours'
const estimatedTimeMinsInput = 'tc-estimatedTimeMins'
const workFlowInput = 'ch-workFlow'
const levelOfHierarchyInput = 'tc-levelOfHierarchy'
const saveButton = 'save-subCategory-btn'
const clearButton = 'clear-subCategory-btn'
const backButton = 'toggle-back-btn'

describe('Add Sub-Category Component Testing', () => {
  describe('render all inputs without crashing', () => {
    beforeEach(() => {
      render(<AddNewSubCategory />)
    })
    test('should render "Add Sub-Category" title', () => {
      const addClientTitle = screen.getByRole('heading', {
        name: 'Add Sub-Category',
      })
      expect(addClientTitle).toBeTruthy()
    })
    test('should render Department name Input', () => {
      expect(screen.getByTestId(selectDepartment)).toBeTruthy()
    })
    test('should render category name input', () => {
      expect(screen.getByTestId(selectCategory)).toBeTruthy()
    })
    test('should render sub-category name input', () => {
      expect(screen.getByTestId(subCategoryInput)).toBeTruthy()
    })
    test('should render estimated time Hours input', () => {
      expect(screen.getByTestId(estimatedTimeHoursInput)).toBeTruthy()
    })
    test('should render estimated time Minutes input', () => {
      expect(screen.getByTestId(estimatedTimeMinsInput)).toBeTruthy()
    })
    test('should render workFlow checkbox input', () => {
      expect(screen.getByTestId(workFlowInput)).toBeTruthy()
    })
    test('should render Save Sub-Category button', () => {
      expect(screen.getByTestId(saveButton)).toBeTruthy()
    })
    test('should render Add Category button', () => {
      expect(screen.getByTestId('addCategory-btn')).toBeTruthy()
    })
    test('should render Back button', () => {
      expect(screen.getByTestId('toggle-back-btn')).toBeTruthy()
    })
    test('should render Clear button', () => {
      expect(screen.getByTestId(clearButton)).toBeTruthy()
    })
  })

  describe('Add Client form testing without crashing', () => {
    beforeEach(() => {
      render(<AddNewSubCategory />, {
        preloadedState: {
          ticketConfiguration: {
            addSubCategoryDetails: mockAddSubCategory,
            isLoading: ApiLoadingState.succeeded,
            subCategoryList: mockTicketConfigurationSubCategoryList,
            departments: mockDepartments,
            categories: mockTicketConfigurationCategory,
            isLoadingFilterOptions: ApiLoadingState.succeeded,
          },
        },
      })
    })
    it('should render Add button as enabled and Clear Button as disabled initially', () => {
      expect(screen.getByTestId(saveButton)).toBeDisabled()
      expect(screen.getByRole('button', { name: 'Clear' })).toBeEnabled()
    })

    test('should enable add button , when all mandatory fields are entered', async () => {
      const deptNameElement = screen.getByTestId(selectDepartment)
      userEvent.selectOptions(deptNameElement, ['Administrative'])
      expect(deptNameElement).toHaveValue('2')

      const categoryNameElement = screen.getByTestId(selectCategory)
      userEvent.selectOptions(categoryNameElement, ['Stationary'])
      expect(categoryNameElement).toHaveValue('4')

      const subCategoryName = screen.getByTestId(subCategoryInput)
      userEvent.type(subCategoryName, 'Name Boards')
      expect(subCategoryName).toHaveValue('Name Boards')

      const addSubCategoryButton = screen.getByTestId(saveButton)
      await waitFor(() => {
        expect(addSubCategoryButton).toBeEnabled()
        userEvent.click(addSubCategoryButton)
      })
    })

    test('should clear all the input fields upon clicking clear button', async () => {
      const deptNameEle = screen.getByTestId(selectDepartment)
      userEvent.selectOptions(deptNameEle, ['Administrative'])
      expect(deptNameEle).toHaveValue('2')

      const categoryNameEle = screen.getByTestId(selectCategory)
      userEvent.selectOptions(categoryNameEle, ['Stationary'])
      expect(categoryNameEle).toHaveValue('4')

      const subCategoryElement = screen.getByTestId(subCategoryInput)
      userEvent.type(subCategoryElement, 'pins')
      expect(subCategoryElement).toHaveValue('pins')

      const checkboxWorkFlow = screen.getByTestId(workFlowInput)
      userEvent.click(checkboxWorkFlow)
      expect(checkboxWorkFlow).toBeChecked()

      const clearButtonElement = screen.getByTestId(saveButton)
      userEvent.click(clearButtonElement)
      userEvent.clear(subCategoryElement)
      userEvent.click(checkboxWorkFlow)
      await waitFor(() => {
        userEvent.selectOptions(deptNameEle, ['Select Department'])
        userEvent.selectOptions(categoryNameEle, ['Select Category'])
        expect(subCategoryElement).toHaveValue('')
        expect(checkboxWorkFlow).not.toBeChecked()
      })
    })
    test('should enable level of hierarchy field upon clicking workflow checkbox ', () => {
      const checkbox = screen.getByTestId(workFlowInput)
      userEvent.click(checkbox)
      const levelOfHierarchyElement = screen.getByTestId(levelOfHierarchyInput)
      expect(levelOfHierarchyElement).toBeInTheDocument()
    })
    test('should redirect to /subCategoryList when user clicks on Back Button', () => {
      const backButtonElement = screen.getByTestId(backButton)
      userEvent.click(backButtonElement)
      expect(location.pathname).toBe('/')
    })
  })
})
