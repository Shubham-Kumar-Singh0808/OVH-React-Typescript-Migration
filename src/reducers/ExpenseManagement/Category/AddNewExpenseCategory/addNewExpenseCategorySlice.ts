import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AddNewCategorySliceState } from '../../../../types/ExpenseManagement/Category/AddExpenseCategory/addExpenseCategoryTypes'
import addNewCategoryApi from '../../../../middleware/api/ExpenseManagement/Category/AddNewExpenseCategory/addNewExpenseCategoryListApi'

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
      .addCase(addNewExpenseCategory.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(addNewExpenseCategory.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(addNewExpenseCategory.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const addNewCategoryThunk = {
  addNewExpenseCategory,
}

export const addNewCategoryService = {
  ...addNewCategoryThunk,
  actions: addNewCategorySlice.actions,
}

export default addNewCategorySlice.reducer
