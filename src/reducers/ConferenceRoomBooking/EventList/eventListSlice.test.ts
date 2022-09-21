import eventListReducer, { eventListService } from './eventListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockEventList } from '../../../test/data/eventListData'
import { mockFeedbackFormList } from '../../../test/data/feedbackFormListData'

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

    it('Should be able to set isLoading to "loading" if cancelEvent is pending', () => {
      const action = {
        type: eventListService.cancelEvent.pending.type,
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

    it('Should be able to set isLoading to "succeeded" if cancelEvent is fulfilled', () => {
      const action = {
        type: eventListService.cancelEvent.fulfilled.type,
      }
      const state = eventListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        events: [],
        selectedMonth: '',
        listSize: 0,
        feedbackFormDetails: [],
        feedbackFormListSize: 0,
      })
    })
    it('Should be able to set isLoading to "loading" if uploadFeedbackForm is pending', () => {
      const action = {
        type: eventListService.uploadFeedbackForm.pending.type,
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

    it('Should be able to set isLoading to "succeeded" if getFeedbackFormList is fulfilled', () => {
      const action = {
        type: eventListService.getFeedbackFormList.fulfilled.type,
        payload: mockFeedbackFormList,
      }
      const state = eventListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        events: [],
        selectedMonth: '',
        listSize: 0,
        feedbackFormDetails: mockFeedbackFormList.list,
        feedbackFormListSize: mockFeedbackFormList.size,
      })
    })
    it('Should be able to set isLoading to "loading" if getFeedbackFormList is pending', () => {
      const action = {
        type: eventListService.getFeedbackFormList.pending.type,
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

    it('Should be able to set isLoading to "succeeded" if uploadFeedbackForm is fulfilled', () => {
      const action = {
        type: eventListService.uploadFeedbackForm.fulfilled.type,
      }
      const state = eventListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        events: [],
        selectedMonth: '',
        listSize: 0,
        feedbackFormDetails: [],
        feedbackFormListSize: 0,
      })
    })
  })
})
