import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import mileStoneApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/MileStone/mileStoneApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import { ChangeRequestProps } from '../../../../../types/ProjectManagement/Project/ProjectView/ChangeRequest/changeRequestTypes'
import {
  GetMilestone,
  MileStoneDiscussionProps,
  MileStoneHistory,
  MilestoneNewsFeed,
  MileStoneResponse,
  MileStoneSliceState,
  PostMileStoneProps,
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

const mileStoneTimeLine = createAsyncThunk<
  MileStoneHistory[],
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectView/mileStoneTimeLine', async (id: number, thunkApi) => {
  try {
    return await mileStoneApi.mileStoneTimeLine(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getMilestone = createAsyncThunk<
  GetMilestone,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('projectView/getMilestone', async (milestoneId: number, thunkApi) => {
  try {
    return await mileStoneApi.getMilestone(milestoneId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const uploadProjectMileStoneImage = createAsyncThunk(
  'projectView/uploadProjectMileStoneImage',
  async (prepareObject: { postid: number; file: FormData }, thunkApi) => {
    try {
      return await mileStoneApi.uploadProjectMileStoneImage(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const postProjectMileStone = createAsyncThunk<
  number | string,
  PostMileStoneProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectNotes/postProjectNotes',
  async (postMileStoneProps: PostMileStoneProps, thunkApi) => {
    try {
      return await mileStoneApi.postProjectMileStone(postMileStoneProps)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getMilestoneNewsFeed = createAsyncThunk(
  'projectView/getMilestoneNewsFeed',
  async (props: MileStoneDiscussionProps, thunkApi) => {
    try {
      return await mileStoneApi.getMilestoneNewsFeed(props)
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
  mileStoneHistory: [],
  getMilestone: {} as GetMilestone,
  milestoneNewsFeed: [],
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
    builder.addCase(mileStoneTimeLine.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.mileStoneHistory = action.payload
    })
    builder.addCase(getMilestone.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.getMilestone = action.payload
    })
    builder.addCase(getMilestoneNewsFeed.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.milestoneNewsFeed = action.payload
    })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.projectMileStone?.isLoading

const projectMileStone = (state: RootState): MileStoneResponse[] =>
  state.projectMileStone?.mileStonesList?.list

const projectMileStoneSize = (state: RootState): number =>
  state.projectMileStone?.mileStonesList?.size

const projectMileStoneTimeLine = (state: RootState): MileStoneHistory[] =>
  state.projectMileStone?.mileStoneHistory

const getProjectMileStoneResponse = (state: RootState): GetMilestone =>
  state.projectMileStone?.getMilestone

const projectMileStoneNewsFeed = (state: RootState): MilestoneNewsFeed[] =>
  state.projectMileStone?.milestoneNewsFeed

const mileStoneThunk = {
  getProjectMileStone,
  mileStoneTimeLine,
  getMilestone,
  uploadProjectMileStoneImage,
  postProjectMileStone,
  getMilestoneNewsFeed,
}

const mileStoneSelectors = {
  isLoading,
  projectMileStone,
  projectMileStoneSize,
  projectMileStoneTimeLine,
  getProjectMileStoneResponse,
  projectMileStoneNewsFeed,
}

export const mileStoneService = {
  ...mileStoneThunk,
  actions: mileStoneSlice.actions,
  selectors: mileStoneSelectors,
}

export default mileStoneSlice.reducer
