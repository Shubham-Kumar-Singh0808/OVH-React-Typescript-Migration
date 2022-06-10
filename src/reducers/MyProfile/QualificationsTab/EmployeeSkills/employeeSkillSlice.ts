import {
  AddUpdateEmployeeSkill,
  CategorySkillListItem,
  EditEmployeeSkills,
  EmployeeSkillState,
  EmployeeSkills,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import { AppDispatch, RootState } from '../../../../stateStore'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

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

const getCategorySkills = createAsyncThunk<
  CategorySkillListItem[] | undefined,
  string | number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getCategorySkills',
  async (categoryType: string | number, thunkApi) => {
    try {
      return await employeeSkillsApi.getCategorySkills(categoryType)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addEmployeeSkill = createAsyncThunk<
  number | undefined,
  AddUpdateEmployeeSkill,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/addEmployeeSkill',
  async (employeeSkill: AddUpdateEmployeeSkill, thunkApi) => {
    try {
      return await employeeSkillsApi.addEmployeeSkill(employeeSkill)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeSkillInformation = createAsyncThunk<
  EditEmployeeSkills | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/getEmployeeSkillInformation',
  async (skillId: number, thunkApi) => {
    try {
      return await employeeSkillsApi.getEmployeeSkillInformation(skillId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateEmployeeSkill = createAsyncThunk<
  number | undefined,
  AddUpdateEmployeeSkill,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeQualifications/updateEmployeeSkill',
  async (employeeSkill: AddUpdateEmployeeSkill, thunkApi) => {
    try {
      return await employeeSkillsApi.updateEmployeeSkill(employeeSkill)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteEmployeeSkill = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeQualifications/deleteEmployeeSkill', async (skillId, thunkApi) => {
  try {
    return await employeeSkillsApi.deleteEmployeeSkill(skillId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialSkillState: EmployeeSkillState = {
  isLoading: false,
  skillDetails: [],
  AddEditSkill: {} as EditEmployeeSkills,
  CategorySkillList: [],
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
      .addCase(getEmployeeSkillInformation.fulfilled, (state, action) => {
        state.isLoading = false
        state.AddEditSkill = action.payload as unknown as EditEmployeeSkills
      })
      .addCase(getCategorySkills.fulfilled, (state, action) => {
        state.isLoading = false
        state.CategorySkillList = action.payload as CategorySkillListItem[]
      })
      .addMatcher(
        isAnyOf(
          getEmployeeSkills.pending,
          addEmployeeSkill.pending,
          getEmployeeSkillInformation.pending,
          updateEmployeeSkill.pending,
          deleteEmployeeSkill.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeSkills.rejected,
          addEmployeeSkill.rejected,
          getEmployeeSkillInformation.rejected,
          updateEmployeeSkill.rejected,
          deleteEmployeeSkill.rejected,
        ),
        (state) => {
          state.isLoading = false
        },
      )
  },
})

const employeeSkillDetails = (state: RootState): EmployeeSkills[] =>
  state.employeeSkill.skillDetails

const selectIsLoading = (state: RootState): boolean =>
  state.employeeSkill.isLoading

const selectEditSkillDetails = (state: RootState): EditEmployeeSkills =>
  state.employeeSkill.AddEditSkill

const selectCategorySkillList = (state: RootState): CategorySkillListItem[] =>
  state.employeeSkill.CategorySkillList

export const employeeSkillThunk = {
  getEmployeeSkills,
  getCategorySkills,
  addEmployeeSkill,
  getEmployeeSkillInformation,
  updateEmployeeSkill,
  deleteEmployeeSkill,
}
export const employeeSkillActions = employeeSkillSlice.actions

export const employeeSkillSelectors = {
  selectIsLoading,
  selectEditSkillDetails,
  selectCategorySkillList,
  employeeSkillDetails,
}

export const employeeSkillServices = {
  ...employeeSkillThunk,
  actions: employeeSkillSlice.actions,
  selectors: employeeSkillSelectors,
}

export default employeeSkillSlice.reducer
