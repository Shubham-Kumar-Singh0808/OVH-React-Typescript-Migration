import { ApiLoadingState } from '../../../middleware/api/apiList'

export type CompaniesListTableProps = {
  endIndex: number
  searchCompany: string
  selectionTechnology: string
  startIndex: number
}

export type CompaniesListResponse = {
  companyNmae: string
  candidatesCount: number
  employeesCount: number
}

export type CompaniesListTotalInfo = {
  size: number
  list: CompaniesListResponse[]
}

export type CompaniesListSliceState = {
  isLoading: ApiLoadingState
  listSize: number
  companiesListResponseDetails: CompaniesListResponse
  companiesListData: CompaniesListResponse[]
  CandidatesInfoListResponseDetails: CandidatesInfoList
  CandidatesInfoListData: CandidatesInfoList[]
}

export type CompaniesListProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type ExportBtnTypes = {
  companySearch: string
  selectionTechnology: string
  token?: string
}

export type hyperLinkProps = {
  companyName: string
  endIndex: number
  selectionTechnology: string
  startIndex: number
}
export type AppliedFor = {
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
export type SourceLookUp = {
  sourceName: string
  sourceType: string
  displayOrder: null
  sourceLookUpId: number
}
export type Country = {
  id: number
  name: string
  mobileCode: string
  countryCode: string
}
export type CandidatesInfoList = {
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
  appliedFor: AppliedFor
  sourcelookUp: SourceLookUp
  documentList: []
  skillData: null
  appliedForVacancy: string
  resumePath: null
  otherDocumentPath: null
  cadidateInterviewStatus: string
  recruiter: string
  technology: string
  updatedDate: null
  addedDate: null
  countryId: null
  country: Country
}
export type AllCandidatesDetails = {
  size: number
  list: CandidatesInfoList[]
}

export type linkProps = {
  companyName: string
  endIndex: number
  startIndex: number
}
