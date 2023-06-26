import { ConferenceBookingStatusEnum } from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'

// used to compare current date time with the entered value
export const compareDateTimeWithCurrent = (date: string): boolean => {
  const parsedDate = Date.parse(date)
  const currentParsedDate = Date.parse(new Date().toISOString())
  return parsedDate < currentParsedDate
  // returns true if the current date and time has passed the entered date and time
}

export const getCombinedDateTime = (date: string, time: string): string => {
  return `${date} ${time}`
}

export const isAuthorisedUserAllowedToEditBooking = (
  meetingStatus: string,
): boolean => {
  return (
    meetingStatus === ConferenceBookingStatusEnum.InProgress.toString() ||
    meetingStatus === ConferenceBookingStatusEnum.New.toString()
  )
}

export const isMeetingCompletedOrCancelled = (
  meetingStatus: string,
): boolean => {
  return (
    meetingStatus === ConferenceBookingStatusEnum.Completed ||
    meetingStatus === ConferenceBookingStatusEnum.Cancelled
  )
}

export const getFutureDateTime = (min: number): [string, string] => {
  const currentDate = new Date()
  const futureDate = new Date(currentDate.getTime() + min * 60000) // Adding minutes in milliseconds

  const year = futureDate.getFullYear()
  const month = (futureDate.getMonth() + 1).toString().padStart(2, '0') // Zero-padding for single digit months
  const day = futureDate.getDate().toString().padStart(2, '0') // Zero-padding for single digit days
  const minutes = futureDate.getMinutes().toString().padStart(2, '0') // Zero-padding for single digit minutes
  let hours = futureDate.getHours()
  const amOrPm = hours >= 12 ? 'PM' : 'AM'

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12 || 12

  return [`${day}/${month}/${year}`, `${hours}:${minutes} ${amOrPm}`]
}
