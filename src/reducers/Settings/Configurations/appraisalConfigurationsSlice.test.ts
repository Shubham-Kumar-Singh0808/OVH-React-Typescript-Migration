import AppraisalCycleReducer, {
  initialAppraisalCycleSliceState,
  appraisalCycleService,
  initialAppraisalCycleSliceState,
} from './appraisalConfigurationsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockAppraisalCycle } from '../../../test/data/appraisalConfigurationsData'
import { getCycle } from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'

describe('Appraisal Cycle Slice', () => {
  describe('getAllAppraisalCycleData test', () => {
    it('Should be able to set isLoading to "loading" if getAllAppraisalCycleData is pending', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycleData.pending.type,
      }
      const state = AppraisalCycleReducer(
        
        initialAppraisalCycleSliceAppraisalCycleSliceState,
       
        action,
      ,
      )
      expect(state).toEqual({
        editAppraisalCycle: {} as getCycle,
        isLoading: ApiLoadingState.loading,
        appraisalCycleList: { list: [], size: 0 },
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if getAllAppraisalCycleData is rejected', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycleData.fulfilled.type,
        payload: mockAppraisalCycle,
      }
      const state = AppraisalCycleReducer(
        
        initialAppraisalCycleSliceAppraisalCycleSliceState,
       
        action,
      ,
      )
      expect(state).toEqual({
        appraisalCycle: mockAppraisalCycle,
        editAppraisalCycle: {} as getCycle,
        isLoading: ApiLoadingState.succeeded,
        appraisalCycleList: mockAppraisalCycle,
      })
    })

    it('Should be able to set isLoading to "failed" if getAllAppraisalCycleData is rejected', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycleData.rejected.type,
      }
      const state = appraisalConfigurationReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        appraisalCycleList: { list: [], size: 0 },
      })
    })
  })
})
