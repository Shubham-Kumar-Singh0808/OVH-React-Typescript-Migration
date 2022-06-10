import { ApiLoadingState } from '../../../middleware/api/apiList'

export type EmployeeCertificationDetail = {
  id: number
  code: string
  name: string
  completedDate: string
  expiryDate: string | null
  skill: string | null
  percent: string | null
  description: string | null
  employeeId: number
  technology: string | null
  certificateType: string | null
}

export type EmployeeCertificate = {
  id: number | null
  empName: string
  employeeId: 1092
  skilldtos: null
  visaDetailsDtos: null
  certificationDtos: EmployeeCertificationDetail[]
}

export type CertificateListApiProps = {
  endIndex?: number
  multipleSearch?: string
  selectedCertificate?: string
  selectionTechnology?: string
  startIndex?: number
}

export type CertificatesListSliceState = {
  employeeCertificationList: EmployeeCertificate[]
  listSize: number
  isLoading: ApiLoadingState
}

export type GetEmployeeCertificateResponse = {
  list: EmployeeCertificate[]
  listsize: number
}
