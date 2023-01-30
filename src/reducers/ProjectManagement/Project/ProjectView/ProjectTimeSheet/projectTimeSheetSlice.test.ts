import hiveActivityReportReducer, {
  projectHiveActivityReportService,
} from './projectTimeSheetSlice'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { ProjectHiveActivityReportSlice } from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTimeSheet/projectTimeSheetTypes'

describe('projectTimeSheetSlice', () => {
  describe('projectTimesheetViewReducer', () => {
    const initialHiveActivityReportSliceState = {
      employeeHiveActivityReport: {
        id: 0,
        userName: '',
        firstName: '',
        lastName: '',
        activityTimes: [],
        totalHiveTime: '',
        projectIdentifier: '',
      },
      isLoading: ApiLoadingState.idle,
    } as ProjectHiveActivityReportSlice

    it('Should be able to set isLoading to "loading" if getProjectTimeSheet is pending', () => {
      const action = {
        type: projectHiveActivityReportService.getProjectTimeSheet.pending.type,
      }
      const state = hiveActivityReportReducer(
        initialHiveActivityReportSliceState,
        action,
      )
      expect(state).toEqual({
        employeeHiveActivityReport: {
          id: 0,
          userName: '',
          firstName: '',
          lastName: '',
          activityTimes: [],
          totalHiveTime: '',
          projectIdentifier: '',
        },
        isLoading: ApiLoadingState.loading,
      })
    })
    it('Should be able to set isLoading to "success" if getProjectTimeSheet is fulfilled', () => {
      const action = {
        type: projectHiveActivityReportService.getProjectTimeSheet.fulfilled,
      }
      const state = hiveActivityReportReducer(
        initialHiveActivityReportSliceState,
        action,
      )
      expect(state).toEqual({
        employeeHiveActivityReport: undefined,
        isLoading: ApiLoadingState.succeeded,
      })
    })
  })
})
