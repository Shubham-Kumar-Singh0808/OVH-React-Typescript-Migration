import React, { useEffect, useState } from 'react'
import { CBadge } from '@coreui/react-pro'
import {
  compareDateTimeWithCurrent,
  getCombinedDateTime,
  isAuthorisedUserAllowedToEditBooking,
  isMeetingCompletedOrCancelled,
} from './BookingListHelpers'
import {
  ConferenceBookingStatusEnum,
  GetBookingsForSelection,
  ChangeBookingStatusParams,
} from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'

const BookingListStatus = ({
  bookingItem,
}: {
  bookingItem: GetBookingsForSelection
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const currentFilters = useTypedSelector(
    (state) => state.bookingList.currentFilters,
  )
  const [currentOption, setCurrentOption] = useState<string>(
    bookingItem.meetingStatus,
  )

  const currentOptionChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setCurrentOption(e.target.value)
  }

  const updateStatusAsync = async () => {
    const finalData: ChangeBookingStatusParams = {
      bookingId: bookingItem.id,
      status: currentOption,
    }
    const result = await dispatch(
      reduxServices.bookingList.changeMeetingStatusThunk(finalData),
    )
    if (
      reduxServices.bookingList.changeMeetingStatusThunk.fulfilled.match(result)
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Meeting Status Updated Successfully"
          />,
        ),
      )
      dispatch(
        reduxServices.bookingList.getBookingsForSelection(currentFilters),
      )
    }
  }

  useEffect(() => {
    // the meeting status has changed from initial value
    if (currentOption !== bookingItem.meetingStatus) {
      updateStatusAsync()
    }
  }, [currentOption])

  const roomBookingStatusLabelColor = (bookingStatus: string): JSX.Element => {
    if (bookingStatus === ConferenceBookingStatusEnum.New) {
      return (
        <CBadge className="rounded-pill label-default">{bookingStatus}</CBadge>
      )
    } else if (bookingStatus === ConferenceBookingStatusEnum.Cancelled) {
      return (
        <CBadge className="rounded-pill label-danger status-name">
          {bookingStatus}
        </CBadge>
      )
    } else if (bookingStatus === ConferenceBookingStatusEnum.InProgress) {
      return (
        <CBadge className="rounded-pill label-success">{bookingStatus}</CBadge>
      )
    } else if (bookingStatus === ConferenceBookingStatusEnum.Completed) {
      return (
        <CBadge className="rounded-pill label-danger">{bookingStatus}</CBadge>
      )
    }
    return <></>
  }

  return (
    <>
      {
        // both authorised and others can see as the meeting time has not reached yet
        !compareDateTimeWithCurrent(
          getCombinedDateTime(bookingItem.fromDate, bookingItem.startTime),
        ) && roomBookingStatusLabelColor(bookingItem.meetingStatus)
      }
      {
        // only the unauthorised users can see this when the meeting time has reached
        compareDateTimeWithCurrent(
          getCombinedDateTime(bookingItem.fromDate, bookingItem.startTime),
        ) &&
          !bookingItem.isAuthorisedUser &&
          roomBookingStatusLabelColor(bookingItem.meetingStatus)
      }
      {
        // this is for authorised users only where the meeting is either completed or cancelled after time has reached
        compareDateTimeWithCurrent(
          getCombinedDateTime(bookingItem.fromDate, bookingItem.startTime),
        ) &&
          isMeetingCompletedOrCancelled(bookingItem.meetingStatus) &&
          bookingItem.isAuthorisedUser &&
          roomBookingStatusLabelColor(bookingItem.meetingStatus)
      }
      {
        // only the authorised user can see this when the meeting time has reached and is in "New" or "In Progress"
        compareDateTimeWithCurrent(
          getCombinedDateTime(bookingItem.fromDate, bookingItem.startTime),
        ) &&
          isAuthorisedUserAllowedToEditBooking(bookingItem.meetingStatus) &&
          bookingItem.isAuthorisedUser && (
            <select
              className="w-100"
              data-testid="bookingListStatus-selector"
              value={currentOption}
              onChange={currentOptionChangeHandler}
            >
              {
                // when booking is changed to in progress, this option must be removed from list
                bookingItem.meetingStatus !==
                  ConferenceBookingStatusEnum.InProgress && (
                  <option
                    value={ConferenceBookingStatusEnum.New}
                    data-testid="bookingList-StatusOpt"
                  >
                    {ConferenceBookingStatusEnum.New}
                  </option>
                )
              }
              <option
                value={ConferenceBookingStatusEnum.InProgress}
                data-testid="bookingList-StatusOpt"
                style={{ backgroundColor: 'green' }}
              >
                {ConferenceBookingStatusEnum.InProgress}
              </option>
              <option
                value={ConferenceBookingStatusEnum.Completed}
                data-testid="bookingList-StatusOpt"
                style={{ backgroundColor: 'red' }}
              >
                {ConferenceBookingStatusEnum.Completed}
              </option>
            </select>
          )
      }
    </>
  )
}

export default BookingListStatus
