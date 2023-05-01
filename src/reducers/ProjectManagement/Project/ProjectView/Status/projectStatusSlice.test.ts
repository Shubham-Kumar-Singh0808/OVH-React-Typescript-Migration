import projectStatusReducer, {
  projectStatusService,
} from './projectStatusSlice'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { StatusReportListSliceState } from '../../../../../types/ProjectManagement/Project/ProjectView/Status/projectStatusTypes'
import { mockProjectStatusList } from '../../../../../test/data/projectStatusTabData'

describe('projectStatusSlice', () => {
  describe('projectStatusReducer', () => {
    const initialProjectStatusState = {
      statusReportList: { size: 0, list: [] },
      projectStatusReport: [],
      isLoading: ApiLoadingState.idle,
    } as StatusReportListSliceState

    it('Should be able to set isLoading to "loading" if getStatusReportList is pending', () => {
      const action = {
        type: projectStatusService.getStatusReportList.pending.type,
      }
      const state = projectStatusReducer(initialProjectStatusState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        statusReportList: { size: 0, list: [] },
        projectStatusReport: [],
      })
    })

    it('Should be able to set isLoading to "success" if getStatusReportList is fulfilled', () => {
      const action = {
        type: projectStatusService.getStatusReportList.fulfilled,
        payload: mockProjectStatusList,
      }
      const state = projectStatusReducer(initialProjectStatusState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        statusReportList: mockProjectStatusList,
        projectStatusReport: [],
      })
    })
  })
})
