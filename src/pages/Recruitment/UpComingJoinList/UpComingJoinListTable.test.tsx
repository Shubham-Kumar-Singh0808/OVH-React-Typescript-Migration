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
const mockHandleExportUpComingJoinList = jest.fn()
const mockSearchButtonHandlerOnKeyDown = jest.fn()
const mockSearchButtonHandler = jest.fn()

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
  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(4)
  })

  test('should render up coming join List component with data', () => {
    expect(screen.getByText('Kishor Kumar Reddydondapati')).toBeInTheDocument()
    expect(screen.getByText('dkishorreddy@gmail.com')).toBeInTheDocument()
    expect(screen.getByText('9966253492')).toBeInTheDocument()
    expect(screen.getByText('Chief Executive Officer')).toBeInTheDocument()
  })

  test('should render first page data only', () => {
    waitFor(() => {
      userEvent.click(screen.getByText('Next >', { exact: true }))

      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).not.toHaveAttribute('disabled')
    })
  })

  test('renders search input and search button', () => {
    render(render, {
      preloadedState: {},
    })
    const searchInput = screen.getByTestId('searchField')
    const searchButton = screen.getByTestId('multi-search-btn')

    expect(searchInput).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })

  test('updates search input value on change', () => {
    render(render, {
      preloadedState: {},
    })
    const searchInput = screen.getByTestId('searchField')

    fireEvent.change(searchInput, { target: { value: 'search input' } })
  })

  test('should disable first and prev in pagination if first page', () => {
    waitFor(() => {
      expect(screen.getByText('« First')).toHaveAttribute('disabled')
      expect(screen.getByText('< Prev')).toHaveAttribute('disabled')
      expect(screen.getByText('Next >')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render Export button in the component', () => {
    expect(screen.getByTestId('export-btn1')).toBeTruthy()
  })
  test('should render with number of records  ', () => {
    expect(
      screen.getByText('Total Records: ' + mockUpComingJoineeList.size),
    ).toBeInTheDocument()
  })

  test('should trigger handleExportUpComingJoinList when button is clicked', () => {
    const exportBtn = screen.getByTestId('export-btn1')
    exportBtn.onclick = mockHandleExportUpComingJoinList
    userEvent.click(exportBtn)
    expect(mockHandleExportUpComingJoinList).toHaveBeenCalled()
  })

  test('should call searchButtonHandlerOnKeyDown when a key is pressed', () => {
    const searchInput = screen.getByTestId('searchField')
    searchInput.onkeydown = mockSearchButtonHandlerOnKeyDown
    fireEvent.keyDown(searchInput, { key: 'Enter' })
    expect(mockSearchButtonHandlerOnKeyDown).toHaveBeenCalled()
  })

  test('should call searchButtonHandler when the search button is clicked', () => {
    const searchButton = screen.getByTestId('multi-search-btn')
    searchButton.onclick = mockSearchButtonHandler
    fireEvent.click(searchButton)
    expect(mockSearchButtonHandler).toHaveBeenCalled()
  })
})
