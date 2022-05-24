import { AppDispatch, RootState } from '../../../stateStore'
import {
  Category,
  CategorySliceState,
} from '../../../types/MyProfile/Categories/categoryTypes'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AllowedLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import categoryApi from '../../../middleware/api/MyProfile/Categories/categoryApi'

const getAllCategories = createAsyncThunk(
  'category/getAllCategories',
  async (_, thunkApi) => {
    try {
      return await categoryApi.getAllCategories()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const createNewCategory = createAsyncThunk<
  Category[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('category/createNewCategory', async (categoryName, thunkApi) => {
  try {
    return await categoryApi.createNewCategory(categoryName)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
const deleteCategory = createAsyncThunk<
  Category[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('category/deleteCategory', async (categoryId, thunkApi) => {
  try {
    return await categoryApi.deleteCategory(categoryId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialCategoryState: CategorySliceState = {
  categoryList: [],
  isLoading: AllowedLoadingState.idle,
}

const categorySlice = createSlice({
  name: 'category',
  initialState: initialCategoryState,
  reducers: {
    clearCategoryList: (state) => {
      state.categoryList = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getAllCategories.pending,
          createNewCategory.pending,
          deleteCategory.pending,
        ),
        (state) => {
          state.isLoading = AllowedLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getAllCategories.fulfilled,
          createNewCategory.fulfilled,
          deleteCategory.fulfilled,
        ),
        (state, action) => {
          state.isLoading = AllowedLoadingState.succeeded
          state.categoryList = action.payload as Category[]
        },
      )
  },
})

const selectIsCategoryListLoading = (state: RootState): LoadingState =>
  state.category.isLoading
const selectCategoryList = (state: RootState): Category[] =>
  state.category.categoryList

const categoryThunk = {
  getAllCategories,
  createNewCategory,
  deleteCategory,
}

const categorySelectors = {
  selectIsCategoryListLoading,
  selectCategoryList,
}

export const categoryService = {
  ...categoryThunk,
  actions: categorySlice.actions,
  selectors: categorySelectors,
}

export default categorySlice.reducer
