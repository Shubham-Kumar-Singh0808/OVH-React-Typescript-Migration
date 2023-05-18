import React from 'react'
import ProductSpecificationList from './ProductSpecificationList'
import { fireEvent, render, screen } from '../../../test/testUtils'
import '@testing-library/jest-dom'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { GetProductSpecificationListDetails } from '../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'

const mockHandleExport = jest.fn()

describe('Product Specification List Component Testing', () => {
  beforeEach(() => {
    render(<ProductSpecificationList />, {
      preloadedState: {
        productSpecificationList: {
          productSpecifications: [],
          getProductSpecificationListDetails:
            {} as GetProductSpecificationListDetails,
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
        },
      },
    })
  })
  test('should be able to render  Product Specification List  Title', () => {
    expect(screen.getByText('Product Specification List')).toBeInTheDocument()
  })
  test('should able to click "click to to export" button', () => {
    const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
    fireEvent.click(exportBtn)
    expect(mockHandleExport).toHaveBeenCalledTimes(0)
  })
  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', () => {
    const searchBtn = screen.getByTestId('multi-search-btn')
    fireEvent.click(searchBtn)
  })
})
