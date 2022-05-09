import { ValidationErrorType } from '../../types/commonTypes'

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

export type EmployeeQualificationModel = {
  qualificationDetails: EmployeeQualifications
  certificationDetails: EmployeeCertifications[]
  SkillDetails: EmployeeSkills[]
  isLoading: boolean
  error: ValidationErrorType
}
