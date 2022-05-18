import { ValidationError } from '../../commonTypes'

export type EmployeeCertificationProps = {
  isEditCertificationDetails?: boolean
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
}

export type EmployeeCertifications = {
  id?: number | string
  technologyId?: string
  technologyName?: string
  employeeId?: number | string
  certificateType: string
  technology: string
  code: string
  completedDate?: string
  expiryDate?: string
  percent: number | string
  description?: string
  name: string
  skill?: null
}

export type EditEmployeeCertificates = {
  id: number
  certificateType: string
  code: string
  completedDate: string
  description: string
  employeeId: number | string
  expiryDate: string
  name: string
  percent: number | string
  skill: null
  technology: string
}
export type EmployeeCertificationTableProps = {
  editCertificateButtonHandler: (id: number) => void
}

export type getAllTechnologyLookUp = {
  id: number
  name: string
}
export type getCertificateType = {
  id: number
  technologyId: number
  technologyName: string
  certificateType: string
  technology: string
}
export type CertificationState = {
  getAllTechnologies: getAllTechnologyLookUp[]
  typeOfCertificate: getCertificateType[]
  certificationDetails: EmployeeCertifications[]
  editCertificateDetails: EditEmployeeCertificates
  isLoading: boolean
  error: ValidationError
}
