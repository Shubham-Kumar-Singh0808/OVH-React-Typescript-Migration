import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import changeRequestApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/ChangeRequest/changeRequestApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  AddChangeRequestProps,
  ChangeRequest,
  ChangeRequestProps,
  ChangeRequestSliceState,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'

const getProjectChangeRequestList = createAsyncThunk(
  'projectView/getProjectChangeRequestList',
  async (props: ChangeRequestProps, thunkApi) => {
    try {
      return await changeRequestApi.getProjectChangeRequestList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addChangeRequest = createAsyncThunk<
  number | undefined,
  AddChangeRequestProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectView/addChangeRequest',
  async (addChangeRequestProps: AddChangeRequestProps, thunkApi) => {
    try {
      return await changeRequestApi.addChangeRequest(addChangeRequestProps)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateChangeRequest = createAsyncThunk<
  number | undefined,
  AddChangeRequestProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectView/getUpdateFamilyDetails',
  async (updateChangeRequest: AddChangeRequestProps, thunkApi) => {
    try {
      return await changeRequestApi.updateChangeRequest(updateChangeRequest)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteChangeRequest = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectView/deleteChangeRequest', async (crId, thunkApi) => {
  try {
    return await changeRequestApi.deleteChangeRequest(crId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialChangeRequestState: ChangeRequestSliceState = {
  changeRequestList: { size: 0, list: [] },
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const changeRequestSlice = createSlice({
  name: 'projectView',
  initialState: initialChangeRequestState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectChangeRequestList.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.changeRequestList = action.payload
    })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectChangeRequest.isLoading

const projectChangeRequest = (state: RootState): ChangeRequest[] =>
  state.projectChangeRequest.changeRequestList.list

const projectChangeRequestSize = (state: RootState): number =>
  state.projectChangeRequest.changeRequestList.size

const myTicketsThunk = {
  getProjectChangeRequestList,
  addChangeRequest,
  updateChangeRequest,
  deleteChangeRequest,
}

const changeRequestSelectors = {
  isLoading,
  projectChangeRequest,
  projectChangeRequestSize,
}

export const changeRequestService = {
  ...myTicketsThunk,
  actions: changeRequestSlice.actions,
  selectors: changeRequestSelectors,
}

export default changeRequestSlice.reducer