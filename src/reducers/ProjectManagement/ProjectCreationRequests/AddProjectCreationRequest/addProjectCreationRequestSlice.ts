import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addProjectCreationRequestApi from '../../../../middleware/api/ProjectManagement/ProjectCreationRequests/AddProjectCreationRequestApi'
import { AppDispatch, RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import {
  AddProjectRequestDetails,
  Chelist,
  GetProjectRequestMailIds,
  GetProjectRequestState,
} from '../../../../types/ProjectManagement/ProjectCreationRequests/AddProjectRequest/addProjectRequestTypes'

const getCheckList = createAsyncThunk(
  'addProjectCreationRequest/getCheckList',
  async (_, thunkApi) => {
    try {
      return await addProjectCreationRequestApi.getCheckList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProjectRequestMailIds = createAsyncThunk(
  'addProjectCreationRequest/getProjectRequestMailIds',
  async (_, thunkApi) => {
    try {
      return await addProjectCreationRequestApi.getProjectRequestMailIds()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addProjectRequest = createAsyncThunk<
  number | undefined,
  AddProjectRequestDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'addProjectCreationRequest/addProjectRequest',
  async (addProjectRequestDetails: AddProjectRequestDetails, thunkApi) => {
    try {
      return await addProjectCreationRequestApi.addProjectRequest(
        addProjectRequestDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAddProjectCreationRequestState: GetProjectRequestState = {
  getProjectRequestMailIds: {} as GetProjectRequestMailIds,
  chelist: [],
  isLoading: ApiLoadingState.idle,
}

const addProjectCreationRequestSlice = createSlice({
  name: 'addProjectCreationRequest',
  initialState: initialAddProjectCreationRequestState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCheckList.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.chelist = action.payload
    })
    builder
      .addCase(getProjectRequestMailIds.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getProjectRequestMailIds = action.payload
      })
      .addMatcher(
        isAnyOf(getCheckList.pending, getProjectRequestMailIds.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.addProjectCreationRequest.isLoading

const checkList = (state: RootState): Chelist[] =>
  state.addProjectCreationRequest.chelist

const projectRequestMailIds = (state: RootState): GetProjectRequestMailIds =>
  state.addProjectCreationRequest.getProjectRequestMailIds

const addProjectCreationRequestSelectors = {
  isLoading,
  checkList,
  projectRequestMailIds,
}

const addProjectCreationRequestThunk = {
  getCheckList,
  getProjectRequestMailIds,
  addProjectRequest,
}

export const addProjectCreationRequestService = {
  ...addProjectCreationRequestThunk,
  actions: addProjectCreationRequestSlice.actions,
  selectors: addProjectCreationRequestSelectors,
}

export default addProjectCreationRequestSlice.reducer
