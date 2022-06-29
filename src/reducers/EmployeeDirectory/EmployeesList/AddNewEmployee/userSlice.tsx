import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { AddNewEmployeeState } from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addNewEmployeeAPi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee'

const checkIsUserExists = createAsyncThunk<
  boolean | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('userType/checkIsUserExists', async (userName: string, thunkApi) => {
  try {
    return await addNewEmployeeAPi.getUserApi.checkIsUserExists(userName)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialusertate: AddNewEmployeeState = {
  userType: false,
  isLoading: ApiLoadingState.idle,
  error: null,
}
const userlice = createSlice({
  name: 'isUserExist',
  initialState: initialusertate,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIsUserExists.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(checkIsUserExists.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.userType = action.payload
      })
      .addCase(checkIsUserExists.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
      .addMatcher(isAnyOf(checkIsUserExists.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(isAnyOf(checkIsUserExists.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(checkIsUserExists.rejected), (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.checkUserExist.isLoading

const isError = (state: RootState): ValidationError =>
  state.checkUserExist.error

const isUserExist = (state: RootState): boolean | undefined =>
  state.checkUserExist.userType

const userThunk = {
  checkIsUserExists,
}

const userelectors = {
  isLoading,
  isError,
  isUserExist,
}

export const userervice = {
  ...userThunk,
  actions: userlice.actions,
  selectors: userelectors,
}

export default userlice.reducer
