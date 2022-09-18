import eventTypeListReducer, {
  eventTypeListService,
} from './eventTypeListSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockEventTypeList } from '../../../../test/data/eventTypeListData'

describe('eventType Slice', () => {
  describe('eventTypeReducer', () => {
    const initialState = {
      eventTypes: [],
      isLoading: ApiLoadingState.idle,
    }

    it('Should be able to set isLoading to "loading" if getEventTypes is pending', () => {
      const action = {
        type: eventTypeListService.getEventTypes.pending.type,
      }
      const state = eventTypeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        eventTypes: [],
      })
    })

    it('Should be able to set isLoading to "loading" if getEventTypes is fulfilled', () => {
      const action = {
        type: eventTypeListService.getEventTypes.fulfilled.type,
        payload: mockEventTypeList,
      }
      const state = eventTypeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        eventTypes: mockEventTypeList,
      })
    })
    it('Should be able to set isLoading to "loading" if updateEventType is fulfilled', () => {
      const action = {
        type: eventTypeListService.updateEventType.fulfilled.type,
      }
      const state = eventTypeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        eventTypes: [],
      })
    })
    it('Should be able to set isLoading to "loading" if addEventType is fulfilled', () => {
      const action = {
        type: eventTypeListService.addEventType.fulfilled.type,
      }
      const state = eventTypeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        eventTypes: [],
      })
    })
    it('Should be able to set isLoading to "loading" if deleteEventType is fulfilled', () => {
      const action = {
        type: eventTypeListService.deleteEventType.fulfilled.type,
      }
      const state = eventTypeListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        eventTypes: [],
      })
    })
  })
})
