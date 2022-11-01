import '@testing-library/jest-dom'
import React from 'react'
import EmployeeReportees from './EmployeeReportees'
import { render, screen } from '../../../test/testUtils'

describe('Employee Reportees Component Testing', () => {
  render(<EmployeeReportees />, {
    preloadedState: {},
  })
  test('should render Employee Reportees component with out crashing', () => {
    expect(screen.getByText('Manager Reportees')).toBeInTheDocument()
  })
})
