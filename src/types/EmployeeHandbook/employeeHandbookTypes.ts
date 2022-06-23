import { LoadingState, ValidationError } from '../commonTypes'

export type GetHandbooksResponse = {
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

type HandCountry = {
  id: number
  name: string
}

export type EmployeeHandbooksState = {
  handbooksList: GetHandbooksResponse[]
  isLoading: LoadingState
  error: ValidationError
}
