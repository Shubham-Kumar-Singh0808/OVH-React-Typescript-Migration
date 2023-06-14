import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import UpComingJoinListTable from './UpComingJoinListTable'
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '../../../test/testUtils'
import { mockUpComingJoineeList } from '../../../test/data/upComingJoineeData'

const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()
const mockSetSearchInput = jest.fn()

describe('Up Coming Join List Table Component Testing', () => {
  beforeEach(() => {
    render(
      <UpComingJoinListTable
        paginationRange={[1, 2, 3]}
        currentPage={1}
        setCurrentPage={mockSetCurrentPage}
        pageSize={1}
        setPageSize={mockSetPageSize}
        searchInput=""
        setSearchInput={mockSetSearchInput}
      />,

      {
        preloadedState: {
          upComingJoinList: {
            upComingJoineeListDetails: mockUpComingJoineeList.list,
            listSize: mockUpComingJoineeList.size,
          },
        },
      },
    )
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Email ID' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Mobile' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Experience' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Designation' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Date of Joining' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Technology' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
  })

  afterEach(cleanup)
  test('should render the "UpComing Join List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render with data ', () => {
    // expect(screen.getByText('JOINED')).toBeInTheDocument()
    expect(screen.getByText('PHP')).toBeInTheDocument()
    expect(screen.getByText('Permanent')).toBeInTheDocument()
  })
  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(4)
  })

  test('should render up coming join List component with data', () => {
    expect(screen.getByText('Kishor Kumar Reddydondapati')).toBeInTheDocument()
    expect(screen.getByText('JOINED')).toBeInTheDocument()
    expect(screen.getByText('PHP')).toBeInTheDocument()
    expect(screen.getByText('Permanent')).toBeInTheDocument()
    expect(screen.getByText('26 Aug 2015')).toBeInTheDocument()
  })

  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', () => {
    const searchBtn = screen.getByTestId('multi-search-btn')
    fireEvent.click(searchBtn)
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
