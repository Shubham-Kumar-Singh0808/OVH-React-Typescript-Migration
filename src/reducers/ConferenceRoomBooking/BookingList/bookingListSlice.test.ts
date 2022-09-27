import reducer, { bookingListService } from './bookingListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { BookingListSliceState } from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import {
  mockBookingsForSelection,
  mockMeetingLocations,
  mockRoomsOfLocation,
} from '../../../test/data/bookingListData'

describe('Booking List Slice', () => {
  describe('Reducer', () => {
    const initialBookingListState = {
      meetingLocation: [],
      roomsOfLocation: [],
      getBookingsForSelection: [],
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
    } as BookingListSliceState

    it('Should be able to set isLoading to "loading" if `getAllMeetingLocations` is pending', () => {
      const action = {
        type: bookingListService.getAllMeetingLocations.pending.type,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        meetingLocation: [],
        roomsOfLocation: [],
        getBookingsForSelection: [],
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('Should be able to set isLoading to "loading" if `getRoomsOfLocation` is pending', () => {
      const action = {
        type: bookingListService.getRoomsOfLocation.pending.type,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        meetingLocation: [],
        roomsOfLocation: [],
        getBookingsForSelection: [],
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('Should be able to set isLoading to "loading" if `getBookingsForSelection` is pending', () => {
      const action = {
        type: bookingListService.getBookingsForSelection.pending.type,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        meetingLocation: [],
        roomsOfLocation: [],
        getBookingsForSelection: [],
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('Should be able to set isLoading to "loading" if `getAllMeetingLocations` is fullfilled', () => {
      const action = {
        type: bookingListService.getAllMeetingLocations.fulfilled.type,
        payload: mockMeetingLocations,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        meetingLocation: mockMeetingLocations,
        roomsOfLocation: [],
        getBookingsForSelection: [],
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('Should be able to set isLoading to "loading" if `getRoomsOfLocation` is fullfilled', () => {
      const action = {
        type: bookingListService.getRoomsOfLocation.fulfilled.type,
        payload: mockRoomsOfLocation,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        meetingLocation: [],
        roomsOfLocation: mockRoomsOfLocation,
        getBookingsForSelection: [],
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('Should be able to set isLoading to "loading" if `getBookingsForSelection` is fullfilled', () => {
      const action = {
        type: bookingListService.getBookingsForSelection.fulfilled.type,
        payload: mockBookingsForSelection,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        meetingLocation: [],
        roomsOfLocation: [],
        getBookingsForSelection: mockBookingsForSelection,
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
