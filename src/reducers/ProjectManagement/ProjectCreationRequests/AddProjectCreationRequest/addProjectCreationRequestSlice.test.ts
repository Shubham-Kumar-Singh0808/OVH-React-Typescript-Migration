import addProjectCreationRequestReducer, {
  addProjectCreationRequestService,
} from './addProjectCreationRequestSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  GetProjectRequestMailIds,
  GetProjectRequestState,
} from '../../../../types/ProjectManagement/ProjectCreationRequests/AddProjectRequest/addProjectRequestTypes'

describe('addProjectCreationRequestSlice', () => {
  describe('addProjectCreationRequestSlice Reducer', () => {
    const initialAddProjectCreationRequestState = {
      getProjectRequestMailIds: {} as GetProjectRequestMailIds,
      chelist: [],
      isLoading: ApiLoadingState.idle,
    } as GetProjectRequestState
    it('Should be able to set isLoading to "loading" if getCheckList is pending', () => {
      const action = {
        type: addProjectCreationRequestService.getCheckList.pending.type,
      }
      const state = addProjectCreationRequestReducer(
        initialAddProjectCreationRequestState,
        action,
      )
      expect(state).toEqual({
        getProjectRequestMailIds: {} as GetProjectRequestMailIds,
        chelist: [],
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "loading" if getProjectRequestMailIds is pending', () => {
      const action = {
        type: addProjectCreationRequestService.getProjectRequestMailIds.pending
          .type,
      }
      const state = addProjectCreationRequestReducer(
        initialAddProjectCreationRequestState,
        action,
      )
      expect(state).toEqual({
        getProjectRequestMailIds: {} as GetProjectRequestMailIds,
        chelist: [],
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "loading" if getCheckList is fullfilled', () => {
      const action = {
        type: addProjectCreationRequestService.getCheckList.fulfilled.type,
      }
      const state = addProjectCreationRequestReducer(
        initialAddProjectCreationRequestState,
        action,
      )
      expect(state).toEqual({
        getProjectRequestMailIds: {} as GetProjectRequestMailIds,
        chelist: undefined,
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "loading" if getProjectRequestMailIds is fullfilled', () => {
      const action = {
        type: addProjectCreationRequestService.getProjectRequestMailIds
          .fulfilled.type,
      }
      const state = addProjectCreationRequestReducer(
        initialAddProjectCreationRequestState,
        action,
      )
      expect(state).toEqual({
        getProjectRequestMailIds: undefined,
        chelist: [],
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
