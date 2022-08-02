import { ApiLoadingState } from '../../../../src/middleware/api/apiList'
import employeeHandbookSettingsReducer from '../../../reducers/EmployeeHandbook/HandbookSettings/employeeHandbookSettingSlice'

describe('Employee Handbook Settings Slice Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = employeeHandbookSettingsReducer(initialState, action)
    expect(result).toEqual({
      listSize: 0,
      isLoading: ApiLoadingState.idle,
      employeeHandbooks: [],
      employeeCountries: [],
      totalHandbookList: [],
      error: null,
    })
  })
})
