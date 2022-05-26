import { AppDispatch, RootState } from '../../../../stateStore'
import {
  QualificationCategoryList,
  QualificationCategoryState,
} from '../../../../types/MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategoryTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import employeeQualificationCategoryApi from '../../../../middleware/api/MyProfile/QualificationsTab/QualificationCategoryList/employeeQualificationCategoryApi'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../../types/commonTypes'

const getQualificationCategories = createAsyncThunk(
  'qualificationCategory/getQualificationCategories',
  async (_, thunkApi) => {
    try {
      return await employeeQualificationCategoryApi.getQualificationCategories()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const addQualificationCategory = createAsyncThunk<
  QualificationCategoryList[] | undefined,
  QualificationCategoryList,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'qualificationCategory/addQualificationCategory',
  async (
    { qualificationCategory, qualificationName }: QualificationCategoryList,
    thunkApi,
  ) => {
    try {
      return await employeeQualificationCategoryApi.addQualificationCategory({
        qualificationCategory,
        qualificationName,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const deleteQualificationCategory = createAsyncThunk<
  QualificationCategoryList[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('qualificationCategory/deleteQualificationCategory', async (id, thunkApi) => {
  try {
    return await employeeQualificationCategoryApi.deleteQualificationCategory(
      id,
    )
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

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
          deleteQualificationCategory.pending,
          addQualificationCategory.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getQualificationCategories.fulfilled,
          deleteQualificationCategory.fulfilled,
          addQualificationCategory.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false
          state.qualificationCategoryList =
            action.payload as QualificationCategoryList[]
        },
      )
  },
})

const selectIsQualificationCategoryListLoading = (state: RootState): boolean =>
  state.qualificationCategory.isLoading

const selectQualificationCategoryList = (
  state: RootState,
): QualificationCategoryList[] =>
  state.qualificationCategory.qualificationCategoryList

export const qualificationCategoryThunk = {
  getQualificationCategories,
  deleteQualificationCategory,
  addQualificationCategory,
}

export const qualificationCategoryActions = qualificationCategorySlice.actions

export const qualificationCategorySelectors = {
  selectIsQualificationCategoryListLoading,
  selectQualificationCategoryList,
}

export default qualificationCategorySlice.reducer
