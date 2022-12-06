import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeAccounts from './EmployeeAccounts'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEmployeeAccount } from '../../../test/data/employeeAccountData'

const mockHandleExport = jest.fn()
const searchInputTestId = 'multi-search-btn'
const mockSetMultiSearchValue = jest.fn()

describe('Employee Accounts Table without data', () => {
  beforeEach(() => {
    render(<EmployeeAccounts />)
  })
  test('should be able to render Employee Accounts  Title', () => {
    expect(screen.getByText('Employee Accounts')).toBeInTheDocument()
  })
  test('should able to click "click to to export" button', () => {
    const exportBtn = screen.getByRole('button', { name: 'Click to Export' })
    userEvent.click(exportBtn)
    expect(mockHandleExport).toHaveBeenCalledTimes(0)
  })
})

describe('Employee Accounts with data', () => {
  beforeEach(() => {
    render(<EmployeeAccounts />, {
      preloadedState: {
        employeeAccounts: {
          financeData: mockEmployeeAccount,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })

  test('upon providing search text and clicking on search button it should call mockSetMultiSearchValue function', async () => {
    const searchInput = screen.getByTestId('searchField')
    userEvent.type(searchInput, 'Admin  Rbt')
    userEvent.click(screen.getByTestId(searchInputTestId))
    await waitFor(() => {
      expect(mockSetMultiSearchValue).toBeCalledWith('Admin  Rbt')
    })
  })
})
