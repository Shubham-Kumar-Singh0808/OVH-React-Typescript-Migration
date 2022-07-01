import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../../stateStore'
import {
  QualificationCategory,
  QualificationCategorySliceState,
} from '../../../../types/MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategoryTypes'
import employeeQualificationCategoryApi from '../../../../middleware/api/MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategoryApi'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'

const getQualificationCategories = createAsyncThunk(
  'qualificationCategory/getQualificationCategories',
  async (_, thunkApi) => {
    try {
      return await employeeQualificationCategoryApi.getQualificationCategories()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const createQualificationCategory = createAsyncThunk<
  QualificationCategory[] | undefined,
  QualificationCategory,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'qualificationCategory/createQualificationCategory',
  async (
    { qualificationCategory, qualificationName }: QualificationCategory,
    thunkApi,
  ) => {
    try {
      return await employeeQualificationCategoryApi.createQualificationCategory(
        {
          qualificationCategory,
          qualificationName,
        },
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const deleteQualificationCategory = createAsyncThunk<
  QualificationCategory[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('qualificationCategory/deleteQualificationCategory', async (id, thunkApi) => {
  try {
    return await employeeQualificationCategoryApi.deleteQualificationCategory(
      id,
    )
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialCategoryState: QualificationCategorySliceState = {
  qualificationCategories: [],
  isLoading: ApiLoadingState.idle,
  error: null,
  currentPage: 1,
  pageSize: 20,
}

const qualificationCategorySlice = createSlice({
  name: 'qualificationCategory',
  initialState: initialCategoryState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteQualificationCategory.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
      .addMatcher(
        isAnyOf(
          getQualificationCategories.pending,
          deleteQualificationCategory.pending,
          createQualificationCategory.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getQualificationCategories.fulfilled,
          deleteQualificationCategory.fulfilled,
          createQualificationCategory.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.qualificationCategories =
            action.payload as QualificationCategory[]
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.qualificationCategory.isLoading

const qualificationCategories = (state: RootState): QualificationCategory[] =>
  state.qualificationCategory.qualificationCategories

const isError = (state: RootState): ValidationError =>
  state.qualificationCategory.error

const pageFromState = (state: RootState): number =>
  state.qualificationCategory.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.qualificationCategory.pageSize

export const qualificationCategoryThunk = {
  getQualificationCategories,
  deleteQualificationCategory,
  createQualificationCategory,
}

export const qualificationCategorySelectors = {
  isLoading,
  qualificationCategories,
  isError,
  pageFromState,
  pageSizeFromState,
}

export const qualificationCategoryService = {
  ...qualificationCategoryThunk,
  actions: qualificationCategorySlice.actions,
  selectors: qualificationCategorySelectors,
}

export default qualificationCategorySlice.reducer
