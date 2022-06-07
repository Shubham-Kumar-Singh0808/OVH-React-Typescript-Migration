import { LoadingState, ValidationError } from '../../../commonTypes'

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
export type EmployeeQualificationSliceState = {
  qualificationDetails: EmployeeQualifications
  pgLookUpAndGraduationLookUpDetails: PostGraduationAndGraduationList
  isLoading: LoadingState
  error: ValidationError
}
