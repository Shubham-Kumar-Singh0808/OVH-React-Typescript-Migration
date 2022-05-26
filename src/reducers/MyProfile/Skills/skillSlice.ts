import {
  SkillListItem,
  SkillState,
} from '../../../types/MyProfile/Skills/skillTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import skillApi from '../../../middleware/api/MyProfile/Skills/skillApi'

const getAllSkillListById = createAsyncThunk(
  'skill/getAllSkillListById',
  async (categoryId: number, thunkApi) => {
    try {
      return await skillApi.getAllSkillListById(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const postNewSkillByName = createAsyncThunk(
  'skill/postNewSkillByName',
  async (
    {
      categoryId,
      toAddSkillName,
    }: { categoryId: number; toAddSkillName: string },
    thunkApi,
  ) => {
    try {
      return await skillApi.postNewSkillByName(categoryId, toAddSkillName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const deleteSkillById = createAsyncThunk(
  'skill/deleteSkillById',
  async (skillId: number, thunkApi) => {
    try {
      return await skillApi.deleteSkillById(skillId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialSkillState: SkillState = {
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
    builder.addCase(deleteSkillById.fulfilled, (state) => {
      state.refreshList = true
    })
    builder
      .addMatcher(
        isAnyOf(
          getAllSkillListById.pending,
          postNewSkillByName.pending,
          deleteSkillById.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(getAllSkillListById.fulfilled, postNewSkillByName.fulfilled),
        (state, action) => {
          state.isLoading = false
          state.skillList = action.payload
        },
      )
  },
})

const selectIsSkillListLoading = (state: RootState): boolean =>
  state.skill.isLoading
const selectRefreshList = (state: RootState): boolean => state.skill.refreshList
const selectSkillList = (state: RootState): SkillListItem[] =>
  state.skill.skillList

export const skillThunk = {
  getAllSkillListById,
  postNewSkillByName,
  deleteSkillById,
}

export const skillActions = skillSlice.actions

export const skillSelectors = {
  selectIsSkillListLoading,
  selectRefreshList,
  selectSkillList,
}

export default skillSlice.reducer
