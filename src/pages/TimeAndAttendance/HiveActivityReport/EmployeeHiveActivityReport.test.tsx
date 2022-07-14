import '@testing-library/jest-dom'

import React from 'react'
import EmployeeHiveActivityReport from './EmployeeHiveActivityReport'
import { render, screen } from '../../../test/testUtils'
import { mockEmployeeHiveActivityReport } from '../../../test/data/hiveActivityEmployeeManagerReportData'

describe('Employee Hive Activity Report Table Component Testing', () => {
  test('should render employee hive activity report without crashing', () => {
    render(<EmployeeHiveActivityReport />, {
      preloadedState: {
        hiveActivityReport: {
          employeeHiveActivityReport: mockEmployeeHiveActivityReport,
        },
      },
    })
    mockEmployeeHiveActivityReport.activityTimes.forEach((currentActivity) =>
      expect(screen.getByText(currentActivity.dayofMonth)).toBeInTheDocument(),
    )
    expect(screen.getByText('Total')).toBeInTheDocument()
  })
})
