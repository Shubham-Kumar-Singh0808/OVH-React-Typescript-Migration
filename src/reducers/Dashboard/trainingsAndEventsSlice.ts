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
>('trainingAndEvents/getUpcomingEvents', async (_, thunkApi) => {
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
  upcomingTrainings: [],
  upcomingEvents: [],
}

const trainingsAndEventsSlice = createSlice({
  name: 'trainingAndEvents',
  initialState: initialTrainingAndEventsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpcomingTrainings.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.upcomingTrainings = action.payload as TrainingAndEvent[]
      })
      .addCase(getUpcomingEvents.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.upcomingEvents = action.payload as TrainingAndEvent[]
      })
      .addMatcher(
        isAnyOf(getUpcomingTrainings.pending, getUpcomingEvents.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const upcomingTraining = (state: RootState): TrainingAndEvent[] =>
  state.trainingsAndEvents.upcomingTrainings

const upcomingEvent = (state: RootState): TrainingAndEvent[] =>
  state.trainingsAndEvents.upcomingEvents

const isLoading = (state: RootState): LoadingState =>
  state.trainingsAndEvents.isLoading

const trainingsAndEventsThunk = {
  getUpcomingTrainings,
  getUpcomingEvents,
}

const trainingsAndEventsSelectors = {
  isLoading,
  upcomingTraining,
  upcomingEvent,
}

export const trainingsAndEventsService = {
  ...trainingsAndEventsThunk,
  actions: trainingsAndEventsSlice.actions,
  selectors: trainingsAndEventsSelectors,
}

export default trainingsAndEventsSlice.reducer
