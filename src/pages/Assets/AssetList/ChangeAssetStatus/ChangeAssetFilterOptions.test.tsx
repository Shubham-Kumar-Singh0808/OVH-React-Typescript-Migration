import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import ChangeAssetFilterOptions from './ChangeAssetFilterOptions'
import { cleanup, fireEvent, render, screen } from '../../../../test/testUtils'
import { mockActiveEmployeeList } from '../../../../test/data/AddAchieverData'

const mockOnSelect = jest.fn()
const mockSetEmpName = jest.fn()
const selectedEmpName = 'Pradeep Namburu'
const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

describe('filter employee name', () => {
  describe('empty values', () => {
    beforeEach(() => {
      render(
        <ChangeAssetFilterOptions
          allEmployees={[]}
          onSelectEmployee={mockOnSelect}
          employeeName={undefined}
          setEmployeeName={mockSetEmpName}
          setToggle={mockSetEmpName}
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
      )
    })
    afterEach(cleanup)
    test('render label', () => {
      const empLabel = screen.getByTestId('ach-emp-name')
      expect(empLabel).toBeInTheDocument()
      expect(empLabel).toHaveTextContent('Employee:')
    })
    test('render the input Field', () => {
      const empLabel = screen.getByTestId('ach-emp-name')
      expect(empLabel).toBeInTheDocument()
    })

    test('render the input field', () => {
      const input = screen.getByPlaceholderText('Employee')
      expect(input).toHaveValue('')
    })
    test('should call onChange', () => {
      const input = screen.getByTestId('asset-type')
      fireEvent.change(input, selectedEmpName)
      // expect(input).toHaveValue('')
    })
    // describe('YourComponent', () => {
    //   test('should select employee on focus out', () => {
    //     const allEmployees = [
    //       { empFirstName: 'Thriveni', empLastName: 'Bathula' },
    //       { empFirstName: 'Thriveni', empLastName: 'Bathula' },
    //     ]

    //     const onSelectEmployee = jest.fn()
    //     const { getByTestId } = render(
    //       <YourComponent
    //         allEmployees={allEmployees}
    //         onSelectEmployee={onSelectEmployee}
    //       />,
    //     )

    //     const employeeNameInput = getByTestId('employee-name-input')

    //     fireEvent.change(employeeNameInput, { target: { value: 'John Doe' } })
    //     fireEvent.blur(employeeNameInput)

    //     expect(onSelectEmployee).toHaveBeenCalledWith('John Doe')
    //   })

    //   test('should update employee name when selected', () => {
    //     const allEmployees = [
    //       { empFirstName: 'John', empLastName: 'Doe' },
    //       { empFirstName: 'Jane', empLastName: 'Smith' },
    //     ]

    //     const { getByTestId } = render(
    //       <YourComponent
    //         allEmployees={allEmployees}
    //         onSelectEmployee={() => {}}
    //       />,
    //     )

    //     const employeeNameInput = getByTestId('employee-name-input')

    //     fireEvent.change(employeeNameInput, { target: { value: 'Jane Smith' } })

    //     expect(employeeNameInput.value).toBe('Jane Smith')
    //   })
    // })
    test('should be able to see place holder "dd/mm/yyyy"', () => {
      expect(screen.getByPlaceholderText('dd/mm/yyyy')).toBeInTheDocument()
    })
    test('should be able to render Status Date label', () => {
      expect(screen.getByText('Status Date:')).toBeInTheDocument()
    })
    test('should render date picker', () => {
      const dateInput = screen.findByTestId('date-picker')
      expect(dateInput).toBeTruthy()
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
  })

  describe('should reset', () => {
    beforeEach(() => {
      render(
        <ChangeAssetFilterOptions
          allEmployees={mockActiveEmployeeList}
          onSelectEmployee={mockOnSelect}
          employeeName={'P'}
          setEmployeeName={mockSetEmpName}
          setToggle={mockSetEmpName}
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
    test('should be able to click Save button element', () => {
      const saveBtnElement = screen.getByTestId('save-btn')
      expect(saveBtnElement).toBeInTheDocument()
      userEvent.click(saveBtnElement)
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

      const vendorName = screen.getByTestId('asset-type')
      userEvent.type(vendorName, 'Sony')
    })
  })
})
