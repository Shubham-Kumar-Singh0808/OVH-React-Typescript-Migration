import eventListReducer, { eventListService } from './eventListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { EventListSliceState } from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'
import { mockEventList } from '../../../test/data/eventListData'

describe('eventList Slice', () => {
  describe('eventListReducer', () => {
    const initialState = {
      isLoading: ApiLoadingState.idle,
      error: null,
      events: [],
      selectedMonth: '',
      listSize: 0,
      feedbackFormDetails: [],
      feedbackFormListSize: 0,
    }
    it('Should be able to set isLoading to "loading" if getAllEvents is pending', () => {
      const action = {
        type: eventListService.getAllEvents.pending.type,
      }
      const state = eventListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        events: [],
        selectedMonth: '',
        listSize: 0,
        feedbackFormDetails: [],
        feedbackFormListSize: 0,
      })
    })

    it('Should be able to set isLoading to "succeeded" if getAllEvents is fulfilled', () => {
      const action = {
        type: eventListService.getAllEvents.fulfilled.type,
        payload: mockEventList,
      }
      const state = eventListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        events: mockEventList.list,
        selectedMonth: '',
        listSize: mockEventList.size,
        feedbackFormDetails: [],
        feedbackFormListSize: 0,
      })
    })
  })
})
