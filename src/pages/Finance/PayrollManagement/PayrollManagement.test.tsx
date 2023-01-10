import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
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
  test('should render with data ', () => {
    expect(screen.getByText('Select Month:')).toBeInTheDocument()
    expect(screen.getByText('Select Year:')).toBeInTheDocument()
  })
  test('should select Month', () => {
    const selectMonth = screen.getByTestId('form-select1')
    userEvent.selectOptions(selectMonth, ['January'])
    expect(selectMonth).toHaveValue('January')
  })
})
