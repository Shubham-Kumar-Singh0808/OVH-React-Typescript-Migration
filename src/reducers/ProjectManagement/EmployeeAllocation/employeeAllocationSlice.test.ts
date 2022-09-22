import employeeAllocationReportReducer, {
  employeeAllocationSliceService,
} from './employeeAllocationSlice'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  EmployeeAllocationReportState,
  EmployeeAllocationReportType,
} from '../../../types/ProjectManagement/EmployeeAllocation/employeeAllocationTypes'

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
  })
})
