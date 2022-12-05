import '@testing-library/jest-dom'
import React from 'react'
import EmployeeAccountsExpandTable from './EmployeeAccountsExpandTable'
import { render, screen } from '../../../test/testUtils'

describe('Employee Accounts Table without data', () => {
  beforeEach(() => {
    render(<EmployeeAccountsExpandTable />)
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Bank Name' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Account Number' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'IFSC Code' })).toBeTruthy()

    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })

  test('should render the "Employee Accounts" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})
