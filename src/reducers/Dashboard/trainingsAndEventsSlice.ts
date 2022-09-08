import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import trainingsAndEventsApi from '../../middleware/api/Dashboard/trainingsAndEventsApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  TrainingAndEvent,
  TrainingsAndEventsSliceState,
} from '../../types/Dashboard/TrainingsAndEvents/trainingsAndEventsTypes'

const getUpcomingTrainings = createAsyncThunk<
  TrainingAndEvent[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('trainingAndEvents/getUpcomingTrainings', async (_, thunkApi) => {
  try {
    return await trainingsAndEventsApi.getUpcomingTrainings()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getUpcomingEvents = createAsyncThunk<
  TrainingAndEvent[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('trainingAndEvents/getUpcomingTrainings', async (_, thunkApi) => {
  try {
    return await trainingsAndEventsApi.getUpcomingEvents()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialTrainingAndEventsState: TrainingsAndEventsSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  upcomingTrainingsAndEvents: [],
}

const trainingsAndEventsSlice = createSlice({
  name: 'trainingAndEvents',
  initialState: initialTrainingAndEventsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpcomingTrainings.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.upcomingTrainingsAndEvents = action.payload as TrainingAndEvent[]
      })
      .addMatcher(
        isAnyOf(getUpcomingTrainings.fulfilled, getUpcomingEvents.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.loading
          state.upcomingTrainingsAndEvents =
            action.payload as TrainingAndEvent[]
        },
      )
      .addMatcher(
        isAnyOf(getUpcomingTrainings.pending, getUpcomingEvents.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const upcomingTrainingsAndEvents = (state: RootState): TrainingAndEvent[] =>
  state.trainingsAndEvents.upcomingTrainingsAndEvents

const isLoading = (state: RootState): LoadingState =>
  state.trainingsAndEvents.isLoading

const trainingsAndEventsThunk = {
  getUpcomingTrainings,
  getUpcomingEvents,
}

const trainingsAndEventsSelectors = {
  isLoading,
  upcomingTrainingsAndEvents,
}

export const trainingsAndEventsService = {
  ...trainingsAndEventsThunk,
  actions: trainingsAndEventsSlice.actions,
  selectors: trainingsAndEventsSelectors,
}

export default trainingsAndEventsSlice.reducer
