import {
  country,
  CandidateAppliedForList,
  CandidateSourceType,
  CandidateJobTypeEnum,
} from '../../../types/Recruitment/CandidateList/CandidateListTypes'
import { GetAllTechnology } from '../../../types/Recruitment/JobOpenings/jobOpeningsTypes'

export const initialCandidateCountry: country = {
  countryCode: '',
  id: -1,
  name: '',
  mobileCode: '',
}

export const initialCandidateAppliedForList: CandidateAppliedForList = {
  id: -1,
  jobCode: '',
  positionVacant: '',
  minimumExperience: '',
  description: '',
  opendDate: '',
  expiryDate: null,
  noOfRequirements: -1,
  offered: -1,
  remaining: -1,
  status: '',
}

export const initialGetAllTechnology: GetAllTechnology = {
  id: -1,
  name: '',
}

export const candidateSourceTypeList: CandidateSourceType[] = [
  CandidateSourceType.internal,
  CandidateSourceType.external,
  CandidateSourceType.Others,
]

export const candidateJobTypeList: CandidateJobTypeEnum[] = [
  CandidateJobTypeEnum.fullTime,
  CandidateJobTypeEnum.partTime,
]

export const filterCandidateCountryByCountryId = (
  list: country[],
  id: number,
): country => {
  const filteredOne = list.find((currCountry) => currCountry.id === id)
  if (filteredOne === undefined) {
    return initialCandidateCountry
  }
  return filteredOne
}

export const filterCandidateAppliedForById = (
  list: CandidateAppliedForList[],
  selectedId: number,
): CandidateAppliedForList => {
  const filteredOne = list.find((current) => current.id === selectedId)
  if (filteredOne === undefined) {
    return initialCandidateAppliedForList
  }
  return filteredOne
}

export const get18YearsBackDate = (): Date => {
  const todayDate = new Date()
  return new Date(
    todayDate.getFullYear() - 18,
    todayDate.getMonth(),
    todayDate.getDate(),
  )
}

export const isTechnologyInTheList = (
  technologyList: GetAllTechnology[],
  technologyName: string,
): boolean => {
  const filteredResult = technologyList.find(
    (technology) =>
      technology.name.toLowerCase() === technologyName.trim().toLowerCase(),
  )
  return filteredResult !== undefined // returns true if it is in the list
}

export const nonRequiredFinalCandidateData = (data: string): string | null => {
  return data === '' ? null : data
}

export const getCurrentScheduleTime = (): string => {
  const currentDate = new Date()
  let hours = currentDate.getHours()
  const minutes = currentDate.getMinutes()
  let amOrPm = 'AM'

  // Convert to 12-hour format
  if (hours > 12) {
    hours -= 12
    amOrPm = 'PM'
  }

  // Add leading zeros if necessary
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')

  return `${formattedHours}:${formattedMinutes} ${amOrPm}`
}

export const getLabelAsterixDataTestId = (label: string): Array<string> => {
  return [`addCand-${label}`, `addCand-${label}-ast`] // [testid for label, testid for asterix]
}

export const getDataInputTestId = (id: string): string => {
  return `addCandInp-${id}`
}