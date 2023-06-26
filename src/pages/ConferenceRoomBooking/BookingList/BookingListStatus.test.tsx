import userEvent from '@testing-library/user-event'
import React from 'react'
import BookingListStatus from './BookingListStatus'
import { getFutureDateTime } from './BookingListHelpers'
import { cleanup, render, screen, act } from '../../../test/testUtils'
import {
  ConferenceBookingStatusEnum,
  GetBookingsForSelection,
} from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'

const mockBooking: GetBookingsForSelection = {
  id: 25389,
  agenda: 'ppp',
  roomId: 195,
  roomName: 'testing2',
  locationName: 'RBT1',
  fromDate: getFutureDateTime(0)[0],
  toDate: null,
  startTime: getFutureDateTime(10)[1],
  endTime: getFutureDateTime(20)[1],
  projectName: '',
  employeeIds: [],
  authorName: {
    id: 2050,
    profilePicPath: '../profilepics/Default_Female.jpg',
    firstName: 'Pranav',
    lastName: 'Gupta',
    emailId: 'pranav.gupta@raybiztech.com',
    designation: 'Associate Software Engineer',
    fullName: 'Pranav Gupta',
  },
  employeeNames: [],
  isAuthorisedUser: true,
  locationId: 1,
  employeeAvailability: null,
  timeFomrat: '13/06/2023 12:15:00',
  disableEdit: true,
  meetingEditDTOList: null,
  meetingAttendeesDto: null,
  availability: null,
  meetingStatus: 'New',
  conferenceType: 'Meeting',
  eventTypeName: null,
  eventTypeId: null,
  eventLocation: null,
  eventId: null,
  description: null,
  eventEditAccess: true,
  empDesignations: [],
  employeeDto: [],
  trainerName: null,
  availableDates: null,
}

describe('Booking List Status', () => {
  describe('before meeting time reached', () => {
    beforeEach(() => {
      render(<BookingListStatus bookingItem={mockBooking} />)
    })
    afterEach(cleanup)
    screen.debug()

    test('everybody can see new status', () => {
      expect(screen.getByText('New')).toBeVisible()
    })
  })
  describe('meeting time reached', () => {
    test('non authorised user can only see status', () => {
      const { getByText } = render(
        <BookingListStatus
          bookingItem={{
            ...mockBooking,
            startTime: getFutureDateTime(0)[1],
            isAuthorisedUser: false,
          }}
        />,
      )
      expect(
        getByText(ConferenceBookingStatusEnum.New.toString()),
      ).toBeVisible()
    })
    test('meeting is completed - non authorised user can see status', () => {
      const { getByText } = render(
        <BookingListStatus
          bookingItem={{
            ...mockBooking,
            isAuthorisedUser: false,
            meetingStatus: ConferenceBookingStatusEnum.Completed.toString(),
          }}
        />,
      )
      expect(
        getByText(ConferenceBookingStatusEnum.Completed.toString()),
      ).toBeVisible()
    })
    test('meeting is cancelled before time reached - authorised user can see status', () => {
      // completed and cancelled logic is same so implementing alternaltively
      const { getByText } = render(
        <BookingListStatus
          bookingItem={{
            ...mockBooking,
            isAuthorisedUser: true,
            meetingStatus: ConferenceBookingStatusEnum.Cancelled.toString(),
          }}
        />,
      )
      expect(
        getByText(ConferenceBookingStatusEnum.Cancelled.toString()),
      ).toBeVisible()
    })
    test('meeting is cancelled before time reached - un authorised user can see status', () => {
      // completed and cancelled logic is same so implementing alternaltively
      const { getByText } = render(
        <BookingListStatus
          bookingItem={{
            ...mockBooking,
            isAuthorisedUser: false,
            meetingStatus: ConferenceBookingStatusEnum.Cancelled.toString(),
          }}
        />,
      )
      expect(
        getByText(ConferenceBookingStatusEnum.Cancelled.toString()),
      ).toBeVisible()
    })
    test('meeting is cancelled after time reached - un authorised user can see status', () => {
      const { getByText } = render(
        <BookingListStatus
          bookingItem={{
            ...mockBooking,
            isAuthorisedUser: false,
            startTime: getFutureDateTime(-1)[1],
            meetingStatus: ConferenceBookingStatusEnum.Cancelled.toString(),
          }}
        />,
      )
      expect(
        getByText(ConferenceBookingStatusEnum.Cancelled.toString()),
      ).toBeVisible()
    })
    test('meeting is cancelled after time reached - authorised user can see status', () => {
      const { getByText } = render(
        <BookingListStatus
          bookingItem={{
            ...mockBooking,
            isAuthorisedUser: true,
            startTime: getFutureDateTime(-1)[1],
            meetingStatus: ConferenceBookingStatusEnum.Cancelled.toString(),
          }}
        />,
      )
      expect(
        getByText(ConferenceBookingStatusEnum.Cancelled.toString()),
      ).toBeVisible()
    })
    test('meeting is started and time reached - authorised user can see select status', () => {
      const { getByTestId, getAllByTestId } = render(
        <BookingListStatus
          bookingItem={{
            ...mockBooking,
            isAuthorisedUser: true,
            fromDate: '13 Jun 2022',
            startTime: getFutureDateTime(-1)[1],
            meetingStatus: ConferenceBookingStatusEnum.InProgress.toString(),
          }}
        />,
        {
          preloadedState: {
            bookingList: {
              currentFilters: {
                location: -1,
                status: '',
                room: '',
                meetingStatus: '',
              },
            },
          },
        },
      )
      const selectCurrentOption = getByTestId('bookingListStatus-selector')
      expect(selectCurrentOption).toHaveValue(
        ConferenceBookingStatusEnum.InProgress.toString(),
      )
      expect(getAllByTestId('bookingList-StatusOpt')).toHaveLength(2) // as new is removed when in "In Progress"
      act(() => {
        userEvent.selectOptions(selectCurrentOption, [
          ConferenceBookingStatusEnum.Completed.toString(),
        ])
      })
      expect(selectCurrentOption).toHaveValue(
        ConferenceBookingStatusEnum.Completed.toString(),
      )
    })
  })
})
