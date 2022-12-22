import { ApiLoadingState } from '../../../../../middleware/api/apiList'

export type ChangeRequestList = {
  size: number
  list: ChangeRequest[]
}

export type ChangeRequest = {
  id: number
  name: string
  descripition: string
  duration: string
  projectId: number
  numbersStatus: boolean
}

export type ChangeRequestSliceState = {
  changeRequestList: ChangeRequestList
  isLoading: ApiLoadingState
}

export type ChangeRequestProps = {
  endIndex: number
  startIndex: number
  projectid: number
}
