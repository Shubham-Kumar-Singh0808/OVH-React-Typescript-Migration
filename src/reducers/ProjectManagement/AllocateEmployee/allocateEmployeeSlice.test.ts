import reducer, { allocateEmployeeService } from './allocateEmployeeSlice'
import {
  AllocateEmployeeToProject,
  EmployeeAllocateSliceState,
} from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import {
  mockAllocateEmployeeToProject,
  mockEmployeeNames,
  mockProjectNames,
} from '../../../test/data/allocateEmployeeData'
import { ApiLoadingState } from '../../../middleware/api/apiList'

describe('Achievements Slice', () => {
  describe('Achievements Reducer', () => {
    const initialAllocateEmployeeState = {
      getAllEmployees: [],
      getAllProjects: [],
      allocateEmployee: {} as AllocateEmployeeToProject,
      isLoading: ApiLoadingState.idle,
      error: null,
    } as EmployeeAllocateSliceState

    it('Should be able to set isLoading to "loading" if getAllEmployees is pending', () => {
      const action = {
        type: allocateEmployeeService.getAllEmployeesProfileData.pending.type,
      }
      const state = reducer(initialAllocateEmployeeState, action)
      expect(state).toEqual({
        getAllEmployees: [],
        getAllProjects: [],
        allocateEmployee: {} as AllocateEmployeeToProject,
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if getAllProjects is pending', () => {
      const action = {
        type: allocateEmployeeService.getAllProjectSearchData.pending.type,
      }
      const state = reducer(initialAllocateEmployeeState, action)
      expect(state).toEqual({
        getAllEmployees: [],
        getAllProjects: [],
        allocateEmployee: {} as AllocateEmployeeToProject,
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "loading" if allocateEmployee is pending', () => {
      const action = {
        type: allocateEmployeeService.AddNewAllocate.pending.type,
      }
      const state = reducer(initialAllocateEmployeeState, action)
      expect(state).toEqual({
        getAllEmployees: [],
        getAllProjects: [],
        allocateEmployee: {} as AllocateEmployeeToProject,
        isLoading: ApiLoadingState.idle,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if getAllEmployees is fulfilled', () => {
      const action = {
        type: allocateEmployeeService.getAllEmployeesProfileData.fulfilled.type,
        payload: mockEmployeeNames,
      }
      const state = reducer(initialAllocateEmployeeState, action)
      expect(state).toEqual({
        getAllEmployees: mockEmployeeNames,
        getAllProjects: [],
        allocateEmployee: {} as AllocateEmployeeToProject,
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if getAllProjects is fulfilled', () => {
      const action = {
        type: allocateEmployeeService.getAllProjectSearchData.fulfilled.type,
        payload: mockProjectNames,
      }
      const state = reducer(initialAllocateEmployeeState, action)
      expect(state).toEqual({
        getAllEmployees: [],
        getAllProjects: mockProjectNames,
        allocateEmployee: {} as AllocateEmployeeToProject,
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if allocateEmployee is fulfilled', () => {
      const action = {
        type: allocateEmployeeService.AddNewAllocate.fulfilled.type,
        payload: mockAllocateEmployeeToProject,
      }
      const state = reducer(initialAllocateEmployeeState, action)
      expect(state).toEqual({
        getAllEmployees: [],
        getAllProjects: [],
        allocateEmployee: {} as AllocateEmployeeToProject,
        isLoading: ApiLoadingState.idle,
        error: null,
      })
    })
  })
})
