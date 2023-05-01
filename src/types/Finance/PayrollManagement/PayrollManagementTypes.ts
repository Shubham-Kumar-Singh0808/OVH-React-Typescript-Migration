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
  bankName: string | null
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
  paySlipList: GetPaySlipsResponse
  editPayslip: CurrentPayslip
  excelData: ReadExcelFile[]
  uploadExcelFile: ReadExcelFile[]
}

export type DownloadExcelFile = {
  fileName?: string
  tenantKey?: string
  token?: string
  className?: string
}

export type PayRollManagementApiProps = {
  startIndex?: number
  endIndex?: number
  month: string
  searchStringCand: number | string
  year: number
}

export type GetPaySlipsResponse = {
  list: CurrentPayslip[]
  size: number
}

export type ReadExcelFile = {
  serialNo: number
  paySlipId: null
  employeeId: number
  designation: string
  joiningDate: string
  name: string
  accountNo: string
  grossSalary: number
  variablePayPercentage: number
  variablePay: number
  grossSalAfterVariablepay: number
  basicSalary: number
  houseRentAllowance: number
  transportAllowance: number
  otherAllowance: number
  absent: number
  lossOfPay: number
  medicliam: number
  esi: number
  epf: number
  gratuity: number
  erc: number
  taxDeductionScheme: number
  professionalTax: number
  arrears: number
  advArrears: number
  incentive: number
  vpayable: number
  netSalary: number
  month: null
  year: null
  remarks: string
  status: null
  mealsCard: number
  donation: number
  specificDesignation: null
}

export type AddPayslipId = {
  paySlipId: number[]
}
