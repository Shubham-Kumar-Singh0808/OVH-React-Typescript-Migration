import { ValidationError } from '../../commonTypes'

export type PgAndGraduationLookUpType = {
  id: number
  label: string
}
export type EmployeeQualificationsType = {
  pgLookUp: PgAndGraduationLookUpType[]
  graduationLookUp: PgAndGraduationLookUpType[]
  hscName: string
  sscName: string
  others: string
}

export type CertificationDetailsType = {
  certificateType: string
  technology: string
  code: string
  completedDate: string
  expiryDate: string
  percent: string
  description: string
  name: string
}

export type SkillDetailsType = {
  categoryType: string
  skillType: string
  competency: string
  expMonth: string
  expYear: string
}

export type EmployeeQualificationStateType = {
  qualificationDetails: EmployeeQualificationsType
  certificationDetails: CertificationDetailsType[]
  SkillDetails: SkillDetailsType[]
  isLoading: boolean
  error: ValidationError
}

export interface EmployeeSkillInfo {
  striped: boolean
  bordered: boolean
  tableClassName: string
  isFieldDisabled: boolean
}
