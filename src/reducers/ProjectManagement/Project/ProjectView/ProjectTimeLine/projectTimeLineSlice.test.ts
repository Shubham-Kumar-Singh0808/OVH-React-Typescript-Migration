import projectTimeLineReducer, {
  projectTimeLineService,
} from './projectTimeLineSlice'
import { ProjectHistoryDetailsSliceState } from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTimeLine/projectTimeLineTypes'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { mockProjectHistoryDetails } from '../../../../../test/data/projectViewTimeLineData'

describe('projectTimeLineSlice Slice', () => {
  describe('projectTimeLineSlice Reducer', () => {
    const initialProjectHistoryState = {
      projectHistoryResponse: { size: 0, list: [] },
      isLoading: ApiLoadingState.loading,
    } as ProjectHistoryDetailsSliceState
    it('Should be able to set isLoading to "loading" if projectHistoryDetails is pending', () => {
      const action = {
        type: projectTimeLineService.projectHistoryDetails.pending.type,
      }
      const state = projectTimeLineReducer(initialProjectHistoryState, action)
      expect(state).toEqual({
        projectHistoryResponse: { size: 0, list: [] },
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if projectHistoryDetails is fulfilled', () => {
      const action = {
        type: projectTimeLineService.projectHistoryDetails.fulfilled.type,
        payload: mockProjectHistoryDetails,
      }
      const state = projectTimeLineReducer(initialProjectHistoryState, action)
      expect(state).toEqual({
        projectHistoryResponse: mockProjectHistoryDetails,
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
