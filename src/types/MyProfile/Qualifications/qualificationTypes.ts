import { ValidationError } from '../../commonTypes'

export type PostGraduationAndGraduationLookUp = {
  id: string
  label: string
}
export type EmployeeQualifications = {
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
export type PostGraduationAndGraduationList = {
  graduationDetails: PostGraduationAndGraduationLookUp[]
  pgDetails: PostGraduationAndGraduationLookUp[]
}
export type EmployeeQualificationModel = {
  qualificationDetails: EmployeeQualifications
  certificationDetails: EmployeeCertifications[]
  skillDetails: EmployeeSkills[]
  pgLookUpAndGraduationLookUpDetails: PostGraduationAndGraduationList
  isLoading: boolean
  error: ValidationError
}
