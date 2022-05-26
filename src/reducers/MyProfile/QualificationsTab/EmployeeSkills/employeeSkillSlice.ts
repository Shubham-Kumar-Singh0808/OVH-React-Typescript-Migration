import { AppDispatch, RootState } from '../../../../stateStore'
import {
  EmployeeSkillState,
  EmployeeSkills,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../../types/commonTypes'
import employeeSkillsApi from '../../../../middleware/api/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillsApi'

const getEmployeeSkills = createAsyncThunk<
  EmployeeSkills[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('skill/getEmployeeSkills', async (_, thunkApi) => {
  try {
    return await employeeSkillsApi.getEmployeeSkills()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialSkillState: EmployeeSkillState = {
  isLoading: false,
  skillDetails: [],
}

const employeeSkillSlice = createSlice({
  name: 'employeeSkill',
  initialState: initialSkillState,
  reducers: {
    clearEmployeeSkill: (state) => {
      state.skillDetails = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeSkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.skillDetails = action.payload as unknown as EmployeeSkills[]
      })
      .addCase(getEmployeeSkills.pending, (state) => {
        state.isLoading = true
      })
  },
})

const selectIsLoading = (state: RootState): boolean =>
  state.employeeSkill.isLoading

export const employeeSkillThunk = {
  getEmployeeSkills,
}

export const employeeSkillActions = employeeSkillSlice.actions

export const employeeSkillSelectors = {
  selectIsLoading,
}

export default employeeSkillSlice.reducer
