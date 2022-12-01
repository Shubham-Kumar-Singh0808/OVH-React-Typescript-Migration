import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import Payslips from './Payslips'
import { render, screen } from '../../../test/testUtils'
import { mockPaySlips } from '../../../test/data/paySlipsData'

describe('Family Table component with data', () => {
  beforeEach(() => {
    render(<Payslips />, {
      preloadedState: {
        paySlips: {
          employeePaySlips: mockPaySlips,
        },
      },
    })
  })
  test('should render the "Payslips" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })
  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Month' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Year' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Actions' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })
  test('should render with data ', () => {
    expect(screen.getByText('April')).toBeInTheDocument()
    expect(screen.getByText('May')).toBeInTheDocument()
    expect(screen.getByText('June')).toBeInTheDocument()
    expect(screen.getByText('July')).toBeInTheDocument()
  })
  test('should render with number of records  ', () => {
    expect(
      screen.getByText('Total Records: ' + mockPaySlips.length),
    ).toBeInTheDocument()
  })
  test('should select year', () => {
    const selectYear = screen.getByTestId('form-select1')
    userEvent.selectOptions(selectYear, ['2022'])
    expect(selectYear).toHaveValue('2022')
  })
})
