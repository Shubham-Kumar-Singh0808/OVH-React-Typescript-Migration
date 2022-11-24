import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EditSubCategory from './EditSubCategory'
import { fireEvent, render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockTicketConfigurationSubCategoryList,
  mockDepartments,
  mockTicketConfigurationCategory,
  mockAddSubCategory,
} from '../../../../test/data/ticketConfigurationData'

const departmentName = 'esc-departmentName'
const categoryName = 'esc-categoryName'
const subCategoryInput = 'esc-subCategoryName'
const estimatedTimeHoursInput = 'esc-estimatedTimeHrs'
const estimatedTimeMinsInput = 'esc-estimatedTimeMts'
const workFlowInput = 'chk-workFlow'
const levelOfHierarchyInput = 'esc-levelOfHierarchy'
const updateButton = 'update-subCategory-btn'
const backButton = 'toggle-back-button'

describe('Edit Sub-Category Component Testing', () => {
  describe('render all inputs without crashing', () => {
    beforeEach(() => {
      render(
        <EditSubCategory
          editSubCategory={{
            subCategoryId: 29,
            subCategoryName: 'Charger',
            estimatedTime: '5.00',
            workFlow: true,
            categoryId: 5,
            categoryName: 'Hardware',
            departmentName: 'Networking',
            departmentId: 1,
            levelOfHierarchy: '2',
          }}
        />,
        {
          preloadedState: {
            ticketConfiguration: {
              addSubCategoryDetails: mockAddSubCategory,
              isLoading: ApiLoadingState.succeeded,
              subCategoryList: mockTicketConfigurationSubCategoryList.list,
              departments: mockDepartments,
              categories: mockTicketConfigurationCategory,
              isLoadingFilterOptions: ApiLoadingState.succeeded,
            },
          },
        },
      )
    })
    test('should render "Edit Sub-Category" title', () => {
      const editClientTitle = screen.getByRole('heading', {
        name: 'Edit Sub-Category',
      })
      expect(editClientTitle).toBeTruthy()
    })
    test('should render Department Name', () => {
      expect(screen.getByTestId(departmentName)).toBeTruthy()
    })
    test('should render category name', () => {
      expect(screen.getByTestId(categoryName)).toBeTruthy()
    })
    test('should render sub-category name input', () => {
      expect(screen.getByTestId(subCategoryInput)).toBeTruthy()
    })
    test('should render estimated time Hours', () => {
      expect(screen.getByTestId(estimatedTimeHoursInput)).toBeTruthy()
    })
    test('should render estimated time Minutes', () => {
      expect(screen.getByTestId(estimatedTimeMinsInput)).toBeTruthy()
    })
    test('should render workFlow checkbox input', () => {
      expect(screen.getByTestId(workFlowInput)).toBeTruthy()
    })
    test('should render Update Sub-Category button', () => {
      expect(screen.getByTestId(updateButton)).toBeTruthy()
    })
    test('should render Back button', () => {
      expect(screen.getByTestId(backButton)).toBeTruthy()
    })
    test('should render level of hierarchy upon checking workFlow checkbox', async () => {
      const checkboxElement = screen.getByTestId(workFlowInput)
      const levelOfHierarchyElement = screen.getByTestId(levelOfHierarchyInput)
      fireEvent.change(screen.getByTestId('chk-workFlow'), {
        target: { checked: true },
      })
      expect(checkboxElement).toBeChecked()
      await waitFor(() => {
        expect(levelOfHierarchyElement).toBeInTheDocument()
      })
    })
    test('should disable update button if subCategoryName field data is not provided', () => {
      const subCategoryNameEl = screen.getByTestId(subCategoryInput)
      const updateBtnElement = screen.getByTestId(updateButton)
      userEvent.clear(subCategoryNameEl)

      expect(updateBtnElement).toBeDisabled()
    })
    test('should show level of Hierarchy input value if workflow is true', () => {
      const levelOfHierarchyEle = screen.getByTestId(levelOfHierarchyInput)
      expect(levelOfHierarchyEle).toHaveValue('2')
    })
    test('should render selected sub-category values in the fields', () => {
      const subCategoryElem = screen.getByTestId(subCategoryInput)
      const estimatedTimeHoursElem = screen.getByTestId(estimatedTimeHoursInput)
      const estimatedTimeMinutesElem = screen.getByTestId(
        estimatedTimeMinsInput,
      )
      fireEvent.change(screen.getByTestId(workFlowInput), {
        target: { checked: true },
      })
      const levelOfHierarchyElem = screen.getByTestId(levelOfHierarchyInput)
      const updateBtnElem = screen.getByTestId(updateButton)

      expect(screen.getByText('Networking')).toBeInTheDocument()
      expect(screen.getByText('Hardware')).toBeInTheDocument()
      expect(subCategoryElem).toHaveValue('Charger')
      expect(estimatedTimeHoursElem).toHaveValue('5')
      expect(estimatedTimeMinutesElem).toHaveValue('00')
      expect(levelOfHierarchyElem).toHaveValue('2')
      expect(updateBtnElem).toBeEnabled()
      userEvent.click(updateBtnElem)
    })
    test('should set level of hierarchy value to 1 upon checking WorkFlow for the second time check', async () => {
      const checkboxEl = screen.getByTestId(workFlowInput)
      const levelOfHierarchyEl = screen.getByTestId(levelOfHierarchyInput)
      expect(levelOfHierarchyEl).toHaveValue('2')
      fireEvent.change(checkboxEl, {
        target: { checked: false },
      })
      userEvent.clear(levelOfHierarchyEl)
      fireEvent.change(checkboxEl, {
        target: { checked: true },
      })
      userEvent.type(levelOfHierarchyEl, '1')
      await waitFor(() => {
        expect(levelOfHierarchyEl).toHaveValue('1')
      })
    })
    test('should redirect to SubCategoryList upon clicking back button', () => {
      const backButtonElement = screen.getByTestId(backButton)
      userEvent.click(backButtonElement)
      expect(location.pathname).toBe('/')
    })
  })
})
