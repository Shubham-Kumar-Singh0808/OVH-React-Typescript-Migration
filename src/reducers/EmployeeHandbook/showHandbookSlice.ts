import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import dispHandbookApi from '../../middleware/api/EmployeeHandbook/showHandbookApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  Handbook,
  showHandbookState,
} from '../../types/EmployeeHandbook/employeeHandbookTypes'

const showHandbook = createAsyncThunk<
  Handbook | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('showHandbookApi/showHandbook', async (passedName: string, thunkApi) => {
  try {
    return await dispHandbookApi.showHandbook(passedName)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialShowState: showHandbookState = {
  handbook: {} as Handbook,
  isLoading: ApiLoadingState.idle,
  error: null,
}

const showHandbookSlice = createSlice({
  name: 'handbook',
  initialState: initialShowState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(showHandbook.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(showHandbook.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.handbook = action.payload as Handbook
      })
      .addCase(showHandbook.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState => {
  return state.showHandbook.isLoading
}

const handbookDesc = (state: RootState): Handbook => {
  return state.showHandbook.handbook
}

const showHandbookThunk = {
  showHandbook,
}

const showHandbookSelectors = {
  isLoading,
  handbookDesc,
}

export const ShowHandbookService = {
  ...showHandbookThunk,
  actions: showHandbookSlice.actions,
  selectors: showHandbookSelectors,
}

export default showHandbookSlice.reducer
