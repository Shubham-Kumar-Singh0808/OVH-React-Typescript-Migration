import '@testing-library/jest-dom'

import React from 'react'
import EmployeeTimeInOfficeReport from './EmployeeTimeInOfficeReport'
import { render, screen } from '../../../test/testUtils'
import { mockEmployeeReport } from '../../../test/data/timeInOfficeEmployeeManagerReportData'

describe('Employee Time Report Table Component Testing', () => {
  test('should render employee time in office report without crashing', () => {
    render(<EmployeeTimeInOfficeReport />, {
      preloadedState: {
        timeInOfficeReport: {
          timeInOfficeEmployeeReport: mockEmployeeReport,
        },
      },
    })

    expect(screen.getByText('Total')).toBeInTheDocument()
  })
})
