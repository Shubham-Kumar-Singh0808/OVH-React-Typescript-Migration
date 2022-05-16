import { ValidationError } from '../../commonTypes'

export type EmployeeCertificationProps = {
  isEditCertificationDetails?: boolean
  headerTitle: string
  confirmButtonText: string
  backButtonHandler: () => void
}

export type EmployeeCertifications = {
  id: string
  technologyId?: string
  technologyName?: string
  employeeId?: number | string
  certificateType: string
  technology: string
  code: string
  completedDate: string
  expiryDate: string
  percent: string
  description: string
  name: string
  skill?: null
}

export type EmployeeCertificationTableProps = {
  editCertificateButtonHandler: (technologyName: string) => void
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
}
export type CertificationState = {
  getAllTechnologies: getAllTechnologyLookUp[]
  typeOfCertificate: getCertificateType[]
  isLoading: boolean
  error: ValidationError
}
