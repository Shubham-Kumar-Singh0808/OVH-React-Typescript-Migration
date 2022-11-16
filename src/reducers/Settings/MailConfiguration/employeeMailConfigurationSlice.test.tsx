import employeeMailConfigurationReducer, {
  employeeMailConfigurationService,
} from './employeeMailConfigurationSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { EmployeeMailConfigurationState } from '../../../types/Settings/MailConfiguration/employeMailConfigurationTypes'
import {
  mockEmailTemplate,
  mockTemplateTypes,
} from '../../../test/data/employeeMailConfigurationData'

describe('Mail Configuration Slice', () => {
  describe('Mail Configuration Reducer', () => {
    const initialMailConfigurationState = {
      employeeGetEmailTemplate: [],
      isLoading: ApiLoadingState.idle,
      employeeGetMailTemplateTypes: [],
      error: null,
    } as EmployeeMailConfigurationState
    it('Should be able to set isLoading to "loading" if getEmployeeMailTemplateTypes is pending', () => {
      const action = {
        type: employeeMailConfigurationService.getEmployeeMailTemplateTypes
          .pending.type,
      }
      const state = employeeMailConfigurationReducer(
        initialMailConfigurationState,
        action,
      )
      expect(state).toEqual({
        employeeGetEmailTemplate: [],
        isLoading: ApiLoadingState.loading,
        employeeGetMailTemplateTypes: [],
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if getEmployeeMailTemplateTypes is fulfilled', () => {
      const action = {
        type: employeeMailConfigurationService.getEmployeeMailTemplateTypes
          .fulfilled.type,
        payload: mockTemplateTypes,
      }
      const state = employeeMailConfigurationReducer(
        initialMailConfigurationState,
        action,
      )
      expect(state).toEqual({
        employeeGetEmailTemplate: [],
        isLoading: ApiLoadingState.succeeded,
        employeeGetMailTemplateTypes: mockTemplateTypes,
        error: null,
      })
    })

    it('Should be able to set isLoading to "success" if getEmployeeMailTemplate is fulfilled', () => {
      const action = {
        type: employeeMailConfigurationService.getEmployeeMailTemplate.fulfilled
          .type,
        payload: mockEmailTemplate,
      }
      const state = employeeMailConfigurationReducer(
        initialMailConfigurationState,
        action,
      )
      expect(state).toEqual({
        employeeGetEmailTemplate: mockEmailTemplate,
        isLoading: ApiLoadingState.succeeded,
        employeeGetMailTemplateTypes: [],
        error: null,
      })
    })
  })
})
