import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import clientInformationApi from '../../../../middleware/api/ProjectManagement/Clients/ClientInformation/clientInformationApi'
import { AppDispatch, RootState } from '../../../../stateStore'
import { ValidationError } from '../../../../types/commonTypes'
import {
  ClientInformation,
  ClientInformationSliceState,
} from '../../../../types/ProjectManagement/Clients/ClientInformation/viewClientInformationTypes'

const initialClientInformationSlice: ClientInformationSliceState = {
  viewClientInformation: {} as ClientInformation,
  isLoading: ApiLoadingState.idle,
  error: null,
}

const getClientInformation = createAsyncThunk<
  ClientInformation | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('clientInformation/getClientInformation', async (id: number, thunkApi) => {
  try {
    return await clientInformationApi.getClientInformation(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const clientInformationSlice = createSlice({
  name: 'employeeCertifications',
  initialState: initialClientInformationSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getClientInformation.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.viewClientInformation = action.payload as ClientInformation
      })
      .addCase(getClientInformation.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const viewClientInformation = (state: RootState): ClientInformation =>
  state.clientInformation.viewClientInformation

const clientInformationThunk = {
  getClientInformation,
}

const clientInformationSelectors = {
  viewClientInformation,
}

export const clientInformationService = {
  ...clientInformationThunk,
  actions: clientInformationSlice.actions,
  selectors: clientInformationSelectors,
}

export default clientInformationSlice.reducer
