import '@testing-library/jest-dom'
import React from 'react'
import Payslips from './Payslips'
import { mockPaySlips } from '../../../test/data/paySlipsData'
import { render, screen, cleanup } from '../../../test/testUtils'

describe('Payslips without data', () => {
  beforeEach(() => {
    render(<Payslips />)
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
})

describe('Payslips Table with data', () => {
  render(<Payslips />, {
    preloadedState: {
      paySlips: {
        employeePaySlips: mockPaySlips,
      },
    },
  })

  afterEach(cleanup)
  test('should render Payslips component with data', () => {
    expect(screen.getByText('April')).toBeInTheDocument()
    expect(screen.getByText('May')).toBeInTheDocument()
    expect(screen.getByText('June')).toBeInTheDocument()
    expect(screen.getByText('August')).toBeInTheDocument()
  })
})
