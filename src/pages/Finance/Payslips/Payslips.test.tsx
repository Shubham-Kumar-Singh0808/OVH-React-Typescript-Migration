import '@testing-library/jest-dom'
import React from 'react'
import { render, screen } from '@testing-library/react'
import Payslips from './Payslips'
import { mockPaySlips } from '../../../test/data/paySlipsData'

describe('Payslips without data', () => {
  beforeEach(() => {
    render(<Payslips />)
  })

  test('should render the correct headers', () => {
    expect(screen.getByRole('columnheader', { name: '#' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Month' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Year' })).toBeTruthy()
    expect(screen.getByRole('columnheader', { name: 'Action' })).toBeTruthy()
    expect(screen.getAllByRole('columnheader')).toHaveLength(4)
  })

  test('should render the "Payslips" table ', () => {
    const table = screen.getByRole('table')
    expect(table).toBeTruthy()
  })

  test('should render Payslips component with data', () => {
    expect(screen.getByText('Select Year:')).toBeInTheDocument()
  })

  test('should render with number of records  ', () => {
    expect(
      screen.getByText('Total Records: ' + mockPaySlips.length),
    ).toBeInTheDocument()
  })
})
