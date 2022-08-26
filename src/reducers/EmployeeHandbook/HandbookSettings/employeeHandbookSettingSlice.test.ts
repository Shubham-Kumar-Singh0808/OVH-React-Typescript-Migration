import { ApiLoadingState } from '../../../../src/middleware/api/apiList'
import reducer, {
  employeeHandbookSettingService,
} from '../../../reducers/EmployeeHandbook/HandbookSettings/employeeHandbookSettingSlice'
import { mockEmployeeHandbookList } from '../../../test/data/employeeHandbookSettingsData'
import { mockCountries } from '../../../test/data/handbookTotalListData'
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
      reRenderHandbookList: true,
    } as EmployeeHandbookSettingSliceState

    it('Should be able to set isLoading to "loading" if getEmployeeHandbookList is pending', () => {
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
        reRenderHandbookList: true,
      })
    })

    it('Should be able to set isLoading to "success" if getEmployeeHandbookList is fulfilled', () => {
      const action = {
        type: employeeHandbookSettingService.getTotalHandbookList.fulfilled
          .type,
        payload: mockEmployeeHandbookList,
      }
      const state = reducer(initialEmployeeHandbookSettingState, action)
      expect(state).toEqual({
        listSize: 0,
        isLoading: ApiLoadingState.succeeded,
        employeeHandbooks: [],
        employeeCountries: [],
        error: null,
        totalHandbookList: mockEmployeeHandbookList,
        updateHandbookPage: {} as UpdateHandbookPage,
        selectedHandbook: [],
        selectedCountries: [],
        reRenderHandbookList: true,
      })
    })

    it('Should be able to set isLoading to "failed" if getEmployeeHandbookList is rejected', () => {
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
        reRenderHandbookList: true,
      })
    })

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
        reRenderHandbookList: true,
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
        reRenderHandbookList: true,
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
        reRenderHandbookList: true,
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
        reRenderHandbookList: true,
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
        reRenderHandbookList: true,
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
        reRenderHandbookList: true,
      })
    })
  })
})
