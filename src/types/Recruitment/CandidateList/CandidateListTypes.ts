import { ApiLoadingState } from '../../../middleware/api/apiList'

export type CandidateListTableProps = {
  endIndex: number
  searchStr: string
  startIndex: number
}
export type CandidateAppliedForList = {
  id: number
  jobCode: string
  positionVacant: string
  minimumExperience: string
  description: string
  opendDate: string
  expiryDate: null | string
  noOfRequirements: number
  offered: number
  remaining: number
  status: string
}
export type sourceLookUp = {
  sourceName: string
  sourceType: string
  displayOrder: null
  sourceLookUpId: number
}
export type country = {
  id: number
  name: string
  mobileCode: string
  countryCode: string
}
export type CandidateLists = {
  personId: number
  firstName: string
  lastName: string
  middleName: null
  fullName: string
  mobile: string
  phone: null
  email: string
  qualification: null
  dob: string
  skypeId: null
  currentEmployer: string
  currentLocation: null
  createdDate: null
  addressDto: null
  id: null
  experience: string
  skills: string
  appliedFor: CandidateAppliedForList
  sourcelookUp: sourceLookUp
  documentList: []
  skillData: null
  appliedForVacancy: string
  resumePath: null | string
  otherDocumentPath: null
  cadidateInterviewStatus: string
  recruiter: string
  technology: string
  updatedDate: null
  addedDate: null
  countryId: null
  country: country
}

export type CandidateTotalInfo = {
  size: number
  list: CandidateLists[]
}
export type CandidateListSliceState = {
  isLoading: ApiLoadingState
  listSize: number
  candidateDetails: CandidateLists
  allCandidateDetails: CandidateLists[]
  allCountryDetails: country
  empCountries: country[]
  getAllTechnology: GetAllTechnology[]
}
export type GetAllTechnology = {
  id: number
  name: string
}
export type TableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  searchInput: string
}

export type viewHandlerProps = {
  candidateStatus: string
  endIndex: number
  selectionCountry: number
  selectionTechnology: string
  startIndex: number
}
