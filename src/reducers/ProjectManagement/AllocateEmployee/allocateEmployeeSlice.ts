import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'
import allocateEmployeeApi from '../../../middleware/api/ProjectManagement/AllocateEmployee/allocateEmployeeApi'
import {
  AllocateEmployeeToProject,
  EmployeeAllocateSliceState,
  GetAllEmployeesNames,
  GetAllProjectNames,
} from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'

const getAllEmployeesProfileData = createAsyncThunk(
  'allocateEmployee/getAllEmployeesProfileData',
  async (_, thunkApi) => {
    try {
      return await allocateEmployeeApi.getAllEmployeesProfileData()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllProjectSearchData = createAsyncThunk(
  'allocateEmployee/getAllProjectSearchData',
  async (searchString: string, thunkApi) => {
    try {
      return await allocateEmployeeApi.getAllProjectSearchData(searchString)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const AddNewAllocate = createAsyncThunk(
  'allocateEmployee/AddNewAllocate',
  async (allocateEmployeeData: AllocateEmployeeToProject, thunkApi) => {
    try {
      return await allocateEmployeeApi.allocateNewEmployee(allocateEmployeeData)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAllocateEmployeeState: EmployeeAllocateSliceState = {
  getAllEmployees: [],
  getAllProjects: [],
  allocateEmployee: {} as AllocateEmployeeToProject,
  isLoading: ApiLoadingState.idle,
  error: null,
}
const allocateEmployeeSlice = createSlice({
  name: 'allocateEmployee',
  initialState: initialAllocateEmployeeState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllEmployeesProfileData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllEmployees = action.payload
      })
      .addCase(getAllProjectSearchData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllProjects = action.payload
      })
      .addMatcher(
        isAnyOf(
          getAllEmployeesProfileData.pending,
          getAllProjectSearchData.pending,
          getAllProjectSearchData.rejected,
          getAllEmployeesProfileData.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const employeeNames = (state: RootState): GetAllEmployeesNames[] =>
  state.allocateEmployee.getAllEmployees

const projectNames = (state: RootState): GetAllProjectNames[] =>
  state.allocateEmployee.getAllProjects

const allocateEmployeeThunk = {
  getAllEmployeesProfileData,
  getAllProjectSearchData,
  AddNewAllocate,
}

const allocateEmployeeSelectors = {
  employeeNames,
  projectNames,
}

export const allocateEmployeeService = {
  ...allocateEmployeeThunk,
  actions: allocateEmployeeSlice.actions,
  selectors: allocateEmployeeSelectors,
}

export default allocateEmployeeSlice.reducer
