import { LoadingState, ValidationError } from '../../commonTypes'

export type JobOpeningsApiProps = {
  startIndex?: number
  endIndex?: number
  searchJobTitle?: string
  status?: string
}

export type JobOpeningsDetails = {
  description: string
  expiryDate: string
  id: number
  jobCode: string
  minimumExperience: string
  noOfRequirements: number
  offered: number
  opendDate: string
  positionVacant: string
  remaining: number
  status: string
}

export type JobVacanciesResponse = {
  list: JobOpeningsDetails[]
  size: number
}

export type JobOpeningsSliceState = {
  jobVacancies: JobOpeningsDetails[]
  listSize: number
  isLoading: LoadingState
  error: ValidationError
}
