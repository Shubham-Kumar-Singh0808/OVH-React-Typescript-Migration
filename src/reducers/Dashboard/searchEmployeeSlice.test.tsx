import reducer, { employeeSearchService } from './searchEmployeeSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { employeeProfileSearchState } from '../../types/Dashboard/employeeSearchTypes'
import { mockSearchEmployee } from '../../test/data/employeeProfileDate'

describe('Search Employee Slice', () => {
  describe('Earned Leaves Reducer', () => {
    const initialSearchEmployeeState = {
      isLoading: ApiLoadingState.idle,
      employeeProfile: [],
      searchString: '',
    } as employeeProfileSearchState

    it('Should be able to set isLoading to "loading" if searchEmployee is pending', () => {
      const action = {
        type: employeeSearchService.searchEmployee.pending.type,
      }
      const state = reducer(initialSearchEmployeeState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        employeeProfile: [],
        searchString: '',
      })
    })

    it('Should be able to set isLoading to "success" if searchEmployee is fulfilled', () => {
      const action = {
        type: employeeSearchService.searchEmployee.fulfilled.type,
        payload: mockSearchEmployee,
      }
      const state = reducer(initialSearchEmployeeState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        employeeProfile: mockSearchEmployee,
        searchString: '',
      })
    })
  })
})
