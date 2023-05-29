import React from 'react'
import { render } from '@testing-library/react'
import AssetListTableBody from './AssetListTableBody'

describe('AssetListTableBody', () => {
  const mockIndex = 0
  const mockGetItemNumber = jest.fn()

  const mockHandleAgendaModal = jest.fn()

  it('renders asset data correctly', () => {
    render(
      <AssetListTableBody
        index={mockIndex}
        getItemNumber={mockGetItemNumber}
        handleAgendaModal={mockHandleAgendaModal}
        item={{
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
          description: null,
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
          amount: null,
          countryId: null,
        }}
      />,
    )
  })
})
