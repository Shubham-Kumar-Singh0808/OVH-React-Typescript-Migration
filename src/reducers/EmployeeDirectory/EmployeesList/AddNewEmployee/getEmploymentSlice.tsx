import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AddNewEmployeeState,
  GetAllEmployment,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { RootState } from '../../../../stateStore'
import addNewEmployeeAPi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee'

const getAllEmploymentType = createAsyncThunk(
  'getAllEmploymentTypes/getAllEmploymentType',
  async (_, thunkApi) => {
    try {
      return await addNewEmployeeAPi.getAllEmploymentTypeApi.getEmploymentTypes()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialGetAllEmployeeState: AddNewEmployeeState = {
  employments: [],
  error: null,
  isLoading: ApiLoadingState.idle,
}
const getAllEmploymentSlice = createSlice({
  name: 'getAllEmployment',
  initialState: initialGetAllEmployeeState,
  reducers: {
    clearEmployment: (state) => {
      state.employments = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmploymentType.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllEmploymentType.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employments = action.payload as GetAllEmployment[]
      })
      .addCase(getAllEmploymentType.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.getAllEmploymentType.isLoading
const employments = (state: RootState): GetAllEmployment[] =>
  state.getAllEmploymentType.employments as GetAllEmployment[]

const getAllEmploymentThunk = {
  getAllEmploymentType,
}

const employmentsSelectors = {
  isLoading,
  employments,
}

export const employmentService = {
  ...getAllEmploymentThunk,
  actions: getAllEmploymentSlice.actions,
  selectors: employmentsSelectors,
}

export default getAllEmploymentSlice.reducer
