import React from 'react'
import ProductSpecificationList from './ProductSpecificationList'
import { fireEvent, render, screen } from '../../../test/testUtils'
import '@testing-library/jest-dom'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { GetProductSpecificationListDetails } from '../../../types/Assets/ProductSpecificationList/ProductSpecificationListTypes'
import { mockProductSpecificationList } from '../../../test/data/ProductSpecificationListData'
// eslint-disable-next-line import/order
import userEvent from '@testing-library/user-event'
import { downloadFile } from '../../../utils/helper'

const mockHandleExport = jest.fn()
const mockProductSpecificationsParams = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProductSpecificationList />
  </div>
)
describe('Product Specification List Component Testing', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        productSpecificationList: {
          productSpecifications: mockProductSpecificationList,
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
    const exportBtn = screen.getByTestId('exportBtn')
    fireEvent.click(exportBtn)
    expect(mockHandleExport).toHaveBeenCalledTimes(0)
  })
  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', () => {
    const searchBtn = screen.getByTestId('multi-search-btn')
    userEvent.type(searchBtn, 'Testing Flow')
    fireEvent.click(searchBtn)
  })
  test('should render search input', () => {
    const searchBoxField = screen.getByTestId('searchField')
    userEvent.type(searchBoxField, 'testing')
    expect(searchBoxField).toHaveValue('testing')
    fireEvent.keyDown(searchBoxField, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })
    expect(mockProductSpecificationsParams).toHaveBeenCalledTimes(0)
  })
  test('should create a link element and trigger a download', () => {
    const data = new Blob(['CSV file data'], { type: 'text/csv' })
    const fileName = 'ExportProductSpecificationList.csv'
    const createElementMock = jest.spyOn(document, 'createElement')
    const clickMock = jest.fn()
    const linkElement = {
      href: '',
      download: '',
      click: clickMock,
    }
    const createObjectURLMock = jest.fn().mockReturnValue('dummy-object-url')
    window.URL.createObjectURL = createObjectURLMock
    downloadFile(data, fileName)
    expect(createElementMock).toHaveBeenCalledWith('a')
    expect(linkElement.href).toBe('')
    expect(linkElement.download).toBe('')
    expect(createObjectURLMock).toHaveBeenCalledWith(data)
  })
})
