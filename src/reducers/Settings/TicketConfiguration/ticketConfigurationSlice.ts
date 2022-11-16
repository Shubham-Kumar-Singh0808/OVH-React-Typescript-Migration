import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ticketConfigurationApi from '../../../middleware/api/Settings/TicketConfiguration/ticketConfigurationApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AddSubCategoryDetails,
  TicketConfigurationCategories,
  TicketConfigurationDepartments,
  TicketConfigurationState,
  TicketConfigurationSubCategories,
  TicketConfigurationSubCategoryList,
  TicketConfigurationSubCategoryType,
  TicketHistoryProps,
  TicketHistoryResponse,
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
  'supportManagement/departmentCategoryList',
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
>('supportManagement/subCategoryList', async (categoryId, thunkApi) => {
  try {
    return await ticketConfigurationApi.getTicketConfigurationSubCategories(
      categoryId,
    )
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getTicketConfigurationSubCategoryList = createAsyncThunk<
  TicketConfigurationSubCategoryList | undefined,
  TicketConfigurationSubCategoryType,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'supportManagement/getSearchSubCategoryList',
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

const deleteSubCategory = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('supportManagement/deleteSubCategory', async (subCategoryId, thunkApi) => {
  try {
    return await ticketConfigurationApi.deleteSubCategory(subCategoryId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const ticketHistoryDetails = createAsyncThunk(
  'supportManagement/ticketHistory',
  async (props: TicketHistoryProps, thunkApi) => {
    try {
      return await ticketConfigurationApi.ticketHistory(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addSubCategory = createAsyncThunk<
  number | undefined,
  AddSubCategoryDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'supportManagement/addSubCategory',
  async (newSubCategoryDetails: AddSubCategoryDetails, thunkApi) => {
    try {
      return await ticketConfigurationApi.addSubCategory(newSubCategoryDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const ticketConfigurationSlice = createSlice({
  name: 'ticketConfiguration',
  initialState: { ...initialTicketConfigurationState, toggle: '' },
  reducers: {
    setSelectedDepartment: (state, action) => {
      return { ...state, selectedDepartment: action.payload }
    },
    clearSubCategoryList: (state) => {
      state.subCategoryList.list = []
      state.subCategoryList.size = 0
    },
    setToggle: (state, action) => {
      state.toggle = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTicketConfigurationDepartments.fulfilled, (state, action) => {
        state.isLoadingFilterOptions = ApiLoadingState.succeeded
        state.departments = action.payload
      })
      .addCase(
        getTicketConfigurationSubCategoryList.fulfilled,
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.subCategoryList =
            action.payload as TicketConfigurationSubCategoryList
          state.listSize = action.payload?.size as number
        },
      )
      .addCase(getTicketConfigurationCategories.fulfilled, (state, action) => {
        state.isLoadingFilterOptions = ApiLoadingState.succeeded
        state.categories = action.payload as TicketConfigurationCategories[]
      })
      .addCase(ticketHistoryDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.ticketHistoryDetails = action.payload
      })
      .addCase(
        getTicketConfigurationSubCategories.fulfilled,
        (state, action) => {
          state.isLoadingFilterOptions = ApiLoadingState.succeeded
          state.subCategories =
            action.payload as TicketConfigurationSubCategories[]
        },
      )
      .addMatcher(
        isAnyOf(addSubCategory.fulfilled, deleteSubCategory.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )

      .addMatcher(
        isAnyOf(
          getTicketConfigurationSubCategoryList.pending,
          deleteSubCategory.pending,
          ticketHistoryDetails.pending,
          addSubCategory.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getTicketConfigurationDepartments.pending,
          getTicketConfigurationCategories.pending,
          getTicketConfigurationSubCategories.pending,
        ),
        (state) => {
          state.isLoadingFilterOptions = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getTicketConfigurationDepartments.rejected,
          getTicketConfigurationCategories.rejected,
          getTicketConfigurationSubCategories.rejected,
          getTicketConfigurationSubCategoryList.rejected,
          deleteSubCategory.rejected,
          ticketHistoryDetails.rejected,
          addSubCategory.rejected,
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

const selectedDepartment = (state: RootState): string =>
  state.ticketConfiguration.selectedDepartment

const ticketHistory = (state: RootState): TicketHistoryResponse =>
  state.ticketConfiguration.ticketHistoryDetails

const toggle = (state: RootState): string => state.ticketConfiguration.toggle

const ticketConfigurationThunk = {
  getTicketConfigurationDepartments,
  getTicketConfigurationCategories,
  getTicketConfigurationSubCategories,
  getTicketConfigurationSubCategoryList,
  deleteSubCategory,
  ticketHistoryDetails,
  addSubCategory,
}

const ticketConfigurationSelectors = {
  isLoading,
  isError,
  departments,
  categories,
  subCategories,
  subCategoryList,
  listSize,
  selectedDepartment,
  ticketHistory,
  toggle,
}

export const ticketConfigurationService = {
  ...ticketConfigurationThunk,
  actions: ticketConfigurationSlice.actions,
  selectors: ticketConfigurationSelectors,
}

export default ticketConfigurationSlice.reducer
