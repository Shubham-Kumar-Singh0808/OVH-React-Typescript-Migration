import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import AddObservationApi from '../../../middleware/api/Performance/AddObservation/AddObservationApi'
import { ValidationError } from '../../../types/commonTypes'
import { AddObservationInitialState } from '../../../types/Performance/AddObservation/AddObservationTypes'

const initialState: AddObservationInitialState = {
  isLoading: ApiLoadingState.idle,
  performanceRating: [],
  activeEmployeeList: [],
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

const getActiveEmployeeListThunk = createAsyncThunk(
  'addObservation/getActiveEmployeeListThunk',
  async (_, thunkApi) => {
    try {
      return await AddObservationApi.getActiveEmployeeList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getPerformanceRatingThunk = createAsyncThunk(
  'addObservation/getPerformanceRatingThunk',
  async (_, thunkApi) => {
    try {
      return await AddObservationApi.getPerformanceRating()
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
    builder.addCase(getPerformanceRatingThunk.fulfilled, (state, action) => {
      state.performanceRating = action.payload
    })
    builder.addCase(getActiveEmployeeListThunk.fulfilled, (state, action) => {
      state.activeEmployeeList = action.payload
    })
    builder.addMatcher(
      isAnyOf(
        ratingScaleRenderThunk.pending,
        getPerformanceRatingThunk.pending,
        getActiveEmployeeListThunk.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(
        ratingScaleRenderThunk.fulfilled,
        getPerformanceRatingThunk.fulfilled,
        getActiveEmployeeListThunk.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
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
  getPerformanceRatingThunk,
  getActiveEmployeeListThunk,
}

export const addObservationService = {
  ...addObservationThunks,
  actions: addObservationSlice.actions,
}

const addObservationReducer = addObservationSlice.reducer
export default addObservationReducer
