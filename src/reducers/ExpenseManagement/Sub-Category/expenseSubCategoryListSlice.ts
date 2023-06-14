import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import subCategoryListApi from '../../../middleware/api/ExpenseManagement/Sub-Category/subCategoryApi'
import {
  CategoryList,
  SubCategoryList,
  SubCategoryListSliceState,
} from '../../../types/ExpenseManagement/Sub-Category/subCategoryListTypes'

const getCategoryList = createAsyncThunk(
  '/ExpenseManagement/getCategoryList',
  async (_, thunkApi) => {
    try {
      return await subCategoryListApi.getCategoryList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSubCategoryList = createAsyncThunk(
  '/ExpenseManagement/getSubCategoryList',
  async (_, thunkApi) => {
    try {
      return await subCategoryListApi.getSubCategoryList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addSubCategoryList = createAsyncThunk(
  '/ExpenseManagement/addSubCategoryList',
  async (
    {
      categoryId,
      subCategoryName,
    }: {
      categoryId: number
      subCategoryName: string
    },
    thunkApi,
  ) => {
    try {
      return await subCategoryListApi.addSubCategoryList({
        categoryId,
        subCategoryName,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const existSubCategoryList = createAsyncThunk(
  '/ExpenseManagement/existSubCategoryList',
  async (
    {
      categoryId,
      subCategoryName,
    }: {
      categoryId: number
      subCategoryName: string
    },
    thunkApi,
  ) => {
    try {
      return await subCategoryListApi.existSubCategoryList({
        categoryId,
        subCategoryName,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const editExpenseSubCategoryList = createAsyncThunk(
  '/ExpenseManagement/editSubCategory',
  async (categoryId: number, thunkApi) => {
    try {
      return await subCategoryListApi.editSubCategoryList(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateExpenseSubCategoryList = createAsyncThunk(
  '/ExpenseManagement/updateCategory',
  async (data: SubCategoryList, thunkApi) => {
    try {
      return await subCategoryListApi.updateSubCategoryList(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteExpenseSubCategoryList = createAsyncThunk(
  '/ExpenseManagement/deleteCategory',
  async (categoryId: number, thunkApi) => {
    try {
      return await subCategoryListApi.deleteSubCategoryList(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialExpenseSubCategoryState: SubCategoryListSliceState = {
  isLoading: ApiLoadingState.idle,
  expenseCategories: [],
  subExpenseCategories: [],
  currentPage: 1,
  pageSize: 20,
}

const subCategoryListSlice = createSlice({
  name: 'sub category',
  initialState: initialExpenseSubCategoryState,
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
        state.expenseCategories = action.payload
      })
      .addMatcher(
        isAnyOf(
          getSubCategoryList.fulfilled,
          addSubCategoryList.fulfilled,
          existSubCategoryList.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.subExpenseCategories = action.payload
        },
      )
      .addMatcher(isAnyOf(deleteExpenseSubCategoryList.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })

      .addMatcher(
        isAnyOf(
          getCategoryList.pending,
          getSubCategoryList.pending,
          addSubCategoryList.pending,
          existSubCategoryList.pending,
          editExpenseSubCategoryList.pending,
          updateExpenseSubCategoryList.pending,
          deleteExpenseSubCategoryList.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getCategoryList.rejected,
          getSubCategoryList.rejected,
          addSubCategoryList.rejected,
          existSubCategoryList.rejected,
          editExpenseSubCategoryList.rejected,
          updateExpenseSubCategoryList.rejected,
          deleteExpenseSubCategoryList.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.subCategoryList.isLoading
const categories = (state: RootState): CategoryList[] =>
  state.subCategoryList.expenseCategories
const subCategories = (state: RootState): SubCategoryList[] =>
  state.subCategoryList.subExpenseCategories
const addSubCategories = (state: RootState): SubCategoryList[] =>
  state.subCategoryList.subExpenseCategories
const pageFromState = (state: RootState): number =>
  state.subCategoryList.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.subCategoryList.pageSize

const subCategoryListThunk = {
  getCategoryList,
  getSubCategoryList,
  addSubCategoryList,
  existSubCategoryList,
  editExpenseSubCategoryList,
  updateExpenseSubCategoryList,
  deleteExpenseSubCategoryList,
}

const subCategoryListSelectors = {
  isLoading,
  categories,
  subCategories,
  addSubCategories,
  pageFromState,
  pageSizeFromState,
}

export const subCategoryListService = {
  ...subCategoryListThunk,
  actions: subCategoryListSlice.actions,
  selectors: subCategoryListSelectors,
}

export default subCategoryListSlice.reducer
