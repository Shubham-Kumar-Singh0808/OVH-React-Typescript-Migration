import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import getSeparationFormApi from '../../../middleware/api/Separation/SubmitViewResignation/submitResignationApi'
import {
  GetSeparationFormResponse,
  SubmitResignationSliceState,
  SubmitResignationTypes,
} from '../../../types/Separation/SubmitViewResignation/submitResignationTypes'

const initialSubmitResignationState: SubmitResignationSliceState = {
  getSeparationFormResponse: {} as GetSeparationFormResponse,

  isLoading: ApiLoadingState.idle,
}

const getSeparationFormResponse = createAsyncThunk(
  'SubmitResignation/getSeparationFormResponse',
  async (_, thunkApi) => {
    try {
      return await getSeparationFormApi.getSeparationFormResponse()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const submitResignation = createAsyncThunk(
  'SubmitResignation/submitResignation',
  async (submitResignation: SubmitResignationTypes, thunkApi) => {
    try {
      return await getSeparationFormApi.submitResignation(submitResignation)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const submitResignationSlice = createSlice({
  name: 'SubmitResignation',
  initialState: initialSubmitResignationState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getSeparationFormResponse.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.getSeparationFormResponse =
        action.payload as GetSeparationFormResponse
    })
  },
})

const separationForm = (state: RootState): GetSeparationFormResponse =>
  state.submitViewResignation.getSeparationFormResponse

const submitResignationThunk = {
  getSeparationFormResponse,
  submitResignation,
}

const submitViewResignationSelectors = {
  separationForm,
}

export const submitViewResignationServices = {
  ...submitResignationThunk,
  actions: submitResignationSlice.actions,
  selectors: submitViewResignationSelectors,
}
export default submitResignationSlice.reducer
