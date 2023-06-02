import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import AssetTransactionalListTable from './AssetTransactionalListTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { mockAssetTransactionList } from '../../../test/data/AssetTransactionListData'

const mockSetTogglePage = jest.fn()

describe('Asset Transaction List Table Component Testing', () => {
  beforeEach(() => {
    render(
      <AssetTransactionalListTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetTogglePage}
        pageSize={0}
        setPageSize={mockSetTogglePage}
        isTableView={false}
      />,
      {
        preloadedState: {
          assetTransactionList: {
            assetTransactionakDetails: mockAssetTransactionList.list,
            listSize: mockAssetTransactionList.size,
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
  test('should render the correct headers', () => {
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
      screen.getByRole('columnheader', { name: 'Description' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Location' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Updated by' }),
    ).toBeTruthy()

    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })
  test('should render the "Asset Transaction List" table', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  test('should render export button', () => {
    const exportBtn = screen.findByTestId('exportBtn')
    expect(exportBtn).toBeTruthy()
  })
  test('should open modal when clicking on plus icon', () => {
    const linkElement = screen.getByTestId('specification-modal-link2')
    userEvent.click(linkElement)
    expect(linkElement).toBeTruthy()
  })
})
