import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import AddObservationApi from '../../../middleware/api/Performance/AddObservation/AddObservationApi'
import { ValidationError } from '../../../types/commonTypes'
import { AddObservationInitialState } from '../../../types/Performance/AddObservation/AddObservationTypes'

const initialState: AddObservationInitialState = {
  isLoading: ApiLoadingState.idle,
  ratingScaleRender: {
    id: -1,
    displayOrder: -1,
    title: '',
    description: '',
    pageName: '',
    departmentName: null,
    departmentId: null,
    type: '',
    sectionId: null,
    sectionName: null,
    country: null,
    handCountry: [],
    empCountry: '',
  },
  error: null,
}

const ratingScaleRenderThunk = createAsyncThunk(
  'addObservation/ratingScaleRenderThunk',
  async (_, thunkApi) => {
    try {
      return await AddObservationApi.getRatingScalePage()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addObservationSlice = createSlice({
  name: 'addObservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(ratingScaleRenderThunk.fulfilled, (state, action) => {
      state.ratingScaleRender = action.payload
    })
    builder.addMatcher(isAnyOf(ratingScaleRenderThunk.pending), (state) => {
      state.isLoading = ApiLoadingState.loading
    })
    builder.addMatcher(isAnyOf(ratingScaleRenderThunk.fulfilled), (state) => {
      state.isLoading = ApiLoadingState.succeeded
    })
    builder.addMatcher(
      isAnyOf(ratingScaleRenderThunk.rejected),
      (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      },
    )
  },
})

const addObservationThunks = {
  ratingScaleRenderThunk,
}

export const addObservationService = {
  ...addObservationThunks,
  actions: addObservationSlice.actions,
}

const addObservationReducer = addObservationSlice.reducer
export default addObservationReducer
