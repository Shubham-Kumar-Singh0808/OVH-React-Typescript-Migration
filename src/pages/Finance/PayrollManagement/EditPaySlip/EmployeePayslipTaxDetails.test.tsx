import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import EmployeePayslipTaxDetails from './EmployeePayslipTaxDetails'
import { render, screen } from '../../../../test/testUtils'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockCurrentPayslip } from '../../../../test/data/payrollManagementData'

const mockSetTogglePage = jest.fn()

describe('Allocate Employee without data', () => {
  beforeEach(() => {
    render(
      <EmployeePayslipTaxDetails
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
    expect(screen.getByText('Medicliam:')).toBeInTheDocument()
    expect(screen.getByText('ESI:')).toBeInTheDocument()
    expect(screen.getByText('EPF:')).toBeInTheDocument()
    expect(screen.getByText('Adv Arrears:')).toBeInTheDocument()
    expect(screen.getByText('ERC:')).toBeInTheDocument()
    expect(screen.getByText('Tax Deduction at Source:')).toBeInTheDocument()
    expect(screen.getByText('Professional Tax:')).toBeInTheDocument()
    expect(screen.getByText('Arrears:')).toBeInTheDocument()
    expect(screen.getByText('Incentive:')).toBeInTheDocument()
    expect(screen.getByText('Vpayable:')).toBeInTheDocument()
    expect(screen.getByText('Net Salary:')).toBeInTheDocument()
    expect(screen.getByText('Gratuity:')).toBeInTheDocument()
    expect(screen.getByText('Remarks:')).toBeInTheDocument()
    expect(screen.getByText('Month:')).toBeInTheDocument()
    expect(screen.getByText('Year:')).toBeInTheDocument()
    expect(screen.getByText('Donation:')).toBeInTheDocument()
  })
  test('should able to donation field', () => {
    const donationInput = screen.getByTestId('donation')
    userEvent.type(donationInput, '0')
  })

  test('should able to remarks  field', () => {
    const remarksInput = screen.getByTestId('remarks')
    userEvent.type(remarksInput, 'test')
  })
  test('should  able to gratuity field', () => {
    const gratuityInput = screen.getByTestId('gratuity')
    userEvent.type(gratuityInput, '200')
  })
  test('should able  to netSalary field', () => {
    const netSalaryInput = screen.getByTestId('netSalary')
    userEvent.type(netSalaryInput, '20000')
  })
  test('should able to  vpayable field', () => {
    const vpayableInput = screen.getByTestId('vpayable')
    userEvent.type(vpayableInput, '0')
  })

  test('should able to incentive field', () => {
    const incentiveInput = screen.getByTestId('incentive')
    userEvent.type(incentiveInput, '0')
  })

  test('should able to   field', () => {
    const medicliamInput = screen.getByTestId('medicliam')
    userEvent.type(medicliamInput, '0')
  })
  test('should able to esi field', () => {
    const esiInput = screen.getByTestId('esi')
    userEvent.type(esiInput, '0')
  })
  test('should able to epf field', () => {
    const epfInput = screen.getByTestId('epf')
    userEvent.type(epfInput, '0')
  })
  test('should able to advArrears field', () => {
    const advArrearsInput = screen.getByTestId('advArrears')
    userEvent.type(advArrearsInput, '500')
  })
  test('should able to erc field', () => {
    const ercInput = screen.getByTestId('erc')
    userEvent.type(ercInput, '0')
  })
  test('should able to taxDeductionScheme field', () => {
    const taxDeductionSchemeInput = screen.getByTestId('taxDeductionScheme')
    userEvent.type(taxDeductionSchemeInput, '0')
  })
  test('should able to professionalTax field', () => {
    const professionalTaxInput = screen.getByTestId('professionalTax')
    userEvent.type(professionalTaxInput, '200')
  })
  test('should able to arrears field', () => {
    const arrearsInput = screen.getByTestId('arrears')
    userEvent.type(arrearsInput, '0')
  })
})
