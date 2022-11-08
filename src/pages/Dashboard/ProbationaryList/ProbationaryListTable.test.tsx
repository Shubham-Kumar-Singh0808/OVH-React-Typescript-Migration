import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import ProbationaryListTable from './ProbationaryListTable'
import { cleanup, screen, render, waitFor } from '../../../test/testUtils'
import { mockUpcomingProvisionList } from '../../../test/data/upcomingProbationaryListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(
      screen.getByText(mockUpcomingProvisionList[i].username),
    ).toBeInTheDocument()
  }
}
const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee ProbationaryList Table Component Testing', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <ProbationaryListTable
          paginationRange={[1, 2, 3]}
          currentPage={1}
          setCurrentPage={mockSetCurrentPage}
          pageSize={1}
          setPageSize={mockSetPageSize}
        />
      </Router>,
      {
        preloadedState: {
          probationPeriod: {
            upcomingProbationList: mockUpcomingProvisionList,
            listSize: 43,
          },
        },
      },
    )
  })
  afterEach(cleanup)
  test('should render the "Probationary List" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Date' })).toBeTruthy()
  })
  test('should render correct number of page records', () => {
    expect(screen.queryAllByRole('row')).toHaveLength(43)
  })
  test('should render ProbationaryList Table component with data without crashing', async () => {
    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })

  test('should redirect to /dashboard when user clicks on Back Button from ProbationaryList Page', async () => {
    userEvent.click(screen.getByRole('button', { name: /Back/i }))
    await waitFor(() => {
      // check if a redirect happens after clicking Back button to Dashboard Page
      expect(history.location.pathname).toBe('/dashboard')
    })
  })
})
