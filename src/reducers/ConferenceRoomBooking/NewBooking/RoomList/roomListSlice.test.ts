import roomListReducer, { roomListService } from './roomListSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

describe('Location List Slice', () => {
  describe('LocationList', () => {
    const initialState = {
      meetingRooms: [],
      isLoading: ApiLoadingState.idle,
    }

    it('Should be able to set isLoading to "loading" if getAllMeetingRoomsData  is pending', () => {
      const action = {
        type: roomListService.getAllMeetingRoomsData.pending.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        meetingRooms: [],
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "loading" if addRoom is pending', () => {
      const action = {
        type: roomListService.addRoom.pending.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        meetingRooms: [],
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "loading" if deleteRoom  is pending', () => {
      const action = {
        type: roomListService.deleteRoom.pending.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        meetingRooms: [],
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "loading" if updateRoom  is pending', () => {
      const action = {
        type: roomListService.updateRoom.pending.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        meetingRooms: [],
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "succeeded" if getAllMeetingRoomsData is fulfilled', () => {
      const action = {
        type: roomListService.getAllMeetingRoomsData.fulfilled.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        meetingRooms: undefined,
      })
    })

    it('Should be able to set isLoading to "succeeded" if addRoom is fulfilled', () => {
      const action = {
        type: roomListService.addRoom.fulfilled.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        meetingRooms: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if deleteRoom is fulfilled', () => {
      const action = {
        type: roomListService.deleteRoom.fulfilled.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        meetingRooms: [],
      })
    })

    it('Should be able to set isLoading to "succeeded" if updateRoom is fulfilled', () => {
      const action = {
        type: roomListService.updateRoom.fulfilled.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        meetingRooms: [],
      })
    })
  })
})
