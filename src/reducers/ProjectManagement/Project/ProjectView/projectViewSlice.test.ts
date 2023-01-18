import projectViewDetailsReducer, {
  projectViewService,
} from './projectViewSlice'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { ProjectDetail } from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import { ProjectViewDetailsState } from '../../../../types/ProjectManagement/Project/ProjectView/projectViewTypes'

describe('projectViewSlice', () => {
  describe('projectViewReducer', () => {
    const initialProjectDetailsState = {
      projectViewDetails: [],
      isLoading: ApiLoadingState.idle,
      projectDetail: {} as ProjectDetail,
    } as unknown as ProjectViewDetailsState

    it('Should be able to set isLoading to "loading" if getProjectDetails is pending', () => {
      const action = {
        type: projectViewService.getProjectDetails.pending.type,
      }
      const state = projectViewDetailsReducer(
        initialProjectDetailsState,
        action,
      )
      expect(state).toEqual({
        projectViewDetails: [],
        isLoading: ApiLoadingState.loading,
        projectDetail: {} as ProjectDetail,
      })
    })
    it('Should be able to set isLoading to "loading" if getProject is pending', () => {
      const action = {
        type: projectViewService.getProject.pending.type,
      }
      const state = projectViewDetailsReducer(
        initialProjectDetailsState,
        action,
      )
      expect(state).toEqual({
        projectViewDetails: [],
        isLoading: ApiLoadingState.loading,
        projectDetail: {} as ProjectDetail,
      })
    })
    it('Should be able to set isLoading to "success" if getProjectDetails is fulfilled', () => {
      const action = {
        type: projectViewService.getProjectDetails.fulfilled,
      }
      const state = projectViewDetailsReducer(
        initialProjectDetailsState,
        action,
      )
      expect(state).toEqual({
        projectViewDetails: undefined,
        isLoading: ApiLoadingState.succeeded,
        projectDetail: {} as ProjectDetail,
      })
    })
    it('Should be able to set isLoading to "success" if getProject is fulfilled', () => {
      const action = {
        type: projectViewService.getProject.fulfilled,
      }
      const state = projectViewDetailsReducer(
        initialProjectDetailsState,
        action,
      )
      expect(state).toEqual({
        projectViewDetails: [],
        isLoading: ApiLoadingState.succeeded,
        projectDetail: undefined,
      })
    })
  })
})
