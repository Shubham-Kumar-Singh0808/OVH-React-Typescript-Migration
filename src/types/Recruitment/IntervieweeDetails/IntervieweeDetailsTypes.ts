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
  employeeProperties: EmployeeProperties[]
}

export type saveButnprops = {
  initialComments: string
  personId: number
}

export type UpdateProps = {
  holdSubStatus: string
  statusComments: string
  candiadateEmailId?: string
  candidateId: string | number
  candidateName?: string
  communicationComments?: string
  country?: null
  ctc?: null
  cycleDTOs?: null
  description?: null
  ectc?: null
  excellenceComments?: string
  experiance?: null
  interviewComments?: string
  interviewCycleId?: number
  interviewDate?: string
  interviewMode?: string
  interviewResultStatus?: null
  interviewRound?: string
  interviewStatus?: null
  interviewTime?: string
  interviewers?: string
  interviewersDTOList?: null
  jobCode?: null
  mobileNumber?: string
  np?: null
  personId?: null
  proactiveComments?: string
  rating?: number
  reason?: null
  recruiter?: null
  skills?: string
  skypeId?: null
  sourceName?: null
  status: string
  technology?: null
  updatedBy?: null
}

export type EmpScheduleInterviewData = {
  candidateId: string | null
  interviewers?: string
  interviewersDTOList?: null
  interviewDate?: string
  interviewTime?: string | null
  interviewComments: null | string
  interviewRound?: string
  interviewStatus: string
  candidateName?: string | null
  interviewMode?: string | null
  interviewCycleId?: number
  experiance?: null
  rating?: null | number
  status?: string
  candiadateEmailId?: string | null
  skills?: string | null
  mobileNumber?: string | null
  cycleDTOs?: null
  interviewResultStatus?: null | string
  description?: null
  skypeId?: null
  proactiveComments?: null | string
  communicationComments?: null | string
  excellenceComments?: null | string
  updatedBy?: null | string
  recruiter?: null
  reason?: null | string
  ctc?: null
  ectc?: null
  technology?: null
  np?: null
  country?: null
  jobCode?: null
  sourceName?: null
  personId?: null
}
export type EmployeeProperties = {
  id: number
  profilePicPath: string
  firstName: string
  lastName: string
  emailId: string
  designation: string
  fullName: string
}
export type Reschedule = {
  candidateId: string
  description: string
  interviewType: string
  interviewerId: number
  scheduleDate: string
  scheduleTime: string
  sendMailToCandidate: boolean
  sendMailToInterviewer: boolean
  sendMessageToCandidate: boolean
  sendMessageToInterviewer: boolean
}

export type Schedule = {
  candidateId: string
  contactDetails?: string
  description: string
  interviewRound: number
  interviewType: string
  interviewerId: number
  scheduleDate: string
  scheduleTime: string
  sendMailToCandidate: boolean
  sendMailToInterviewer: boolean
  sendMessageToCandidate: boolean
  sendMessageToInterviewer: boolean
}
