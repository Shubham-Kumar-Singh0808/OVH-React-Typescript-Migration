import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import assignTemplateApi from '../../../middleware/api/Settings/Configurations/assignTemplateApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AssignTemplateSliceState,
  getdesignationdeptId,
  getEmpDepartments,
} from '../../../types/Settings/Configurations/assignTemplateTypes'

const getAllEmpDepartmentNames = createAsyncThunk(
  'assignTemplate/getAllEmpDepartments',
  async (_, thunkApi) => {
    try {
      return await assignTemplateApi.getAllEmpDepartments()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getDesignationDeptId = createAsyncThunk(
  'assignTemplate/getDesignationId',
  async (deptId: number, thunkApi) => {
    try {
      return await assignTemplateApi.getDesignationId(deptId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getnewCycleId = createAsyncThunk(
  'assignTemplate/getCycleId',
  async (newCycleID: number, thunkApi) => {
    try {
      return await assignTemplateApi.getCycleId(newCycleID)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getDesignationWiseKRAs = createAsyncThunk(
  'assignTemplate/getDesignationWiseKRAs',
  async (
    {
      departmentId,
      designationId,
    }: {
      departmentId: number
      designationId: number
    },
    thunkApi,
  ) => {
    try {
      return await assignTemplateApi.getDesignationWiseKRAs({
        departmentId,
        designationId,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAppraiselUnderKra = createAsyncThunk(
  'assignTemplate/getUnderKras',
  async (_, thunkApi) => {
    try {
      return await assignTemplateApi.getUnderKras()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAssignTemplateSliceState: AssignTemplateSliceState = {
  empDepartments: [],
  designationdeptIds: [],
  designationWiseKRA: [],
  isLoading: ApiLoadingState.idle,
}

const assignTemplateSlice = createSlice({
  name: 'assignTemplate',
  initialState: initialAssignTemplateSliceState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addMatcher(isAnyOf(getAllEmpDepartmentNames.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(
        isAnyOf(getAllEmpDepartmentNames.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.empDepartments = action.payload as getEmpDepartments[]
        },
      )
  },
})

const empDepartmentNames = (state: RootState): getEmpDepartments[] =>
  state.assignTemplate.empDepartments

const departmentID = (state: RootState): getdesignationdeptId[] =>
  state.assignTemplate.designationdeptIds

const isLoading = (state: RootState): LoadingState =>
  state.assignTemplate.isLoading

const appraisalCycleThunk = {
  getAllEmpDepartmentNames,
  getDesignationDeptId,
  getnewCycleId,
  getDesignationWiseKRAs,
  getAppraiselUnderKra,
}

const assignTemplateSelectors = {
  isLoading,
  empDepartmentNames,
  departmentID,
}

export const assignTemplateService = {
  ...appraisalCycleThunk,
  actions: assignTemplateSlice.actions,
  selectors: assignTemplateSelectors,
}

export default assignTemplateSlice.reducer
