import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProductTypeListTable from './ProductTypeListTable'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockProductTypeList } from '../../../test/data/ProductTypeListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetData = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProductTypeListTable
      paginationRange={[]}
      currentPage={0}
      setCurrentPage={mockSetData}
      pageSize={0}
      setPageSize={mockSetData}
      setToggle={mockSetData}
      setEditProductType={mockSetData}
    />
  </div>
)

describe('Product Type list without data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        ProductTypeList: {
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          ProductTypeListModel: [],
          productTypeResponse: mockProductTypeList,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should render first page data only', () => {
    waitFor(() => {
      fireEvent.click(screen.getByText('Next >', { exact: true }))

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
  test('should be able to click delete button element', () => {
    const deleteBtn = screen.getAllByTestId('btn-deletes')
    expect(deleteBtn[0]).toBeInTheDocument()
    userEvent.click(deleteBtn[0])
    const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
    userEvent.click(modalConfirmBtn)
    expect(modalConfirmBtn).toBeInTheDocument()
  })
})
