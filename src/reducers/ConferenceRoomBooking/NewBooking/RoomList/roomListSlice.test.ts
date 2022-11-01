import roomListReducer, { roomListService } from './roomListSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { mockRoomNames } from '../../../../test/data/addRoomListData'

describe('Location List Slice', () => {
  describe('LocationList', () => {
    const initialState = {
      meetingRooms: [],
      isLoading: ApiLoadingState.idle,
    }

    it('Should be able to set isLoading to "loading" if getAllMeetingRoomsData  is pending', () => {
      const action = {
        type: roomListService.getMeetingRooms.pending.type,
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
        type: roomListService.getMeetingRooms.fulfilled.type,
        payload: mockRoomNames,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        meetingRooms: mockRoomNames,
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
    it('Should be able to set isLoading to "failed" if getAllMeetingRoomsData is rejected', () => {
      const action = {
        type: roomListService.getMeetingRooms.rejected.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        meetingRooms: [],
      })
    })

    it('Should be able to set isLoading to "failed" if addRoom is rejected', () => {
      const action = {
        type: roomListService.addRoom.rejected.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        meetingRooms: [],
      })
    })

    it('Should be able to set isLoading to "failed" if deleteRoom is rejected', () => {
      const action = {
        type: roomListService.deleteRoom.rejected.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        meetingRooms: [],
      })
    })

    it('Should be able to set isLoading to "failed" if updateRoom is rejected', () => {
      const action = {
        type: roomListService.updateRoom.rejected.type,
      }
      const state = roomListReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        meetingRooms: [],
      })
    })
  })
})
