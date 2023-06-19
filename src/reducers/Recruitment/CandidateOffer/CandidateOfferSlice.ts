import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import {
  AddNewJoineeProps,
  CandidateOfferSliceState,
} from '../../../types/Recruitment/CandidateOffer/CandidateOfferTypes'
import CandidateOfferApi from '../../../middleware/api/Recruitment/CandidateOffer/candidateOfferApi'

const getAddNewJoineeData = createAsyncThunk(
  'assetManagement/getAllAssets',
  async (props: AddNewJoineeProps, thunkApi) => {
    try {
      return await CandidateOfferApi.getAddNewJoineeData(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getPersonTechnologyData = createAsyncThunk(
  'PersonTechnologyData',
  async (id: number, thunkApi) => {
    try {
      return await CandidateOfferApi.getPersonTechnology(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialAddNewCandidateState: CandidateOfferSliceState = {
  isLoading: ApiLoadingState.idle,
}

const candidateOfferSlice = createSlice({
  name: 'addNewCandidate',
  initialState: initialAddNewCandidateState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isAnyOf(getAddNewJoineeData.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getAddNewJoineeData.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })

      .addMatcher(isAnyOf(getPersonTechnologyData.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getPersonTechnologyData.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
  },
})

const addCandidateThunk = {
  getAddNewJoineeData,
  getPersonTechnologyData,
}

function isLoading(state: RootState): LoadingState {
  return state.addNewJoinee.isLoading
}
export const addNewCandidateSelectors = {
  isLoading,
}

export const candidateOfferService = {
  ...addCandidateThunk,
  actions: candidateOfferSlice.actions,
  selectors: addNewCandidateSelectors,
}

export default candidateOfferSlice.reducer
