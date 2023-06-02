import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../../types/commonTypes'
import addNewCategoryApi from '../../../../middleware/api/ExpenseManagement/Category/AddNewExpenseCategory/addNewExpenseCategoryListApi'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  AddNewCategorySliceState,
  EditCategory,
} from '../../../../types/ExpenseManagement/Category/AddExpenseCategory/addExpenseCategoryTypes'
import { RootState } from '../../../../stateStore'
import { CategoryList } from '../../../../types/ExpenseManagement/Category/categoryListTypes'

const addNewExpenseCategory = createAsyncThunk(
  '/ExpenseManagement/addCategory',
  async (categoryName: string, thunkApi) => {
    try {
      return await addNewCategoryApi.addNewCategory(categoryName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const checkDuplicateCategory = createAsyncThunk(
  '/ExpenseManagement/checkForDuplicateCategory',
  async (categoryName: string, thunkApi) => {
    try {
      return await addNewCategoryApi.checkDuplicateCategory(categoryName)
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
      return await addNewCategoryApi.editNewCategory(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateExpenseCategory = createAsyncThunk(
  '/ExpenseManagement/updateCategory',
  async (data: EditCategory, thunkApi) => {
    try {
      return await addNewCategoryApi.updateNewCategory(data)
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
      return await addNewCategoryApi.deleteCategory(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAddNewCategoryState: AddNewCategorySliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  addNewCategory: [],
}

const addNewCategorySlice = createSlice({
  name: 'addNewCategory',
  initialState: initialAddNewCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          addNewExpenseCategory.fulfilled,
          checkDuplicateCategory.fulfilled,
          editExpenseCategory.fulfilled,
          updateExpenseCategory.fulfilled,
          deleteExpenseCategory.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          addNewExpenseCategory.pending,
          checkDuplicateCategory.pending,
          editExpenseCategory.pending,
          updateExpenseCategory.pending,
          deleteExpenseCategory.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          deleteExpenseCategory.rejected,
          checkDuplicateCategory.rejected,
          editExpenseCategory.rejected,
          updateExpenseCategory.rejected,
          deleteExpenseCategory.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const checkCategoryNames = (state: RootState): CategoryList[] =>
  state.addNewCategory.addNewCategory

const addNewCategoryThunk = {
  addNewExpenseCategory,
  checkDuplicateCategory,
  editExpenseCategory,
  updateExpenseCategory,
  deleteExpenseCategory,
}

const addNewCategorySelectors = {
  checkCategoryNames,
}

export const addNewCategoryService = {
  ...addNewCategoryThunk,
  actions: addNewCategorySlice.actions,
  selectors: addNewCategorySelectors,
}

export default addNewCategorySlice.reducer
