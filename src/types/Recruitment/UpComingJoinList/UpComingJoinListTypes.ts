import { LoadingState } from '../../commonTypes'

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

export type GetUpComingJoineeList = {
  size: number
  list: UpComingJoineeList[]
}

export type UpComingJoineeListSliceState = {
  upComingJoineeListDetails: UpComingJoineeList[]
  getUpComingJoineeList: GetUpComingJoineeList
  listSize: number
  isLoading: LoadingState
  getJoineeById: GetJoineeById
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
}

export type GetJoineeById = {
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
  attachedDocumentPath: string
  experience: string
  candidateEmail: string
  dateOfBirth: string
  candidateId: string
  technology: string
  candidateInterviewStatus: null
  departmentName: string
  mobile: string
  sendOfferMessagetoCandidate: null
}
export type Label = {
  htmlFor: string
  className: string
}
export interface DynamicFormLabelProps {
  dynamicFormLabelProps: (htmlFor: string, className: string) => Label
}
export interface UsernameChangeHandlerProp extends DynamicFormLabelProps {
  // usernameChangeHandler: (username: string) => void
  onAllowedUserChangeHandler: (username: string) => void
  username: string
  isUserAllowed: boolean
  userEmployeeName: string
  setUserEmployeeName: React.Dispatch<React.SetStateAction<string>>
}

export interface DateOfJoiningChangeHandlerProp extends DynamicFormLabelProps {
  onDateChangeHandler?: (e: Date) => void
  employeeDateOfJoining: string
  setEmployeeDateOfJoining: React.Dispatch<React.SetStateAction<string | Date>>
}

export interface EmployeeFullNameChangeHandlerProp
  extends DynamicFormLabelProps {
  // firstNameChangeHandler: (firstName: string) => void
  // lastNameChangeHandler: (lastName: string) => void
  middleNameChangeHandler: (middleName: string) => void
  firstNameValue: string
  lastNameValue: string
  middleNameValue: string
  // setUserEmployeeName: React.Dispatch<React.SetStateAction<string>>
  setNewEmployeeFullName: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}
