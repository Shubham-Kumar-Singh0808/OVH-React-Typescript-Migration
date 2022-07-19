import employeeDesignationListSliceReducer from './employeeDesignationListSlice'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'

describe('Employee Designation Slice Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeDesignationListSliceReducer(initialState, action)
    expect(result).toEqual({
      employeeDepartments: [],
      refreshList: false,
      isLoading: ApiLoadingState.idle,
      error: null,
      employeeDesignations: [],
      currentPage: 1,
      pageSize: 20,
    })
  })
})
