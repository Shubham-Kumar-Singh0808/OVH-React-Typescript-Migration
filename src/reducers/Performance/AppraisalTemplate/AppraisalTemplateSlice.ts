import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import AppraisalTemplateApi from '../../../middleware/api/Performance/AppraisalTemplate/AppraisalTemplateApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AppraisalTemplateSliceState,
  DesignationsUnderCycleProps,
  DesignationWiseKRAsProps,
  GetCycleList,
  GetDesignationsUnderCycle,
  GetDesignationWiseKRAs,
  KpiForIndividualKra,
  KraLookups,
} from '../../../types/Performance/AppraisalTemplate/appraisalTemplateTypes'

const activeCycle = createAsyncThunk(
  'appraisalTemplate/activeCycle',
  async (_, thunkApi) => {
    try {
      return await AppraisalTemplateApi.activeCycle()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const cycle = createAsyncThunk(
  'appraisalTemplate/cycle',
  async (_, thunkApi) => {
    try {
      return await AppraisalTemplateApi.cycle()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getDesignationsUnderCycle = createAsyncThunk(
  'appraisalTemplate/getDesignationsUnderCycle',
  async (props: DesignationsUnderCycleProps, thunkApi) => {
    try {
      return await AppraisalTemplateApi.getDesignationsUnderCycle(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getDesignationWiseKRAs = createAsyncThunk(
  'appraisalTemplate/getDesignationWiseKRAs',
  async (props: DesignationWiseKRAsProps, thunkApi) => {
    try {
      return await AppraisalTemplateApi.getDesignationWiseKRAs(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const searchKRAList = createAsyncThunk(
  'assignTemplate/searchKRAList',
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
      return await AppraisalTemplateApi.searchKRAList({
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

const kpisForIndividualKra = createAsyncThunk(
  'assignTemplate/kpisForIndividualKra',
  async (
    {
      kraId,
    }: {
      kraId: number
    },
    thunkApi,
  ) => {
    try {
      return await AppraisalTemplateApi.kpisForIndividualKra({
        kraId,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const designingmaping = createAsyncThunk(
  'assignTemplate/designingmaping',
  async (data: GetDesignationsUnderCycle, thunkApi) => {
    try {
      return await AppraisalTemplateApi.designingmaping(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialAppraisalTemplateState: AppraisalTemplateSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  listSize: 0,
  cycleList: [],
  designationsUnderCycle: [],
  currentPage: 1,
  pageSize: 20,
  designationsUnderCycleProps: { size: 0, list: [] },
  designationWiseKRAs: [],
  kpiForIndividualKra: [],
  searchKRAData: { size: 0, list: [] },
  activeCycleData: {} as GetDesignationsUnderCycle,
  kraLookups: [],
}

const appraisalTemplateSlice = createSlice({
  name: 'appraisalTemplate',
  initialState: initialAppraisalTemplateState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(activeCycle.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(cycle.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.cycleList = action.payload
      })
      .addCase(getDesignationWiseKRAs.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.kraLookups = action.payload
      })
      .addCase(kpisForIndividualKra.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.kpiForIndividualKra = action.payload
      })
      .addCase(getDesignationsUnderCycle.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.designationsUnderCycleProps = action.payload
        state.listSize = action.payload.size
      })
      .addMatcher(
        isAnyOf(
          activeCycle.pending,
          cycle.pending,
          getDesignationsUnderCycle.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          activeCycle.rejected,
          cycle.rejected,
          getDesignationsUnderCycle.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.appraisalTemplate.isLoading

const listSize = (state: RootState): number => state.appraisalTemplate.listSize

const cycleList = (state: RootState): GetCycleList[] =>
  state.appraisalTemplate.cycleList

const designationWiseKRAs = (state: RootState): GetDesignationWiseKRAs[] =>
  state.appraisalTemplate.designationWiseKRAs

const kpiForIndividualKra = (state: RootState): KpiForIndividualKra[] =>
  state.appraisalTemplate.kpiForIndividualKra

const activeCycleData = (state: RootState): GetDesignationsUnderCycle =>
  state.appraisalTemplate.activeCycleData

const kraLookups = (state: RootState): KraLookups[] =>
  state.appraisalTemplate.kraLookups

const pageFromState = (state: RootState): number =>
  state.appraisalTemplate.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.appraisalTemplate.pageSize

const designationsUnderCycle = (
  state: RootState,
): GetDesignationsUnderCycle[] =>
  state.appraisalTemplate.designationsUnderCycleProps?.list

export const appraisalTemplateThunk = {
  activeCycle,
  cycle,
  getDesignationsUnderCycle,
  getDesignationWiseKRAs,
  searchKRAList,
  kpisForIndividualKra,
  designingmaping,
}

export const appraisalTemplateSelectors = {
  isLoading,
  listSize,
  cycleList,
  designationsUnderCycle,
  pageFromState,
  pageSizeFromState,
  designationWiseKRAs,
  kpiForIndividualKra,
  activeCycleData,
  kraLookups,
}

export const appraisalTemplateService = {
  ...appraisalTemplateThunk,
  actions: appraisalTemplateSlice.actions,
  selectors: appraisalTemplateSelectors,
}

export default appraisalTemplateSlice.reducer
