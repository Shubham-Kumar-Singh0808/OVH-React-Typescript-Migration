import { ValidationError, LoadingState } from '../commonTypes'

export interface GetChecklistParams {
  endIndex: number
  startIndex: number
}

export interface IncomingChecklistItem {
  id: number
  title: string
  description: string
  pageName: string
  departmentName: string
  departmentId: number
  type: string
  sectionId: null
  sectionName: null
  userName: string
  createdDate: null
  updatedDate: number
}

export interface IncomingCheckList {
  size: number
  list: IncomingChecklistItem[]
}

export interface CheckListSliceState {
  isLoading: LoadingState
  error: ValidationError
  incomingChecklist: IncomingCheckList
  checklistParams: GetChecklistParams
  clickedChecklistTitle: IncomingChecklistItem // this is for the clicked checklist item
}
