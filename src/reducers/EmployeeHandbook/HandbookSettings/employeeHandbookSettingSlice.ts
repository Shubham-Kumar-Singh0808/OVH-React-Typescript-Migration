import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AppDispatch, RootState } from '../../../stateStore'
import employeeHandbookSettingsApi from '../../../middleware/api/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsApi'
import {
  AddNewHandbookPage,
  EmployeeCountry,
  EmployeeHandbook,
  EmployeeHandbookListApiProps,
  EmployeeHandbookSettingSliceState,
  TotalHandbookList,
  UpdateHandbookPage,
} from '../../../types/EmployeeHandbook/HandbookSettings/employeeHandbookSettingsTypes'

const getEmployeeHandbooks = createAsyncThunk(
  'employeeHandbookSettings/getEmployeeHandbooks',
  async (props: EmployeeHandbookListApiProps, thunkApi) => {
    try {
      return await employeeHandbookSettingsApi.getEmployeeHandbooks(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getTotalHandbookList = createAsyncThunk<
  TotalHandbookList[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeHandbookSettings/getTotalHandbookList', async (_, thunkApi) => {
  try {
    return await employeeHandbookSettingsApi.getTotalHandbookList()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const deleteEmployeeHandbook = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeHandbookSettings/deleteEmployeeHandbook',
  async (bookId, thunkApi) => {
    try {
      return await employeeHandbookSettingsApi.deleteEmployeeHandbook(bookId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeCountries = createAsyncThunk<
  EmployeeCountry[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeHandbookSettings/getEmployeeCountries', async (_, thunkApi) => {
  try {
    return await employeeHandbookSettingsApi.getEmployeeCountries()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const addNewHandbook = createAsyncThunk<
  number | undefined,
  AddNewHandbookPage,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeHandbookSettings/addNewHandbook',
  async (addEmployeeHandbook: AddNewHandbookPage, thunkApi) => {
    try {
      return await employeeHandbookSettingsApi.addNewHandbook(
        addEmployeeHandbook,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeHandbook = createAsyncThunk<
  EmployeeCountry[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeHandbookSettings/getEmployeeHandbook',
  async (handbookId: number, thunkApi) => {
    try {
      return await employeeHandbookSettingsApi.getSelectedCountries(handbookId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateEmployeeHandbook = createAsyncThunk<
  number | undefined,
  UpdateHandbookPage,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeHandbookSettings/updateEmployeeHandbook',
  async (updateHandbook: UpdateHandbookPage, thunkApi) => {
    try {
      return await employeeHandbookSettingsApi.updateEmployeeHandbook(
        updateHandbook,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialEmployeeHandbookSettingState: EmployeeHandbookSettingSliceState = {
  listSize: 0,
  isLoading: ApiLoadingState.idle,
  employeeHandbooks: [],
  employeeCountries: [],
  error: null,
  totalHandbookList: [],
  updateHandbookPage: {
    country: undefined,
    departmentId: undefined,
    departmentName: undefined,
    description: '',
    displayOrder: 0,
    empCountry: '',
    handCountry: [],
    id: 0,
    pageName: '',
    sectionId: undefined,
    sectionName: undefined,
    title: '',
    type: '',
    list: [],
  },
  selectedHandbook: [],
  selectedCountries: [],
}

const employeeHandbookSettingSlice = createSlice({
  name: 'employeeHandbookSettings',
  initialState: initialEmployeeHandbookSettingState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalHandbookList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.totalHandbookList = action.payload as TotalHandbookList[]
      })
      .addCase(getEmployeeHandbooks.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeHandbooks = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getEmployeeHandbook.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.selectedCountries = action.payload as EmployeeCountry[]
      })
      .addMatcher(isAnyOf(getEmployeeCountries.fulfilled), (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeCountries = action.payload as EmployeeCountry[]
        console.log(action)
      })
      .addMatcher(
        isAnyOf(
          deleteEmployeeHandbook.fulfilled,
          addNewHandbook.fulfilled,
          updateEmployeeHandbook.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeHandbooks.pending,
          getTotalHandbookList.pending,
          deleteEmployeeHandbook.pending,
          getEmployeeCountries.pending,
          addNewHandbook.pending,
          getEmployeeHandbook.pending,
          updateEmployeeHandbook.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeHandbooks.rejected,
          getTotalHandbookList.rejected,
          getEmployeeCountries.rejected,
          deleteEmployeeHandbook.rejected,
          addNewHandbook.rejected,
          getEmployeeHandbook.rejected,
          updateEmployeeHandbook.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.employeeHandbookSettings.isLoading

const employeeHandbooks = (state: RootState): EmployeeHandbook[] =>
  state.employeeHandbookSettings.employeeHandbooks

const listSize = (state: RootState): number =>
  state.employeeHandbookSettings.listSize

const employeeCountries = (state: RootState): EmployeeCountry[] =>
  state.employeeHandbookSettings.employeeCountries

const selectedCountries = (state: RootState): EmployeeCountry[] =>
  state.employeeHandbookSettings.selectedCountries

const totalHandbookList = (state: RootState): TotalHandbookList[] =>
  state.employeeHandbookSettings.totalHandbookList

const updateHandbookPage = (state: RootState): UpdateHandbookPage =>
  state.employeeHandbookSettings.updateHandbookPage

const employeeHandbookSettingsThunk = {
  getEmployeeHandbooks,
  getTotalHandbookList,
  deleteEmployeeHandbook,
  getEmployeeCountries,
  addNewHandbook,
  getEmployeeHandbook,
  updateEmployeeHandbook,
}

const employeeHandbookSettingSelectors = {
  isLoading,
  employeeHandbooks,
  totalHandbookList,
  listSize,
  employeeCountries,
  updateHandbookPage,
  selectedCountries,
}

export const employeeHandbookSettingService = {
  ...employeeHandbookSettingsThunk,
  actions: employeeHandbookSettingSlice.actions,
  selectors: employeeHandbookSettingSelectors,
}

export default employeeHandbookSettingSlice.reducer
