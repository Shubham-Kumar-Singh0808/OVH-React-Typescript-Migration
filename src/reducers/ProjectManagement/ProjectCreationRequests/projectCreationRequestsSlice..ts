import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import projectCreationRequestsApi from '../../../middleware/api/ProjectManagement/ProjectCreationRequests/projectCreationRequestsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetAllProjectRequestListProps,
  ProjectCreationRequestState,
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

const initialProjectCreationReuestState: ProjectCreationRequestState = {
  getAllProjectRequestList: {
    projectRequestListSize: 0,
    projectrequestList: [],
  },
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
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectCreationRequest.isLoading

const allProjectCreationList = (state: RootState): ProjectRequestList[] =>
  state.projectCreationRequest.getAllProjectRequestList.projectrequestList

const allProjectCreationListSize = (state: RootState): number =>
  state.projectCreationRequest.getAllProjectRequestList.projectRequestListSize

const projectCreationRequestThunk = {
  getAllProjectRequestList,
}

const projectCreationRequestSelectors = {
  isLoading,
  allProjectCreationList,
  allProjectCreationListSize,
}

export const projectCreationRequestService = {
  ...projectCreationRequestThunk,
  actions: projectCreationRequestSlice.actions,
  selectors: projectCreationRequestSelectors,
}

export default projectCreationRequestSlice.reducer
