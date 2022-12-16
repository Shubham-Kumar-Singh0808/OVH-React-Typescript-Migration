export const selectAchievementType = 'Select Achievement Type'
export const newAchievementLabelClass = 'col-sm-3 col-form-label text-end'
export const errorOrderMessage = 'Order must be unique'
export const errorAchievementNameMessage = 'Achievement name must be unique'
export const emptyString = ''
export type ErrorBooleans = {
  achievementError1: boolean
  achievementError2: boolean
}

export const orderRegexValue = /[^1-9][0-9]/gi

export type EditedAchievementDetails = {
  newStatus: string
  newOrder: string
}
