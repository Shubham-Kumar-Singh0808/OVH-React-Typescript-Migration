import appraisalConfigurationReducer, {
  appraisalCycleService,
  initialAppraisalCycleSliceState,
} from './appraisalConfigurationsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockAppraisalCycle } from '../../../test/data/appraisalConfigurationsData'
import { getCycle } from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'

describe('appraisal Configuration', () => {
  describe('getAllAppraisalCycle test', () => {
    it('Should be able to set isLoading to "loading" if getAllAppraisalCycle is pending', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycle.pending.type,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as getCycle,
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if getAllAppraisalCycle is fulfilled', () => {
      const action = {
        type: appraisalCycleService.getAllAppraisalCycle.fulfilled.type,
        payload: mockAppraisalCycle,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: mockAppraisalCycle,
        editAppraisalCycle: {} as getCycle,
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
        error: null,
      })
    })
  })

  describe('getCycleToEdit test', () => {
    it('Should be able to set isLoading to "loading" if getCycleToEdit is pending', () => {
      const action = {
        type: appraisalCycleService.getCycleToEdit.pending.type,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as getCycle,
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if getCycleToEdit is fulfilled', () => {
      const action = {
        type: appraisalCycleService.getCycleToEdit.fulfilled.type,
        payload: mockAppraisalCycle,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: mockAppraisalCycle,
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
        error: null,
      })
    })
  })

  describe('updateAppraisalCycle test', () => {
    it('Should be able to set isLoading to "loading" if updateAppraisalCycle is pending', () => {
      const action = {
        type: appraisalCycleService.updateAppraisalCycle.pending.type,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as getCycle,
        isLoading: ApiLoadingState.loading,
        currentPage: 1,
        pageSize: 20,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if updateAppraisalCycle is fulfilled', () => {
      const action = {
        type: appraisalCycleService.updateAppraisalCycle.fulfilled.type,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as getCycle,
        isLoading: ApiLoadingState.succeeded,
        currentPage: 1,
        pageSize: 20,
        error: null,
      })
    })
  })
})
