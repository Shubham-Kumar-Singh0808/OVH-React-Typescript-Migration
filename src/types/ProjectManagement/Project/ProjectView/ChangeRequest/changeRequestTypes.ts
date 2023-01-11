import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type ChangeRequestList = {
  size: number
  list: ChangeRequest[]
}

export type ChangeRequest = {
  id: number
  name: string
  descripition?: string
  duration: string
  projectId: number
  numbersStatus: boolean
}

export type ChangeRequestSliceState = {
  changeRequestList: ChangeRequestList
  isLoading: ApiLoadingState
  currentPage: number
  pageSize: number
}

export type ChangeRequestProps = {
  endIndex: number
  firstIndex: number
  projectid: string
}

export type AddChangeRequestProps = {
  descripition: string
  duration: string
  name: string
  projectId: string
}
