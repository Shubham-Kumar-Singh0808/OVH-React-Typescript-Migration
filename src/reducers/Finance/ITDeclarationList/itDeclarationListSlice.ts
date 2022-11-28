import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { itDeclarationListApi } from '../../../middleware/api/Finance/ITDeclarationList/itDeclarationListApi'
import { ValidationError } from '../../../types/commonTypes'
import { ITDeclarationListSliceState } from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

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

const ticketConfigurationSlice = createSlice({
  name: 'ticketConfiguration',
  initialState: initialITDeclarationListState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCycles.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.cycles = action.payload
    })
  },
})
