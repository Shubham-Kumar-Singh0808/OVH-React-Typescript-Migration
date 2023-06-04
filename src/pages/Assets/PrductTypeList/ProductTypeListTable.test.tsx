import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import ProductTypeListTable from './ProductTypeListTable'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockProductTypeList } from '../../../test/data/ProductTypeListData'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockSetData = jest.fn()
const mockSetPageSize = jest.fn()
const toRender = (
  <div>
    <div id="backdrop-root"></div>
    <div id="overlay-root"></div>
    <div id="root"></div>
    <ProductTypeListTable
      paginationRange={[1, 2, 3]}
      currentPage={0}
      setCurrentPage={mockSetData}
      pageSize={0}
      setPageSize={mockSetPageSize}
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
          listSize: mockProductTypeList.size,
          ProductTypeListModel: [],
          productTypeResponse: mockProductTypeList,
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  afterEach(cleanup)
  test('should render the "Product Type List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
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
  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(21)
  })
  test('should be able to click delete button element', async () => {
    const deleteBtn = screen.getAllByTestId('btn-deletes')
    expect(deleteBtn[0]).toBeInTheDocument()
    userEvent.click(deleteBtn[0])
    await waitFor(() => {
      const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
      expect(modalConfirmBtn).toBeInTheDocument()
      userEvent.click(modalConfirmBtn)
      // Add assertions to check the effects of confirming the deletion
    })
  })
  test('Should be able to see table titles', () => {
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Product Type')).toBeInTheDocument()
    expect(screen.getByText('Asset Type')).toBeInTheDocument()
    expect(screen.getByText('Last Updated by')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })
  test('render number of records', () => {
    const totRec = screen.getByTestId('record-number')
    expect(totRec).toBeInTheDocument()
  })

  test('should be able to click edit button element', () => {
    const EditBtn = screen.getAllByTestId('btn-edit')
    expect(EditBtn[0]).toBeInTheDocument()
    userEvent.click(EditBtn[0])
  })
})
