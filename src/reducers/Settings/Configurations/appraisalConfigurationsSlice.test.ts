import AppraisalCycleReducer, {
  initialAppraisalCycleSliceState,
  appraisalCycleService,
} from './appraisalConfigurationsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockAppraisalCycle } from '../../../test/data/appraisalConfigurationsData'

describe('Appraisal Cycle Slice', () => {
  describe('getAllAppraisalCycleData test', () => {
    it('Should be able to set isLoading to "loading" if getAllAppraisalCycleData is pending', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycleData.pending.type,
      }
      const state = AppraisalCycleReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        appraisalCycleList: { list: [], size: 0 },
      })
    })

    it('Should be able to set isLoading to "success" if getAllAppraisalCycleData is rejected', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycleData.fulfilled.type,
        payload: mockAppraisalCycle,
      }
      const state = AppraisalCycleReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        appraisalCycleList: mockAppraisalCycle,
      })
    })

    it('Should be able to set isLoading to "failed" if getAllAppraisalCycleData is rejected', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycleData.rejected.type,
      }
      const state = AppraisalCycleReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        appraisalCycleList: { list: [], size: 0 },
      })
    })
  })
})
