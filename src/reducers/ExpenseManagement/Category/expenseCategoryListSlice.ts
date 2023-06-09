import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import categoryListApi from '../../../middleware/api/ExpenseManagement/Category/expenseCategoryListApi'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  CategoryList,
  CategoryListSliceState,
} from '../../../types/ExpenseManagement/Category/categoryListTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'

const getCategoryList = createAsyncThunk(
  '/ExpenseManagement/getCategoryList',
  async (_, thunkApi) => {
    try {
      return await categoryListApi.getExpenseCategories()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const editExpenseCategory = createAsyncThunk(
  '/ExpenseManagement/editCategory',
  async (categoryId: number, thunkApi) => {
    try {
      return await categoryListApi.editNewCategory(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateExpenseCategory = createAsyncThunk(
  '/ExpenseManagement/updateCategory',
  async (data: CategoryList, thunkApi) => {
    try {
      return await categoryListApi.updateNewCategory(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteExpenseCategory = createAsyncThunk(
  '/ExpenseManagement/deleteCategory',
  async (categoryId: number, thunkApi) => {
    try {
      return await categoryListApi.deleteCategory(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialCategoryListState: CategoryListSliceState = {
  getAllCategory: [],
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
  error: null,
}

const categoryListSlice = createSlice({
  name: 'category',
  initialState: initialCategoryListState,
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
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllCategory = action.payload
      })
      .addMatcher(
        isAnyOf(editExpenseCategory.fulfilled, updateExpenseCategory.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getCategoryList.pending,
          editExpenseCategory.pending,
          updateExpenseCategory.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getCategoryList.rejected,
          editExpenseCategory.rejected,
          updateExpenseCategory.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.categoryList.isLoading
const categories = (state: RootState): CategoryList[] =>
  state.categoryList.getAllCategory
const pageFromState = (state: RootState): number =>
  state.categoryList.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.categoryList.pageSize

const categoryListThunk = {
  getCategoryList,
  editExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
}

const categoryListSelectors = {
  isLoading,
  categories,
  pageFromState,
  pageSizeFromState,
}

export const categoryListService = {
  ...categoryListThunk,
  actions: categoryListSlice.actions,
  selectors: categoryListSelectors,
}

export default categoryListSlice.reducer
