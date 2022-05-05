import {
  SkillListItemType,
  SkillStateType,
} from '../../../types/MyProfile/Skills/skillTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  deleteSkillById,
  getAllSkillListById,
  postNewSkillByName,
} from '../../../middleware/api/MyProfile/Skills/skillApi'

import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import { ValidationErrorType } from '../../../types/commonTypes'

export const fetchAllSkillById = createAsyncThunk(
  'skill/fetchAllSkillById',
  async (categoryId: number, thunkApi) => {
    try {
      return await getAllSkillListById(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const addNewSkillByName = createAsyncThunk(
  'skill/addNewSkillByName',
  async (
    {
      categoryId,
      toAddSkillName,
    }: { categoryId: number; toAddSkillName: string },
    thunkApi,
  ) => {
    try {
      return await postNewSkillByName(categoryId, toAddSkillName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)
export const removeSkillById = createAsyncThunk(
  'skill/removeSkillById',
  async (skillId: number, thunkApi) => {
    try {
      return await deleteSkillById(skillId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(
        err.response?.status as ValidationErrorType,
      )
    }
  },
)

const initialSkillState: SkillStateType = {
  skillList: [],
  refreshList: false,
  isLoading: false,
}

const skillSlice = createSlice({
  name: 'skill',
  initialState: initialSkillState,
  reducers: {
    clearSkillList: (state) => {
      state.skillList = []
    },
    toRefreshList: (state) => {
      state.refreshList = true
    },
    doneRefreshList: (state) => {
      state.refreshList = false
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeSkillById.fulfilled, (state) => {
      state.refreshList = true
    })

    builder
      .addMatcher(
        isAnyOf(
          fetchAllSkillById.pending,
          addNewSkillByName.pending,
          removeSkillById.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(fetchAllSkillById.fulfilled, addNewSkillByName.fulfilled),
        (state, action) => {
          state.isLoading = false
          state.skillList = action.payload
        },
      )
  },
})

export const { clearSkillList, toRefreshList, doneRefreshList } =
  skillSlice.actions

export const selectIsSkillListLoading = (state: RootState): boolean =>
  state.skill.isLoading
export const selectRefreshList = (state: RootState): boolean =>
  state.skill.refreshList
export const selectSkillList = (state: RootState): SkillListItemType[] =>
  state.skill.skillList

export default skillSlice.reducer
