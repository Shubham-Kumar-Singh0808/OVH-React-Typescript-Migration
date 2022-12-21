import {
  nomineeSelectionStatus,
  OutgoingNominationStatus,
} from '../../types/Achievements/NomineeList/NomineeListTypes'

export const selectAchievementType = 'Select Achievement Type'
export const newAchievementLabelClass = 'col-sm-3 col-form-label text-end'
export const errorOrderMessage = 'Order must be unique'
export const errorAchievementNameMessage = 'Achievement name must be unique'
export const emptyString = ''
export const selectCycle = 'Select a cycle'
export const selectRating = 'Select Rating'
export const notFoundNumber = -1
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
    ratingNumber: 10,
    ratingString: '10 - Excellent+',
  },
  {
    ratingNumber: 9,
    ratingString: '10 - Excellent',
  },
  {
    ratingNumber: 8,
    ratingString: '10 - Excellent-',
  },
  {
    ratingNumber: 7,
    ratingString: '7 - Very Good+',
  },
  {
    ratingNumber: 6,
    ratingString: '6 - Very Good',
  },
  {
    ratingNumber: 5,
    ratingString: '6 - Very Good-',
  },
  {
    ratingNumber: 4,
    ratingString: '4 - Good+',
  },
  {
    ratingNumber: 3,
    ratingString: '3 - Good',
  },
  {
    ratingNumber: 2,
    ratingString: '2 - Good-',
  },
  {
    ratingNumber: 1,
    ratingString: '1 - Oppotunity For Development',
  },
  {
    ratingNumber: 0,
    ratingString: '0 - Unsatisfactory',
  },
]

export const getNomineeRatingString = (givenRating: number | null) => {
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

export const getNomineeRatingNumber = (givenRating: string) => {
  for (const obj of NomineeRatingList) {
    if (obj.ratingString === givenRating) {
      return obj.ratingNumber
    }
  }
  return notFoundNumber
}

export const convertNomineeDisplayToApiValue = (eValue: string) => {
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
