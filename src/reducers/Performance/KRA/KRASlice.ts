import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import KRAApi from '../../../middleware/api/Performance/KRA/KRAApi'
import {
  deleteKPIParams,
  KRADataQueryBody,
  KRAInitialState,
} from '../../../types/Performance/KRA/KRATypes'

const kraQueryInitial: KRADataQueryBody = {
  departmentId: -1,
  designationId: '',
  startIndex: 0,
  endIndex: 20,
  multipleSearch: '',
}

const initialState: KRAInitialState = {
  isLoading: ApiLoadingState.idle,
  empDepartments: [],
  designations: [],
  kraData: { size: 0, list: [] },
  kpisForIndividualKRAList: [],
  currentPage: 1,
  pageSize: 20,
  krasQuery: kraQueryInitial,
}

const getEmpDepartmentThunk = createAsyncThunk(
  'KRA/getEmpDepartmentThunk',
  async (_, thunkApi) => {
    try {
      return await KRAApi.getEmpDepartments()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getDesignationThunk = createAsyncThunk(
  'KRA/getDesignationThunk',
  async (deptId: number, thunkApi) => {
    try {
      return await KRAApi.getDesignation(deptId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const searchKRADataThunk = createAsyncThunk(
  'KRA/searchKRADataThunk',
  async (outBody: KRADataQueryBody, thunkApi) => {
    try {
      return await KRAApi.searchKRAData(outBody)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const kpisForIndividualKraThunk = createAsyncThunk(
  'KRA/kpisForIndividualKraThunk',
  async (kraId: number, thunkApi) => {
    try {
      return await KRAApi.kpisForIndividualKra(kraId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const deleteKRAThunk = createAsyncThunk(
  'KRA/deleteKRAThunk',
  async (kraid: number, thunkApi) => {
    try {
      return await KRAApi.deleteKRA(kraid)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const deleteKPIThunk = createAsyncThunk(
  'KRA/deleteKPIThunk',
  async (query: deleteKPIParams, thunkApi) => {
    try {
      return await KRAApi.deleteKPI(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const KRASlice = createSlice({
  name: 'KRA',
  initialState,
  reducers: {
    clearKRAList: (state) => {
      state.kraData = { size: 0, list: [] }
    },
    setKRAQuery: (state, action) => {
      state.krasQuery = action.payload
    },
    clearKRAQuery: (state) => {
      state.krasQuery = kraQueryInitial
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getEmpDepartmentThunk.fulfilled, (state, action) => {
      state.empDepartments = action.payload
    })
    builder.addCase(getDesignationThunk.fulfilled, (state, action) => {
      state.designations = action.payload
    })
    builder.addCase(searchKRADataThunk.fulfilled, (state, action) => {
      state.kraData = action.payload
    })
    builder.addCase(kpisForIndividualKraThunk.fulfilled, (state, action) => {
      state.kpisForIndividualKRAList = action.payload
    })
    builder.addMatcher(
      isAnyOf(
        getEmpDepartmentThunk.fulfilled,
        getDesignationThunk.fulfilled,
        searchKRADataThunk.fulfilled,
        kpisForIndividualKraThunk.fulfilled,
        deleteKRAThunk.fulfilled,
        deleteKPIThunk.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addMatcher(
      isAnyOf(
        getEmpDepartmentThunk.pending,
        getDesignationThunk.pending,
        searchKRADataThunk.pending,
        kpisForIndividualKraThunk.pending,
        deleteKRAThunk.pending,
        deleteKPIThunk.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(
        getEmpDepartmentThunk.rejected,
        getDesignationThunk.rejected,
        searchKRADataThunk.rejected,
        kpisForIndividualKraThunk.rejected,
        deleteKRAThunk.rejected,
        deleteKPIThunk.rejected,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.failed
      },
    )
  },
})

const KRAThunk = {
  getEmpDepartmentThunk,
  getDesignationThunk,
  searchKRADataThunk,
  kpisForIndividualKraThunk,
  deleteKRAThunk,
  deleteKPIThunk,
}

export const KRAService = {
  ...KRAThunk,
  actions: KRASlice.actions,
}

const KRAReducer = KRASlice.reducer
export default KRAReducer
