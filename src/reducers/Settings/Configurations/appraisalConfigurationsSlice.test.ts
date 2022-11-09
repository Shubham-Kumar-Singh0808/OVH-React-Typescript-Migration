import appraisalConfigurationReducer, {
  appraisalCycleService,
} from './appraisalConfigurationsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockAppraisalCycle } from '../../../test/data/appraisalConfigurationsData'

describe('Appraisal Configurations Slice', () => {
  describe('Appraisal Configurations', () => {
    const initialState = {
      appraisalCycle: [],
      isLoading: ApiLoadingState.idle,
      currentPage: 1,
      pageSize: 20,
    }

    it('Should be able to set isLoading to "loading" if getAllAppraisalCycle  is pending', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycle.pending.type,
      }
      const state = appraisalConfigurationReducer(initialState, action)
      expect(state).toEqual({
        appraisalCycle: [],
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "succeeded" if getAllAppraisalCycle is fulfilled', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycle.fulfilled.type,
        payload: mockAppraisalCycle,
      }
      const state = appraisalConfigurationReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        appraisalCycle: mockAppraisalCycle,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "failed" if getAllAppraisalCycle is rejected', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycle.rejected.type,
      }
      const state = appraisalConfigurationReducer(initialState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        appraisalCycle: [],
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
})
