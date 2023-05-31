import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import addNewCategoryApi from '../../../../middleware/api/ExpenseManagement/Category/AddNewCategory/addNewCategoryListApi'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AddNewCategorySliceState } from '../../../../types/ExpenseManagement/Category/AddCategory/addCategoryTypes'
import { RootState } from '../../../../stateStore'

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
  categoryName: '',
}

const addNewCategorySlice = createSlice({
  name: 'addNewCategory',
  initialState: initialAddNewCategoryState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewExpenseCategory.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.categoryName = action.payload as string
      })
      .addCase(checkDuplicateCategory.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.categoryName = action.payload as string
      })
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
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.addNewCategory.isLoading

const expenseCategory = (state: RootState): string =>
  state.addNewCategory.categoryName

const addNewCategoryThunk = {
  checkDuplicateCategory,
}

const addNewCategorySelectors = {
  isLoading,
  expenseCategory,
}

export const addNewCategoryService = {
  ...addNewCategoryThunk,
  actions: addNewCategorySlice.actions,
  selectors: addNewCategorySelectors,
}

export default addNewCategorySlice.reducer
