import { LoadingState, ValidationError } from '../commonTypes'

export type Handbook = {
  id: number
  displayOrder: number
  title: string
  description: string
  pageName: string
  departmentName: string
  departmentId: number
  type: string
  sectionId: string
  sectionName: string
  country: string
  handCountry: HandCountry[]
  empCountry: string
}

export type GetHandbooksResponse = {
  hanbooks: Handbook[]
}

type HandCountry = {
  id: number
  name: string
}

export type EmployeeHandbooksState = {
  handbooksList: GetHandbooksResponse[]
  isLoading: LoadingState
  error: ValidationError
}
