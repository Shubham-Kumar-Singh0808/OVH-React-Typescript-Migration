import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  Skill,
  SkillSliceState,
} from '../../../types/MyProfile/Skills/skillTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AllowedLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
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

const initialSkillState: SkillSliceState = {
  skillList: [],
  refreshList: false,
  isLoading: AllowedLoadingState.idle,
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
          state.isLoading = AllowedLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getAllSkills.fulfilled, createNewSkill.fulfilled),
        (state, action) => {
          state.isLoading = AllowedLoadingState.succeeded
          state.skillList = action.payload
        },
      )
  },
})

const selectIsSkillListLoading = (state: RootState): LoadingState =>
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
