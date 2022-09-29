import reducer, { allocateEmployeeService } from './allocateEmployeeSlice'
import {
  AllocateEmployeeToProject,
  EmployeeAllocateSliceState,
} from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import {
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

    it('Should be able to set isLoading to "loading" if getAllEmployeesProfileData is pending', () => {
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

    it('Should be able to set isLoading to "loading" if getAllProjectSearchData is pending', () => {
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

    it('Should be able to set isLoading to "success" if getAllEmployeesProfileData is fulfilled', () => {
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

    it('Should be able to set isLoading to "success" if getAllProjectSearchData is fulfilled', () => {
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
  })
})
