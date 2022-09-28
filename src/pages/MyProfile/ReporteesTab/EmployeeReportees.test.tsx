import '@testing-library/jest-dom'
import React from 'react'
import EmployeeReportees from './EmployeeReportees'
import { render, screen } from '../../../test/testUtils'
import { mockReporteesDetails } from '../../../test/data/employeeReporteesData'

describe('Employee Reportees Component Testing', () => {
  render(<EmployeeReportees />, {
    preloadedState: {
      employeeReportees: {
        employeeReportees: mockReporteesDetails,
      },
    },
  })
  test('should render employee Reportees component with out crashing', () => {
    expect(screen.getByText('Manager Reportees')).toBeInTheDocument()
  })
})
