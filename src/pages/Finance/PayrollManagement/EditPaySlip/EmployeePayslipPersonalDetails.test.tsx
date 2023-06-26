import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployeePayslipPersonalDetails from './EmployeePayslipPersonalDetails'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockCurrentPayslip } from '../../../../test/data/payrollManagementData'

const mockSetTogglePage = jest.fn()

describe('Allocate Employee without data', () => {
  beforeEach(() => {
    render(
      <EmployeePayslipPersonalDetails
        toEditPayslipCopy={{
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
        onChangeInputHandler={mockSetTogglePage}
        isDesignationReadonly={true}
      />,
      {
        preloadedState: {
          payrollManagement: {
            editPayslip: mockCurrentPayslip,
            isLoading: ApiLoadingState.succeeded,
          },
        },
      },
    )
  })
  test('should render component with out crashing', () => {
    expect(screen.getByText('Name:')).toBeInTheDocument()
    expect(screen.getByText('Employee Id:')).toBeInTheDocument()
    expect(screen.getByText('Designation:')).toBeInTheDocument()
    expect(screen.getByText('DOJ:')).toBeInTheDocument()
    expect(screen.getByText('Account Number:')).toBeInTheDocument()
    expect(screen.getByText('Gross Salary:')).toBeInTheDocument()
    expect(screen.getByText('Variable Pay Percentage:')).toBeInTheDocument()
    expect(screen.getByText('Variable Pay:')).toBeInTheDocument()
    expect(
      screen.getByText('Gross Sal After Variable Pay:'),
    ).toBeInTheDocument()
    expect(screen.getByText('Basic Salary:')).toBeInTheDocument()
    expect(screen.getByText('House Rent Allowance:')).toBeInTheDocument()
    expect(screen.getByText('Transport Allowance:')).toBeInTheDocument()
    expect(screen.getByText('Other Allowance:')).toBeInTheDocument()
    expect(screen.getByText('Absent:')).toBeInTheDocument()
    expect(screen.getByText('LOP :')).toBeInTheDocument()
    expect(screen.getByText('Meals Card:')).toBeInTheDocument()
  })
  test('should not able to designationInput field', () => {
    const designationInput = screen.getByTestId(
      'designation-name',
    ) as HTMLInputElement
    expect(designationInput.readOnly).toBe(true)
  })

  test('should able to accountNoInput  field', () => {
    const accountNoInput = screen.getByTestId('accountNo')
    userEvent.type(accountNoInput, 'test')
  })
  test('should  able to grossSalaryInput field', () => {
    const grossSalaryInput = screen.getByTestId('grossSalary')
    userEvent.type(grossSalaryInput, '20000')
  })
  test('should able  to variablePayPercentageInput field', () => {
    const variablePayPercentageInput = screen.getByTestId(
      'variablePayPercentage',
    )
    userEvent.type(variablePayPercentageInput, '5')
  })
  test('should able to  variablePayInput field', () => {
    const variablePayInput = screen.getByTestId('variablePay')
    userEvent.type(variablePayInput, '2000')
  })

  test('should able to basicSalaryInput field', () => {
    const basicSalaryInput = screen.getByTestId('basicSalary')
    userEvent.type(basicSalaryInput, '10000')
  })

  test('should able to houseRentAllowance field', () => {
    const houseRentAllowanceInput = screen.getByTestId('houseRentAllowance')
    userEvent.type(houseRentAllowanceInput, '3000')
  })

  test('should able to transportAllowance field', () => {
    const transportAllowanceInput = screen.getByTestId('transportAllowance')
    userEvent.type(transportAllowanceInput, '0')
  })
  test('should able to otherAllowance field', () => {
    const otherAllowanceInput = screen.getByTestId('otherAllowance')
    userEvent.type(otherAllowanceInput, '0')
  })
  test('should able to absent field', () => {
    const absentInput = screen.getByTestId('absent')
    userEvent.type(absentInput, '0')
  })
  test('should able to lossOfPay field', () => {
    const lossOfPayInput = screen.getByTestId('lossOfPay')
    userEvent.type(lossOfPayInput, '0')
  })
  test('should able to mealsCard field', () => {
    const mealsCardInput = screen.getByTestId('mealsCard')
    userEvent.type(mealsCardInput, '0')
  })
})
