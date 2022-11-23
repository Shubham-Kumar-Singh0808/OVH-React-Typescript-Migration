import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import resignationListApi from '../../../middleware/api/Separation/ResignationList/resignationListApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetResignationListProps,
  ResignationList,
  ResignationListSliceState,
} from '../../../types/Separation/ResignationList/resignationListTypes'

const getResignationList = createAsyncThunk(
  'resignationList/getResignationList',
  async (props: GetResignationListProps, thunkApi) => {
    try {
      return await resignationListApi.getResignationList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const resignationIntitiateCC = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('resignationList/resignationIntitiateCC', async (separationId, thunkApi) => {
  try {
    return await resignationListApi.resignationIntitiateCC(separationId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialResignationListState: ResignationListSliceState = {
  resignationList: { size: 0, list: [] },
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const resignationListSlice = createSlice({
  name: 'support',
  initialState: initialResignationListState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResignationList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.resignationList = action.payload
      })
      .addCase(getResignationList.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.resignationList.isLoading

const resignationListDetails = (state: RootState): ResignationList[] =>
  state.resignationList.resignationList.list

const resignationListSize = (state: RootState): number =>
  state.resignationList.resignationList.size

const pageFromState = (state: RootState): number =>
  state.resignationList.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.resignationList.pageSize

const resignationListThunk = {
  getResignationList,
  resignationIntitiateCC,
}

const resignationListSelectors = {
  isLoading,
  resignationListDetails,
  resignationListSize,
  pageFromState,
  pageSizeFromState,
}

export const resignationListService = {
  ...resignationListThunk,
  actions: resignationListSlice.actions,
  selectors: resignationListSelectors,
}

export default resignationListSlice.reducer
