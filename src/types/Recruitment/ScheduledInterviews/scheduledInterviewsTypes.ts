import { ApiLoadingState } from '../../../middleware/api/apiList'
import { SelectedView } from '../../TimeAndAttendance/TimeInOfficeReport/timeInOfficeReportTypes'

export type CandidateInterviewInformation = {
  candidateId: number
  interviewers: string
  interviewersDTOList: null
  interviewDate: string
  interviewTime: string
  interviewComments: null | string
  interviewRound: string
  interviewStatus: string
  candidateName: string
  interviewMode: string
  interviewCycleId: number
  experiance: string
  rating: null | string
  status: null | string
  candiadateEmailId: null | string
  skills: null | string
  mobileNumber: null | string
  cycleDTOs: null | string
  interviewResultStatus: null
  description: null
  skypeId: null | string
  proactiveComments: null
  communicationComments: null
  excellenceComments: null
  updatedBy: null | string
  recruiter: null | string
  reason: null
  ctc: null
  ectc: null
  technology: null
  np: null
  country: null
  jobCode: null
  sourceName: string
  personId: null | number
}

export type GetSearchScheduledCandidatesResponse = {
  size: number
  list: CandidateInterviewInformation[]
}

export type GetSearchScheduledCandidatesProps = {
  endIndex: number
  fromDate: string
  startIndex: number
  status?: string
  toDate: string
  search?: string
  skill?: string
}

export type ScheduledInterviewsSliceState = {
  selectedView: SelectedView
  scheduledCandidatesForEmployee: GetSearchScheduledCandidatesResponse
  scheduledCandidates: GetSearchScheduledCandidatesResponse
  isLoading: ApiLoadingState
}
