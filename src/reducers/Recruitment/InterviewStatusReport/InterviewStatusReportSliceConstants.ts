import {
  OutgoingCandidateStatusEnum,
  OutgoingStatusReportFilterOptions,
} from '../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'

export const initialStatusReportFilters: OutgoingStatusReportFilterOptions = {
  candidateStatus: OutgoingCandidateStatusEnum.inProgress,
  endIndex: 20,
  searchByCandidateName: '',
  searchByExperience: false,
  searchByMultipleFlag: false,
  searchByRecruiterName: false,
  searchBySourceName: false,
  selectionCountry: '',
  selectionStatus: '',
  selectionTechnology: '',
  startIndex: 0,
  fromDate: null,
  toDate: null,
}
