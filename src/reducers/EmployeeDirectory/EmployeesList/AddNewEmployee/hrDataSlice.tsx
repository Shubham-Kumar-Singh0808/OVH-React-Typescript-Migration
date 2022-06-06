import {
  AddNewEmployeeState,
  GetHrData,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../../stateStore'
import addNewEmployeeAPi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeApi'

const getAllHrData = createAsyncThunk(
  'hrData/getAllHrData',
  async (_, thunkApi) => {
    try {
      return await addNewEmployeeAPi.getAllHrDataApi.getAllHrData()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialHrDataState: AddNewEmployeeState = {
  hrData: [],
  error: null,
  isLoading: ApiLoadingState.idle,
}

const getAllHrDataSlice = createSlice({
  name: 'hrData',
  initialState: initialHrDataState,
  reducers: {
    clearTechnologies: (state) => {
      state.hrData = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllHrData.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllHrData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.hrData = action.payload as GetHrData[]
      })
      .addCase(getAllHrData.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.getAllHrData.isLoading
const hrDataList = (state: RootState): GetHrData[] =>
  state.getAllHrData.hrData as GetHrData[]

const hrDataThunk = {
  getAllHrData,
}

const hrDataSelectors = {
  isLoading,
  hrDataList,
}

export const hrDataService = {
  ...hrDataThunk,
  actions: getAllHrDataSlice.actions,
  selectors: hrDataSelectors,
}

export default getAllHrDataSlice.reducer
