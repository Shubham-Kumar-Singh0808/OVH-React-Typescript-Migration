import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../../types/commonTypes'
import addNewCategoryApi from '../../../../middleware/api/ExpenseManagement/Category/AddNewExpenseCategory/addNewExpenseCategoryListApi'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AddNewCategorySliceState } from '../../../../types/ExpenseManagement/Category/AddExpenseCategory/addExpenseCategoryTypes'

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

const initialAddNewCategoryState: AddNewCategorySliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  addExpenseCategory: [],
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
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(addNewExpenseCategory.pending, checkDuplicateCategory.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          addNewExpenseCategory.rejected,
          checkDuplicateCategory.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

// const addCategories = (state: RootState): CategoryList[] =>
//   state.addNewCategory.addExpenseCategory

const addNewCategoryThunk = {
  addNewExpenseCategory,
  checkDuplicateCategory,
}

// const addCategoriesListSelectors = {
//   addCategories,
// }

export const addNewCategoryService = {
  ...addNewCategoryThunk,
  actions: addNewCategorySlice.actions,
  //selectors: addCategoriesListSelectors,
}

export default addNewCategorySlice.reducer
