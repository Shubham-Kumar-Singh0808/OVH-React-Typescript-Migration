import ProcessAreaReducer, {
  initialProcessAreaState,
  processAreaService,
} from './ProcessAreaSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  mockProcessAreaDetails,
  mockProcessAreas,
} from '../../../test/data/processAreaData'
import { GetProcessAreaDetails } from '../../../types/Settings/ProcessAreas/processAreaTypes'

describe('Process Area Slice', () => {
  describe('checkDuplicateProcess test', () => {
    it('Should be able to set isLoading to "loading" if checkDuplicateProcess is pending', () => {
      const action = {
        type: processAreaService.checkDuplicateProcess.pending.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
        processAreaDetails: {} as GetProcessAreaDetails,
      })
    })

    it('Should be able to set isLoading to "success" if checkDuplicateProcess is fulfilled', () => {
      const action = {
        type: processAreaService.checkDuplicateProcess.fulfilled.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        processAreaDetails: {} as GetProcessAreaDetails,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "failed" if checkDuplicateProcess is rejected', () => {
      const action = {
        type: processAreaService.checkDuplicateProcess.rejected.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })

  describe('getProjectTailoringDocument test', () => {
    it('Should be able to set isLoading to "loading" if getProjectTailoringDocument is pending', () => {
      const action = {
        type: processAreaService.getProjectTailoringDocument.pending.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        processAreaDetails: {} as GetProcessAreaDetails,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "success" if getProjectTailoringDocument is fulfilled', () => {
      const action = {
        type: processAreaService.getProjectTailoringDocument.fulfilled.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        getProjectTailoringDocument: undefined,
        ProcessSubHeads: undefined,
        ProcessAreas: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "failed" if getProjectTailoringDocument is rejected', () => {
      const action = {
        type: processAreaService.getProjectTailoringDocument.rejected.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })
  })

  describe('getProcessAreas test', () => {
    it('Should be able to set isLoading to "loading" if getProcessAreas is pending', () => {
      const action = {
        type: processAreaService.getProcessAreas.pending.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        processAreaDetails: {} as GetProcessAreaDetails,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "success" if getProcessAreas is fulfilled', () => {
      const action = {
        type: processAreaService.getProcessAreas.fulfilled.type,
        payload: mockProcessAreas,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: mockProcessAreas,
        currentPage: 1,
        processAreaDetails: {} as GetProcessAreaDetails,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "failed" if getProcessAreas is rejected', () => {
      const action = {
        type: processAreaService.getProcessAreas.rejected.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        currentPage: 1,
        pageSize: 20,
      })
    })
  })

  describe('createProcessArea test', () => {
    it('Should be able to set isLoading to "loading" if createProcessArea is pending', () => {
      const action = {
        type: processAreaService.createProcessArea.pending.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "success" if createProcessArea is fulfilled', () => {
      const action = {
        type: processAreaService.createProcessArea.fulfilled.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "failed" if createProcessArea is rejected', () => {
      const action = {
        type: processAreaService.createProcessArea.rejected.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })
  })

  describe('getOrderCountOfActiveProcesses test', () => {
    it('Should be able to set isLoading to "loading" if getOrderCountOfActiveProcesses is pending', () => {
      const action = {
        type: processAreaService.getOrderCountOfActiveProcesses.pending.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "success" if getOrderCountOfActiveProcesses is fulfilled', () => {
      const action = {
        type: processAreaService.getOrderCountOfActiveProcesses.fulfilled.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "failed" if getOrderCountOfActiveProcesses is rejected', () => {
      const action = {
        type: processAreaService.getOrderCountOfActiveProcesses.rejected.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
  describe('incrementOrDecrementOrder test', () => {
    it('Should be able to set isLoading to "loading" if incrementOrDecrementOrder is pending', () => {
      const action = {
        type: processAreaService.incrementOrDecrementOrder.pending.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "success" if incrementOrDecrementOrder is fulfilled', () => {
      const action = {
        type: processAreaService.incrementOrDecrementOrder.fulfilled.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "failed" if incrementOrDecrementOrder is rejected', () => {
      const action = {
        type: processAreaService.incrementOrDecrementOrder.rejected.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })
  })

  describe('saveProcessArea test', () => {
    it('Should be able to set isLoading to "loading" if saveProcessArea is pending', () => {
      const action = {
        type: processAreaService.saveProcessArea.pending.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "success" if saveProcessArea is fulfilled', () => {
      const action = {
        type: processAreaService.saveProcessArea.fulfilled.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })

    it('Should be able to set isLoading to "failed" if saveProcessArea is rejected', () => {
      const action = {
        type: processAreaService.saveProcessArea.rejected.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.idle,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        processAreaDetails: {} as GetProcessAreaDetails,
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
      })
    })
  })
  describe('getProcessAreaDetails test', () => {
    it('Should be able to set isLoading to "loading" if getProcessAreaDetails is pending', () => {
      const action = {
        type: processAreaService.getProcessAreaDetails.pending.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
        processAreaDetails: {} as GetProcessAreaDetails,
      })
    })

    it('Should be able to set isLoading to "success" if getProcessAreaDetails is fulfilled', () => {
      const action = {
        type: processAreaService.getProcessAreaDetails.fulfilled.type,
        payload: mockProcessAreaDetails,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
        processAreaDetails: mockProcessAreaDetails,
      })
    })

    it('Should be able to set isLoading to "failed" if getProcessAreaDetails is rejected', () => {
      const action = {
        type: processAreaService.getProcessAreaDetails.rejected.type,
      }
      const state = ProcessAreaReducer(initialProcessAreaState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.failed,
        error: null,
        getProjectTailoringDocument: [],
        ProcessSubHeads: [],
        ProcessAreas: [],
        currentPage: 1,
        pageSize: 20,
        processAreaDetails: {} as GetProcessAreaDetails,
      })
    })
  })
})
