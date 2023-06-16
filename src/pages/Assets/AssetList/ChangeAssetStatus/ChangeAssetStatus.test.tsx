/* eslint-disable no-duplicate-imports */
import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ChangeAssetStatus from './ChangeAssetStatus'
import { render, screen } from '../../../../test/testUtils'
import { reduxServices } from '../../../../reducers/reduxServices'

const mockSetToggle = jest.fn()
describe('Change Asset status Component Testing', () => {
  test('should render Change Asset status component with out crashing', () => {
    render(
      <ChangeAssetStatus
        setToggle={jest.fn()}
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
    expect(screen.getByText('Change Asset Status')).toBeInTheDocument()
    const backButtonElement = screen.getByTestId('back-button')
    expect(backButtonElement).toBeInTheDocument()
    userEvent.click(backButtonElement)
    expect(mockSetToggle).toHaveBeenCalledTimes(0)
  })
})
const dispatch = jest.fn()
describe('onSelectEmployee', () => {
  it('should call getEmployeeId with the selected value', () => {
    const value = 'Thriveni Bathula '
    const mockGetEmployeeId = jest.fn()
    mockGetEmployeeId.mockReturnValueOnce(1)
    const onSelectEmployee = (value: string) => {
      const empId = mockGetEmployeeId(value)
      if (empId === -1) {
        return
      }
      dispatch(reduxServices.addAchiever.getActiveEmployeeListThunk())
    }

    onSelectEmployee(value)

    expect(mockGetEmployeeId).toHaveBeenCalledTimes(1)
    expect(mockGetEmployeeId).toHaveBeenCalledWith(value)
  })
})
