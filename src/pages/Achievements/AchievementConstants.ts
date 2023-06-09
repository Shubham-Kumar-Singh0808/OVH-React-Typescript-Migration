import moment from 'moment'
import {
  nomineeSelectionStatus,
  OutgoingNominationStatus,
} from '../../types/Achievements/NomineeList/NomineeListTypes'
import { NewAchieverInformation } from '../../types/Achievements/AddAchiever/AddAchieverTypes'
import { deviceLocale } from '../../utils/dateFormatUtils'

export const selectAchievementType = 'Select Achievement Type'
export const TableColor = 'table-color'
export const newAchievementLabelClass = 'col-sm-3 col-form-label text-end'
export const entryContainerClass = 'mt-3 mb-3 align-items-center'
export const errorOrderMessage = 'Order must be unique'
export const errorAchievementNameMessage = 'Achievement name already exists'
export const fromToDateError = 'To month should be greater than From month'
export const emptyString = ''
export const selectCycle = 'Select a cycle'
export const selectRating = 'Select Rating'
export const notFoundNumber = -1
export const descriptionLengthError = 'Please enter atleast 150 characters'
export type ErrorBooleans = {
  achievementError1: boolean
  achievementError2: boolean
}

export interface RatingType {
  ratingNumber: number
  ratingString: string
}

export const NomineeRatingList: RatingType[] = [
  {
    ratingNumber: 0,
    ratingString: '0 - Unsatisfactory',
  },
  {
    ratingNumber: 1,
    ratingString: '1 - Opportunity For Development',
  },
  {
    ratingNumber: 2,
    ratingString: '2 - Good-',
  },
  {
    ratingNumber: 3,
    ratingString: '3 - Good',
  },
  {
    ratingNumber: 4,
    ratingString: '4 - Good+',
  },
  {
    ratingNumber: 5,
    ratingString: '6 - Very Good-',
  },
  {
    ratingNumber: 6,
    ratingString: '6 - Very Good',
  },
  {
    ratingNumber: 7,
    ratingString: '7 - Very Good+',
  },
  {
    ratingNumber: 8,
    ratingString: '8 - Excellent-',
  },
  {
    ratingNumber: 9,
    ratingString: '9 - Excellent',
  },
  {
    ratingNumber: 10,
    ratingString: '10 - Excellent+',
  },
]

export const getNomineeRatingString = (givenRating: number | null): string => {
  if (givenRating === null) {
    return selectRating
  }
  for (const obj of NomineeRatingList) {
    if (obj.ratingNumber === givenRating) {
      return obj.ratingString
    }
  }
  return selectRating
}

export const getNomineeRatingNumber = (givenRating: string): number => {
  for (const obj of NomineeRatingList) {
    if (obj.ratingString === givenRating) {
      return obj.ratingNumber
    }
  }
  return notFoundNumber
}

export const convertNomineeDisplayToApiValue = (eValue: string): string => {
  if (eValue === nomineeSelectionStatus.selected) {
    return String(OutgoingNominationStatus.selected)
  }
  return String(OutgoingNominationStatus.notSelected)
}

export const orderRegexValue = /[^1-9]\d/gi

export type EditedAchievementDetails = {
  newStatus: string
  newOrder: string
}

export const getDateForamatted = (givenDate: string): string => {
  return givenDate
    ? moment(
        new Date(givenDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      ).format('MM-YYYY')
    : ''
}

export const getFullDateForamatted = (givenDate: string): string => {
  return givenDate
    ? moment(
        new Date(givenDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      ).format('DD/MM/YYYY')
    : ''
}

export const initialNewAchieverState: NewAchieverInformation = {
  achievementName: selectAchievementType,
  employeeName: emptyString,
  endDate: emptyString,
  startDate: emptyString,
  timePeriod: emptyString,
}

export const base64Extension = 'data:image/jpeg;base64,'
export const baseImageExtension = 'https://ovhqa.raybiztech.com/'
