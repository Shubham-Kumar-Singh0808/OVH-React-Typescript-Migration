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
  interviewTime: null
  interviewComments: string
  interviewRound: string
  interviewStatus: null
  candidateName: null
  interviewMode: null
  interviewCycleId: number
  experiance: null
  rating: null
  status: string
  candiadateEmailId: null
  skills: null
  mobileNumber: null
  cycleDTOs: null
  interviewResultStatus: string
  description: null
  skypeId: null
  proactiveComments: null
  communicationComments: null
  excellenceComments: null
  updatedBy: string
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
  joineeComments: null
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
  candidateId: string
  interviewers: string
  interviewersDTOList: null
  interviewDate: string
  interviewTime: string
  interviewComments: null
  interviewRound: string
  interviewStatus: null
  candidateName: string
  interviewMode: string
  interviewCycleId: number
  experiance: null
  rating: null
  status: string
  candiadateEmailId: string
  skills: string
  mobileNumber: string
  cycleDTOs: null
  interviewResultStatus: null
  description: null
  skypeId: null
  proactiveComments: null
  communicationComments: null
  excellenceComments: null
  updatedBy: null
  recruiter: null
  reason: null
  ctc: null
  ectc: null
  technology: null
  np: null
  country: null
  jobCode: null
  sourceName: null
  personId: null
}
