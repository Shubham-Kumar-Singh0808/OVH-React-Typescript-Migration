import appraisalConfigurationReducer, {
  appraisalCycleService,
  initialAppraisalCycleSliceState,
} from './appraisalConfigurationsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockAppraisalCycle } from '../../../test/data/appraisalConfigurationsData'
import { GetCycle } from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'

describe('appraisal Configuration', () => {
  describe('getAllAppraisalCycle test', () => {
    it('Should be able to set isLoading to "loading" if getAllAppraisalCycle is pending', () => {
      const action = {
        type: appraisalCycleService.getAppraisalCycle.pending.type,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "success" if getAllAppraisalCycle is fulfilled', () => {
      const action = {
        type: appraisalCycleService.getAppraisalCycle.fulfilled.type,
        payload: mockAppraisalCycle,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: mockAppraisalCycle,
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if getAllAppraisalCycle is rejected', () => {
      const action = {
        type: appraisalCycleService.getAppraisalCycle.rejected.type,
        payload: 500,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.failed,
        error: 500,
        listSize: 0,
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
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
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
        error: null,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if getCycleToEdit is rejected', () => {
      const action = {
        type: appraisalCycleService.getCycleToEdit.rejected.type,
        payload: 500,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.failed,
        error: 500,
        listSize: 0,
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
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "success" if updateAppraisalCycle is fulfilled', () => {
      const action = {
        type: appraisalCycleService.updateAppraisalCycle.fulfilled.type,
        payload: mockAppraisalCycle,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if updateAppraisalCycle is rejected', () => {
      const action = {
        type: appraisalCycleService.updateAppraisalCycle.rejected.type,
        payload: 500,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.failed,
        error: 500,
        listSize: 0,
      })
    })
  })

  describe('validateAppraisalCycle test', () => {
    it('Should be able to set isLoading to "loading" if validateAppraisalCycle is pending', () => {
      const action = {
        type: appraisalCycleService.validateAppraisalCycle.pending.type,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "success" if validateAppraisalCycle is fulfilled', () => {
      const action = {
        type: appraisalCycleService.validateAppraisalCycle.fulfilled.type,
        payload: mockAppraisalCycle,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
      })
    })

    it('Should be able to set isLoading to "failed" if validateAppraisalCycle is rejected', () => {
      const action = {
        type: appraisalCycleService.validateAppraisalCycle.rejected.type,
        payload: 500,
      }
      const state = appraisalConfigurationReducer(
        initialAppraisalCycleSliceState,
        action,
      )
      expect(state).toEqual({
        appraisalCycle: [],
        editAppraisalCycle: {} as GetCycle,
        isLoading: ApiLoadingState.failed,
        error: 500,
        listSize: 0,
      })
    })
  })
})
