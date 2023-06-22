import { LoadingState } from '../../commonTypes'
import { GetAllTechnology } from '../CandidateList/CandidateListTypes'

export type UpComingJoineeList = {
  id: number
  appliedForLookUp: string
  candidateName: string
  designation: string
  dateOfJoining: string
  currentCTC: string
  employmentType: string
  jobType: string
  status: string
  comments: string
  attachedDocumentPath: null
  experience: string
  candidateEmail: string
  dateOfBirth: null
  candidateId: number
  technology: string | null
  candidateInterviewStatus: string
  departmentName: string | null
  mobile: string
  sendOfferMessagetoCandidate: null
}

export type UpdateUpComingJoineeList = {
  appliedForLookUp: string
  attachedDocumentPath: null
  candidateEmail: string
  candidateId: number
  candidateInterviewStatus: string
  candidateName: string
  comments: string
  currentCTC: string
  dateOfBirth: null
  dateOfJoining: string
  departmentName: string
  designation: string
  employmentType: string
  experience: string
  id: number
  jobType: string
  mobile: string
  sendOfferMessagetoCandidate: null
  status: string
  technology: string
}

export type GetUpComingJoineeList = {
  size: number
  list: UpComingJoineeList[]
}

export type UpComingJoineeListSliceState = {
  upComingJoineeListDetails: UpComingJoineeList[]
  getUpComingJoineeList: GetUpComingJoineeList
  listSize: number
  isLoading: LoadingState
}

export type UpComingJoineeListProps = {
  endIndex: number
  searchName: string
  startIndex: number
}

export type UpComingJoinListTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  searchInput: string
  setSearchInput: React.Dispatch<React.SetStateAction<string | undefined>>
  setToggle: React.Dispatch<React.SetStateAction<string>>
  setEditNewJoineeInfo: React.Dispatch<React.SetStateAction<UpComingJoineeList>>
}
