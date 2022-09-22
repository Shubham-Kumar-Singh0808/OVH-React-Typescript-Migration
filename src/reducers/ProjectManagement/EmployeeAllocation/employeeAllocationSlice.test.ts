import employeeAllocationReportReducer, {
  employeeAllocationSliceService,
} from './employeeAllocationSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  EmployeeAllocationReportState,
  EmployeeAllocationReportType,
} from '../../../types/ProjectManagement/EmployeeAllocation/employeeAllocationTypes'
import {
  mockEmployeeAllocationReport,
  mockProjectUnderEmployeesList,
} from '../../../test/data/employeeAllocationReportData'

describe('Employee Allocation Slice', () => {
  describe('employeeAllocationReducer', () => {
    const initialEmployeeAllocationReportState = {
      Empsize: 0,
      emps: [],
      projectUnderEmployees: [],
      isLoading: ApiLoadingState.idle,
      employeeAllocationReportType: {} as EmployeeAllocationReportType,
      error: null,
    } as EmployeeAllocationReportState

    it('Should be able to set isLoading to "loading" if getAllLookUps is pending', () => {
      const action = {
        type: employeeAllocationSliceService.getEmployeeAllocationReport.pending
          .type,
      }
      const state = employeeAllocationReportReducer(
        initialEmployeeAllocationReportState,
        action,
      )
      expect(state).toEqual({
        Empsize: 0,
        emps: [],
        projectUnderEmployees: [],
        isLoading: ApiLoadingState.loading,
        employeeAllocationReportType: {} as EmployeeAllocationReportType,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if getEmployeeAllocationReport is fulfilled', () => {
      const action = {
        type: employeeAllocationSliceService.getEmployeeAllocationReport
          .fulfilled.type,
        payload: mockEmployeeAllocationReport,
      }
      const state = employeeAllocationReportReducer(
        initialEmployeeAllocationReportState,
        action,
      )
      expect(state).toEqual({
        Empsize: 0,
        emps: [],
        projectUnderEmployees: [],
        isLoading: ApiLoadingState.succeeded,
        employeeAllocationReportType: mockEmployeeAllocationReport,
        error: null,
      })
    })
    it('Should be able to set isLoading to "success" if projectUnderEmployeesReport is fulfilled', () => {
      const action = {
        type: employeeAllocationSliceService.projectUnderEmployeesReport
          .fulfilled.type,
        payload: mockProjectUnderEmployeesList,
      }
      const state = employeeAllocationReportReducer(
        initialEmployeeAllocationReportState,
        action,
      )
      expect(state).toEqual({
        Empsize: 0,
        emps: [],
        projectUnderEmployees: mockProjectUnderEmployeesList,
        isLoading: ApiLoadingState.succeeded,
        employeeAllocationReportType: {},
        error: null,
      })
    })
  })
})
