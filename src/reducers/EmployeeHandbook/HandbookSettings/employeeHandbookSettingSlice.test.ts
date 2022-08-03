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
      error: null,
      totalHandbookList: [],
      updateHandbookPage: {
        country: undefined,
        departmentId: undefined,
        departmentName: undefined,
        description: '',
        displayOrder: 0,
        empCountry: '',
        handCountry: [],
        id: 0,
        pageName: '',
        sectionId: undefined,
        sectionName: undefined,
        title: '',
        type: '',
        list: [],
      },
      selectedHandbook: [],
      selectedCountries: [],
      reRenderHandbookList: true,
    })
  })
})
