import React from 'react'
import userEvent from '@testing-library/user-event'
import AssetHistoryTable from './AssetHistoryTable'
import { cleanup, render, screen, waitFor } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { ManufacturerList } from '../../../../types/Assets/ManufacturerList/ManufacturerType'
import { mockAssetHistory } from '../../../../test/data/assetHistoryData'
import { mockAllAssetListData } from '../../../../test/data/AssetListData'

describe('Expense Category List Table with data', () => {
  beforeEach(() => {
    render(<AssetHistoryTable />, {
      preloadedState: {
        assetList: {
          asset: [],
          isLoading: ApiLoadingState.idle,
          manufacturerList: {} as ManufacturerList,
          allAssetList: mockAllAssetListData,
          assetHistoryList: mockAssetHistory,
          listSize: 0,
          currentPage: 1,
          pageSize: 20,
        },
      },
    })
  })
  afterEach(cleanup)
  test('Asset History Table is rendered', () => {
    expect(screen.getByRole('table')).toBeVisible()
  })
  test('Asset History Table headings are rendered', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Asset Number' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Vendor Name' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Asset Ref.Number' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Product Type' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Status' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Status Date' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Employee Name' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Invoice Number' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Description' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Location' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Updated by' }),
    ).toBeTruthy()
  })
  test('correct number of columns are rendered', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(21)
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

  test('render number of records', () => {
    const totRec = screen.getByTestId('records')
    expect(totRec).toBeInTheDocument()
  })

  test('should render with Asset History Table records', () => {
    expect(
      screen.getByText('Total Records: ' + mockAssetHistory.length),
    ).toBeInTheDocument()
  })
})

describe('Asset History without data', () => {
  beforeEach(() => {
    render(<AssetHistoryTable />, {
      preloadedState: {
        assetList: {
          asset: [],
          isLoading: ApiLoadingState.idle,
          manufacturerList: {} as ManufacturerList,
          allAssetList: [],
          assetHistoryList: [],
          listSize: 0,
          currentPage: 1,
          pageSize: 20,
        },
      },
    })
  })

  test('should render no records found', () => {
    expect(screen.getByText('No Records Found...')).toBeInTheDocument()
  })

  test('should render the "Category" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})
