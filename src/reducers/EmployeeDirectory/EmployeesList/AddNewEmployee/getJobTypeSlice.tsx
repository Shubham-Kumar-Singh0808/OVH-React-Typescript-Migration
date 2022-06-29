import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AddNewEmployeeState,
  GetAllJobType,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { RootState } from '../../../../stateStore'
import addNewEmployeeAPi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee'

const getAllJobType = createAsyncThunk(
  'getAllJobTypes/getAllJobType',
  async (_, thunkApi) => {
    try {
      return await addNewEmployeeAPi.getJobTypesApi.getJobTypes()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialGetAllJobTypeState: AddNewEmployeeState = {
  jobTypes: [],
  error: null,
  isLoading: ApiLoadingState.idle,
}
const getAllJobTypesSlice = createSlice({
  name: 'getAllJobTypes',
  initialState: initialGetAllJobTypeState,
  reducers: {
    clearjobTypes: (state) => {
      state.jobTypes = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobType.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllJobType.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.jobTypes = action.payload as GetAllJobType[]
      })
      .addCase(getAllJobType.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.getJobTypes.isLoading
const jobTypes = (state: RootState): GetAllJobType[] =>
  state.getJobTypes.jobTypes as GetAllJobType[]

const getAllJobTypesThunk = {
  getAllJobType,
}

const jobTypesSelectors = {
  isLoading,
  jobTypes,
}

export const jobTypeService = {
  ...getAllJobTypesThunk,
  actions: getAllJobTypesSlice.actions,
  selectors: jobTypesSelectors,
}

export default getAllJobTypesSlice.reducer
