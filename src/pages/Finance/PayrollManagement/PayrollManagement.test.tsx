import '@testing-library/jest-dom'
import React from 'react'
import PayrollManagement from './PayrollManagement'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCurrentPayslip } from '../../../test/data/payrollManagementData'
import { CurrentPayslip } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

describe('Payroll Management component with data', () => {
  beforeEach(() => {
    render(<PayrollManagement />, {
      preloadedState: {
        payrollManagement: {
          listSize: 22,
          isLoading: ApiLoadingState.succeeded,
          paySlipList: mockCurrentPayslip,
          editPayslip: {} as CurrentPayslip,
          excelData: [],
          uploadExcelFile: [],
        },
        userAccessToFeatures: {
          userAccessToFeatures: mockUserAccessToFeaturesData,
        },
      },
    })
  })
  test('should be able to render Payroll Management  Title', () => {
    expect(screen.getByText('Payroll Management')).toBeInTheDocument()
  })
})
