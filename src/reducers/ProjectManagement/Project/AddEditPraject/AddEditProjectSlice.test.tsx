import reducer, { projectManagementService } from './AddEditProjectSlice'
import { mockPlatform } from '../../../../test/data/projectManagerData'
import { ProjectsManagementSliceState } from '../../../../types/ProjectManagement/Project/AddProject/AddProjectTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

describe('Project Slice', () => {
  describe('Reducer', () => {
    const initialProjectsState = {
      platForms: mockPlatform,
      isLoading: ApiLoadingState.loading,
    } as ProjectsManagementSliceState

    it('Should be able to set isLoading to "loading" if getAllPlatforms is pending', () => {
      const action = {
        type: projectManagementService.getAllPlatforms.pending.type,
      }
      const state = reducer(initialProjectsState, action)
      expect(state).toEqual({
        platForms: mockPlatform,
        isLoading: ApiLoadingState.loading,
      })
    })

    it('Should be able to set isLoading to "success" if getAllPlatforms is fulfilled', () => {
      const action = {
        type: projectManagementService.getAllPlatforms.fulfilled.type,
        payload: mockPlatform,
      }
      const state = reducer(initialProjectsState, action)
      expect(state).toEqual({
        platForms: mockPlatform,
        isLoading: ApiLoadingState.succeeded,
      })
    })

    it('Should be able to set isLoading to "failed" if getAllPlatforms is rejected', () => {
      const rejectedAction = {
        type: projectManagementService.getAllPlatforms.rejected.type,
      }
      const state = reducer(initialProjectsState, rejectedAction)
      expect(state).toEqual({
        platForms: mockPlatform,
        isLoading: ApiLoadingState.failed,
      })
    })
  })
})
