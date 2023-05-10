import { ApiLoadingState } from '../../../middleware/api/apiList'

export type GetAllJobVacanciesProps = {
  endIndex: number
  searchJobTitle: string
  startIndex: number
  status: string
}
export type GetAllJobVacanciesList = {
  id: number
  jobCode: string
  positionVacant: string
  minimumExperience: string
  description: string
  opendDate: string
  expiryDate: string
  noOfRequirements: number
  offered: number
  remaining: number
  status: string
}
export type GetAllJobVacancies = {
  size: number
  list: GetAllJobVacanciesList[]
}
export type GetAllTechnology = {
  id: number
  name: string
}

export type JobOpeningsSliceState = {
  isLoading: ApiLoadingState
  getAllTechnology: GetAllTechnology[]
  getAllJobVacancies: GetAllJobVacanciesList[]
  listSize: number
}

export type JobVacancy = {
  description: string
  expiryDate: string
  jobCode: string
  minimumExperience: string
  noOfRequirements: string
  positionVacant: string
  status: string
}
