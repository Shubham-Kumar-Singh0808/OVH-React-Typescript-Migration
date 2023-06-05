import { ApiLoadingState } from '../../../middleware/api/apiList'

export type timeLineDetails = {
  personId: number
  firstName: null
  fullName: string
  lastName: null
  middleName: null
  email: string
  qualification: null
  skill: string
  pendingInterviewStatus: number
  appliedFor: string
  experience: string
  candidateStatus: string
  resumePath: null
  cycleDTOs: CycleDtOs[]
}
export type CycleDtOs = {
  candidateId: null
  interviewers: string
  interviewersDTOList: null
  interviewDate: string
  interviewTime: null | string
  interviewComments: string | null
  interviewRound: string
  interviewStatus: null
  candidateName: null
  interviewMode: null
  interviewCycleId: number
  experiance: null
  rating: null | string | number
  status: string
  candiadateEmailId: null
  skills: null
  mobileNumber: null
  cycleDTOs: null
  interviewResultStatus: string | null
  description: null
  skypeId: null
  proactiveComments: null | string
  communicationComments: null | string
  excellenceComments: null | string
  updatedBy: string | null
  recruiter: null
  reason: string
  ctc: null
  ectc: null
  technology: null
  np: null
  country: null
  jobCode: null
  sourceName: null
  personId: null
}
export type TimeLineList = {
  addedDate: string
  appliedFor: string
  candidateStatus: string
  cycleDTOs: CycleDtOs[]
  email: string
  experience: string
  firstName: null
  fullName: string
  holdSubStatus: string
  initialComments: string
  joineeComments: null | string
  lastName: null
  middleName: null
  modeOfInterview: string
  otherDocumentPath: null
  pendingInterviewStatus: number
  personId: number
  qualification: null
  reason: string
  recruiter: string
  resumePath: null
  skill: string
  statusComments: string
  timelineStatus: null
}

export type IntervieweeDetailsSliceState = {
  isLoading: ApiLoadingState
  listSize: number
  timeLineList: TimeLineList
  cycleDtOs: CycleDtOs
  CycleDtOsList: CycleDtOs[]
  timeLineDetails: timeLineDetails
  scheduleInterviewData: EmpScheduleInterviewData
}

export type saveButnprops = {
  initialComments: string
  personId: number
}

export type UpdateProps = {
  candidateId: number
  holdSubStatus: string
  status: string
  statusComments: string
}

export type EmpScheduleInterviewData = {
  candidateId: string | null
  interviewers: string
  interviewersDTOList: null
  interviewDate: string
  interviewTime: string | null
  interviewComments: null | string
  interviewRound: string
  interviewStatus: null
  candidateName: string | null
  interviewMode: string | null
  interviewCycleId: number
  experiance: null
  rating: null | number
  status: string
  candiadateEmailId: string | null
  skills: string | null
  mobileNumber: string | null
  cycleDTOs: null
  interviewResultStatus: null | string
  description: null
  skypeId: null
  proactiveComments: null | string
  communicationComments: null | string
  excellenceComments: null | string
  updatedBy: null | string
  recruiter: null
  reason: null | string
  ctc: null
  ectc: null
  technology: null
  np: null
  country: null
  jobCode: null
  sourceName: null
  personId: null
}
