import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import getSeparationFormApi from '../../../middleware/api/Separation/SubmitViewResignation/submitResignationApi'
import {
  GetSeparationFormResponse,
  ResignationView,
  RevokeResignation,
  SubmitResignationSliceState,
  SubmitResignationTypes,
} from '../../../types/Separation/SubmitViewResignation/submitResignationTypes'

const initialSubmitResignationState: SubmitResignationSliceState = {
  getSeparationFormResponse: {} as GetSeparationFormResponse,
  resignationView: {} as ResignationView,
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

const getEmployeeResignationView = createAsyncThunk(
  'SubmitResignation/getEmployeeResgnationView',
  async (_, thunkApi) => {
    try {
      return await getSeparationFormApi.getEmployeeResgnationView()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const revokeResignation = createAsyncThunk(
  'SubmitResignation/revokeResignation',
  async (revokeResignation: RevokeResignation, thunkApi) => {
    try {
      return await getSeparationFormApi.revokeResignation(revokeResignation)
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
      state.getSeparationFormResponse = action.payload
    })
    builder
      .addCase(getEmployeeResignationView.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.resignationView = action.payload
      })
      .addMatcher(
        isAnyOf(
          getSeparationFormResponse.pending,
          getEmployeeResignationView.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const separationForm = (state: RootState): GetSeparationFormResponse =>
  state.submitViewResignation.getSeparationFormResponse

const resignationView = (state: RootState): ResignationView =>
  state.submitViewResignation.resignationView

const submitResignationThunk = {
  getSeparationFormResponse,
  submitResignation,
  getEmployeeResignationView,
  revokeResignation,
}

const submitViewResignationSelectors = {
  separationForm,
  resignationView,
}

export const submitViewResignationServices = {
  ...submitResignationThunk,
  actions: submitResignationSlice.actions,
  selectors: submitViewResignationSelectors,
}
export default submitResignationSlice.reducer
