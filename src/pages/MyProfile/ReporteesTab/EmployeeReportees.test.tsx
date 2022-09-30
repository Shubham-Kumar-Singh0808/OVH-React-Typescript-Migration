import '@testing-library/jest-dom'
import React from 'react'
import EmployeeReporteesList from './EmployeeReporteesList'
import { render, screen } from '../../../test/testUtils'

describe('Employee Reportees Component Testing', () => {
  render(<EmployeeReporteesList />, {
    preloadedState: {},
  })
  test('should render Employee Reportees component with out crashing', () => {
    expect(screen.getByText('Manager Reportees')).toBeInTheDocument()
  })
})
