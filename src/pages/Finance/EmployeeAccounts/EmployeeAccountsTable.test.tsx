import '@testing-library/jest-dom'
import React from 'react'
import EmployeeAccountsExpandTable from './EmployeeAccountsExpandTable'
import { render, screen } from '../../../test/testUtils'

describe('Employee Accounts Table without data', () => {
  beforeEach(() => {
    render(<EmployeeAccountsExpandTable />)
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Employee Id' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Employee Name' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'P.F A/C No.' }),
    ).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'UAN' })).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Pan Card No.' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Aadhar Card No.' }),
    ).toBeTruthy()
    expect(
      screen.getByRole('columnheader', { name: 'Attachment' }),
    ).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(8)
  })

  test('should render the "Employee Accounts" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
})
