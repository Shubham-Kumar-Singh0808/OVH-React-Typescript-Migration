import { ApiLoadingState } from '../../../middleware/api/apiList'
import { ValidationError } from '../../commonTypes'

export type NominationCycleDto = {
  id: number
  cycleName: string
  fromMonth: string
  toMonth: string
  activateFlag: boolean
  startDate: string
  endDate: string
  questionMappingDtos: null
}

export type NominationCycle = {
  cycleName: string
  fromMonth: string
  toMonth: string
  activateFlag: boolean
  startDate: string
  endDate: string
}

export type GetActiveCycleData = {
  id: null | number
  nominationCycleDto: NominationCycleDto
  nominationQuestionDto: GetQuestion[]
  checkQuestion: boolean | null
}

export type TotalResponse = {
  nominationCycleDto: NominationCycleDto
  nominationQuestionDto: GetQuestion[]
}

export type InitiateCycleSliceState = {
  isLoading: ApiLoadingState
  error: ValidationError
  activeCycleData: GetActiveCycleData
  allCycles: GetAllCycles
  allQuestions: GetAllQuestions
  listSize: number
  currentPage: number
  pageSize: number
  toggle: string
  editCycle: NominationCycleDto
}

export type GetQuestion = {
  id: number
  question: string
  checkQuestion: boolean | null | string
}

export type GetAllCycles = {
  size: number
  list: NominationCycleDto[]
}

export type GetAllQuestions = {
  size: number
  list: GetQuestion[]
}

export type InitiateCycleTableProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export type InitiateCycleCheckBoxProps = {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  cycleChecked: GetQuestion
  setCycleChecked: React.Dispatch<React.SetStateAction<GetQuestion | undefined>>
  selChkBoxesFromApi: GetQuestion[]
  checkList: GetQuestion[]
}
