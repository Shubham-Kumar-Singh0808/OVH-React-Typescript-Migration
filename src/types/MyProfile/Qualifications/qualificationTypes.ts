import { ValidationError } from '../../commonTypes'

export type PostGraduationAndGraduationLookUp = {
  id: string
  label: string
}
export type EmployeeQualifications = {
  id?: number | string
  empId?: number | string
  pgLookUp: PostGraduationAndGraduationLookUp[]
  graduationLookUp: PostGraduationAndGraduationLookUp[]
  hscName: string
  sscName: string
  others: string
}

export type EmployeeSkills = {
  categoryType: string
  skillType: string
  competency: string
  expMonth: string
  expYear: string
}
export interface EmployeeSkillInfo {
  striped: boolean
  bordered: boolean
  tableClassName: string
  isFieldDisabled: boolean
}
export type AddBackButtonsProps = {
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
  skillDetails: EmployeeSkills[]
  pgLookUpAndGraduationLookUpDetails: PostGraduationAndGraduationList
  isLoading: boolean
  error: ValidationError
}
