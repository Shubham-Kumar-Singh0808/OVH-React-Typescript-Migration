import { AxiosError } from 'axios'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AppDispatch, RootState } from '../../../stateStore'
import {
  GetJoineeById,
  GetUpComingJoineeList,
  UpComingJoineeList,
  UpComingJoineeListProps,
  UpComingJoineeListSliceState,
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

const getJoineeById = createAsyncThunk(
  'jobapplicant/getJoineeById',
  async (joineeId: number, thunkApi) => {
    try {
      return await UpComingJoinListApi.getJoineeById(joineeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteJoinee = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('jobapplicant/deleteJoinee', async (joineeId, thunkApi) => {
  try {
    return await UpComingJoinListApi.deleteJoinee(joineeId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

export const initialUpComingJoinListState: UpComingJoineeListSliceState = {
  upComingJoineeListDetails: [],
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  getUpComingJoineeList: {} as GetUpComingJoineeList,
  getJoineeById: {} as GetJoineeById,
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
      .addMatcher(isAnyOf(getJoineeById.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getJoineeById = action.payload
      })
  },
})

const upComingJoinListThunk = {
  getUpConingJoinList,
  getJoineeById,
  deleteJoinee,
}

function isLoading(state: RootState): LoadingState {
  return state.upComingJoinList.isLoading
}
const upComingJoinList = (state: RootState): UpComingJoineeList[] =>
  state.upComingJoinList.upComingJoineeListDetails

const getJoineeDetails = (state: RootState): GetJoineeById =>
  state.upComingJoinList.getJoineeById

const listSize = (state: RootState): number => state.upComingJoinList.listSize

export const upComingJoinListSelectors = {
  isLoading,
  upComingJoinList,
  listSize,
  getJoineeDetails,
}

export const upComingJoiningListService = {
  ...upComingJoinListThunk,
  actions: upComingJoinListSlice.actions,
  selectors: upComingJoinListSelectors,
}

export default upComingJoinListSlice.reducer
