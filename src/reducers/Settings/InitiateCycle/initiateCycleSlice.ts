import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import initiateCycleApi from '../../../middleware/api/Settings/InitiateCycle/initiateCycleApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  GetActiveCycleData,
  GetAllCycles,
  GetAllQuestions,
  InitiateCycleSliceState,
  NominationCycleDto,
  TotalResponse,
} from '../../../types/Settings/InitiateCycle/initiateCycleTypes'

const getActiveCycleData = createAsyncThunk(
  'initiateCycle/getActiveCycleData',
  async (_, thunkApi) => {
    try {
      return await initiateCycleApi.getActiveCycleData()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllCycles = createAsyncThunk(
  'initiateCycle/getAllCycles',
  async (_, thunkApi) => {
    try {
      return await initiateCycleApi.getAllCycles()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllQuestions = createAsyncThunk(
  'initiateCycle/getAllQuestions',
  async (_, thunkApi) => {
    try {
      return await initiateCycleApi.getAllQuestions()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initiateCycle = createAsyncThunk(
  'initiateCycle/initiateCycles',
  async (data: TotalResponse, thunkApi) => {
    try {
      return await initiateCycleApi.initiateCycle(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteQuestion = createAsyncThunk(
  'initiateCycle/deleteQuestion',
  async (questionId: number, thunkApi) => {
    try {
      return await initiateCycleApi.deleteQuestion(questionId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addQuestion = createAsyncThunk(
  'initiateCycle/addQuestion',
  async (
    {
      question,
    }: {
      question: string
    },
    thunkApi,
  ) => {
    try {
      return await initiateCycleApi.addQuestion({
        question,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addCycle = createAsyncThunk(
  'initiateCycle/addCycle',
  async (
    {
      activateFlag,
      cycleName,
      endDate,
      fromMonth,
      startDate,
      toMonth,
    }: {
      activateFlag: boolean
      cycleName: string | undefined
      endDate: string | undefined
      fromMonth: string | undefined
      startDate: string | undefined
      toMonth: string | undefined
    },
    thunkApi,
  ) => {
    try {
      return await initiateCycleApi.addCycle({
        activateFlag,
        cycleName,
        endDate,
        fromMonth,
        startDate,
        toMonth,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const editCycle = createAsyncThunk(
  'initiateCycle/editCycle',
  async (cycleId: number, thunkApi) => {
    try {
      return await initiateCycleApi.editCycle(cycleId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateCycle = createAsyncThunk(
  'initiateCycle/updateCycle',
  async (updateCycleData: NominationCycleDto, thunkApi) => {
    try {
      return await initiateCycleApi.updateCycle(updateCycleData)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialCycleState: InitiateCycleSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  activeCycleData: {} as GetActiveCycleData,
  allCycles: { size: 0, list: [] },
  allQuestions: { size: 0, list: [] },
  listSize: 0,
  currentPage: 1,
  pageSize: 20,
  toggle: '',
  editCycle: {} as NominationCycleDto,
}

const initiateCycleSlice = createSlice({
  name: 'initiateCycle',
  initialState: initialCycleState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setToggle: (state, action) => {
      state.toggle = action.payload
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getActiveCycleData.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.activeCycleData = action.payload
      })
      .addCase(getAllCycles.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allCycles = action.payload
        state.listSize = action.payload.size
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.allQuestions = action.payload
        state.listSize = action.payload.size
      })
      .addCase(editCycle.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editCycle = action.payload
      })
      .addMatcher(isAnyOf(updateCycle.fulfilled), (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(
          getActiveCycleData.pending,
          getAllCycles.pending,
          getAllQuestions.pending,
          editCycle.pending,
          updateCycle.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getActiveCycleData.rejected,
          getAllCycles.rejected,
          getAllQuestions.rejected,
          editCycle.rejected,
          updateCycle.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.initiateCycle.isLoading

const activeCycleData = (state: RootState): GetActiveCycleData =>
  state.initiateCycle.activeCycleData

const allQuestions = (state: RootState): GetAllQuestions =>
  state.initiateCycle.allQuestions

const listSize = (state: RootState): number => state.initiateCycle.listSize

const allCycles = (state: RootState): GetAllCycles =>
  state.initiateCycle.allCycles

const editCycles = (state: RootState): NominationCycleDto =>
  state.initiateCycle.editCycle

const pageFromState = (state: RootState): number =>
  state.initiateCycle.currentPage

const pageSizeFromState = (state: RootState): number =>
  state.initiateCycle.pageSize

const toggle = (state: RootState): string => state.initiateCycle.toggle

const initiateCycleThunk = {
  getActiveCycleData,
  getAllCycles,
  getAllQuestions,
  initiateCycle,
  deleteQuestion,
  addQuestion,
  addCycle,
  editCycle,
  updateCycle,
}

const initiateCycleSelectors = {
  isLoading,
  activeCycleData,
  listSize,
  allQuestions,
  pageFromState,
  pageSizeFromState,
  allCycles,
  toggle,
  editCycles,
}

export const initiateCycleService = {
  ...initiateCycleThunk,
  actions: initiateCycleSlice.actions,
  selectors: initiateCycleSelectors,
}

export default initiateCycleSlice.reducer
