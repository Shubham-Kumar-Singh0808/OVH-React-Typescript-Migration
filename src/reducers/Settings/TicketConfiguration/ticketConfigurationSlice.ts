import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ticketConfigurationApi from '../../../middleware/api/Settings/TicketConfiguration/ticketConfigurationApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  TicketConfigurationCategories,
  TicketConfigurationDepartments,
  TicketConfigurationState,
  TicketConfigurationSubCategories,
  TicketConfigurationSubCategoryList,
  TicketConfigurationSubCategoryType,
} from '../../../types/Settings/TicketConfiguration/ticketConfigurationTypes'

const initialTicketConfigurationState = {} as TicketConfigurationState

const getTicketConfigurationDepartments = createAsyncThunk(
  'supportManagement/getDepartmentNameList',
  async (_, thunkApi) => {
    try {
      return await ticketConfigurationApi.getTicketConfigurationDepartments()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getTicketConfigurationCategories = createAsyncThunk<
  TicketConfigurationCategories[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'supportManagement/supportManagement/departmentCategoryList',
  async (departmentId, thunkApi) => {
    try {
      return await ticketConfigurationApi.getTicketConfigurationCategories(
        departmentId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getTicketConfigurationSubCategories = createAsyncThunk<
  TicketConfigurationSubCategories[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'supportManagement/supportManagement/subCategoryList',
  async (categoryId, thunkApi) => {
    try {
      return await ticketConfigurationApi.getTicketConfigurationSubCategories(
        categoryId,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getTicketConfigurationSubCategoryList = createAsyncThunk<
  TicketConfigurationSubCategoryList | undefined,
  TicketConfigurationSubCategoryType,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'supportManagement/supportManagement/getSearchSubCategoryList',
  async (prepareObject, thunkApi) => {
    try {
      return await ticketConfigurationApi.getTicketConfigurationSubCategoryList(
        prepareObject,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const ticketConfigurationSlice = createSlice({
  name: 'ticketConfiguration',
  initialState: initialTicketConfigurationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTicketConfigurationDepartments.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        // state.categories = [] as TicketConfigurationCategories[]
        // state.subCategories = [] as TicketConfigurationSubCategories[]
        state.departments = action.payload as TicketConfigurationDepartments[]
      })
      .addCase(
        getTicketConfigurationSubCategoryList.fulfilled,
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.subCategoryList =
            action.payload as TicketConfigurationSubCategoryList
        },
      )
      .addCase(getTicketConfigurationCategories.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        // state.subCategories = [] as TicketConfigurationSubCategories[]
        state.categories = action.payload as TicketConfigurationCategories[]
      })
      .addCase(
        getTicketConfigurationSubCategories.fulfilled,
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.subCategories =
            action.payload as TicketConfigurationSubCategories[]
        },
      )
      .addMatcher(
        isAnyOf(getTicketConfigurationCategories.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
          //   state.subCategories = [] as TicketConfigurationSubCategories[]
          //   state.categories = [] as TicketConfigurationCategories[]
        },
      )
      .addMatcher(
        isAnyOf(
          getTicketConfigurationDepartments.pending,
          getTicketConfigurationSubCategories.pending,
          getTicketConfigurationSubCategoryList.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getTicketConfigurationDepartments.rejected,
          getTicketConfigurationCategories.rejected,
          getTicketConfigurationSubCategories.rejected,
          getTicketConfigurationSubCategoryList.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.ticketConfiguration.isLoading

const isError = (state: RootState): ValidationError =>
  state.ticketConfiguration.error

const departments = (state: RootState): TicketConfigurationDepartments[] =>
  state.ticketConfiguration.departments

const categories = (state: RootState): TicketConfigurationCategories[] =>
  state.ticketConfiguration.categories

const subCategories = (state: RootState): TicketConfigurationSubCategories[] =>
  state.ticketConfiguration.subCategories

const subCategoryList = (
  state: RootState,
): TicketConfigurationSubCategoryList =>
  state.ticketConfiguration.subCategoryList

const listSize = (state: RootState): number =>
  state.ticketConfiguration.listSize

const ticketConfigurationThunk = {
  getTicketConfigurationDepartments,
  getTicketConfigurationCategories,
  getTicketConfigurationSubCategories,
  getTicketConfigurationSubCategoryList,
}

const qualificationCategorySelectors = {
  isLoading,
  isError,
  departments,
  categories,
  subCategories,
  subCategoryList,
  listSize,
}

export const ticketConfigurationService = {
  ...ticketConfigurationThunk,
  actions: ticketConfigurationSlice.actions,
  selectors: qualificationCategorySelectors,
}

export default ticketConfigurationSlice.reducer
