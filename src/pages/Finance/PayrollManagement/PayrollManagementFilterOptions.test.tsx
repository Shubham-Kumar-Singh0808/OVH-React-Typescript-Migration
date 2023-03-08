import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import PayrollManagementFilterOptions from './PayrollManagementFilterOptions'
import { render, screen } from '../../../test/testUtils'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockCurrentPayslip } from '../../../test/data/payrollManagementData'
import { CurrentPayslip } from '../../../types/Finance/PayrollManagement/PayrollManagementTypes'
import { mockUserAccessToFeaturesData } from '../../../test/data/userAccessToFeaturesData'

const mockHandler = jest.fn()
describe('Payroll Management component with data', () => {
  beforeEach(() => {
    render(
      <PayrollManagementFilterOptions
        selectMonth={''}
        setSelectMonth={mockHandler}
        selectYear={''}
        setSelectYear={mockHandler}
        isPercentageEnable={false}
      />,
      {
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
      },
    )
  })
  test('should render with data ', () => {
    expect(screen.getByText('Select Month:')).toBeInTheDocument()
    expect(screen.getByText('Select Year:')).toBeInTheDocument()
  })
  test('should select Month', () => {
    const selectMonth = screen.getByTestId('form-select1')
    userEvent.selectOptions(selectMonth, ['January'])
    expect(selectMonth).toHaveValue('')
  })
})
