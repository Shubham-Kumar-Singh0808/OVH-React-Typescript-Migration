import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ChangeAssetStatus from './ChangeAssetStatus'
import { fireEvent, render, screen } from '../../../../test/testUtils'
import { AllAssetsList } from '../../../../types/Assets/AssetList/AssetListTypes'

const mockSetToggle = jest.fn()
// describe('Change Asset status Component Testing', () => {
//   test('should render Change Asset status component without crashing', () => {
//     render(
//       <ChangeAssetStatus
//         setToggle={mockSetToggle}
//         changeReportStatus={{
//           id: 0,
//           poNumber: '',
//           vendorId: 0,
//           productSpecificationId: 0,
//           manufacturerId: 0,
//           productId: 0,
//           pSpecification: '',
//           productName: '',
//           manufacturerName: '',
//           assetNumber: '',
//           otherAssetNumber: '',
//           invoiceNumber: '',
//           purchasedDate: '',
//           receivedDate: '',
//           notes: null,
//           employeeName: '',
//           employeeId: 0,
//           description: '',
//           status: '',
//           assetTypeId: 0,
//           assetType: '',
//           productSpecification: null,
//           otherNumber: null,
//           warrantyStartDate: null,
//           warrantyEndDate: null,
//           searchByEmpName: null,
//           departmentId: null,
//           departmentName: null,
//           location: '',
//           vendorName: '',
//           createdBy: '',
//           updatedBy: '',
//           createdDate: '',
//           updatedDate: '',
//           referenceNumber: '',
//           amount: 0,
//           countryId: null,
//         }}
//         setChangeReportStatus={jest.fn()}
//       />,
//     )
//     expect(screen.getByText('Change Asset Status')).toBeInTheDocument()
//   })

//   test('should able to click Back Button', () => {
//     const backButtonElement = screen.getByTestId('back-button')
//     expect(backButtonElement).toBeInTheDocument()
//   })
// })

describe('Change Asset status Component Testing', () => {
  test('should render Ticket Report component with out crashing', () => {
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
