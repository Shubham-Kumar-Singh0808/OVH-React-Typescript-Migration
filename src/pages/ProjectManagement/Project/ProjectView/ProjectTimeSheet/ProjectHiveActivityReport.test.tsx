import '@testing-library/jest-dom'

import React from 'react'
import ProjectHiveActivityReport from './ProjectHiveActivityReport'
import { mockEmployeeHiveActivityReport } from '../../../../../test/data/hiveActivityEmployeeManagerReportData'
import { render, screen } from '../../../../../test/testUtils'

describe('Employee Hive Activity Report Table Component Testing', () => {
  test('should render employee hive activity report without crashing', () => {
    render(<ProjectHiveActivityReport />, {
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
