import { AppDispatch, RootState } from '../../../stateStore'
import {
  QualificationCategoryListItem,
  QualificationCategoryState,
} from '../../../types/MyProfile/QualificationCategoryList/qualificationCategoryTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  deleteQualificationCategoryById,
  getAllQualificationCategoryList,
  postNewQualificationCategoryByName,
} from '../../../middleware/api/MyProfile/QualificationCategoryList/qualificationCategoryApi'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'

export const fetchAllQualificationCategories = createAsyncThunk(
  'qualificationCategory/fetchAllQualificationCategories',
  async (_, thunkApi) => {
    try {
      return await getAllQualificationCategoryList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const addNewQualificationCategoryByName = createAsyncThunk<
  QualificationCategoryListItem[] | undefined,
  QualificationCategoryListItem,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'qualificationCategory/addNewQualificationCategoryByName',
  async (
    { qualificationCategory, qualificationName }: QualificationCategoryListItem,
    thunkApi,
  ) => {
    try {
      return await postNewQualificationCategoryByName({
        qualificationCategory,
        qualificationName,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
export const removeQualificationCategoryById = createAsyncThunk<
  QualificationCategoryListItem[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'qualificationCategory/removeQualificationCategoryById',
  async (id, thunkApi) => {
    try {
      return await deleteQualificationCategoryById(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialCategoryState: QualificationCategoryState = {
  qualificationCategoryList: [],
  isLoading: false,
}

const qualificationCategorySlice = createSlice({
  name: 'qualificationCategory',
  initialState: initialCategoryState,
  reducers: {
    clearCategoryList: (state) => {
      state.qualificationCategoryList = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          fetchAllQualificationCategories.pending,
          removeQualificationCategoryById.pending,
          addNewQualificationCategoryByName.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          fetchAllQualificationCategories.fulfilled,
          removeQualificationCategoryById.fulfilled,
          addNewQualificationCategoryByName.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false
          state.qualificationCategoryList =
            action.payload as QualificationCategoryListItem[]
        },
      )
  },
})

export const selectIsQualificationCategoryListLoading = (
  state: RootState,
): boolean => state.qualificationCategory.isLoading
export const selectQualificationCategoryList = (
  state: RootState,
): QualificationCategoryListItem[] =>
  state.qualificationCategory.qualificationCategoryList

export default qualificationCategorySlice.reducer
