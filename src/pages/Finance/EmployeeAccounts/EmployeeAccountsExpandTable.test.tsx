import '@testing-library/jest-dom'

import React from 'react'
import EmployeeAccountsExpandTable from './EmployeeAccountsExpandTable'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEmployeeAccount } from '../../../test/data/employeeAccountData'

describe('Employee Accounts Table Component Testing', () => {
  beforeEach(() => {
    render(<EmployeeAccountsExpandTable bankDetails={[]} />, {
      preloadedState: {
        employeeAccounts: {
          financeData: mockEmployeeAccount?.list,
          isLoading: ApiLoadingState.succeeded,
        },
      },
    })
  })

  test('Should be able open sub table when clicking plus button', () => {
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Bank Name')).toBeInTheDocument()
    expect(screen.getByText('Account Number')).toBeInTheDocument()
    expect(screen.getByText('IFSC Code')).toBeInTheDocument()
  })
})
