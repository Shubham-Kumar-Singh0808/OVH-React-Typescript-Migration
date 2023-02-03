import '@testing-library/jest-dom'

import React from 'react'
import ViewPaySlip from './ViewPaySlip'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { CurrentPayslip } from '../../../../types/Finance/PayrollManagement/PayrollManagementTypes'

describe('Employee Accounts Table Component Testing', () => {
  beforeEach(() => {
    render(
      <ViewPaySlip
        selectedPaySlipDetails={{
          paySlipId: 0,
          employeeId: 0,
          designation: '',
          joiningDate: '',
          name: '',
          accountNo: '',
          grossSalary: '',
          variablePayPercentage: '',
          variablePay: '',
          grossSalAfterVariablepay: '',
          basicSalary: '',
          houseRentAllowance: '',
          transportAllowance: '',
          otherAllowance: '',
          absent: '',
          lossOfPay: '',
          medicliam: '',
          esi: '',
          epf: '',
          gratuity: '',
          erc: '',
          taxDeductionScheme: '',
          professionalTax: '',
          arrears: '',
          advArrears: '',
          incentive: '',
          vpayable: '',
          netSalary: '',
          month: '',
          sumOfLeaves: 0,
          totalDeductions: 0,
          perDaySal: null,
          leaveWithOutPay: 0,
          noOfDaysInMonth: 0,
          totalWorkingDays: 0,
          allowences: 0,
          year: '',
          remarks: '',
          status: false,
          pfAccountNumber: '',
          panNumber: '',
          bankName: null,
          dateOfBirth: '',
          uaNumber: '',
          mealsCard: '',
          donation: '',
          specificDesignation: null,
        }}
      />,
      {
        preloadedState: {
          payrollManagement: {
            editPayslip: {} as CurrentPayslip,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      },
    )
  })
  test('Should be able to see table titles', () => {
    expect(screen.getByText('PAYSLIP')).toBeInTheDocument()
    expect(screen.getByText('Name of the Employee')).toBeInTheDocument()
    expect(screen.getByText('No of Days in the Month')).toBeInTheDocument()
    expect(screen.getByText('Designation')).toBeInTheDocument()
    expect(screen.getByText('Employee ID')).toBeInTheDocument()
    expect(screen.getByText('LEAVES AVAILED')).toBeInTheDocument()
    expect(screen.getByText('Date of Joining')).toBeInTheDocument()
    expect(screen.getByText('Month')).toBeInTheDocument()
  })
})
