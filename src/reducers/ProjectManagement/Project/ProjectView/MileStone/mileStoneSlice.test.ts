import projectMileStoneReducer, { mileStoneService } from './mileStoneSlice'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { MileStoneSliceState } from '../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'
import { mockMileStonesList } from '../../../../../test/data/projectMilestoneData'

describe('mileStoneSlice Slice', () => {
  describe('mileStoneSlice Reducer', () => {
    const initialMileStoneState = {
      mileStonesList: { size: 0, list: [] },
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
    } as MileStoneSliceState
    it('Should be able to set isLoading to "loading" if getProjectMileStone is pending', () => {
      const action = {
        type: mileStoneService.getProjectMileStone.pending.type,
      }
      const state = projectMileStoneReducer(initialMileStoneState, action)
      expect(state).toEqual({
        mileStonesList: { size: 0, list: [] },
        isLoading: ApiLoadingState.idle,
        currentPage: 1,
        pageSize: 20,
      })
    })
    it('Should be able to set isLoading to "success" if getProjectMileStone is fulfilled', () => {
      const action = {
        type: mileStoneService.getProjectMileStone.fulfilled.type,
        payload: mockMileStonesList,
      }
      const state = projectMileStoneReducer(initialMileStoneState, action)
      expect(state).toEqual({
        mileStonesList: mockMileStonesList,
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
