import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addNewClientApi from '../../../../middleware/api/ProjectManagement/Clients/AddClient/addNewClientApi'
import { AppDispatch, RootState } from '../../../../stateStore'
import { ValidationError } from '../../../../types/commonTypes'
import {
  AddClientDetails,
  AddNewClientSliceState,
  ClientCountry,
} from '../../../../types/ProjectManagement/Clients/AddClient/addNewClientTypes'

const getClientCountries = createAsyncThunk<
  ClientCountry[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('addNewClient/getClientCountries', async (_, thunkApi) => {
  try {
    return await addNewClientApi.getClientCountries()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const addNewClient = createAsyncThunk<
  number | undefined,
  AddClientDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'addNewClient/addNewClient',
  async (newClientDetails: AddClientDetails, thunkApi) => {
    try {
      return await addNewClientApi.addNewClient(newClientDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAddClientState: AddNewClientSliceState = {
  clientCountries: [],
  isLoading: ApiLoadingState.idle,
  error: null,
  addClientDetails: {} as AddClientDetails,
}

const addNewClientSlice = createSlice({
  name: 'addNewClient',
  initialState: initialAddClientState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientCountries.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.clientCountries = action.payload as ClientCountry[]
      })
      .addCase(addNewClient.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(getClientCountries.pending, addNewClient.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getClientCountries.rejected, addNewClient.rejected),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const clientCountries = (state: RootState): ClientCountry[] =>
  state.addNewClient.clientCountries

const addNewClientThunk = {
  getClientCountries,
  addNewClient,
}
const addNewClientSelectors = {
  clientCountries,
}

export const addNewClientService = {
  ...addNewClientThunk,
  actions: addNewClientSlice.actions,
  selectors: addNewClientSelectors,
}

export default addNewClientSlice.reducer
