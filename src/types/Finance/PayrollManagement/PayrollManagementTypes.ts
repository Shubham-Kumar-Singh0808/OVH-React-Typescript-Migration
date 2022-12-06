import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../commonTypes'

export type CurrentPayslip = {
  paySlipId: number
  employeeId: number
  designation: string
  joiningDate: string
  name: string
  accountNo: string
  grossSalary: string
  variablePayPercentage: string
  variablePay: string
  grossSalAfterVariablepay: string
  basicSalary: string
  houseRentAllowance: string
  transportAllowance: string
  otherAllowance: string
  absent: string
  lossOfPay: string
  medicliam: string
  esi: string
  epf: string
  gratuity: string
  erc: string
  taxDeductionScheme: string
  professionalTax: string
  arrears: string
  advArrears: string
  incentive: string
  vpayable: string
  netSalary: string
  month: string
  sumOfLeaves: number
  totalDeductions: number
  perDaySal: null
  leaveWithOutPay: number
  noOfDaysInMonth: number
  totalWorkingDays: number
  allowences: number
  year: string
  remarks: string
  status: boolean
  pfAccountNumber: string
  panNumber: string
  bankName: string
  dateOfBirth: string
  uaNumber: string
  mealsCard: string
  donation: string
  specificDesignation: null
}

export type GetPaySlipReportResponse = {
  size: number
  list: CurrentPayslip[]
}

export type GetPayRollProps = {
  endIndex: number
  startIndex: number
  month: string
  year: number
}

export type PayRollManagementSliceState = {
  isLoading: ApiLoadingState
  currentPaySlipData: GetPaySlipReportResponse
  error: ValidationError
  listSize: number
  paySlipInfo: CurrentPayslip[]
}

export type DownloadExcelFile = {
  fileName?: string
  tenantKey?: string
  token?: string
  className?: string
}
