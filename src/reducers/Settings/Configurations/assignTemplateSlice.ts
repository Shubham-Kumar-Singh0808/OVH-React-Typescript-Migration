import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import assignTemplateApi from '../../../middleware/api/Settings/Configurations/assignTemplateApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AssignTemplateSliceState,
  getDepartmentNames,
  getDesignationWiseKRA,
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

const getDesignationId = createAsyncThunk(
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

const getCycleId = createAsyncThunk(
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

const getAppraisalUnderKra = createAsyncThunk(
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

const copyCycleData = createAsyncThunk(
  'assignTemplate/copyCycleData',
  async (
    {
      newCycleId,
      oldCycleId,
    }: {
      newCycleId: number
      oldCycleId: number
    },
    thunkApi,
  ) => {
    try {
      return await assignTemplateApi.copyCycleData({
        newCycleId,
        oldCycleId,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAssignTemplateSliceState: AssignTemplateSliceState = {
  empDepartments: [],
  designationDeptIds: [],
  designationWiseKRA: [],
  isLoading: ApiLoadingState.idle,
}

const assignTemplateSlice = createSlice({
  name: 'assignTemplate',
  initialState: initialAssignTemplateSliceState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addMatcher(
        isAnyOf(
          getAllEmpDepartmentNames.pending,
          getDesignationId.pending,
          getDesignationWiseKRAs.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getAllEmpDepartmentNames.fulfilled,
          getDesignationId.fulfilled,
          getDesignationWiseKRAs.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.empDepartments = action.payload as getEmpDepartments[]
          state.designationDeptIds =
            action.payload as unknown as getDepartmentNames[]
          state.designationWiseKRA =
            action.payload as unknown as getDesignationWiseKRA[]
        },
      )
  },
})

const empDepartmentNames = (state: RootState): getEmpDepartments[] =>
  state.assignTemplate.empDepartments

const departmentID = (state: RootState): getDepartmentNames[] =>
  state.assignTemplate.designationDeptIds

const isLoading = (state: RootState): LoadingState =>
  state.assignTemplate.isLoading

const designationID = (state: RootState): getDesignationWiseKRA[] =>
  state.assignTemplate.designationWiseKRA

const appraisalCycleThunk = {
  getAllEmpDepartmentNames,
  getDesignationId,
  getCycleId,
  getDesignationWiseKRAs,
  getAppraisalUnderKra,
  copyCycleData,
}

const assignTemplateSelectors = {
  isLoading,
  empDepartmentNames,
  departmentID,
  designationID,
}

export const assignTemplateService = {
  ...appraisalCycleThunk,
  actions: assignTemplateSlice.actions,
  selectors: assignTemplateSelectors,
}

export default assignTemplateSlice.reducer
