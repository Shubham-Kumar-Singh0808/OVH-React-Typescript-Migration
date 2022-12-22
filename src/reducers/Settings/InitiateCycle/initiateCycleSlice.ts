import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import initiateCycleApi from '../../../middleware/api/Settings/InitiateCycle/initiateCycleApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetActiveCycleData,
  GetAllQuestions,
  InitiateCycleSliceState,
  TotalResponse,
} from '../../../types/Settings/InitiateCycle/initiateCycleTypes'

const getActiveCycleData = createAsyncThunk(
  'initiateCycle/getActiveCycleData',
  async (_, thunkApi) => {
    try {
      return await initiateCycleApi.getActiveCycleData()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllCycles = createAsyncThunk(
  'initiateCycle/getAllCycles',
  async (_, thunkApi) => {
    try {
      return await initiateCycleApi.getAllCycles()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllQuestions = createAsyncThunk(
  'initiateCycle/getAllQuestions',
  async (_, thunkApi) => {
    try {
      return await initiateCycleApi.getAllQuestions()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initiateCycle = createAsyncThunk(
  'initiateCycle/initiateCycles',
  async (data: TotalResponse, thunkApi) => {
    try {
      return await initiateCycleApi.initiateCycle(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialCycleState: InitiateCycleSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  activeCycleData: {} as GetActiveCycleData,
  allCycles: { size: 0, list: [] },
  allQuestions: { size: 0, list: [] },
  listSize: 0,
}

const initiateCycleSlice = createSlice({
  name: 'initiateCycle',
  initialState: initialCycleState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getActiveCycleData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.activeCycleData = action.payload
      })
      .addCase(getAllCycles.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allCycles = action.payload
        state.listSize = action.payload.size
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allQuestions = action.payload
        state.listSize = action.payload.size
      })
      .addMatcher(
        isAnyOf(
          getActiveCycleData.pending,
          getAllCycles.pending,
          getAllQuestions.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getActiveCycleData.rejected,
          getAllCycles.rejected,
          getAllQuestions.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.initiateCycle.isLoading

const activeCycleData = (state: RootState): GetActiveCycleData =>
  state.initiateCycle.activeCycleData

const allQuestions = (state: RootState): GetAllQuestions =>
  state.initiateCycle.allQuestions

const listSize = (state: RootState): number => state.initiateCycle.listSize

const initiateCycleThunk = {
  getActiveCycleData,
  getAllCycles,
  getAllQuestions,
  initiateCycle,
}

const initiateCycleSelectors = {
  isLoading,
  activeCycleData,
  listSize,
  allQuestions,
}

export const initiateCycleService = {
  ...initiateCycleThunk,
  actions: initiateCycleSlice.actions,
  selectors: initiateCycleSelectors,
}

export default initiateCycleSlice.reducer
