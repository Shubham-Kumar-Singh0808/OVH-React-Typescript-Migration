import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import holidaysApi from '../../middleware/api/Dashboard/holidaysApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  EditHolidayDetails,
  Holidays,
  HolidaysSliceState,
  SaveHoliday,
} from '../../types/Dashboard/Holidays/upcomingHolidaysTypes'

const getUpcomingHolidays = createAsyncThunk<
  Holidays[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('holidays/getUpcomingHolidays', async (_, thunkApi) => {
  try {
    return await holidaysApi.getUpcomingHolidays()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getAllUpcomingHolidaysList = createAsyncThunk<
  Holidays[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('holidays/getAllUpcomingHolidaysList', async (country: string, thunkApi) => {
  try {
    return await holidaysApi.getAllUpcomingHolidaysList(country)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const addHoliday = createAsyncThunk(
  'holidays/addHoliday',
  async (addNewHoliday: SaveHoliday, thunkApi) => {
    try {
      return await holidaysApi.addHoliday(addNewHoliday)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteHoliday = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('holidays/deleteHoliday', async (holidayId, thunkApi) => {
  try {
    return await holidaysApi.deleteHoliday(holidayId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getHolidayInformation = createAsyncThunk<
  EditHolidayDetails | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('holidays/getHolidayInformation', async (holidayId: number, thunkApi) => {
  try {
    return await holidaysApi.getHolidayInformation(holidayId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const updateHoliday = createAsyncThunk<
  number | undefined,
  EditHolidayDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('holidays/updateHoliday', async (holidayDetails, thunkApi) => {
  try {
    return await holidaysApi.updateHoliday(holidayDetails)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialHolidaysState: HolidaysSliceState = {
  isLoading: ApiLoadingState.idle,
  upcomingHolidays: [],
  refreshList: false,
  currentPage: 1,
  pageSize: 20,
  error: null,
  addNewHoliday: {} as SaveHoliday,
  editHoliday: {} as EditHolidayDetails,
}

const holidaysSlice = createSlice({
  name: 'holidays',
  initialState: initialHolidaysState,
  reducers: {
    clearHolidays: (state) => {
      state.upcomingHolidays = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getHolidayInformation.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editHoliday = action.payload as EditHolidayDetails
      })
      .addMatcher(
        isAnyOf(
          addHoliday.fulfilled,
          deleteHoliday.fulfilled,
          updateHoliday.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getUpcomingHolidays.fulfilled,
          getAllUpcomingHolidaysList.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.upcomingHolidays = action.payload as Holidays[]
        },
      )
      .addMatcher(
        isAnyOf(
          getUpcomingHolidays.pending,
          getAllUpcomingHolidaysList.pending,
          addHoliday.pending,
          deleteHoliday.pending,
          getHolidayInformation.pending,
          updateHoliday.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const upcomingHolidays = (state: RootState): Holidays[] =>
  state.holidays.upcomingHolidays

const isLoading = (state: RootState): LoadingState => state.holidays.isLoading

const holidaysPageFromState = (state: RootState): number =>
  state.holidays.currentPage
const holidaysPageSizeFromState = (state: RootState): number =>
  state.holidays.pageSize

const holidayInfo = (state: RootState): EditHolidayDetails =>
  state.holidays.editHoliday

const HolidaysThunk = {
  getUpcomingHolidays,
  getAllUpcomingHolidaysList,
  addHoliday,
  deleteHoliday,
  getHolidayInformation,
  updateHoliday,
}

const holidaysSelectors = {
  upcomingHolidays,
  isLoading,
  holidaysPageFromState,
  holidaysPageSizeFromState,
  holidayInfo,
}

export const holidaysService = {
  ...HolidaysThunk,
  actions: holidaysSlice.actions,
  selectors: holidaysSelectors,
}

export default holidaysSlice.reducer
