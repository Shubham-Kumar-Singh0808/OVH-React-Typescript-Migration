import { AppDispatch, RootState } from '../../../stateStore'
import {
  CategoryListItemType,
  CategoryStateType,
} from '../../../types/MyProfile/Categories/categoryTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  deleteCategoryById,
  getAllCategoryList,
  postNewCategoryByName,
} from '../../../middleware/api/MyProfile/Categories/categoryApi'

import { AxiosError } from 'axios'
import { ValidationErrorType } from '../../../types/commonTypes'

export const fetchAllCategories = createAsyncThunk(
  'category/fetchAllCategories',
  async (_, thunkApi) => {
    try {
      return await getAllCategoryList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const addNewCategoryByName = createAsyncThunk<
  CategoryListItemType[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('category/addNewCategoryByName', async (toAddCategoryName, thunkApi) => {
  try {
    return await postNewCategoryByName(toAddCategoryName)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})
export const removeCategoryById = createAsyncThunk<
  CategoryListItemType[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationErrorType
  }
>('category/removeCategoryById', async (categoryId, thunkApi) => {
  try {
    return await deleteCategoryById(categoryId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationErrorType)
  }
})

const initialCategoryState: CategoryStateType = {
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
          fetchAllCategories.pending,
          addNewCategoryByName.pending,
          removeCategoryById.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          fetchAllCategories.fulfilled,
          addNewCategoryByName.fulfilled,
          removeCategoryById.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false
          state.categoryList = action.payload as CategoryListItemType[]
        },
      )
  },
})

export const selectIsCategoryListLoading = (state: RootState): boolean =>
  state.category.isLoading
export const selectCategoryList = (state: RootState): CategoryListItemType[] =>
  state.category.categoryList

export default categorySlice.reducer
