import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ProcessAreaApi from '../../../middleware/api/Settings/ProcessArea/ProcessAreaApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AddProcessAreaProps,
  GetProcessAreaDetails,
  ProcessAreas,
  ProcessAreaSliceState,
  ProcessSubHeadsDto,
  ProjectTailoringDocument,
} from '../../../types/Settings/ProcessAreas/processAreaTypes'

const getProjectTailoringDocument = createAsyncThunk(
  'processArea/getProjectTailoringDocument',
  async (flag: string, thunkApi) => {
    try {
      return await ProcessAreaApi.getProjectTailoringDocument(flag)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProcessAreas = createAsyncThunk(
  'processArea/getProcessAreas',
  async (categoryId: number, thunkApi) => {
    try {
      return await ProcessAreaApi.getProcessAreas(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const createProcessArea = createAsyncThunk(
  'processArea/createProcessArea',
  async (
    {
      categoryId,
      name,
    }: {
      categoryId: number
      name: string
    },
    thunkApi,
  ) => {
    try {
      return await ProcessAreaApi.createProcessArea({
        name,
        categoryId,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const checkDuplicateProcess = createAsyncThunk(
  'processArea/checkDuplicateProcess',
  async (processName: string, thunkApi) => {
    try {
      return await ProcessAreaApi.checkDuplicateProcess(processName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const saveProcessArea = createAsyncThunk(
  'processArea/saveProcessArea',
  async (props: AddProcessAreaProps, thunkApi) => {
    try {
      return await ProcessAreaApi.saveProcessArea(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const incrementOrDecrementOrder = createAsyncThunk(
  'processArea/incrementOrDecrementOrder',
  async (props: AddProcessAreaProps, thunkApi) => {
    try {
      return await ProcessAreaApi.incrementOrDecrementOrder(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getOrderCountOfActiveProcesses = createAsyncThunk(
  'processArea/getOrderCountOfActiveProcesses',
  async (categoryId: number, thunkApi) => {
    try {
      return await ProcessAreaApi.getOrderCountOfActiveProcesses(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProcessAreaDetails = createAsyncThunk(
  'processArea/getProcessAreaDetails',
  async (processSubHeadId: number, thunkApi) => {
    try {
      return await ProcessAreaApi.getProcessAreaDetails(processSubHeadId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const checkForDuplicateDoc = createAsyncThunk(
  'processArea/checkForDuplicateDoc',
  async (docName: string, thunkApi) => {
    try {
      return await ProcessAreaApi.checkForDuplicateDoc(docName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialProcessAreaState: ProcessAreaSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  getProjectTailoringDocument: [],
  ProcessSubHeads: [],
  ProcessAreas: [],
  currentPage: 1,
  pageSize: 20,
  processAreaDetails: {} as GetProcessAreaDetails,
}

const ProcessAreaSlice = createSlice({
  name: 'processArea',
  initialState: initialProcessAreaState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    clearCategoryId: (state) => {
      state.ProcessAreas = []
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getProjectTailoringDocument.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getProjectTailoringDocument = action.payload
        state.ProcessSubHeads =
          action.payload as unknown as ProcessSubHeadsDto[]
      })
      .addCase(getProcessAreas.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.ProcessAreas = action.payload
      })
      .addCase(getProcessAreaDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.processAreaDetails = action.payload
      })
      .addCase(checkForDuplicateDoc.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(
          getProjectTailoringDocument.pending,
          getProcessAreas.pending,
          getProcessAreaDetails.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getProjectTailoringDocument.rejected,
          getProcessAreas.rejected,
          getProcessAreaDetails.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const pageFromState = (state: RootState): number =>
  state.processArea.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.processArea.pageSize

const isLoading = (state: RootState): LoadingState =>
  state.processArea.isLoading

const ProjectTailoringList = (state: RootState): ProjectTailoringDocument[] =>
  state.processArea.getProjectTailoringDocument

const ProcessSubHeads = (state: RootState): ProcessSubHeadsDto[] =>
  state.processArea.ProcessSubHeads

const ProcessArea = (state: RootState): ProcessAreas[] =>
  state.processArea.ProcessAreas

const processAreaDetails = (state: RootState): GetProcessAreaDetails =>
  state.processArea.processAreaDetails

const processAreaThunk = {
  getProjectTailoringDocument,
  getProcessAreas,
  createProcessArea,
  checkDuplicateProcess,
  saveProcessArea,
  incrementOrDecrementOrder,
  getOrderCountOfActiveProcesses,
  getProcessAreaDetails,
  checkForDuplicateDoc,
}

const processAreaSelectors = {
  isLoading,
  ProjectTailoringList,
  ProcessSubHeads,
  ProcessArea,
  pageFromState,
  pageSizeFromState,
  processAreaDetails,
}

export const processAreaService = {
  ...processAreaThunk,
  actions: ProcessAreaSlice.actions,
  selectors: processAreaSelectors,
}

export default ProcessAreaSlice.reducer
