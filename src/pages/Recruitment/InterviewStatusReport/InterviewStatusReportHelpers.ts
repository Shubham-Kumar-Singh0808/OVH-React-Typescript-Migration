import {
  GetAllTechnology,
  country,
} from '../../../types/Recruitment/CandidateList/CandidateListTypes'
import {
  OutgoingCandidateStatusEnum,
  DisplayedCandidateStatusEnum,
  CandidateCheckBoxFilterEnum,
  OutgoingCandidateSelectionStatusEnum,
  OutgoingStatusReportFilterOptions,
} from '../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'

export const initialDate = ''
export const initialTechnology: GetAllTechnology = {
  id: -1,
  name: 'Select Technology',
}
export const initialCountry: country = {
  id: -1,
  name: 'Select Country',
  mobileCode: '',
  countryCode: '',
}

/* 
this is the key value pair for candidate status which are used to map value 
and displayed value in select option
the key value is the value that is sent with the api and value is the value displayed to user
*/
export const candidateStatusMapping: {
  [key in OutgoingCandidateStatusEnum]: DisplayedCandidateStatusEnum
} = {
  [OutgoingCandidateStatusEnum.all]: DisplayedCandidateStatusEnum.all,
  [OutgoingCandidateStatusEnum.offered]: DisplayedCandidateStatusEnum.offered,
  [OutgoingCandidateStatusEnum.rejected]: DisplayedCandidateStatusEnum.rejected,
  [OutgoingCandidateStatusEnum.new]: DisplayedCandidateStatusEnum.new,
  [OutgoingCandidateStatusEnum.inProgress]:
    DisplayedCandidateStatusEnum.inProgress,
  [OutgoingCandidateStatusEnum.rescheduled]:
    DisplayedCandidateStatusEnum.rescheduled,
  [OutgoingCandidateStatusEnum.hold]: DisplayedCandidateStatusEnum.hold,
  [OutgoingCandidateStatusEnum.noShow]: DisplayedCandidateStatusEnum.noShow,
  [OutgoingCandidateStatusEnum.didNotJoin]:
    DisplayedCandidateStatusEnum.didNotJoin,
}

// this is for the select date option in filters
export const candidateSelectionStatusList: OutgoingCandidateSelectionStatusEnum[] =
  [
    OutgoingCandidateSelectionStatusEnum.today,
    OutgoingCandidateSelectionStatusEnum.yesterday,
    OutgoingCandidateSelectionStatusEnum.thisWeek,
    OutgoingCandidateSelectionStatusEnum.lastWeek,
    OutgoingCandidateSelectionStatusEnum.lastMonth,
    OutgoingCandidateSelectionStatusEnum.currentMonth,
    OutgoingCandidateSelectionStatusEnum.custom,
  ]

// list of the check boxes that are above the search text in filter options
export const candidateCheckBoxFilterList: CandidateCheckBoxFilterEnum[] = [
  CandidateCheckBoxFilterEnum.searchByExperience,
  CandidateCheckBoxFilterEnum.multipleSearch,
  CandidateCheckBoxFilterEnum.searchByRecruiterName,
  CandidateCheckBoxFilterEnum.searchBySourceName,
]

// returns true if any one of the checkboxes is checked
export const isOneOfTheCheckBoxChecked = (
  filterOptions: OutgoingStatusReportFilterOptions,
): boolean => {
  return (
    filterOptions.searchByExperience === true ||
    filterOptions.searchByMultipleFlag === true ||
    filterOptions.searchByRecruiterName === true ||
    filterOptions.searchBySourceName === true
  )
}

export const isDateNotFilledWithCustom = (
  filterOptions: OutgoingStatusReportFilterOptions,
) => {
  return (
    filterOptions.selectionStatus ===
      OutgoingCandidateSelectionStatusEnum.custom.toString() &&
    (filterOptions.fromDate === null || filterOptions.toDate === null)
  )
}

// the api candidate status is converted to displayed candidate status
export const getValueOfCandidateStatusMappings = (
  keyValue: string,
): DisplayedCandidateStatusEnum => {
  const filteredObj = Object.entries(candidateStatusMapping).find(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ([key, _]) => key === keyValue,
  )
  if (filteredObj !== undefined) {
    return filteredObj[1]
  }
  return DisplayedCandidateStatusEnum.all
}

export const getInterviewStatusReportTestId = (value: string) => {
  return `interviewStatusReport-${value}`
}
