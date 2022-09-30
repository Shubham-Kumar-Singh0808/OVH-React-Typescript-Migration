import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EmployeeReporteesEntryTable from './EmployeeReporteesEntryTable'
import { cleanup, render, screen } from '../../../test/testUtils'
import { mockReporteesKRAs } from '../../../test/data/employeeReporteesData'

describe('Employee Reportees Table Component Testing', () => {
  beforeEach(() => {
    render(<EmployeeReporteesEntryTable />, {
      preloadedState: {
        employeeReportees: {
          employeeReporteesKRAs: mockReporteesKRAs,
        },
      },
    })
  })
  afterEach(cleanup)

  test('should render number of records', () => {
    expect(
      screen.getByText('Total Records: ' + mockReporteesKRAs.length),
    ).toBeInTheDocument()
  })
  test('should render with data ', () => {
    expect(screen.getByText('Accounts')).toBeInTheDocument()
    expect(screen.getByText('30')).toBeInTheDocument()
    expect(
      screen.getByText('Finance and Account Executive'),
    ).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
  })
  test('should open modal when clicking on plus icon', () => {
    const linkElement = screen.getByTestId('plus-icon')
    userEvent.click(linkElement)
    expect(linkElement).toBeTruthy()
  })
})
