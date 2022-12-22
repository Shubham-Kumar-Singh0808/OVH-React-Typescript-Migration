import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import NomineeListApi from '../../../middleware/api/Achievements/NomineeList/NomineeListApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  IncomingNomineeDetails,
  NomineeListInitialState,
} from '../../../types/Achievements/NomineeList/NomineeListTypes'
import { ValidationError } from '../../../types/commonTypes'

const initialState: NomineeListInitialState = {
  isLoading: ApiLoadingState.idle,
  cyclesList: { size: 0, list: [] },
  nominationsList: [],
  nomineeDetails: {
    id: -1,
    employeeId: -1,
    employeeName: '',
    achievementTypeId: null,
    achievementType: '',
    nominationQuestionDataDtosId: [],
    cycleID: null,
    cycleName: '',
    fromMonth: '',
    toMonth: '',
    rating: null,
    finalComments: '',
    nominationStatus: 'N/A',
    activateFlag: null,
    createdBy: null,
    createdDate: null,
  },
  error: null,
}

const getAllCyclesThunk = createAsyncThunk(
  'nomineeList/getAllCyclesThunk',
  async (_, thunkApi) => {
    try {
      return await NomineeListApi.getAllCycles()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getNominationsThunk = createAsyncThunk(
  'nomineeList/getNominationsThunk',
  async (cycleId: number, thunkApi) => {
    try {
      return await NomineeListApi.getNominations(cycleId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getNominationDetailsThunk = createAsyncThunk(
  'nomineeList/getNominationDetailsThunk',
  async (nominationId: number, thunkApi) => {
    try {
      return await NomineeListApi.getNominationDetails(nominationId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const reviewNomineeThunk = createAsyncThunk(
  'nomineeList/reviewNomineeThunk',
  async (outBody: IncomingNomineeDetails, thunkApi) => {
    try {
      return await NomineeListApi.reviewNominee(outBody)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const nomineeListSlice = createSlice({
  name: 'nomineeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCyclesThunk.fulfilled, (state, action) => {
      state.cyclesList = action.payload
    })
    builder.addCase(getNominationsThunk.fulfilled, (state, action) => {
      state.nominationsList = action.payload
    })
    builder.addCase(getNominationDetailsThunk.fulfilled, (state, action) => {
      state.nomineeDetails = action.payload
    })
    builder.addMatcher(
      isAnyOf(
        getAllCyclesThunk.pending,
        getNominationsThunk.pending,
        getNominationDetailsThunk.pending,
        reviewNomineeThunk.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(
        getAllCyclesThunk.fulfilled,
        getNominationsThunk.fulfilled,
        getNominationDetailsThunk.fulfilled,
        reviewNomineeThunk.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addMatcher(
      isAnyOf(
        getAllCyclesThunk.rejected,
        getNominationsThunk.rejected,
        getNominationDetailsThunk.rejected,
        reviewNomineeThunk.rejected,
      ),
      (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      },
    )
  },
})

const nomineeListThunks = {
  getAllCyclesThunk,
  getNominationsThunk,
  getNominationDetailsThunk,
  reviewNomineeThunk,
}

export const nomineeListService = {
  ...nomineeListThunks,
  actions: nomineeListSlice.actions,
}

const nomineeListReducer = nomineeListSlice.reducer
export default nomineeListReducer
