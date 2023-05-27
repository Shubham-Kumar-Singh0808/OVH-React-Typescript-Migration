import '@testing-library/jest-dom'
import React from 'react'
import VendorListTable from './VendorListTable'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockVendorDetails } from '../../../test/data/vendorListData'

const mockSetData = jest.fn()
describe('Vendor List without data', () => {
  beforeEach(() => {
    render(
      <VendorListTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetData}
        pageSize={0}
        setPageSize={mockSetData}
      />,
      {
        preloadedState: {
          vendorList: {
            isLoading: ApiLoadingState.succeeded,
            vendors: mockVendorDetails.list,
            listSize: 150,
          },
        },
      },
    )
  })
  test('should render first page data only', () => {
    waitFor(() => {
      fireEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('vendor address render', () => {
    const address = screen.getByTestId('vendor-address-16')
    fireEvent.click(address)
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })

  test('should render  component with data', () => {
    expect(screen.getByText('company vendor')).toBeInTheDocument()
    expect(screen.getByText('testing vendor')).toBeInTheDocument()
    expect(screen.getByText('Srikanh Kotapat')).toBeInTheDocument()
    expect(screen.getByText('somesh test vendor')).toBeInTheDocument()
    expect(screen.getByText('p88@gmail.com')).toBeInTheDocument()
  })
})
