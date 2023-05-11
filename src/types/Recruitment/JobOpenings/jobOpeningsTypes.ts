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
  getJobOpeningById: GetAllJobVacanciesList
  getJobVacancyAuditList: JobVacancyAuditList[]
  getJobVacancyAudit: JobVacancyAuditList
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

export type JobVacancyAuditList = {
  id: null
  jobCode: string
  positionVacant: string
  minimumExperience: string
  description: string
  opendDate: string
  expiryDate: string
  noOfRequirements: string
  offered: string
  remaining: null
  status: string
  oldjobCode: null
  oldpositionVacant: null
  oldminimumExperience: null
  olddescription: null
  oldopendDate: null
  oldexpiryDate: null
  oldnoOfRequirements: null
  oldoffered: null
  oldremaining: null
  modifiedDate: string
  modifiedBy: string
  persistType: string
  columnName: null
  oldStatus: null
}

export type JobVacancyAudit = {
  size: number
  list: JobVacancyAuditList[]
}

export type JobOpeningsTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  searchInput: string
  selectRadioAction: string
  setToggle: React.Dispatch<React.SetStateAction<string>>
  setEditJobInfo: React.Dispatch<React.SetStateAction<GetAllJobVacanciesList>>
}
