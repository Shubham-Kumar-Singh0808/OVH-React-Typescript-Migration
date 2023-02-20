import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import assignTemplateApi from '../../../middleware/api/Settings/Configurations/assignTemplateApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { GetAppraisalCycle } from '../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import {
  AssignTemplateSliceState,
  Designations,
  DesignationWiseKRA,
  EmpDepartments,
  SearchKRAData,
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

const getDesignations = createAsyncThunk(
  'assignTemplate/getDesignations',
  async (deptId: number, thunkApi) => {
    try {
      return await assignTemplateApi.getDesignations(deptId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const alreadyExistingCycle = createAsyncThunk(
  'assignTemplate/alreadyExistingCycle',
  async (newCycleID: number, thunkApi) => {
    try {
      return await assignTemplateApi.isCycleAlreadyExist(newCycleID)
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

const searchKRAData = createAsyncThunk(
  'assignTemplate/searchKRAData',
  async (
    {
      departmentId,
      designationId,
      endIndex,
      multipleSearch,
      startIndex,
    }: {
      departmentId: number
      designationId: number
      endIndex: number
      multipleSearch: string
      startIndex: number
    },
    thunkApi,
  ) => {
    try {
      return await assignTemplateApi.searchKRAData({
        departmentId,
        designationId,
        endIndex,
        multipleSearch,
        startIndex,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const designingMap = createAsyncThunk(
  'assignTemplate/designingMaping',
  async (
    {
      appraisalCycleDto,
      designation,
      kraLookups,
    }: {
      appraisalCycleDto: GetAppraisalCycle
      designation: Designations
      kraLookups: DesignationWiseKRA[]
    },
    thunkApi,
  ) => {
    try {
      return await assignTemplateApi.designingMaping({
        appraisalCycleDto,
        designation,
        kraLookups,
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

const kpiForIndividualKra = createAsyncThunk(
  'assignTemplate/kpisForIndividualKra',
  async (kraId: number | string, thunkApi) => {
    try {
      return await assignTemplateApi.kpisForIndividualKra(kraId)
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
  kpisForIndividualKra: [],
  isLoading: ApiLoadingState.idle,
  kraList: { size: 0, list: [] },
  empDesignations: {} as Designations,
}

const assignTemplateSlice = createSlice({
  name: 'assignTemplate',
  initialState: initialAssignTemplateSliceState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllEmpDepartmentNames.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.empDepartments = action.payload
        state.empDesignations = action.payload as unknown as Designations
      })
      .addCase(getDesignations.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.designationDeptIds = action.payload
      })
      .addCase(getDesignationWiseKRAs.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.designationWiseKRA = action.payload
      })
      .addCase(searchKRAData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.kraList = action.payload
      })
      .addCase(kpiForIndividualKra.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.kpisForIndividualKra = action.payload
      })
      .addMatcher(
        isAnyOf(
          getAllEmpDepartmentNames.pending,
          getDesignations.pending,
          getDesignationWiseKRAs.pending,
          searchKRAData.pending,
          kpiForIndividualKra.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const empDepartments = (state: RootState): EmpDepartments[] =>
  state.assignTemplate.empDepartments

const empDesignations = (state: RootState): Designations[] =>
  state.assignTemplate.designationDeptIds

const empDesignationsList = (state: RootState): Designations =>
  state.assignTemplate.empDesignations

const isLoading = (state: RootState): LoadingState =>
  state.assignTemplate.isLoading

const designationsWiseKRA = (state: RootState): DesignationWiseKRA[] =>
  state.assignTemplate.designationWiseKRA

const kraList = (state: RootState): SearchKRAData =>
  state.assignTemplate.kraList

const appraisalCycleThunk = {
  getAllEmpDepartmentNames,
  getDesignations,
  alreadyExistingCycle,
  getDesignationWiseKRAs,
  getAppraisalUnderKra,
  copyCycleData,
  kpiForIndividualKra,
  searchKRAData,
  designingMap,
}

const assignTemplateSelectors = {
  isLoading,
  empDepartments,
  empDesignations,
  designationsWiseKRA,
  kraList,
  empDesignationsList,
}

export const assignTemplateService = {
  ...appraisalCycleThunk,
  actions: assignTemplateSlice.actions,
  selectors: assignTemplateSelectors,
}

export default assignTemplateSlice.reducer
