import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import BirthdaysListTable from './BirthdaysListTable'
import { cleanup, render, screen, waitFor } from '../../../test/testUtils'
import { mockBirthdaysList } from '../../../test/data/birthdaysListData'

const expectPageSizeToBeRendered = (pageSize: number) => {
  for (let i = 0; i < pageSize; i++) {
    expect(screen.getByText(mockBirthdaysList[i].date)).toBeInTheDocument()
  }
}
const mockSetCurrentPage = jest.fn()
const mockSetPageSize = jest.fn()

describe('Employee BirthdaysList Table Component Testing', () => {
  const history = createMemoryHistory()
  beforeEach(() => {
    render(
      <Router history={history}>
        <BirthdaysListTable
          paginationRange={[1, 2, 3]}
          currentPage={1}
          setCurrentPage={mockSetCurrentPage}
          pageSize={1}
          setPageSize={mockSetPageSize}
        />
      </Router>,
      {
        preloadedState: {
          employeesBirthdayList: {
            birthdayList: mockBirthdaysList,
            listSize: 55,
          },
        },
      },
    )
  })
  afterEach(cleanup)
  test('should render the "BirthdaysList" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render Back button in the Birthdays Page', () => {
    expect(screen.getByTestId('back-btn')).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: 'Date' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeTruthy()
  })

  test('should render BirthdaysList Table component with data without crashing', async () => {
    expectPageSizeToBeRendered(20)
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      expect(mockSetPageSize).toHaveBeenCalledTimes(1)
      expect(mockSetCurrentPage).toHaveBeenCalledTimes(1)
    })
  })

  test('should redirect to /dashboard when user clicks on Back Button from BirthdaysList Page', async () => {
    userEvent.click(screen.getByRole('button', { name: /Back/i }))
    await waitFor(() => {
      // check if a redirect happens after clicking Back button to Dashboard Page
      expect(history.location.pathname).toBe('/dashboard')
    })
  })
})
