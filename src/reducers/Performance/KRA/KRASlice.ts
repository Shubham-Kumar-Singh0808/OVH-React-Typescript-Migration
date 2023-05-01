import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import KRAApi from '../../../middleware/api/Performance/KRA/KRAApi'
import { RootState } from '../../../stateStore'
import {
  AddKPIData,
  DeleteKPIParams,
  Frequency,
  IncomingKPIDataItem,
  KRADataQueryBody,
  KRADesignationPercentageQuery,
  KRAInitialState,
  KRAPages,
  KRATableDataItem,
  NewKPiDuplicateCheckQuery,
  NewKRABody,
  NewKRADuplicateCheckQuery,
  UpdateKRABody,
} from '../../../types/Performance/KRA/KRATypes'

const kraQueryInitial: KRADataQueryBody = {
  departmentId: -1,
  designationId: '',
  startIndex: 0,
  endIndex: 20,
  multipleSearch: '',
}

const initialEditKra: KRATableDataItem = {
  id: -1,
  name: '',
  description: null,
  kpiLookps: null,
  count: -1,
  checkType: null,
  designationName: '',
  designationId: -1,
  departmentName: '',
  departmentId: 1,
  designationKraPercentage: -1,
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
  kraDesigPercentage: -1,
  isNewKRADuplicate: false,
  editThisKra: initialEditKra,
  currentOnScreenPage: KRAPages.kraList,
  frequency: [],
  editThisKpi: {} as IncomingKPIDataItem,
  isNewKpiDuplicate: false,
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

const addKPI = createAsyncThunk(
  'KRA/addKPI',
  async (outBody: AddKPIData, thunkApi) => {
    try {
      return await KRAApi.addKPI(outBody)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const updateKPI = createAsyncThunk(
  'KRA/updateKPI',
  async (outBody: IncomingKPIDataItem, thunkApi) => {
    try {
      return await KRAApi.updateKPI(outBody)
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
  async (query: DeleteKPIParams, thunkApi) => {
    try {
      return await KRAApi.deleteKPI(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getKRADesigPercentageThunk = createAsyncThunk(
  'KRA/getKRADesigPercentageThunk',
  async (query: KRADesignationPercentageQuery, thunkApi) => {
    try {
      return await KRAApi.getKRADesignationPercentage(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const checkNewKRADuplicacyThunk = createAsyncThunk(
  'KRA/checkNewKRADuplicacyThunk',
  async (query: NewKRADuplicateCheckQuery, thunkApi) => {
    try {
      return await KRAApi.checkIfNewKraDuplicate(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const checkIfNewKpiDuplicate = createAsyncThunk(
  'KRA/checkIfNewKpiDuplicate',
  async (query: NewKPiDuplicateCheckQuery, thunkApi) => {
    try {
      return await KRAApi.checkIfNewKpiDuplicate(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addNewKRAThunk = createAsyncThunk(
  'KRA/addNewKRAThunk',
  async (body: NewKRABody, thunkApi) => {
    try {
      return await KRAApi.addNewKRA(body)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const editThisKraThunk = createAsyncThunk(
  'KRA/editThisKraThunk',
  async (kraId: number, thunkApi) => {
    try {
      return await KRAApi.editThisKra(kraId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const updateKRAThunk = createAsyncThunk(
  'KRA/updateKRAThunk',
  async (body: UpdateKRABody, thunkApi) => {
    try {
      return await KRAApi.updateKRA(body)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getFrequency = createAsyncThunk(
  'KRA/getFrequency',
  async (_, thunkApi) => {
    try {
      return await KRAApi.getFrequency()
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
    clearDesignationList: (state) => {
      state.designations = []
    },
    setCurrentOnScreenPage: (state, action) => {
      state.currentOnScreenPage = action.payload
    },
    setEditKpi: (state, action) => {
      state.editThisKpi = action.payload
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
    builder.addCase(getKRADesigPercentageThunk.fulfilled, (state, action) => {
      state.kraDesigPercentage = action.payload
    })
    builder.addCase(checkNewKRADuplicacyThunk.fulfilled, (state, action) => {
      state.isNewKRADuplicate = action.payload
    })
    builder.addCase(checkIfNewKpiDuplicate.fulfilled, (state, action) => {
      state.isNewKpiDuplicate = action.payload
    })
    builder.addCase(editThisKraThunk.fulfilled, (state, action) => {
      state.editThisKra = action.payload
    })
    builder.addCase(getFrequency.fulfilled, (state, action) => {
      state.frequency = action.payload
    })
    builder.addMatcher(
      isAnyOf(
        getEmpDepartmentThunk.fulfilled,
        getDesignationThunk.fulfilled,
        searchKRADataThunk.fulfilled,
        kpisForIndividualKraThunk.fulfilled,
        deleteKRAThunk.fulfilled,
        deleteKPIThunk.fulfilled,
        addNewKRAThunk.fulfilled,
        getKRADesigPercentageThunk.fulfilled,
        checkNewKRADuplicacyThunk.fulfilled,
        editThisKraThunk.fulfilled,
        updateKRAThunk.fulfilled,
        addKPI.fulfilled,
        updateKPI.fulfilled,
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
        addNewKRAThunk.pending,
        getKRADesigPercentageThunk.pending,
        checkNewKRADuplicacyThunk.pending,
        checkIfNewKpiDuplicate.pending,
        editThisKraThunk.pending,
        updateKRAThunk.pending,
        getFrequency.pending,
        addKPI.pending,
        updateKPI.pending,
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
        addNewKRAThunk.rejected,
        getKRADesigPercentageThunk.rejected,
        checkNewKRADuplicacyThunk.rejected,
        checkIfNewKpiDuplicate.rejected,
        editThisKraThunk.rejected,
        updateKRAThunk.rejected,
        getFrequency.rejected,
        addKPI.rejected,
        updateKPI.rejected,
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
  getKRADesigPercentageThunk,
  checkNewKRADuplicacyThunk,
  checkIfNewKpiDuplicate,
  addNewKRAThunk,
  editThisKraThunk,
  updateKRAThunk,
  getFrequency,
  addKPI,
  updateKPI,
}

const frequency = (state: RootState): Frequency[] => state.KRA.frequency
const editKpi = (state: RootState): IncomingKPIDataItem => state.KRA.editThisKpi

const kRAsSelectors = {
  frequency,
  editKpi,
}

export const KRAService = {
  ...KRAThunk,
  actions: KRASlice.actions,
  selectors: kRAsSelectors,
}

const KRAReducer = KRASlice.reducer
export default KRAReducer
