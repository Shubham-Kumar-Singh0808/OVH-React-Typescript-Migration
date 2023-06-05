import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import { CKEditor } from 'ckeditor4-react'
import ChangeAssetFilterOptions from './ChangeAssetFilterOptions'
import { cleanup, fireEvent, render, screen } from '../../../../test/testUtils'
import { mockActiveEmployeeList } from '../../../../test/data/AddAchieverData'

const mockOnSelect = jest.fn()
const mockSetEmpName = jest.fn()

// const selectedEmpName = 'Pradeep Namburu'

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

    test('render the input Field', () => {
      const empLabel = screen.getByTestId('ach-emp-name')
      expect(empLabel).toBeInTheDocument()
    })

    test('render the input field', () => {
      const input = screen.getByPlaceholderText('Employee')
      expect(input).toHaveValue('')
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
      const updateBtnElement = screen.getByTestId('save-btn')
      expect(updateBtnElement).toBeInTheDocument()
      userEvent.click(updateBtnElement)
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
