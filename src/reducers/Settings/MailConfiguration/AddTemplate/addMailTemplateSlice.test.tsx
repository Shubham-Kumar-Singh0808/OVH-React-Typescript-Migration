import addNewTemplateReducer from '../../../Settings/MailConfiguration/AddTemplate/addMailTemplateSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

describe('Employee Handbook Settings Slice Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = addNewTemplateReducer(initialState, action)
    expect(result).toEqual({
      isLoading: ApiLoadingState.idle,
      error: null,
      getAllLookups: {
        assetTypeList: [],
      },
    })
  })
})
