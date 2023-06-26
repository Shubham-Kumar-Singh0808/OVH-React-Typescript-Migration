import { LoadingState, ValidationError } from '../../commonTypes'

export interface RecruitmentHistoryCycleDTO {
  candidateId: null
  interviewers: string
  interviewersDTOList: null
  interviewDate: string
  interviewTime: string | null
  interviewComments: string
  interviewRound: string
  interviewStatus: null
  candidateName: null
  interviewMode: null
  interviewCycleId: number
  experiance: null
  rating: string | null
  status: string
  candiadateEmailId: null
  skills: null
  mobileNumber: null
  cycleDTOs: null
  interviewResultStatus: null | string
  description: null
  skypeId: null
  proactiveComments: null | string
  communicationComments: null | string
  excellenceComments: null | string
  updatedBy: null | string
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

export interface IncomingRecruitmentHistory {
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
  resumePath: null | string
  cycleDTOs: RecruitmentHistoryCycleDTO[]
  statusComments: string
  timelineStatus: null
  joineeComments: string
  modeOfInterview: string
  recruiter: string
  otherDocumentPath: null
  initialComments: string
  holdSubStatus: string
  addedDate: null | string
  reason: string
}

export interface RecruitmentHistorySliceTypes {
  isLoading: LoadingState
  recruitmentHistoryData: IncomingRecruitmentHistory
  error: ValidationError
}
