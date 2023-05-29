import reducer, { changeReporteesService } from './changeReporteesSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  ChangeReporteesSliceState,
  EmployeeData,
} from '../../../types/Settings/ChangeReportees/changeReporteesTypes'
import {
  mockAllHRList,
  mockAllReportingManagerData,
  mockEmployeesUnderManger,
} from '../../../test/data/ChangeReporteesData'

describe('Change Reportees  Slice', () => {
  describe('Reducer', () => {
    const initialEmployeeChangeReporteeState: ChangeReporteesSliceState = {
      AllReportingManagerList: [],
      AllHRList: [],
      EmployeesUnderManager: [],
      EmployeesUnderHRManager: [],
      isLoading: ApiLoadingState.loading,
    }

    // For getAllReportingManagerAsync
    it('Should be able to set isLoading to "loading" if `getAllReportingManagerAsync` is pending', () => {
      const action = {
        type: changeReporteesService.getAllReportingManagerAsync.pending.type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getAllReportingManagerAsync` is fulfilled', () => {
      const action = {
        type: changeReporteesService.getAllReportingManagerAsync.fulfilled.type,
        payload: mockAllReportingManagerData,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: mockAllReportingManagerData,
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `getAllReportingManagerAsync` is rejected', () => {
      const action = {
        type: changeReporteesService.getAllReportingManagerAsync.rejected.type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.failed,
      })
    })

    // For getAllHRListAsync
    it('Should be able to set isLoading to "loading" if `getAllHRListAsync` is pending', () => {
      const action = {
        type: changeReporteesService.getAllHRListAsync.pending.type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getAllHRListAsync` is fulfilled', () => {
      const action = {
        type: changeReporteesService.getAllHRListAsync.fulfilled.type,
        payload: mockAllHRList,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: mockAllHRList,
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `getAllHRListAsync` is rejected', () => {
      const action = {
        type: changeReporteesService.getAllHRListAsync.rejected.type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.failed,
      })
    })

    // For getAllEmployeesUnderManagerAsync
    it('Should be able to set isLoading to "loading" if `getAllEmployeesUnderManagerAsync` is pending', () => {
      const action = {
        type: changeReporteesService.getAllEmployeesUnderManagerAsync.pending
          .type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getAllEmployeesUnderManagerAsync` is fulfilled', () => {
      const action = {
        type: changeReporteesService.getAllEmployeesUnderManagerAsync.fulfilled
          .type,
        payload: mockEmployeesUnderManger,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: mockEmployeesUnderManger,
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `getAllEmployeesUnderManagerAsync` is rejected', () => {
      const action = {
        type: changeReporteesService.getAllEmployeesUnderManagerAsync.rejected
          .type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.failed,
      })
    })

    // For getHrAssociatesUnderHRManagerAsync
    it('Should be able to set isLoading to "loading" if `getHrAssociatesUnderHRManagerAsync` is pending', () => {
      const action = {
        type: changeReporteesService.getHrAssociatesUnderHRManagerAsync.pending
          .type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `getHrAssociatesUnderHRManagerAsync` is fulfilled', () => {
      const action = {
        type: changeReporteesService.getHrAssociatesUnderHRManagerAsync
          .fulfilled.type,
        payload: mockEmployeesUnderManger,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: mockEmployeesUnderManger,
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `getHrAssociatesUnderHRManagerAsync` is rejected', () => {
      const action = {
        type: changeReporteesService.getHrAssociatesUnderHRManagerAsync.rejected
          .type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.failed,
      })
    })
    // For updateReportingManagerAsync
    it('Should be able to set isLoading to "loading" if `updateReportingManagerAsync` is pending', () => {
      const action = {
        type: changeReporteesService.updateReportingManagerAsync.pending.type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `updateReportingManagerAsync` is fulfilled', () => {
      const action = {
        type: changeReporteesService.updateReportingManagerAsync.fulfilled.type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `updateReportingManagerAsync` is rejected', () => {
      const action = {
        type: changeReporteesService.updateReportingManagerAsync.rejected.type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.failed,
      })
    })
    // For updateHrAssociatesManagerAsync
    it('Should be able to set isLoading to "loading" if `updateHrAssociatesManagerAsync` is pending', () => {
      const action = {
        type: changeReporteesService.updateHrAssociatesManagerAsync.pending
          .type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if `updateHrAssociatesManagerAsync` is fulfilled', () => {
      const action = {
        type: changeReporteesService.updateHrAssociatesManagerAsync.fulfilled
          .type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.succeeded,
      })
    })
    it('Should be able to set isLoading to "failed" if `updateHrAssociatesManagerAsync` is rejected', () => {
      const action = {
        type: changeReporteesService.updateHrAssociatesManagerAsync.rejected
          .type,
      }
      const state = reducer(initialEmployeeChangeReporteeState, action)
      expect(state).toEqual({
        AllReportingManagerList: [] as EmployeeData[],
        AllHRList: [] as EmployeeData[],
        EmployeesUnderManager: [] as EmployeeData[],
        EmployeesUnderHRManager: [] as EmployeeData[],
        isLoading: ApiLoadingState.failed,
      })
    })
  })
})
