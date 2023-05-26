import projectTailoringReducer, {
  projectTailoringService,
} from './projectTailoringSlice'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import {
  ProjectTailoringSliceState,
  ProjectTailoringStatusEnum,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'

describe('Project Tailoring Slice', () => {
  const initialState: ProjectTailoringSliceState = {
    isLoading: ApiLoadingState.idle,
    error: null,
    defaultProjectTailoringDocument: [],
    projectTailoringDocument: '',
    tailorStatus: ProjectTailoringStatusEnum.initial,
    isManagerSubmitButtonEnabled: true,
    isSQAApproveButtonEnabled: true,
    isSQARejectedButtonEnabled: true,
    isManagerUpdateButtonEnabled: true,
  }
  it('isLoading is set to "loading" if "getProjectTailoringDocument" is pending', () => {
    const action = {
      type: projectTailoringService.getProjectTailoringDocument.pending.type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('isLoading is set to "succeeded" if "getProjectTailoringDocument" is fulfilled', () => {
    const action = {
      type: projectTailoringService.getProjectTailoringDocument.fulfilled.type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      projectTailoringDocument: undefined,
    })
  })
  it('isLoading is set to "failed" if "getProjectTailoringDocument" is rejected', () => {
    const action = {
      type: projectTailoringService.getProjectTailoringDocument.rejected.type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
  it('isLoading is set to "loading" if "getDefaultProjectTailoringDocument" is pending', () => {
    const action = {
      type: projectTailoringService.getDefaultProjectTailoringDocument.pending
        .type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('isLoading is set to "succeeded" if "getDefaultProjectTailoringDocument" is fulfilled', () => {
    const action = {
      type: projectTailoringService.getDefaultProjectTailoringDocument.fulfilled
        .type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
      defaultProjectTailoringDocument: undefined,
    })
  })
  it('isLoading is set to "failed" if "getDefaultProjectTailoringDocument" is rejected', () => {
    const action = {
      type: projectTailoringService.getDefaultProjectTailoringDocument.rejected
        .type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
  it('isLoading is set to "loading" if "saveProjectTailoringDocumentForManager" is pending', () => {
    const action = {
      type: projectTailoringService.saveProjectTailoringDocumentForManager
        .pending.type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('isLoading is set to "succeeded" if "getDefaultProjectTailoringDocument" is fulfilled', () => {
    const action = {
      type: projectTailoringService.saveProjectTailoringDocumentForManager
        .fulfilled.type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
    })
  })
  it('isLoading is set to "failed" if "getDefaultProjectTailoringDocument" is rejected', () => {
    const action = {
      type: projectTailoringService.saveProjectTailoringDocumentForManager
        .rejected.type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })

  it('isLoading is set to "loading" if "saveProjectTailoringDocument" is pending', () => {
    const action = {
      type: projectTailoringService.saveProjectTailoringDocument.pending.type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.loading,
    })
  })
  it('isLoading is set to "succeeded" if "saveProjectTailoringDocument" is fulfilled', () => {
    const action = {
      type: projectTailoringService.saveProjectTailoringDocument.fulfilled.type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.succeeded,
    })
  })
  it('isLoading is set to "failed" if "saveProjectTailoringDocument" is rejected', () => {
    const action = {
      type: projectTailoringService.saveProjectTailoringDocument.rejected.type,
    }
    const state = projectTailoringReducer(initialState, action)
    expect(state).toEqual({
      ...initialState,
      isLoading: ApiLoadingState.failed,
      error: undefined,
    })
  })
})
