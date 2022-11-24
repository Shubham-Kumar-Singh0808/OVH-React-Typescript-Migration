import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import panDetailsApi from '../../../middleware/api/Finance/PanDetails/panDetailsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  BankInformation,
  Finance,
  PanDetailsSliceState,
  UploadPanDetail,
} from '../../../types/Finance/PanDetails/panDetailsTypes'

const bankInformation = createAsyncThunk(
  'panDetails/bankInformation',
  async (
    props: {
      key: string
      value: number
    },
    thunkApi,
  ) => {
    try {
      return await panDetailsApi.bankInformation(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const uploadEmployeeFinanceDetails = createAsyncThunk(
  'panDetails/uploadEmployeeFinanceDetails',
  async (prepareObject: UploadPanDetail, thunkApi) => {
    try {
      return await panDetailsApi.uploadEmployeeFinanceDetails(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateFinanceInformation = createAsyncThunk(
  'panDetails/updateFinanceInformation',
  async (list: Finance, thunkApi) => {
    try {
      return await panDetailsApi.updateFinanceInformation(list)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialPanDetailsState: PanDetailsSliceState = {
  bankInfo: {} as BankInformation,
  isLoading: ApiLoadingState.idle,
  error: 0,
}

const panDetailsSlice = createSlice({
  name: 'panDetails',
  initialState: initialPanDetailsState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(bankInformation.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.bankInfo = action.payload
      })

      .addMatcher(
        isAnyOf(
          uploadEmployeeFinanceDetails.fulfilled,
          updateFinanceInformation.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )

      .addMatcher(
        isAnyOf(
          bankInformation.pending,
          uploadEmployeeFinanceDetails.pending,
          updateFinanceInformation.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          bankInformation.rejected,
          uploadEmployeeFinanceDetails.rejected,
          updateFinanceInformation.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.panDetails.isLoading

const bankDetails = (state: RootState): BankInformation =>
  state.panDetails.bankInfo

const panDetailsThunk = {
  bankInformation,
  updateFinanceInformation,
  uploadEmployeeFinanceDetails,
}

const panDetailsSelectors = {
  isLoading,
  bankDetails,
}

export const panDetailService = {
  ...panDetailsThunk,
  actions: panDetailsSlice.actions,
  selectors: panDetailsSelectors,
}

export default panDetailsSlice.reducer
