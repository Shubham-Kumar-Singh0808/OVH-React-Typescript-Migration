import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import AddEmployeeDesignation from './AddEmployeeDesignation'
import { cleanup, render, screen, waitFor } from '../../../../../test/testUtils'
import { mockUserAccessToFeaturesData } from '../../../../../test/data/userAccessToFeaturesData'
import {
  mockAllDepartments,
  mockAllDesignation,
} from '../../../../../test/data/addEmployeeDesignationData'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'

const selectDepartment = 'form-select-dept'
const addButtonElement = 'add-button'
const designationTextInput = 'desg-input'
describe('Add New Designation Testing', () => {
  describe('should render Add New Designation component without crashing', () => {
    beforeEach(() => {
      render(
        <AddEmployeeDesignation
          selectedDepartmentId={1}
          setSelectedDepartmentId={jest.fn()}
        />,
        {
          preloadedState: {
            employeeDesignationList: {
              isLoading: ApiLoadingState.succeeded,
              employeeDepartments: mockAllDepartments,
              employeeDesignations: mockAllDesignation,
            },
            userAccessToFeatures: {
              userAccessToFeatures: mockUserAccessToFeaturesData,
            },
          },
        },
      )
    })
    afterEach(cleanup)
    test('should render Departments filter', () => {
      const departments = screen.getByTestId(selectDepartment)
      expect(departments).toBeTruthy()
    })
    test('should enable add button after selecting form option', async () => {
      const departmentNameElement = screen.getByTestId(selectDepartment)
      userEvent.selectOptions(departmentNameElement, ['Networking'])
      expect(departmentNameElement).toHaveValue('1')

      const designationInputEl = screen.getByTestId(designationTextInput)
      userEvent.type(designationInputEl, 'testing')
      expect(designationInputEl).toHaveValue('testing')

      const addDesgButton = screen.getByTestId(addButtonElement)
      await waitFor(() => {
        expect(addDesgButton).toBeEnabled()
      })
    })
    test('should disable add button if input field is empty', async () => {
      const departmentSelect = screen.getByTestId(selectDepartment)
      userEvent.selectOptions(departmentSelect, ['Networking'])
      expect(departmentSelect).toHaveValue('1')

      const designationInput = screen.getByTestId(designationTextInput)
      userEvent.type(designationInput, '')
      expect(designationInput).toHaveValue('')

      const addDesgButton = screen.getByTestId(addButtonElement)
      await waitFor(() => {
        expect(addDesgButton).toBeDisabled()
      })
    })
    test('should clear input and disable button after submitting and new designation should be added', async () => {
      const departmentElement = screen.getByTestId(selectDepartment)
      userEvent.selectOptions(departmentElement, ['Networking'])
      expect(departmentElement).toHaveValue('1')

      const designationInput = screen.getByTestId(designationTextInput)
      userEvent.type(designationInput, 'testing')
      expect(designationInput).toHaveValue('testing')

      const addDesgButton = screen.getByTestId(addButtonElement)
      userEvent.click(addDesgButton)
      userEvent.clear(designationInput)
      await waitFor(() => {
        expect(designationInput).toHaveValue('')
        expect(addDesgButton).toBeDisabled()
      })
    })
  })
})
