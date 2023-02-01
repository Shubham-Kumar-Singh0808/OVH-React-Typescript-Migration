import projectChangeRequestReducer, {
  changeRequestService,
} from './changeRequestSlice'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { mockChangeRequest } from '../../../../../test/data/projectChangeRequestData'
import { ChangeRequestSliceState } from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'

describe('changeRequestSlice', () => {
  describe('changeRequestReducer', () => {
    const initialChangeRequestState = {
      changeRequestList: { size: 0, list: [] },
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
    } as ChangeRequestSliceState

    it('Should be able to set isLoading to "loading" if getProjectChangeRequestList is pending', () => {
      const action = {
        type: changeRequestService.getProjectChangeRequestList.pending.type,
      }
      const state = projectChangeRequestReducer(
        initialChangeRequestState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        changeRequestList: { size: 0, list: [] },
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "success" if getProjectChangeRequestList is fulfilled', () => {
      const action = {
        type: changeRequestService.getProjectChangeRequestList.fulfilled,
        payload: mockChangeRequest,
      }
      const state = projectChangeRequestReducer(
        initialChangeRequestState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        changeRequestList: mockChangeRequest,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
