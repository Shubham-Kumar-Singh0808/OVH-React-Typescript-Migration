import { ApiLoadingState } from '../../../../src/middleware/api/apiList'
import reducer, {
  employeeHandbookSettingService,
} from '../../../reducers/EmployeeHandbook/HandbookSettings/employeeHandbookSettingSlice'
import { mockEmployeeHandbookList } from '../../../test/data/employeeHandbookSettingsData'
import { EmployeeHandbookSettingSliceState } from '../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'

describe('EmployeeHandbookSettings Slice', () => {
  describe('Reducer', () => {
    const initialEmployeeHandbookSettingState = {
      isLoading: ApiLoadingState.idle,
      employeeHandbooks: mockEmployeeHandbookList,
    } as EmployeeHandbookSettingSliceState

    it('Should be able to set isLoading to "loading" if getEmployeeHandbookList is pending', () => {
      const action = {
        type: employeeHandbookSettingService.getTotalHandbookList.pending.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        employeeHandbooks: mockEmployeeHandbookList,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "success" if getEmployeeHandbookList is fulfilled', () => {
      const action = {
        type: employeeHandbookSettingService.getEmployeeHandbooks.fulfilled
          .type,
        payload: mockEmployeeHandbookList,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "failed" if getEmployeeHandbookList is rejected', () => {
      const rejectedAction = {
        type: employeeHandbookSettingService.getTotalHandbookList.rejected.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, rejectedAction)
      expect(state).toEqual({
        employeeHandbooks: mockEmployeeHandbookList,
        isLoading: ApiLoadingState.failed,
      })
    })
  })
})
