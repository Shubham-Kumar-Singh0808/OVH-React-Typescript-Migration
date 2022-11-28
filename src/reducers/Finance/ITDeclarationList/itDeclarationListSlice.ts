import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { itDeclarationListApi } from '../../../middleware/api/Finance/ITDeclarationList/itDeclarationListApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  Cycle,
  ITDeclarationListSliceState,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const initialITDeclarationListState = {} as ITDeclarationListSliceState

const getCycles = createAsyncThunk(
  'itDeclarationList/getCycles',
  async (_, thunkApi) => {
    try {
      return await itDeclarationListApi.getCycles()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const itDeclarationListSlice = createSlice({
  name: 'itDeclarationList',
  initialState: initialITDeclarationListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCycles.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.cycles = action.payload
      })
      .addCase(getCycles.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.itDeclarationList.isLoading
const cycles = (state: RootState): Cycle[] => state.itDeclarationList.cycles

const itDeclarationListThunk = {
  getCycles,
}

const itDeclarationListSelectors = {
  isLoading,
  cycles,
}

export const itDeclarationListService = {
  ...itDeclarationListThunk,
  actions: itDeclarationListSlice.actions,
  selectors: itDeclarationListSelectors,
}

export default itDeclarationListSlice.reducer
