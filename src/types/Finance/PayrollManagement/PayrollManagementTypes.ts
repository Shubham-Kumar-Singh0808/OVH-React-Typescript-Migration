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
  uplaodExcelFile: ReadExcelFile[]
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
  serialNo: 1.0
  paySlipId: null
  employeeId: 1987
  designation: 'test'
  joiningDate: '1/20/22'
  name: 'Employee'
  accountNo: 'test'
  grossSalary: 20000
  variablePayPercentage: 5
  variablePay: 2000
  grossSalAfterVariablepay: 18000
  basicSalary: 10000
  houseRentAllowance: 3000
  transportAllowance: 0
  otherAllowance: 0
  absent: 0
  lossOfPay: 0
  medicliam: 0
  esi: 0
  epf: 0
  gratuity: 200
  erc: 0
  taxDeductionScheme: 0
  professionalTax: 200
  arrears: 0
  advArrears: 500
  incentive: 0
  vpayable: 0
  netSalary: 20000
  month: null
  year: null
  remarks: 'test'
  status: null
  mealsCard: 0
  donation: 0
  specificDesignation: null
}
