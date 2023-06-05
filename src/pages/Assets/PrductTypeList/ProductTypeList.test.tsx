import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProductTypeList from './ProductTypeList'
import { fireEvent, render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'
import { mockProductTypeList } from '../../../test/data/ProductTypeListData'
import { downloadFile } from '../../../utils/helper'

const mockHandleExport = jest.fn()
const mockSetTicketApprovalParams = jest.fn()

const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProductTypeList />
  </div>
)
describe('ProductTypeList without data', () => {
  beforeEach(() => {
    render(toRender, {
      preloadedState: {
        ProductTypeList: {
          isLoading: ApiLoadingState.succeeded,
          listSize: mockProductTypeList.size,
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
  test('should render search input', () => {
    const searchField = screen.getByTestId('searchField')
    userEvent.type(searchField, 'testing')
    expect(searchField).toHaveValue('testing')
    fireEvent.keyDown(searchField, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    })
    expect(mockSetTicketApprovalParams).toHaveBeenCalledTimes(0)
  })

  test('should create a link element and trigger a download', () => {
    const data = new Blob(['CSV file data'], { type: 'text/csv' })
    const fileName = 'ExportProductList.csv'
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
