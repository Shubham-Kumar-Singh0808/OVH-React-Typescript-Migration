import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import dashboardApi from '../../middleware/api/Dashboard/dashboardApi'
import { ValidationError } from '../../types/commonTypes'
import {
  BirthDayApiProps,
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

const initialupcomingBirthdaysListState: EmployeeBirthdaySliceState = {
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  upcomingBirthdays: [],
  error: null,
}

const birthdayAnniversarySlice = createSlice({
  name: 'birthdays',
  initialState: initialupcomingBirthdaysListState,
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

//   const employeesCertificates = (state: RootState): EmployeeCertificate[] =>
//     state.certificateList.employeeCertificationList

//   const listSize = (state: RootState): number => state.certificateList.listSize

//   const isLoading = (state: RootState): LoadingState =>
//     state.certificateList.isLoading

//   const certificateListThunk = {
//     getEmployeesCertificates,
//   }

//   const certificateListSelectors = {
//     employeesCertificates,
//     listSize,
//     isLoading,
//   }

//   export const certificateListService = {
//     ...certificateListThunk,
//     actions: certificateListSlice.actions,
//     selectors: certificateListSelectors,
//   }

export default birthdayAnniversarySlice.reducer
