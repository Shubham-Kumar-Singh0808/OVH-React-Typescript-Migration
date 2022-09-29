import reducer, { EmployeeHandbookService } from './employeeHandbookSlice'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { mockHandbookList } from '../../test/data/handbookListData'

describe('Employee Handbook Slice', () => {
  describe('Reducer', () => {
    const initialState = {
      handbooksList: [],
      isLoading: ApiLoadingState.idle,
      error: null,
    }
    it('Should be able to set isLoading to "loading" if getAllEvents is pending', () => {
      const action = {
        type: EmployeeHandbookService.getHandbooks.pending.type,
      }
      const state = reducer(initialState, action)
      expect(state).toEqual({
        handbooksList: [],
        isLoading: ApiLoadingState.loading,
        error: null,
      })
    })

    it('Should be able to set isLoading to "succeeded" if getAllEvents is fulfilled', () => {
      const action = {
        type: EmployeeHandbookService.getHandbooks.fulfilled.type,
        payload: mockHandbookList,
      }
      const state = reducer(initialState, action)
      expect(state).toEqual({
        handbooksList: mockHandbookList,
        isLoading: ApiLoadingState.succeeded,
        error: null,
      })
    })
    it('Should be able to set isLoading to "succeeded" if getAllEvents is fulfilled', () => {
      const action = {
        type: EmployeeHandbookService.getHandbooks.rejected.type,
      }
      const state = reducer(initialState, action)
      expect(state).toEqual({
        handbooksList: [],
        isLoading: ApiLoadingState.failed,
        error: undefined,
      })
    })
  })
})
