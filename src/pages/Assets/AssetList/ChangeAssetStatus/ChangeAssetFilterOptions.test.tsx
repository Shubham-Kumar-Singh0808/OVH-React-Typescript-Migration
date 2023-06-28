import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import ChangeAssetFilterOptions from './ChangeAssetFilterOptions'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../../test/testUtils'
import { mockActiveEmployeeList } from '../../../../test/data/AddAchieverData'
import { SaveEmployee } from '../../../../types/Assets/AssetList/ChangeStatusTypes/ChangeStatusTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  mockAllAssetListData,
  mockChangeAssetData,
} from '../../../../test/data/AssetListData'

const mockOnSelect = jest.fn()
const mockSetEmpName = jest.fn()
const selectedEmpName = 'Pradeep Namburu'
const selectStatusType = 'Not Working'
const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

describe('Should filter the Employee name in Change Asset Screen', () => {
  describe('empty values', () => {
    beforeEach(() => {
      render(
        <ChangeAssetFilterOptions
          allEmployees={[]}
          onSelectEmployee={mockOnSelect}
          employeeName={undefined}
          setEmployeeName={mockSetEmpName}
          setEmpToggle={mockSetEmpName}
          setChangeReportStatus={jest.fn()}
          changeReportStatus={mockChangeAssetData}
        />,
        {
          preloadedState: {
            saveEmployee: {} as SaveEmployee,
            getAllAssetResponse: mockAllAssetListData,
            isLoading: ApiLoadingState.succeeded,
            toggleValue: '',
          },
        },
      )
    })
    afterEach(cleanup)
    test('render label', () => {
      const empLabel = screen.getByTestId('ach-emp-name')
      expect(empLabel).toBeInTheDocument()
      expect(empLabel).toHaveTextContent('Employee:')
    })
    test('render the input field', () => {
      const input = screen.getByPlaceholderText('Employee')
      expect(input).toHaveValue('')
    })

    test('should call onChange', () => {
      const input = screen.getByPlaceholderText('Employee')
      fireEvent.change(input, selectedEmpName)
      expect(input).toHaveValue('')
    })

    test('should call onChange of Asset Status', () => {
      const input = screen.getByTestId('asset-status')
      fireEvent.change(input, selectStatusType)
      expect(input).toHaveValue('Under Repair')
    })

    test('should be able to click clear button element', () => {
      const ClearButton = screen.getByTestId('clear-btn')
      expect(ClearButton).toBeEnabled()
      userEvent.click(ClearButton)
    })
    test('should be able to select date"', () => {
      const dateInput = screen.getAllByPlaceholderText('dd/mm/yyyy')
      userEvent.type(
        dateInput[0],
        new Date('12/20/2021').toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      )
    })
    test('Checkbox changes value', async () => {
      fireEvent.click(screen.getByTestId('expenseVendor'))
      const updateAllLocations = screen.getByTestId('expenseVendor')
      expect(updateAllLocations).toBeTruthy()
      await waitFor(() => {
        expect(updateAllLocations).toBeChecked()
      })
    })
    test('should render Add button as disabled  initially', () => {
      expect(screen.getByTestId('save-btn')).toBeDisabled()
      expect(screen.getByTestId('clear-btn')).toBeEnabled()
    })
    test('should enabled add button when input is not empty', () => {
      expect(screen.getByTestId('clear-btn')).not.toBeDisabled()
      expect(screen.getByTestId('save-btn')).toBeDisabled()
    })
  })

  describe('should reset', () => {
    beforeEach(() => {
      render(
        <ChangeAssetFilterOptions
          allEmployees={mockActiveEmployeeList}
          onSelectEmployee={mockOnSelect}
          employeeName={'P'}
          setEmployeeName={mockSetEmpName}
          setEmpToggle={mockSetEmpName}
          changeReportStatus={{
            id: 0,
            poNumber: '',
            vendorId: 0,
            productSpecificationId: 0,
            manufacturerId: 0,
            productId: 0,
            pSpecification: '',
            productName: '',
            manufacturerName: '',
            assetNumber: '',
            otherAssetNumber: '',
            invoiceNumber: '',
            purchasedDate: '',
            receivedDate: '',
            notes: null,
            employeeName: '',
            employeeId: 0,
            description: '',
            status: '',
            assetTypeId: 0,
            assetType: '',
            productSpecification: null,
            otherNumber: null,
            warrantyStartDate: null,
            warrantyEndDate: null,
            searchByEmpName: null,
            departmentId: null,
            departmentName: null,
            location: '',
            vendorName: '',
            createdBy: '',
            updatedBy: '',
            createdDate: '',
            updatedDate: '',
            referenceNumber: '',
            amount: 0,
            countryId: null,
          }}
          setChangeReportStatus={jest.fn()}
        />,
        {
          preloadedState: {
            saveEmployee: {} as SaveEmployee,
            getAllAssetResponse: mockAllAssetListData,
            isLoading: ApiLoadingState.succeeded,
            toggleValue: '',
          },
        },
      )
    })
    afterEach(cleanup)

    test('should function autocomplete', () => {
      const autocomplete = screen.getByPlaceholderText('Employee')
      autocomplete.click()
      autocomplete.focus()
      fireEvent.change(autocomplete, { target: { value: 'r' } })
    })
    test('pass comments to test input value', () => {
      render(
        <CKEditor
          initData={process.env.JEST_WORKER_ID !== undefined && <p>Test</p>}
        />,
      )
    })
    test('should be able to click add button element', () => {
      const addBtn = screen.getByRole('button', { name: 'Add Vendor' })
      userEvent.click(addBtn)
      expect(addBtn).toBeInTheDocument()
    })
    test('should be able to click save button element', () => {
      const saveBtn = screen.getByRole('button', { name: 'Save' })
      userEvent.click(saveBtn)
      expect(saveBtn).toBeInTheDocument()
    })
    test('should able to render every element', () => {
      const assetnumber = screen.getByTestId('assetnumber')
      userEvent.type(assetnumber, 'RBT6575775')

      const referencenumber = screen.getByTestId('referenceNumber')
      userEvent.type(referencenumber, '2323232')

      const invoicenumber = screen.getByTestId('invoiceNumber')
      userEvent.type(invoicenumber, 'test3123')

      const amount = screen.getByTestId('amount')
      userEvent.type(amount, '23432')

      const location = screen.getByTestId('location')
      userEvent.type(location, 'test')

      const employee = screen.getByTestId('ach-emp-name')
      userEvent.type(employee, 'Someswara Rao')
    })
  })
})