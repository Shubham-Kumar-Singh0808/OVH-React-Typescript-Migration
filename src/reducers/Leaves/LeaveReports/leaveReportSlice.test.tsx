import leaveReportSlice from './leaveReportSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'

describe('Employee leave Report Reducer Test', () => {
  it('should return the initial state when passed an empty action', () => {
    const initialState = undefined
    const action = { type: '' }
    const result = leaveReportSlice(initialState, action)
    expect(result).toEqual({
      leaveSummaries: { list: [], size: 0, name: '', length: 0 },
      selectFinancialYear: [],
      error: null,
      isLoading: ApiLoadingState.idle,
      financialYear: 0,
      listSize: 0,
    })
  })
})
