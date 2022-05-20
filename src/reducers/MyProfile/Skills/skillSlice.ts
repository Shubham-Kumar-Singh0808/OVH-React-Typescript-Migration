import {
  Skill,
  SkillSliceState,
} from '../../../types/MyProfile/Skills/skillTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import skillApi from '../../../middleware/api/MyProfile/Skills/skillApi'

const getAllSkills = createAsyncThunk(
  'skill/getAllSkills',
  async (categoryId: number, thunkApi) => {
    try {
      return await skillApi.getAllSkills(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const createNewSkill = createAsyncThunk(
  'skill/createNewSkill',
  async (
    {
      categoryId,
      toAddSkillName,
    }: { categoryId: number; toAddSkillName: string },
    thunkApi,
  ) => {
    try {
      return await skillApi.createNewSkill(categoryId, toAddSkillName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const deleteSkill = createAsyncThunk(
  'skill/deleteSkill',
  async (skillId: number, thunkApi) => {
    try {
      return await skillApi.deleteSkill(skillId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialSkillSliceState: SkillSliceState = {
  skillList: [],
  refreshList: false,
  isLoading: false,
}

const skillSlice = createSlice({
  name: 'skill',
  initialState: initialSkillSliceState,
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
    builder.addCase(deleteSkill.fulfilled, (state) => {
      state.refreshList = true
    })

    builder
      .addMatcher(
        isAnyOf(
          getAllSkills.pending,
          createNewSkill.pending,
          deleteSkill.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(getAllSkills.fulfilled, createNewSkill.fulfilled),
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
const selectSkillList = (state: RootState): Skill[] => state.skill.skillList

const skillThunk = {
  getAllSkills,
  createNewSkill,
  deleteSkill,
}

const skillSelectors = {
  selectIsSkillListLoading,
  selectRefreshList,
  selectSkillList,
}

export const skillService = {
  ...skillThunk,
  actions: skillSlice.actions,
  selectors: skillSelectors,
}

export default skillSlice.reducer
