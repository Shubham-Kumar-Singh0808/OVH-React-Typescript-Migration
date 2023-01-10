import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import projectProposalsApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/Proposals/ProjectProposalApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  ProjectProposal,
  ProjectProposalState,
} from '../../../../../types/ProjectManagement/Project/ProjectView/Proposals/ProjectProposalsTypes'

const getProjectTimeLine = createAsyncThunk<
  ProjectProposal[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectProposals/getProjectTimeLine',
  async (projectId: number | string, thunkApi) => {
    try {
      return await projectProposalsApi.getProjectTimeLine(projectId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProjectProposalState: ProjectProposalState = {
  projectProposal: [],
  isLoading: ApiLoadingState.idle,
}

const projectProposalsSlice = createSlice({
  name: 'projectView',
  initialState: initialProjectProposalState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectTimeLine.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectProposal = action.payload as ProjectProposal[]
      })
      .addCase(getProjectTimeLine.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const projectProposalsThunk = {
  getProjectTimeLine,
}

const isProjectProposalsLoading = (state: RootState): LoadingState =>
  state.projectProposals.isLoading

const projectProposalsTimeLine = (state: RootState): ProjectProposal[] =>
  state.projectProposals.projectProposal

const projectProposalsSelectors = {
  isProjectProposalsLoading,
  projectProposalsTimeLine,
}

export const projectProposalsService = {
  ...projectProposalsThunk,
  actions: projectProposalsSlice.actions,
  selectors: projectProposalsSelectors,
}

export default projectProposalsSlice.reducer
