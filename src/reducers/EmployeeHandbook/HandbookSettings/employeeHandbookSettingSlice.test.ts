import { ApiLoadingState } from '../../../../src/middleware/api/apiList'
import reducer, {
  employeeHandbookSettingService,
} from '../../../reducers/EmployeeHandbook/HandbookSettings/employeeHandbookSettingSlice'
import {
  mockCountries,
  mockHandbookData,
  mockHandbookDetails,
} from '../../../test/data/handbookTotalListData'
import {
  EmployeeHandbookSettingSliceState,
  UpdateHandbookPage,
} from '../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'

describe('EmployeeHandbookSettings Slice', () => {
  describe('Reducer', () => {
    const initialEmployeeHandbookSettingState = {
      listSize: 0,
      isLoading: ApiLoadingState.idle,
      employeeHandbooks: [],
      employeeCountries: [],
      error: null,
      totalHandbookList: [],
      updateHandbookPage: {} as UpdateHandbookPage,
      selectedHandbook: [],
      selectedCountries: [],
    } as EmployeeHandbookSettingSliceState

    it('Should be able to set isLoading to "failed" if `getEmployeeHandbook` is rejected', () => {
      const rejectedAction = {
        type: employeeHandbookSettingService.getEmployeeHandbook.rejected.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, rejectedAction)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.failed,
        employeeHandbooks: [],
        employeeCountries: [],
        error: undefined,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "loading" if `getEmployeeHandbook` is pending', () => {
      const action = {
        type: employeeHandbookSettingService.getEmployeeHandbook.pending.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if `getEmployeeHandbook` is fulfilled', () => {
      const action = {
        type: employeeHandbookSettingService.getEmployeeHandbook.fulfilled.type,
        payload: mockCountries,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.succeeded,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: mockCountries,
      })
    })

    it('Should be able to set isLoading to "failed" if `getEmployeeHandbooks` is rejected', () => {
      const rejectedAction = {
        type: employeeHandbookSettingService.getEmployeeHandbooks.rejected.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, rejectedAction)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.failed,
        employeeHandbooks: [],
        employeeCountries: [],
        error: undefined,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "loading" if `getEmployeeHandbooks` is pending', () => {
      const action = {
        type: employeeHandbookSettingService.getEmployeeHandbooks.pending.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if `getEmployeeHandbooks` is fulfilled', () => {
      const action = {
        type: employeeHandbookSettingService.getEmployeeHandbooks.fulfilled
          .type,
        payload: mockHandbookData,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: mockHandbookData.size,
        isLoading: ApiLoadingState.succeeded,
        employeeHandbooks: mockHandbookData.list,
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "failed" if `getEmployeeHandbooksList` is rejected', () => {
      const rejectedAction = {
        type: employeeHandbookSettingService.getTotalHandbookList.rejected.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, rejectedAction)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.failed,
        employeeHandbooks: [],
        employeeCountries: [],
        error: undefined,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "loading" if `getTotalHandbookList` is pending', () => {
      const action = {
        type: employeeHandbookSettingService.getTotalHandbookList.pending.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if `getTotalHandbookList` is fulfilled', () => {
      const action = {
        type: employeeHandbookSettingService.getTotalHandbookList.fulfilled
          .type,
        payload: mockHandbookData,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.succeeded,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: mockHandbookData,
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "failed" if `getEmployeeCountries` is rejected', () => {
      const rejectedAction = {
        type: employeeHandbookSettingService.getEmployeeCountries.rejected.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, rejectedAction)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.failed,
        employeeHandbooks: [],
        employeeCountries: [],
        error: undefined,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "loading" if `getEmployeeCountries` is pending', () => {
      const action = {
        type: employeeHandbookSettingService.getEmployeeCountries.pending.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if `getEmployeeCountries` is fulfilled', () => {
      const action = {
        type: employeeHandbookSettingService.getEmployeeCountries.fulfilled
          .type,
        payload: mockCountries,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.succeeded,
        employeeHandbooks: [],
        employeeCountries: mockCountries,
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "failed" if `updateEmployeeHandbook` is rejected', () => {
      const rejectedAction = {
        type: employeeHandbookSettingService.updateEmployeeHandbook.rejected
          .type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, rejectedAction)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.failed,
        employeeHandbooks: [],
        employeeCountries: [],
        error: undefined,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "loading" if `updateEmployeeHandbook` is pending', () => {
      const action = {
        type: employeeHandbookSettingService.updateEmployeeHandbook.pending
          .type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if `updateEmployeeHandbook` is fulfilled', () => {
      const action = {
        type: employeeHandbookSettingService.updateEmployeeHandbook.fulfilled
          .type,
        payload: mockHandbookDetails,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.succeeded,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "failed" if `addNewHandbook` is rejected', () => {
      const rejectedAction = {
        type: employeeHandbookSettingService.addNewHandbook.rejected.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, rejectedAction)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.failed,
        employeeHandbooks: [],
        employeeCountries: [],
        error: undefined,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "loading" if `addNewHandbook` is pending', () => {
      const action = {
        type: employeeHandbookSettingService.addNewHandbook.pending.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if `addNewHandbook` is fulfilled', () => {
      const action = {
        type: employeeHandbookSettingService.addNewHandbook.fulfilled.type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.succeeded,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {},
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "failed" if `deleteEmployeeHandbook` is rejected', () => {
      const rejectedAction = {
        type: employeeHandbookSettingService.deleteEmployeeHandbook.rejected
          .type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, rejectedAction)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.failed,
        employeeHandbooks: [],
        employeeCountries: [],
        error: undefined,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "loading" if `deleteEmployeeHandbook` is pending', () => {
      const action = {
        type: employeeHandbookSettingService.deleteEmployeeHandbook.pending
          .type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.loading,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
      })
    })

    it('Should be able to set isLoading to "success" if `deleteEmployeeHandbook` is fulfilled', () => {
      const action = {
        type: employeeHandbookSettingService.deleteEmployeeHandbook.fulfilled
          .type,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.succeeded,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: [],
        updateHandbookPage: {},
        selectedHandbook: [],
        selectedCountries: [],
      })
    })
  })
})
