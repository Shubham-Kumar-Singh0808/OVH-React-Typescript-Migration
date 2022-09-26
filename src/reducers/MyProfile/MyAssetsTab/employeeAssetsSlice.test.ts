import reducer, { employeeAssetsService } from './employeeAssetsSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { mockAssetsDetails } from '../../../test/data/employeeAssetsData'
import { EmployeeAssetsState } from '../../../types/MyProfile/MyAssetsTab/employeeAssetsTypes'

describe('Employee Assets Slice', () => {
  describe('Reducer', () => {
    const initialEmployeeAssetsState = {
      currentPage: 1,
      pageSize: 20,
      employeeAssets: [],
      isLoading: ApiLoadingState.idle,
      error: 0,
    } as EmployeeAssetsState

    it('Should be able to set isLoading to "loading" if getEmployeeMyAssets is pending', () => {
      const action = {
        type: employeeAssetsService.getEmployeeMyAssets.pending.type,
      }
      const state = reducer(initialEmployeeAssetsState, action)
      expect(state).toEqual({
        currentPage: 1,
        pageSize: 20,
        employeeAssets: [],
        isLoading: ApiLoadingState.loading,
        error: 0,
      })
    })

    it('Should be able to set isLoading to "success" if getEmployeeMyAssets is fulfilled', () => {
      const action = {
        type: employeeAssetsService.getEmployeeMyAssets.fulfilled.type,
        payload: mockAssetsDetails,
      }
      const state = reducer(initialEmployeeAssetsState, action)
      expect(state).toEqual({
        currentPage: 1,
        pageSize: 20,
        employeeAssets: mockAssetsDetails,
        isLoading: ApiLoadingState.succeeded,
        error: 0,
      })
    })
  })
})
