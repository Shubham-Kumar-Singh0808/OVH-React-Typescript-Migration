import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AssetWarrantyReportTable from './AssetWarrantyReportTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockAssetsWarrantyList } from '../../../test/data/AssetsWarrantyData'

// const expectPageSizeToBeRendered = (pageSize: number) => {
//   for (let i = 0; i < pageSize; i++) {
//     expect(screen.getByText(mockAssetsWarrantyList.list[i]).toBeInTheDocument()
//   }
// }
const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee BirthdaysList Table Component Testing', () => {
  beforeEach(() => {
    render(
      <AssetWarrantyReportTable
        paginationRange={[1, 2, 3]}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        pageSize={1}
        setPageSize={mockSetPageSize}
      />,

      {
        preloadedState: {
          assetsWarrantyList: {
            warrantyAssetsDetails: mockAssetsWarrantyList.list,
            listSize: mockAssetsWarrantyList.size,
          },
        },
      },
    )
  })
  afterEach(cleanup)
  test('should render the "AssetsWarrantyList" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render Export button in the component', () => {
    expect(screen.getByTestId('export-button')).toBeTruthy()
  })
  test('should render with data ', () => {
    expect(screen.getByText('Water Coocvcler')).toBeInTheDocument()
    expect(screen.getByText('Water Coolu9er vendor')).toBeInTheDocument()
    expect(screen.getByText('Summerfhfd Cool...')).toBeInTheDocument()
    expect(screen.getByText('30/05/2023')).toBeInTheDocument()
  })
  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(9)
  })
  test('should open modal when clicking on job Description link', async () => {
    const linkElement = screen.getByTestId('specification-modal-link1')
    userEvent.click(linkElement)
    const description = screen.getAllByText('Purchased ...')
    await waitFor(() => {
      expect(description[0]).toBeInTheDocument()
    })
  })

  test('should render Add Assets List component with data', () => {
    expect(screen.getByText('01/25/2023')).toBeInTheDocument()
    expect(screen.getByText('1/05/2023')).toBeInTheDocument()
    // expect(screen.getAllByText('working')).toBeInTheDocument()
    expect(screen.getByText('RBT121212')).toBeInTheDocument()
    expect(screen.getByText('Software')).toBeInTheDocument()
    expect(screen.getByText('WorldTest')).toBeInTheDocument()
  })

  // test('should be able to click delete button element', () => {
  //   // // const deleteBtnElement = screen.getByTestId('btn-delete10')
  //   // // expect(deleteBtnElement).toBeInTheDocument()
  //   // // userEvent.click(deleteBtnElement)
  //   const modalConfirmBtn = screen.getByRole('button', { name: 'Yes' })
  //   userEvent.click(modalConfirmBtn)
  //   expect(modalConfirmBtn).toBeInTheDocument()
  // })
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
})
