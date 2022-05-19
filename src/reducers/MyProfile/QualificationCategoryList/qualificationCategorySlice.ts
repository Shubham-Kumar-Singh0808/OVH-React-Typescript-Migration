import { AppDispatch, RootState } from '../../../stateStore'
import {
  QualificationCategoryList,
  QualificationCategoryState,
} from '../../../types/MyProfile/QualificationCategoryList/qualificationCategoryTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import qualificationCategoryApi from '../../../../src/middleware/api/MyProfile/QualificationCategoryList/qualificationCategoryApi'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'

const getQualificationCategories = createAsyncThunk(
  'qualificationCategory/getAllQualificationCategoryList',
  async (_, thunkApi) => {
    try {
      return await qualificationCategoryApi.getAllQualificationCategoryList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const addNewQualificationCategoryByName = createAsyncThunk<
  QualificationCategoryList[] | undefined,
  QualificationCategoryList,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'qualificationCategory/addNewQualificationCategoryByName',
  async (
    { qualificationCategory, qualificationName }: QualificationCategoryList,
    thunkApi,
  ) => {
    try {
      return await qualificationCategoryApi.postNewQualificationCategoryByName({
        qualificationCategory,
        qualificationName,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const removeQualificationCategoryById = createAsyncThunk<
  QualificationCategoryList[] | undefined,
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
      return await qualificationCategoryApi.deleteQualificationCategoryById(id)
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
          getQualificationCategories.pending,
          removeQualificationCategoryById.pending,
          addNewQualificationCategoryByName.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getQualificationCategories.fulfilled,
          removeQualificationCategoryById.fulfilled,
          addNewQualificationCategoryByName.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false
          state.qualificationCategoryList =
            action.payload as QualificationCategoryList[]
        },
      )
  },
})

export const selectIsQualificationCategoryListLoading = (
  state: RootState,
): boolean => state.qualificationCategory.isLoading
export const selectQualificationCategoryList = (
  state: RootState,
): QualificationCategoryList[] =>
  state.qualificationCategory.qualificationCategoryList

export const qualificationCategoryThunk = {
  getQualificationCategories,
  removeQualificationCategoryById,
  addNewQualificationCategoryByName,
}

export const qualificationCategoryActions = qualificationCategorySlice.actions

export const qualificationCategorySelectors = {
  selectIsQualificationCategoryListLoading,
  selectQualificationCategoryList,
}

export default qualificationCategorySlice.reducer
