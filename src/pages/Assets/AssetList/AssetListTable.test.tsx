import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AssetListTable from './AssetListTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ManufacturerList } from '../../../types/Assets/AssetList/AssetListTypes'
import { mockAllAssetListData } from '../../../test/data/AssetListData'

const mockSetTogglePage = jest.fn()

describe('Asset List Table Component Testing', () => {
  beforeEach(() => {
    render(
      <AssetListTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetTogglePage}
        pageSize={0}
        setPageSize={mockSetTogglePage}
      />,
      {
        preloadedState: {
          assetList: {
            asset: [],
            isLoading: ApiLoadingState.idle,
            manufacturerList: {} as ManufacturerList,
            allAssetList: mockAllAssetListData.list,
            listSize: 0,
          },
        },
      },
    )
  })

  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next ›', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).not.toHaveAttribute('disabled')
    })
  })
  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render Add Assets List Data component with data', () => {
    expect(screen.getByText('Someswara Rao')).toBeInTheDocument()
    expect(screen.getByText('RBT121212')).toBeInTheDocument()
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Asset Number' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Asset Type' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Product Type' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Product Specifications' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'License Number' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Location' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Asset Reference No.' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Asset Status' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Invoice Number' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Amount' })).toBeTruthy()

    expect(
      screen.getByRole('columnheader', { name: 'Employee Name' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })
  test('should render the "Asset List" table', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should open modal when clicking on AssetList specification Description link', async () => {
    const linkElement = screen.getByTestId('specification-modal-link2')
    userEvent.click(linkElement)
    const description = screen.getAllByText('')
    await waitFor(() => {
      expect(description[1]).toBeInTheDocument()
    })
  })
})
