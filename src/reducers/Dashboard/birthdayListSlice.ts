import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import birthdayApi from '../../middleware/api/Dashboard/birthdayApi'
import { RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  BirthdayListApiProps,
  BirthdayListTableSliceState,
  BirthdaysList,
} from '../../types/Dashboard/Birthdays/birthdayListTypes'

const getAllEmployeesBirthdayList = createAsyncThunk(
  'birthdayList/getAllEmployeesBirthdayList',
  async (props: BirthdayListApiProps, thunkApi) => {
    try {
      return await birthdayApi.getAllEmployeesBirthdayList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialBirthdayListState: BirthdayListTableSliceState = {
  birthdayList: [],
  isLoading: ApiLoadingState.idle,
  listSize: 0,
}
const birthdayListSlice = createSlice({
  name: 'birthdayList',
  initialState: initialBirthdayListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployeesBirthdayList.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getAllEmployeesBirthdayList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.birthdayList = action.payload.birthdays
        state.listSize = action.payload.size
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeesBirthdayList.isLoading

const employeesBirthdayList = (state: RootState): BirthdaysList[] =>
  state.employeesBirthdayList.birthdayList

const listSize = (state: RootState): number =>
  state.employeesBirthdayList.listSize

const birthdayListThunk = {
  getAllEmployeesBirthdayList,
}

const birthdayListSelectors = {
  isLoading,
  listSize,
  employeesBirthdayList,
}

export const birthdaysListService = {
  ...birthdayListThunk,
  actions: birthdayListSlice.actions,
  selectors: birthdayListSelectors,
}

export default birthdayListSlice.reducer
