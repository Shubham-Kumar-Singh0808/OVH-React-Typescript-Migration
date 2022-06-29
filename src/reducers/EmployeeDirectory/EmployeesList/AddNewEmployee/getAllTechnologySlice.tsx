import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AddNewEmployeeState,
  GetAllTechnology,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { RootState } from '../../../../stateStore'
import addNewEmployeeAPi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee'

const getAllTechnology = createAsyncThunk(
  'getAllTechnologies/getAllTechnology',
  async (_, thunkApi) => {
    try {
      return await addNewEmployeeAPi.getAllTechnologyApi.getAllTechnology()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const initialGetAllTechnologyState: AddNewEmployeeState = {
  technologies: [],
  error: null,
  isLoading: ApiLoadingState.idle,
}
const getAllTechnologySlice = createSlice({
  name: 'getAllTechnologies',
  initialState: initialGetAllTechnologyState,
  reducers: {
    clearTechnologies: (state) => {
      state.technologies = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTechnology.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllTechnology.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.technologies = action.payload as GetAllTechnology[]
      })
      .addCase(getAllTechnology.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.getAllTechnology.isLoading
const technologies = (state: RootState): GetAllTechnology[] =>
  state.getAllTechnology.technologies as GetAllTechnology[]

const getAllTechnologyThunk = {
  getAllTechnology,
}

const technologiesSelectors = {
  isLoading,
  technologies,
}

export const technologyService = {
  ...getAllTechnologyThunk,
  actions: getAllTechnologySlice.actions,
  selectors: technologiesSelectors,
}

export default getAllTechnologySlice.reducer
