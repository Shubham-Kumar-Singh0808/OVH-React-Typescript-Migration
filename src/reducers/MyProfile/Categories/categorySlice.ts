import { AppDispatch, RootState } from '../../../stateStore'
import {
  CategoryListItem,
  CategoryState,
} from '../../../types/MyProfile/Categories/categoryTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import categoryApi from '../../../middleware/api/MyProfile/Categories/categoryApi'

const getAllCategoryList = createAsyncThunk(
  'category/getAllCategoryList',
  async (_, thunkApi) => {
    try {
      return await categoryApi.getAllCategoryList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const postNewCategoryByName = createAsyncThunk<
  CategoryListItem[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('category/postNewCategoryByName', async (toAddCategoryName, thunkApi) => {
  try {
    return await categoryApi.postNewCategoryByName(toAddCategoryName)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
const deleteCategoryById = createAsyncThunk<
  CategoryListItem[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('category/deleteCategoryById', async (categoryId, thunkApi) => {
  try {
    return await categoryApi.deleteCategoryById(categoryId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialCategoryState: CategoryState = {
  categoryList: [],
  isLoading: false,
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
          getAllCategoryList.pending,
          postNewCategoryByName.pending,
          deleteCategoryById.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getAllCategoryList.fulfilled,
          postNewCategoryByName.fulfilled,
          deleteCategoryById.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false
          state.categoryList = action.payload as CategoryListItem[]
        },
      )
  },
})

const selectIsCategoryListLoading = (state: RootState): boolean =>
  state.category.isLoading
const selectCategoryList = (state: RootState): CategoryListItem[] =>
  state.category.categoryList

export const categoryThunk = {
  getAllCategoryList,
  postNewCategoryByName,
  deleteCategoryById,
}

export const categoryActions = categorySlice.actions

export const categorySelectors = {
  selectIsCategoryListLoading,
  selectCategoryList,
}

export default categorySlice.reducer
