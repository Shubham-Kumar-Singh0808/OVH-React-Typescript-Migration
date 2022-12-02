import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import employeeAccountsApi from '../../../middleware/api/Finance/EmployeeAccounts/employeeAccountsApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  DownloadFinanceList,
  EmployeeAccountApiProps,
  EmployeeAccountSliceState,
  FinanceDetails,
} from '../../../types/Finance/EmployeeAccounts/employeeAccountsTypes'

const getFinanceDetails = createAsyncThunk(
  'employeeAccounts/getFinanceDetails',
  async (props: EmployeeAccountApiProps, thunkApi) => {
    try {
      return await employeeAccountsApi.getFinanceDetails(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const exportFinanceList = createAsyncThunk(
  'employeeAccounts/exportFinanceList',
  async (props: DownloadFinanceList, thunkApi) => {
    try {
      return await employeeAccountsApi.exportFinanceList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEmployeeAccountsState: EmployeeAccountSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  listSize: 0,
  financeData: [],
}
const employeeAccountsSlice = createSlice({
  name: 'employeeAccounts',
  initialState: initialEmployeeAccountsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFinanceDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.financeData = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getFinanceDetails.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getFinanceDetails.rejected, (state) => {
        state.isLoading = ApiLoadingState.failed
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeAccounts.isLoading

const financeInfo = (state: RootState): FinanceDetails[] =>
  state.employeeAccounts.financeData

const listSize = (state: RootState): number => state.employeeAccounts.listSize

export const employeeAccountThunk = {
  getFinanceDetails,
  exportFinanceList,
}

export const employeeAccountSelectors = {
  isLoading,
  financeInfo,
  listSize,
}

export const employeeAccountService = {
  ...employeeAccountThunk,
  actions: employeeAccountsSlice.actions,
  selectors: employeeAccountSelectors,
}

export default employeeAccountsSlice.reducer
