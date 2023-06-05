import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import eventListApi from '../../../middleware/api/ConferenceRoomBooking/EventList/eventListApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EditExistingEventDetails,
  Event,
  EventListApiProps,
  EventListSliceState,
  FeedbackForm,
  FeedbackFormApiProps,
  UpdateEventDetails,
  UploadFeedbackFormInterface,
} from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'

const getAllEvents = createAsyncThunk(
  'eventList/getAllEvents',
  async (props: EventListApiProps, thunkApi) => {
    try {
      return await eventListApi.getAllEvents(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const cancelEvent = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('eventList/cancelEvent', async (eventId, thunkApi) => {
  try {
    return await eventListApi.cancelEvent(eventId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getFeedbackFormList = createAsyncThunk(
  'eventList/getFeedbackFormList',
  async (props: FeedbackFormApiProps, thunkApi) => {
    try {
      return await eventListApi.getFeedbackFormList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const uploadFeedbackForm = createAsyncThunk<
  number | undefined,
  UploadFeedbackFormInterface,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'eventList/uploadFeedbackForm',
  async (prepareObject: UploadFeedbackFormInterface, thunkApi) => {
    try {
      return await eventListApi.uploadFeedbackForm(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const editEvent = createAsyncThunk<
  EditExistingEventDetails | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('eventList/editEvent', async (eventId: number, thunkApi) => {
  try {
    return await eventListApi.editEvent(eventId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const updateEvent = createAsyncThunk<
  number | undefined,
  UpdateEventDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'conferenceRoomBooking/updateEvent',
  async (updateEventDetails: UpdateEventDetails, thunkApi) => {
    try {
      return await eventListApi.updateEvent(updateEventDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEventListState: EventListSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  events: [],
  selectedMonth: '',
  listSize: 0,
  feedbackFormDetails: [],
  feedbackFormListSize: 0,
  editExistingEventData: {} as EditExistingEventDetails,
  updateEventData: {} as UpdateEventDetails,
  SelectCustom: 'Current Month',
  FromDateFilter: '',
  ToDateFilter: '',
}
const eventListSlice = createSlice({
  name: 'eventList',
  initialState: initialEventListState,
  reducers: {
    changeSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload as string
    },
    setSelectCustom: (state, action) => {
      state.SelectCustom = action.payload as string
    },
    setFromDateFilter: (state, action) => {
      state.FromDateFilter = action.payload as string
    },
    setToDateFilter: (state, action) => {
      state.ToDateFilter = action.payload as string
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEvents.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.events = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getFeedbackFormList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.feedbackFormDetails = action.payload.list
        state.feedbackFormListSize = action.payload.size
      })
      .addCase(editEvent.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editExistingEventData = action.payload as EditExistingEventDetails
      })
      .addMatcher(
        isAnyOf(
          cancelEvent.fulfilled,
          uploadFeedbackForm.fulfilled,
          updateEvent.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getAllEvents.pending,
          cancelEvent.pending,
          getFeedbackFormList.pending,
          uploadFeedbackForm.pending,
          editEvent.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.eventList.isLoading
const events = (state: RootState): Event[] => state.eventList.events
const selectedMonth = (state: RootState): string =>
  state.eventList.selectedMonth
const listSize = (state: RootState): number => state.eventList.listSize
const feedbackForms = (state: RootState): FeedbackForm[] =>
  state.eventList.feedbackFormDetails
const feedbackFormListSize = (state: RootState): number =>
  state.eventList.feedbackFormListSize
const editExistingEventData = (state: RootState): EditExistingEventDetails =>
  state.eventList.editExistingEventData

const SelectCustom = (state: RootState): string => state.eventList.SelectCustom
const FromDateFilter = (state: RootState): string | Date =>
  state.eventList.FromDateFilter
const ToDateFilter = (state: RootState): string | Date =>
  state.eventList.ToDateFilter

export const eventListThunk = {
  getAllEvents,
  cancelEvent,
  getFeedbackFormList,
  uploadFeedbackForm,
  editEvent,
  updateEvent,
}

export const eventListSelectors = {
  isLoading,
  events,
  listSize,
  selectedMonth,
  feedbackForms,
  feedbackFormListSize,
  editExistingEventData,
  SelectCustom,
  FromDateFilter,
  ToDateFilter,
}

export const eventListService = {
  ...eventListThunk,
  actions: eventListSlice.actions,
  selectors: eventListSelectors,
}

export default eventListSlice.reducer
