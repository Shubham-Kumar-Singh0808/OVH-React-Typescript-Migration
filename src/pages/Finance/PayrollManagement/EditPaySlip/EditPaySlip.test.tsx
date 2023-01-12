import '@testing-library/jest-dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import EditPaySlip from './EditPaySlip'
import { render, screen } from '../../../../test/testUtils'

describe('Edit BankAccount without data', () => {
  beforeEach(() => {
    render(
      <EditPaySlip
        toEditPayslip={{
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
    )
  })

  test('should be able to render  Edit   Title', () => {
    expect(screen.getByText('Edit Payslip')).toBeInTheDocument()
  })

  test('should be able to click Edit button element', () => {
    const updateBtn = screen.getByRole('button', { name: 'Update' })
    userEvent.click(updateBtn)
    expect(updateBtn).toBeInTheDocument()
  })
})
