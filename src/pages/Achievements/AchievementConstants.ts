import moment from 'moment'
import { NewAchieverInformation } from '../../types/Achievements/AddAchiever/AddAchieverTypes'
import { deviceLocale } from '../../utils/dateFormatUtils'

export const selectAchievementType = 'Select Achievement Type'
export const newAchievementLabelClass = 'col-sm-3 col-form-label text-end'
export const errorOrderMessage = 'Order must be unique'
export const errorAchievementNameMessage = 'Achievement name already exists'
export const fromToDateError = 'To month should be greater than From month'
export const emptyString = ''
export type ErrorBooleans = {
  achievementError1: boolean
  achievementError2: boolean
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

export const initialNewAchieverState: NewAchieverInformation = {
  achievementName: selectAchievementType,
  employeeName: emptyString,
  endDate: emptyString,
  startDate: emptyString,
  timePeriod: emptyString,
}

export const base64Extension = 'data:image/jpeg;base64,'
