import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import projectCreationRequestsApi from '../../../middleware/api/ProjectManagement/ProjectCreationRequests/projectCreationRequestsApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetAllProjectRequestListProps,
  GetProjectRequest,
  ProjectCreationRequestState,
  ProjectRequestHistoryDetails,
  ProjectRequestList,
} from '../../../types/ProjectManagement/ProjectCreationRequests/projectCreationRequestsTypes'

const getAllProjectRequestList = createAsyncThunk(
  'projectCreationRequest/getAllProjectRequestList',
  async (props: GetAllProjectRequestListProps, thunkApi) => {
    try {
      return await projectCreationRequestsApi.getAllProjectRequestList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProjectRequest = createAsyncThunk<
  GetProjectRequest | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectCreationRequest/getProjectRequest', async (id: number, thunkApi) => {
  try {
    return await projectCreationRequestsApi.getProjectRequest(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const projectRequestHistoryDetails = createAsyncThunk<
  ProjectRequestHistoryDetails[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectCreationRequest/projectRequestHistoryDetails',
  async (projectRequestId: number, thunkApi) => {
    try {
      return await projectCreationRequestsApi.projectRequestHistoryDetails(
        projectRequestId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProjectCreationReuestState: ProjectCreationRequestState = {
  getAllProjectRequestList: {
    projectRequestListSize: 0,
    projectrequestList: [],
  },
  getProjectRequest: {} as GetProjectRequest,
  projectRequestHistoryDetails: [],
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const projectCreationRequestSlice = createSlice({
  name: 'projectCreationRequest',
  initialState: initialProjectCreationReuestState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProjectRequestList.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.getAllProjectRequestList = action.payload
    })
    builder.addCase(getProjectRequest.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.getProjectRequest = action.payload as GetProjectRequest
    })
    builder
      .addCase(projectRequestHistoryDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectRequestHistoryDetails =
          action.payload as ProjectRequestHistoryDetails[]
      })
      .addMatcher(
        isAnyOf(
          getAllProjectRequestList.pending,
          getProjectRequest.pending,
          projectRequestHistoryDetails.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectCreationRequest.isLoading

const allProjectCreationList = (state: RootState): ProjectRequestList[] =>
  state.projectCreationRequest.getAllProjectRequestList.projectrequestList

const allProjectCreationListSize = (state: RootState): number =>
  state.projectCreationRequest.getAllProjectRequestList.projectRequestListSize

const getProjectRequests = (state: RootState): GetProjectRequest =>
  state.projectCreationRequest.getProjectRequest

const projectHistoryDetails = (
  state: RootState,
): ProjectRequestHistoryDetails[] =>
  state.projectCreationRequest.projectRequestHistoryDetails

const projectCreationRequestThunk = {
  getAllProjectRequestList,
  getProjectRequest,
  projectRequestHistoryDetails,
}

const projectCreationRequestSelectors = {
  isLoading,
  allProjectCreationList,
  allProjectCreationListSize,
  getProjectRequests,
  projectHistoryDetails,
}

export const projectCreationRequestService = {
  ...projectCreationRequestThunk,
  actions: projectCreationRequestSlice.actions,
  selectors: projectCreationRequestSelectors,
}

export default projectCreationRequestSlice.reducer
