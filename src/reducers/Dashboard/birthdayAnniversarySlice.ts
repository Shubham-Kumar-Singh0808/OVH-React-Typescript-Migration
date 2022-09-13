import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import dashboardApi from '../../middleware/api/Dashboard/dashboardApi'
import { RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  BirthDayApiProps,
  Birthdays,
  EmployeeBirthdaySliceState,
} from '../../types/Dashboard/Birthdays/birthdayTypes'

const getUpcomingBirthdayAnniversaries = createAsyncThunk(
  'birthdays/getUpcomingBirthdayAnniversaries',
  async (props: BirthDayApiProps, thunkApi) => {
    try {
      return await dashboardApi.getUpcomingBirthdayAnniversaries(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialUpcomingBirthdaysListState: EmployeeBirthdaySliceState = {
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  upcomingBirthdays: [],
  error: null,
}

const birthdayAnniversarySlice = createSlice({
  name: 'birthdays',
  initialState: initialUpcomingBirthdaysListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpcomingBirthdayAnniversaries.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.upcomingBirthdays = action.payload.birthdays
        state.listSize = action.payload.size
      })
      .addMatcher(
        isAnyOf(getUpcomingBirthdayAnniversaries.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const upcomingEmployeeBirthdays = (state: RootState): Birthdays[] =>
  state.upcomingEmployeeBirthday.upcomingBirthdays

const listSize = (state: RootState): number =>
  state.upcomingEmployeeBirthday.listSize

const isLoading = (state: RootState): LoadingState =>
  state.upcomingEmployeeBirthday.isLoading

const upcomingBirthdaysThunk = {
  getUpcomingBirthdayAnniversaries,
}

const upcomingBirthdaysSelectors = {
  upcomingEmployeeBirthdays,
  listSize,
  isLoading,
}

export const upcomingBirthdaysService = {
  ...upcomingBirthdaysThunk,
  actions: birthdayAnniversarySlice.actions,
  selectors: upcomingBirthdaysSelectors,
}

export default birthdayAnniversarySlice.reducer
