import type { PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { initialStatusReportFilters } from './InterviewStatusReportSliceConstants'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  CandidateCheckBoxFilterEnum,
  CandidateDateFilterEnum,
  ExportInterviewStatusReportParams,
  IncomingInterviewStatusReport,
  InterviewStatusReportSliceState,
  OutgoingStatusReportFilterOptions,
  ExportInterviewerDetailsParams,
} from '../../../types/Recruitment/InterviewStatusReport/InterviewStatusReportTypes'
import interviewStatusReportApi from '../../../middleware/api/Recruitment/InterviewStatusReport/InterviewStatusReportApi'
import { ValidationError } from '../../../types/commonTypes'

const initialInterviewStatusReportSliceState: InterviewStatusReportSliceState =
  {
    isLoading: ApiLoadingState.idle,
    error: null,
    allEmpCountries: [],
    allTechnology: [],
    filterOptions: initialStatusReportFilters,
    interviewStatusReportList: { size: 0, list: [] },
  }

const getAllTechnologyThunk = createAsyncThunk(
  'interviewStatusReport/getAllTechnologyThunk',
  async (_, thunkApi) => {
    try {
      return await interviewStatusReportApi.getAllTechnology()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getAllEmpCountriesThunk = createAsyncThunk(
  'interviewStatusReport/getAllEmpCountriesThunk',
  async (_, thunkApi) => {
    try {
      return await interviewStatusReportApi.getAllEmpCountries()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getInterviewStatusReportThunk = createAsyncThunk(
  'interviewStatusReport/getInterviewStatusReportThunk',
  async (finalData: OutgoingStatusReportFilterOptions, thunkApi) => {
    try {
      return await interviewStatusReportApi.getInterviewStatusReport(finalData)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const exportInterviewStatusReportThunk = createAsyncThunk(
  'interviewStatusReport/exportInterviewStatusReportThunk',
  async (finalParams: ExportInterviewStatusReportParams, thunkApi) => {
    try {
      return await interviewStatusReportApi.exportInterviewStatusReport(
        finalParams,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const exportInterviewerDetailsThunk = createAsyncThunk(
  'interviewStatusReport/exportInterviewerDetailsThunk',
  async (finalParams: ExportInterviewerDetailsParams, thunkApi) => {
    try {
      return await interviewStatusReportApi.exportInterviewerDetails(
        finalParams,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const interviewStatusReportSlice = createSlice({
  name: 'interviewStatusReport',
  initialState: initialInterviewStatusReportSliceState,
  reducers: {
    setSelectionStatusInFilter: (state, action: PayloadAction<string>) => {
      state.filterOptions = {
        ...state.filterOptions,
        selectionStatus: action.payload.toString(),
      }
    },
    setCandidateStatusInFilter: (state, action: PayloadAction<string>) => {
      state.filterOptions = {
        ...state.filterOptions,
        candidateStatus: action.payload,
      }
    },
    setSelectionTechnologyInFilter: (state, action: PayloadAction<string>) => {
      state.filterOptions = {
        ...state.filterOptions,
        selectionTechnology: action.payload,
      }
    },
    setSelectionCountryInFilter: (state, action: PayloadAction<string>) => {
      state.filterOptions = {
        ...state.filterOptions,
        // if deselected any country and set to default then empty string, else id
        selectionCountry: action.payload === '' ? '' : +action.payload,
      }
    },
    setFilterOptions: (
      state,
      action: PayloadAction<OutgoingStatusReportFilterOptions>,
    ) => {
      state.filterOptions = action.payload
    },
    setSearchByCandidateNameInFilter: (
      state,
      action: PayloadAction<string>,
    ) => {
      state.filterOptions = {
        ...state.filterOptions,
        searchByCandidateName: action.payload,
      }
    },
    setDatesInFilter: (
      state,
      action: PayloadAction<{
        dateType: CandidateDateFilterEnum
        value: string | null
      }>,
    ) => {
      const { dateType, value } = action.payload
      if (dateType === CandidateDateFilterEnum.fromDate) {
        state.filterOptions = {
          ...state.filterOptions,
          fromDate: value,
        }
      } else {
        state.filterOptions = {
          ...state.filterOptions,
          toDate: value,
        }
      }
    },
    setSearchCheckBox: (
      state,
      action: PayloadAction<{
        checkType: CandidateCheckBoxFilterEnum
        value: boolean
      }>,
    ) => {
      const { checkType, value } = action.payload
      // finding the correct check type and then updating the value
      if (checkType === CandidateCheckBoxFilterEnum.searchByExperience) {
        state.filterOptions = {
          ...state.filterOptions,
          searchByExperience: value,
        }
      } else if (checkType === CandidateCheckBoxFilterEnum.multipleSearch) {
        state.filterOptions = {
          ...state.filterOptions,
          searchByMultipleFlag: value,
        }
      } else if (
        checkType === CandidateCheckBoxFilterEnum.searchByRecruiterName
      ) {
        state.filterOptions = {
          ...state.filterOptions,
          searchByRecruiterName: value,
        }
      } else if (checkType === CandidateCheckBoxFilterEnum.searchBySourceName) {
        state.filterOptions = {
          ...state.filterOptions,
          searchBySourceName: value,
        }
      }
    },
    setStartEndIndexInFilter: (
      state,
      action: PayloadAction<{ startIndex: number; endIndex: number }>,
    ) => {
      const { startIndex, endIndex } = action.payload
      state.filterOptions = {
        ...state.filterOptions,
        startIndex,
        endIndex,
      }
    },
    setInterviewStatusReportList: (
      state,
      action: PayloadAction<IncomingInterviewStatusReport>,
    ) => {
      state.interviewStatusReportList = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTechnologyThunk.fulfilled, (state, action) => {
      state.allTechnology = action.payload
    })
    builder.addCase(getAllEmpCountriesThunk.fulfilled, (state, action) => {
      state.allEmpCountries = action.payload
    })
    builder.addCase(
      getInterviewStatusReportThunk.fulfilled,
      (state, action) => {
        state.interviewStatusReportList = action.payload
      },
    )
    builder.addMatcher(
      isAnyOf(
        getAllTechnologyThunk.pending,
        getAllEmpCountriesThunk.pending,
        getInterviewStatusReportThunk.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(
        getAllTechnologyThunk.fulfilled,
        getAllEmpCountriesThunk.fulfilled,
        getInterviewStatusReportThunk.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addMatcher(
      isAnyOf(
        getAllTechnologyThunk.rejected,
        getAllEmpCountriesThunk.rejected,
        getInterviewStatusReportThunk.rejected,
      ),
      (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      },
    )
  },
})

const interviewStatusReportThunks = {
  getAllEmpCountriesThunk,
  getAllTechnologyThunk,
  getInterviewStatusReportThunk,
  exportInterviewStatusReportThunk,
  exportInterviewerDetailsThunk,
}

export const interviewStatusReportServices = {
  ...interviewStatusReportThunks,
  actions: interviewStatusReportSlice.actions,
}

const interviewStatusReportReducer = interviewStatusReportSlice.reducer
export default interviewStatusReportReducer
