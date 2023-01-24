import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import projectHistoryDetailsApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/ProjectTimeLine/projectTimeLineApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  ProjectHistory,
  ProjectHistoryDetailsSliceState,
  ProjectHistoryResponse,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTimeLine/projectTimeLineTypes'

const projectHistoryDetails = createAsyncThunk<
  ProjectHistoryResponse | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectCreationRequest/projectRequestHistoryDetails',
  async (projectRequestId: string | number, thunkApi) => {
    try {
      return await projectHistoryDetailsApi.projectHistoryDetails(
        projectRequestId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProjectHistoryState: ProjectHistoryDetailsSliceState = {
  projectHistoryResponse: { size: 0, list: [] },
  isLoading: ApiLoadingState.idle,
}

const projectTimeLineSlice = createSlice({
  name: 'ProjectTimeLine',
  initialState: initialProjectHistoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(projectHistoryDetails.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.projectHistoryResponse = action.payload as ProjectHistoryResponse
    })
    builder.addCase(projectHistoryDetails.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const projectTimeLineThunk = {
  projectHistoryDetails,
}

const isLoading = (state: RootState): LoadingState =>
  state.projectTimeLine.isLoading

const projectHistory = (state: RootState): ProjectHistory[] =>
  state.projectTimeLine.projectHistoryResponse.list

const projectTimeLineSelectors = {
  projectHistory,
  isLoading,
}

export const projectTimeLineService = {
  ...projectTimeLineThunk,
  actions: projectTimeLineSlice.actions,
  selectors: projectTimeLineSelectors,
}

export default projectTimeLineSlice.reducer
