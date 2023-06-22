import { LoadingState, ValidationError } from '../../commonTypes'
import { GetAllTechnology, country } from '../CandidateList/CandidateListTypes'

export enum DisplayedCandidateStatusEnum {
  all = 'All',
  offered = 'Offered',
  rejected = 'Rejected',
  new = 'New',
  inProgress = 'In Progress',
  rescheduled = 'Rescheduled',
  hold = 'Hold',
  noShow = 'No Show',
  didNotJoin = 'Did not Join',
}

export enum OutgoingCandidateStatusEnum {
  all = 'ALL',
  offered = 'OFFERED',
  rejected = 'REJECTED',
  new = 'NEW',
  inProgress = 'IN_PROCESS',
  rescheduled = 'RESCHEDULED',
  hold = 'HOLD',
  noShow = 'NO_SHOW',
  didNotJoin = 'DID_NOT_JOIN',
}

export enum OutgoingCandidateSelectionStatusEnum {
  today = 'Today',
  yesterday = 'Yesterday',
  thisWeek = 'This Week',
  lastWeek = 'Last Week',
  lastMonth = 'Last Month',
  currentMonth = 'Current Month',
  custom = 'Custom',
}

export enum CandidateDateFilterEnum {
  fromDate = 'From Date',
  toDate = 'To Date',
}

export enum CandidateCheckBoxFilterEnum {
  searchByExperience = 'Search By Experience',
  multipleSearch = 'Multiple Search',
  searchByRecruiterName = 'Search By Recruiter Name',
  searchBySourceName = 'Search By Source Name',
}

export interface OutgoingStatusReportFilterOptions {
  candidateStatus: string
  endIndex: number
  searchByCandidateName: string
  searchByExperience: boolean
  searchByMultipleFlag: boolean
  searchByRecruiterName: boolean
  searchBySourceName: boolean
  selectionCountry: string | number //if nothing entered then string else number
  selectionStatus: string
  selectionTechnology: string
  startIndex: number
  fromDate: string | null
  toDate: string | null
}

export interface IncomingStatusReportItem {
  interviewDate: string
  candidateName: string
  contactNumber: string
  emailId: string
  technology: string
  experiance: string
  status: string
  candidateId: number
  timeLineStatus: null
  recruiter: string
  source: string
  interviewResultStatus: null | string
  interviewerName: string
  interviewRound: number
}

export interface IncomingInterviewStatusReport {
  size: number
  list: IncomingStatusReportItem[]
}

export interface InterviewStatusReportSliceState {
  isLoading: LoadingState
  error: ValidationError
  allEmpCountries: country[]
  allTechnology: GetAllTechnology[]
  filterOptions: OutgoingStatusReportFilterOptions
  interviewStatusReportList: IncomingInterviewStatusReport
}

export interface ExportInterviewStatusReportParams {
  candidateStatus: string
  selectionStatus: string
  selectionTechnology: string
  fromDate: string | undefined
  toDate: string | undefined
  searchByCandidateName: string
  searchByMultipleFlag: boolean
  searchByRecruiterName: boolean
  searchBySourceName: boolean
}

export interface ExportInterviewerDetailsParams {
  fromDate: string | undefined
  toDate: string | undefined
  selectionStatus: string
}
