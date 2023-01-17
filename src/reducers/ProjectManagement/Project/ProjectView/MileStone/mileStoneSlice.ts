import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import mileStoneApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/MileStone/mileStoneApi'
import { RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import { ChangeRequestProps } from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'
import {
  MileStoneResponse,
  MileStoneSliceState,
} from '../../../../../types/ProjectManagement/Project/ProjectView/MileStone/mileStoneTypes'

const getProjectMileStone = createAsyncThunk(
  'projectView/getProjectMileStone',
  async (props: ChangeRequestProps, thunkApi) => {
    try {
      return await mileStoneApi.getProjectMileStone(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialMileStoneState: MileStoneSliceState = {
  mileStonesList: { size: 0, list: [] },
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const mileStoneSlice = createSlice({
  name: 'projectView',
  initialState: initialMileStoneState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectMileStone.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.mileStonesList = action.payload
    })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectMileStone.isLoading

const projectMileStone = (state: RootState): MileStoneResponse[] =>
  state.projectMileStone.mileStonesList.list

const projectMileStoneSize = (state: RootState): number =>
  state.projectMileStone.mileStonesList.size

const mileStoneThunk = {
  getProjectMileStone,
}

const mileStoneSelectors = {
  isLoading,
  projectMileStone,
  projectMileStoneSize,
}

export const mileStoneService = {
  ...mileStoneThunk,
  actions: mileStoneSlice.actions,
  selectors: mileStoneSelectors,
}

export default mileStoneSlice.reducer
