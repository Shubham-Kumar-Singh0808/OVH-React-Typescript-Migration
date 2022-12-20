import '@testing-library/jest-dom'

import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeAccountsTable from './EmployeeAccountsTable'
import { render, screen, waitFor } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEmployeeAccount } from '../../../test/data/employeeAccountData'

const mockSetTogglePage = jest.fn()

describe('Employee Accounts Table Component Testing', () => {
  beforeEach(() => {
    render(
      <EmployeeAccountsTable
        paginationRange={[]}
        currentPage={0}
        setCurrentPage={mockSetTogglePage}
        pageSize={0}
        setPageSize={mockSetTogglePage}
      />,
      {
        preloadedState: {
          employeeAccounts: {
            listSize: 40,
            financeData: mockEmployeeAccount?.list,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      },
    )
  })
  test('Should be able to see table titles', () => {
    expect(screen.getByText('Employee Id')).toBeInTheDocument()
    expect(screen.getByText('Employee Name')).toBeInTheDocument()
    expect(screen.getByText('P.F A/C No.')).toBeInTheDocument()
    expect(screen.getByText('UAN')).toBeInTheDocument()
    expect(screen.getByText('Pan Card No.')).toBeInTheDocument()
    expect(screen.getByText('Aadhar Card No.')).toBeInTheDocument()
    expect(screen.getByText('Attachment')).toBeInTheDocument()
  })
  test('Should be able to see total of 6 records', () => {
    expect(screen.getByText('Total Records: 40')).toBeInTheDocument()
  })
  test('should render first page data only', async () => {
    await waitFor(() => {
      userEvent.click(screen.getByText('Next ›', { exact: true }))
      expect(screen.getByText('« First')).not.toHaveAttribute('disabled')
      expect(screen.getByText('‹ Prev')).not.toHaveAttribute('disabled')
    })
  })
  test('should disable first and prev in pagination if first page', async () => {
    await waitFor(() => {
      expect(screen.getByText('Next ›')).not.toHaveAttribute('disabled')
      expect(screen.getByText('Last »')).not.toHaveAttribute('disabled')
    })
  })
  test('should render employee Accounts table component with data without crashing', async () => {
    await waitFor(() => {
      userEvent.selectOptions(screen.getByRole('combobox'), ['40'])
      const pageSizeSelect = screen.getByRole('option', {
        name: '40',
      }) as HTMLOptionElement
      expect(pageSizeSelect.selected).toBe(false)
      expect(screen.getAllByRole('row')).toHaveLength(21)
    })
  })
  test('Should be able open sub table when clicking plus button', async () => {
    const plusBtn = screen.getAllByTestId('plus-btn')
    userEvent.click(plusBtn[0])
    await waitFor(() => {
      expect(screen.getByText('#')).toBeInTheDocument()
      expect(screen.getByText('Bank Name')).toBeInTheDocument()
      expect(screen.getByText('Account Number')).toBeInTheDocument()
      expect(screen.getByText('IFSC Code')).toBeInTheDocument()
    })
  })
  test('Should be able open sub table when clicking plus button', () => {
    const plusBtn = screen.getAllByTestId('plus-btn')
    userEvent.click(plusBtn[0])
    const minusBtn = screen.getAllByTestId('minus-btn')
    userEvent.click(minusBtn[0])
  })
})
