import reducer, { bookingListService } from './bookingListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  BookingListSliceState,
  EditMeetingRequest,
} from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import {
  mockBookingsForSelection,
  mockMeetingLocations,
  mockRoomsOfLocation,
} from '../../../test/data/bookingListData'

describe('Booking List Slice', () => {
  describe('Reducer', () => {
    const initialBookingListState: BookingListSliceState = {
      meetingLocation: [],
      roomsOfLocation: [],
      getBookingsForSelection: [],
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
      editMeetingRequest: {} as EditMeetingRequest,
      currentFilters: { location: -1, status: '', room: '', meetingStatus: '' },
      LocationValue: '1',
      RoomValue: '',
      MeetingStatus: 'New',
      SelectCustom: 'Today',
      FromDateValue: '',
    }

    it('Should be able to set isLoading to "loading" if `getAllMeetingLocations` is pending', () => {
      const action = {
        type: bookingListService.getAllMeetingLocations.pending.type,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        ...initialBookingListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "loading" if `getRoomsOfLocation` is pending', () => {
      const action = {
        type: bookingListService.getRoomsOfLocation.pending.type,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        ...initialBookingListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "loading" if `getBookingsForSelection` is pending', () => {
      const action = {
        type: bookingListService.getBookingsForSelection.pending.type,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        ...initialBookingListState,
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "loading" if `getAllMeetingLocations` is fullfilled', () => {
      const action = {
        type: bookingListService.getAllMeetingLocations.fulfilled.type,
        payload: mockMeetingLocations,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        ...initialBookingListState,
        meetingLocation: mockMeetingLocations,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "loading" if `getRoomsOfLocation` is fullfilled', () => {
      const action = {
        type: bookingListService.getRoomsOfLocation.fulfilled.type,
        payload: mockRoomsOfLocation,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        ...initialBookingListState,
        roomsOfLocation: mockRoomsOfLocation,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "loading" if `getBookingsForSelection` is fullfilled', () => {
      const action = {
        type: bookingListService.getBookingsForSelection.fulfilled.type,
        payload: mockBookingsForSelection,
      }
      const state = reducer(initialBookingListState, action)
      expect(state).toEqual({
        ...initialBookingListState,
        getBookingsForSelection: mockBookingsForSelection,
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
