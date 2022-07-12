import { LoadingState, ValidationError } from '../commonTypes'

export type Handbook = {
  id: number
  displayOrder: number
  title: string
  description: string | null
  pageName: string
  departmentName: string | null
  departmentId: number | null
  type: string
  sectionId: string | null
  sectionName: string | null
  country: string | null
  handCountry: HandCountry[]
  empCountry: string | null
}

export type mockHandbook = {
  id: number
  displayOrder: number
  title: string
  description: string | null
  pageName: string
  departmentName: string | null
  departmentId: number | null
  type: string
  sectionId: string | null
  sectionName: string | null
  country: string | null
  handCountry: HandCountry[]
  empCountry: string | null
}

export type HandbooksListProps = {
  handbooks: Handbook[]
  inputText: string
}

export type showHandbookApiProps = {
  pageName: string
}

type HandCountry = {
  id: number
  name: string
}

export type EmployeeHandbooksState = {
  handbooksList: Handbook[]
  isLoading: LoadingState
  error: ValidationError
}

export type showHandbookState = {
  handbook: Handbook
  isLoading: LoadingState
  error: ValidationError
}
