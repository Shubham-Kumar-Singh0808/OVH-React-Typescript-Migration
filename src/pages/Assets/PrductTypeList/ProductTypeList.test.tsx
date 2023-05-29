import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProductTypeList from './ProductTypeList'
import { fireEvent, render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { mockProductTypeList } from '../../../test/data/ProductTypeListData'

const mockHandleExport = jest.fn()
describe('ProductTypeList without data', () => {
  beforeEach(() => {
    render(<ProductTypeList />, {
      preloadedState: {
        ProductTypeList: {
          isLoading: ApiLoadingState.succeeded,
          listSize: 0,
          ProductTypeListModel: mockProductTypeList.list,
          productTypeResponse: { list: [], size: 0 },
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should be able to render Product Type List  Title', () => {
    expect(screen.getByText('Product Type List')).toBeInTheDocument()
  })
  test('should able to click "click to to export" button', () => {
    const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
    fireEvent.click(exportBtn)
    expect(mockHandleExport).toHaveBeenCalledTimes(0)
  })
  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', () => {
    const searchInput = screen.getByTestId('searchField')
    userEvent.type(searchInput, 'WorldTest')
    fireEvent.click(screen.getByTestId('multi-search-btn'))
  })
  test('should render  Product Type List screen and add button', () => {
    const addBtnElement = screen.getByTestId('add-button')
    expect(addBtnElement).toBeInTheDocument()
  })
})
