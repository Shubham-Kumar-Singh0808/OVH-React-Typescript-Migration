import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import {
  GetUpComingJoineeList,
  UpComingJoineeList,
  UpComingJoineeListProps,
  UpComingJoineeListSliceState,
  UpdateUpComingJoineeList,
} from '../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'
import UpComingJoinListApi from '../../../middleware/api/Recruitment/UpComingJoinList/UpComingJoinListApi'

const getUpConingJoinList = createAsyncThunk(
  'jobapplicant/getUpcomingJoineeList',
  async (props: UpComingJoineeListProps, thunkApi) => {
    try {
      return await UpComingJoinListApi.getUpComingJoinList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateNewJoineeThunk = createAsyncThunk(
  'jobapplicant/updateNewJoinee',
  async (props: UpdateUpComingJoineeList, thunkApi) => {
    try {
      return await UpComingJoinListApi.UpdateNewJoinee(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialUpComingJoinListState: UpComingJoineeListSliceState = {
  upComingJoineeListDetails: [],
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  getUpComingJoineeList: {} as GetUpComingJoineeList,
}

const upComingJoinListSlice = createSlice({
  name: 'upComingJoinList',
  initialState: initialUpComingJoinListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getUpConingJoinList.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getUpConingJoinList.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.upComingJoineeListDetails = action.payload.list
        state.listSize = action.payload.size
      })

      .addMatcher(isAnyOf(updateNewJoineeThunk.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
  },
})

const upComingJoinListThunk = {
  getUpConingJoinList,
  updateNewJoineeThunk,
}

function isLoading(state: RootState): LoadingState {
  return state.upComingJoinList.isLoading
}
const upComingJoinList = (state: RootState): UpComingJoineeList[] =>
  state.upComingJoinList.upComingJoineeListDetails

const listSize = (state: RootState): number => state.upComingJoinList.listSize

export const upComingJoinListSelectors = {
  isLoading,
  upComingJoinList,
  listSize,
}

export const upComingJoiningListService = {
  ...upComingJoinListThunk,
  actions: upComingJoinListSlice.actions,
  selectors: upComingJoinListSelectors,
}

export default upComingJoinListSlice.reducer
