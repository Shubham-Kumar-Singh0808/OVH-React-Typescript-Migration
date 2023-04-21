import PipListReducer, {
  initialPipListState,
  pipListService,
} from './pipListSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  EmployeePipStatus,
  GetPipList,
} from '../../../types/Performance/PipList/pipListTypes'

const currentMonth = 'Current Month'

describe('PIP List Slice', () => {
  describe('getAllPIPList test', () => {
    it('Should be able to set isLoading to "loading" if getAllPIPList is pending', () => {
      const action = {
        type: pipListService.getAllPIPList.pending.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        pipListValue: currentMonth,
        list: {} as GetPipList,
      })
    })

    it('Should be able to set isLoading to "success" if getAllPIPList is fulfilled', () => {
      const action = {
        type: pipListService.getAllPIPList.fulfilled.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: undefined,
        pipListData: undefined,
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "failed" if getAllPIPList is rejected', () => {
      const action = {
        type: pipListService.getAllPIPList.rejected.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })
  })

  describe('exportPIPList test', () => {
    it('Should be able to set isLoading to "loading" if exportPIPList is pending', () => {
      const action = {
        type: pipListService.exportPIPList.pending.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "success" if exportPIPList is fulfilled', () => {
      const action = {
        type: pipListService.exportPIPList.fulfilled.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "failed" if exportPIPList is rejected', () => {
      const action = {
        type: pipListService.exportPIPList.rejected.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })
  })

  describe('getPerformanceRatings test', () => {
    it('Should be able to set isLoading to "loading" if getPerformanceRatings is pending', () => {
      const action = {
        type: pipListService.getPerformanceRatings.pending.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "success" if getPerformanceRatings is fulfilled', () => {
      const action = {
        type: pipListService.getPerformanceRatings.fulfilled.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: undefined,
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "failed" if getPerformanceRatings is rejected', () => {
      const action = {
        type: pipListService.getPerformanceRatings.rejected.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })
  })
  describe('extendPip test', () => {
    it('Should be able to set isLoading to "loading" if extendPip is pending', () => {
      const action = {
        type: pipListService.extendPip.pending.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "success" if extendPip is fulfilled', () => {
      const action = {
        type: pipListService.extendPip.fulfilled.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: undefined,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "failed" if extendPip is rejected', () => {
      const action = {
        type: pipListService.extendPip.rejected.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })
  })
  describe('updatePipDetails test', () => {
    it('Should be able to set isLoading to "loading" if updatePipDetails is pending', () => {
      const action = {
        type: pipListService.updatePipDetails.pending.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "success" if updatePipDetails is fulfilled', () => {
      const action = {
        type: pipListService.updatePipDetails.fulfilled.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: undefined,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "failed" if updatePipDetails is rejected', () => {
      const action = {
        type: pipListService.updatePipDetails.rejected.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })
  })

  describe('viewPipDetails test', () => {
    it('Should be able to set isLoading to "loading" if viewPipDetails is pending', () => {
      const action = {
        type: pipListService.viewPipDetails.pending.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "success" if viewPipDetails is fulfilled', () => {
      const action = {
        type: pipListService.viewPipDetails.fulfilled.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: undefined,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "failed" if viewPipDetails is rejected', () => {
      const action = {
        type: pipListService.viewPipDetails.rejected.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })
  })

  describe('removeFromPip test', () => {
    it('Should be able to set isLoading to "loading" if removeFromPip is pending', () => {
      const action = {
        type: pipListService.removeFromPip.pending.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "success" if removeFromPip is fulfilled', () => {
      const action = {
        type: pipListService.removeFromPip.fulfilled.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: undefined,
        pipListValue: currentMonth,
      })
    })

    it('Should be able to set isLoading to "failed" if removeFromPip is rejected', () => {
      const action = {
        type: pipListService.removeFromPip.rejected.type,
      }
      const state = PipListReducer(initialPipListState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        listSize: 0,
        pipListData: [],
        selectedEmployeePipStatus: EmployeePipStatus.pip,
        performanceRatings: [],
        activeEmployee: [],
        employeePIPTimeline: { size: 0, list: [] },
        list: {} as GetPipList,
        pipListValue: currentMonth,
      })
    })
  })
})
