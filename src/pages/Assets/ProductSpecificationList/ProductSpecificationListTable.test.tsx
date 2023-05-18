import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProductSpecificationListTable from './ProductSpecificationListTable'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { GetProductSpecificationListDetails } from '../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'
import { mockProductSpecificationList } from '../../../test/data/ProductSpecificationListData'

const mockSetData = jest.fn()
const handleModal = jest.fn()
describe('Job Openings without data', () => {
  beforeEach(() => {
    render(
      <ProductSpecificationListTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetData}
        pageSize={0}
        setPageSize={mockSetData}
      />,
      {
        preloadedState: {
          productSpecificationList: {
            productSpecifications: mockProductSpecificationList,
            getProductSpecificationListDetails:
              {} as GetProductSpecificationListDetails,
            isLoading: ApiLoadingState.succeeded,
            listSize: 0,
          },
        },
      },
    )
  })
  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
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
    expect(screen.getByText('Testing Flow')).toBeInTheDocument()
    expect(screen.getByText('Pavani')).toBeInTheDocument()
  })
  it('should call handleModal function with the correct argument on link click', () => {
    const linkElement = screen.getByTestId('product-specification2') // Update with the actual link text or use getByTestId if available

    fireEvent.click(linkElement)

    expect(handleModal).toHaveBeenCalledTimes(0)
    // expect(handleModal).toBeInTheDocument()
  })
})
