import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import projectStatusApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/Status/projectStatusApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  AddProjectStatusReportProps,
  ProjectStatusReport,
  StatusReportListProps,
  StatusReportListSliceState,
} from '../../../../../types/ProjectManagement/Project/ProjectView/Status/projectStatusTypes'

const getStatusReportList = createAsyncThunk(
  'status/getStatusReportList',
  async (props: StatusReportListProps, thunkApi) => {
    try {
      return await projectStatusApi.getStatusReportList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addProjectStatusReport = createAsyncThunk<
  number | undefined,
  AddProjectStatusReportProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectView/addChangeRequest',
  async (
    addProjectStatusReportProps: AddProjectStatusReportProps,
    thunkApi,
  ) => {
    try {
      return await projectStatusApi.addProjectStatusReport(
        addProjectStatusReportProps,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProjectStatusState: StatusReportListSliceState = {
  statusReportList: { size: 0, list: [] },
  projectStatusReport: [],
  isLoading: ApiLoadingState.idle,
}

const projectStatusSlice = createSlice({
  name: 'status',
  initialState: initialProjectStatusState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStatusReportList.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.statusReportList = action.payload
    })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectStatus.isLoading

const projectStatusReport = (state: RootState): ProjectStatusReport[] =>
  state.projectStatus.statusReportList.list

const statusReportListSize = (state: RootState): number =>
  state.projectStatus.statusReportList.size

const projectStatusThunk = {
  getStatusReportList,
  addProjectStatusReport,
}

const projectStatusSelectors = {
  isLoading,
  projectStatusReport,
  statusReportListSize,
}

export const projectStatusService = {
  ...projectStatusThunk,
  actions: projectStatusSlice.actions,
  selectors: projectStatusSelectors,
}

export default projectStatusSlice.reducer
