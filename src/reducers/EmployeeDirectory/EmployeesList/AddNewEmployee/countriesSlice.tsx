import {
  AddNewEmployeeState,
  GetCountries,
} from '../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../../stateStore'
import addNewEmployeeAPi from '../../../../middleware/api/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeApi'

const getAllCountries = createAsyncThunk(
  'countries/getAllCountries',
  async (_, thunkApi) => {
    try {
      return await addNewEmployeeAPi.getCountriesApi.getCountries()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialCountriesState: AddNewEmployeeState = {
  countries: [],
  error: null,
  isLoading: ApiLoadingState.idle,
}

const getAllCountriesSlice = createSlice({
  name: 'countries',
  initialState: initialCountriesState,
  reducers: {
    clearTechnologies: (state) => {
      state.countries = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCountries.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllCountries.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.countries = action.payload as GetCountries[]
      })
      .addCase(getAllCountries.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState => state.country.isLoading
const countriesList = (state: RootState): GetCountries[] =>
  state.country.countries as GetCountries[]

const countryThunk = {
  getAllCountries,
}

const countrySelectors = {
  isLoading,
  countriesList,
}

export const countryService = {
  ...countryThunk,
  actions: getAllCountriesSlice.actions,
  selectors: countrySelectors,
}

export default getAllCountriesSlice.reducer
