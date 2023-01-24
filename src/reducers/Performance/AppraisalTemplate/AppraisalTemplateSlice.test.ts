import AppraisalTemplateReducer, {
  initialAppraisalTemplateState,
  appraisalTemplateService,
} from './AppraisalTemplateSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockDesignationsUnderCycle } from '../../../test/data/appraisalTemplateData'

describe('PIP List Slice', () => {
  describe('activeCycle test', () => {
    it('Should be able to set isLoading to "loading" if activeCycle is pending', () => {
      const action = {
        type: appraisalTemplateService.activeCycle.pending.type,
      }
      const state = AppraisalTemplateReducer(
        initialAppraisalTemplateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        cycleList: [],
        designationsUnderCycle: [],
        currentPage: 1,
        pageSize: 20,
        designationsUnderCycleProps: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "success" if activeCycle is fulfilled', () => {
      const action = {
        type: appraisalTemplateService.activeCycle.fulfilled.type,
      }
      const state = AppraisalTemplateReducer(
        initialAppraisalTemplateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        cycleList: [],
        designationsUnderCycle: [],
        currentPage: 1,
        pageSize: 20,
        designationsUnderCycleProps: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "failed" if activeCycle is rejected', () => {
      const action = {
        type: appraisalTemplateService.activeCycle.rejected.type,
      }
      const state = AppraisalTemplateReducer(
        initialAppraisalTemplateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        cycleList: [],
        designationsUnderCycle: [],
        currentPage: 1,
        pageSize: 20,
        designationsUnderCycleProps: { size: 0, list: [] },
      })
    })
  })

  describe('cycle test', () => {
    it('Should be able to set isLoading to "loading" if cycle is pending', () => {
      const action = {
        type: appraisalTemplateService.cycle.pending.type,
      }
      const state = AppraisalTemplateReducer(
        initialAppraisalTemplateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        cycleList: [],
        designationsUnderCycle: [],
        currentPage: 1,
        pageSize: 20,
        designationsUnderCycleProps: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "success" if cycle is fulfilled', () => {
      const action = {
        type: appraisalTemplateService.cycle.fulfilled.type,
      }
      const state = AppraisalTemplateReducer(
        initialAppraisalTemplateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        cycleList: undefined,
        designationsUnderCycle: [],
        currentPage: 1,
        pageSize: 20,
        designationsUnderCycleProps: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "failed" if cycle is rejected', () => {
      const action = {
        type: appraisalTemplateService.cycle.rejected.type,
      }
      const state = AppraisalTemplateReducer(
        initialAppraisalTemplateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        cycleList: [],
        designationsUnderCycle: [],
        currentPage: 1,
        pageSize: 20,
        designationsUnderCycleProps: { size: 0, list: [] },
      })
    })
  })

  describe('getDesignationsUnderCycle test', () => {
    it('Should be able to set isLoading to "loading" if getDesignationsUnderCycle is pending', () => {
      const action = {
        type: appraisalTemplateService.getDesignationsUnderCycle.pending.type,
      }
      const state = AppraisalTemplateReducer(
        initialAppraisalTemplateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        cycleList: [],
        designationsUnderCycle: [],
        currentPage: 1,
        pageSize: 20,
        designationsUnderCycleProps: { size: 0, list: [] },
      })
    })

    it('Should be able to set isLoading to "success" if getDesignationsUnderCycle is fulfilled', () => {
      const action = {
        type: appraisalTemplateService.getDesignationsUnderCycle.fulfilled.type,
        payload: mockDesignationsUnderCycle,
      }
      const state = AppraisalTemplateReducer(
        initialAppraisalTemplateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 2,
        cycleList: [],
        designationsUnderCycle: [],
        currentPage: 1,
        pageSize: 20,
        designationsUnderCycleProps: mockDesignationsUnderCycle,
      })
    })

    it('Should be able to set isLoading to "failed" if getDesignationsUnderCycle is rejected', () => {
      const action = {
        type: appraisalTemplateService.getDesignationsUnderCycle.rejected.type,
      }
      const state = AppraisalTemplateReducer(
        initialAppraisalTemplateState,
        action,
      )
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        cycleList: [],
        designationsUnderCycle: [],
        currentPage: 1,
        pageSize: 20,
        designationsUnderCycleProps: { size: 0, list: [] },
      })
    })
  })
})
