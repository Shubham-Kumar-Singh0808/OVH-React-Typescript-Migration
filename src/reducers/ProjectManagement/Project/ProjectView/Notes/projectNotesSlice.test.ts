import projectNotesReducer, { projectNotesService } from './projectNotesSlice'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { mockProjectNotes } from '../../../../../test/data/projectNotesData'
import { ProjectNotesState } from '../../../../../types/ProjectManagement/Project/ProjectView/Notes/projectNotesTypes'

describe('projectNotesSlice', () => {
  describe('projectNotesReducer', () => {
    const initialProjectNotesState = {
      isLoading: ApiLoadingState.idle,
      projectNotesTimeLine: [],
    } as ProjectNotesState

    it('Should be able to set isLoading to "loading" if getProjectNotesTimeLine is pending', () => {
      const action = {
        type: projectNotesService.getProjectNotesTimeLine.pending.type,
      }
      const state = projectNotesReducer(initialProjectNotesState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.loading,
        projectNotesTimeLine: [],
      })
    })

    it('Should be able to set isLoading to "success" if getProjectNotesTimeLine is fulfilled', () => {
      const action = {
        type: projectNotesService.getProjectNotesTimeLine.fulfilled,
        payload: mockProjectNotes,
      }
      const state = projectNotesReducer(initialProjectNotesState, action)
      expect(state).toEqual({
        isLoading: ApiLoadingState.succeeded,
        projectNotesTimeLine: mockProjectNotes,
      })
    })
  })
})
