import { ValidationError } from '../../commonTypes'

export type PostGraduationAndGraduationLookUp = {
  id: string
  label: string
}
export type EmployeeQualifications = {
  id: number | string
  empId: number | string
  pgLookUp: PostGraduationAndGraduationLookUp[]
  graduationLookUp: PostGraduationAndGraduationLookUp[]
  hscName: string
  sscName: string
  others: string
}

export type EmployeeCertifications = {
  certificateType: string
  technology: string
  code: string
  completedDate: string
  expiryDate: string
  percent: string
  description: string
  name: string
}

export type EmployeeSkills = {
  categoryType: string
  skillType: string
  competency: string
  expMonth: string
  expYear: string
}
export type QualificationProps = {
  addButtonHandler?: () => void
  backButtonHandler?: () => void
  isEmployeeQualificationExist?: boolean
}
export type AddUpdateEmployeeQualificationProps = {
  addButtonHandler?: () => void
  backButtonHandler: () => void
  isEmployeeQualificationExist?: boolean
}
export type PostGraduationAndGraduationList = {
  graduationDetails: PostGraduationAndGraduationLookUp[]
  pgDetails: PostGraduationAndGraduationLookUp[]
}
export type EmployeeQualificationDetails = {
  qualificationDetails: EmployeeQualifications
  certificationDetails: EmployeeCertifications[]
  skillDetails: EmployeeSkills[]
  pgLookUpAndGraduationLookUpDetails: PostGraduationAndGraduationList
  isLoading: boolean
  error: ValidationError
}
