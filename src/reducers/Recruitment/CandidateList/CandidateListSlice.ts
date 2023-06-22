import type { PayloadAction } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'
import candidateListApi from '../../../middleware/api/Recruitment/CandidateList/CandidateListApi'
import {
  CandidateLists,
  CandidateListSliceState,
  CandidateListTableProps,
  GetAllTechnology,
  country,
  viewHandlerProps,
  AddNewCandidateDTO,
  UploadCandidateResumeDTO,
  CurrentAddCandidatePage,
} from '../../../types/Recruitment/CandidateList/CandidateListTypes'

export const initialCandidateListState: CandidateListSliceState = {
  isLoading: ApiLoadingState.idle,
  listSize: 0,
  candidateDetails: {} as CandidateLists,
  allCandidateDetails: [],
  allCountryDetails: {} as country,
  empCountries: [],
  allEmployeeDetailsList: [],
  getAllTechnology: [],
  allJobVacancies: { size: 0, list: [] },
  allCompaniesData: [],
  currentAddCandidatePage: CurrentAddCandidatePage.addCandidate,
}

const searchScheduledCandidate = createAsyncThunk(
  'candidateList/searchScheduledCandidate',
  async (props: CandidateListTableProps, thunkApi) => {
    try {
      return await candidateListApi.searchScheduledCandidate(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const getEmpCountries = createAsyncThunk(
  'candidateList/getEmpCountries',
  async (_, thunkApi) => {
    try {
      return await candidateListApi.getEmpCountries()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const getTechnology = createAsyncThunk(
  'candidateList/getTechnology',
  async (_, thunkApi) => {
    try {
      return await candidateListApi.getTechnology()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const getCountryWiseCandidatesList = createAsyncThunk(
  'candidateList/getCountryWiseCandidatesList',
  async (data: viewHandlerProps, thunkApi) => {
    try {
      return await candidateListApi.getCountryWiseCandidatesList(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteCandidate = createAsyncThunk(
  'candidateList/deleteCandidate',
  async (candidateId: number, thunkApi) => {
    try {
      return await candidateListApi.deleteCandidate(candidateId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAllJobVacanciesThunk = createAsyncThunk(
  'candidateList/getAllJobVacanciesThunk',
  async (_, thunkApi) => {
    try {
      return await candidateListApi.getAllJobVacancies({
        startIndex: null,
        endIndex: null,
        searchJobTitle: null,
        status: null,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const checkCandidateEmailThunk = createAsyncThunk(
  'candidateList/checkCandidateEmailThunk',
  async (email: string, thunkApi) => {
    try {
      return await candidateListApi.checkCandidateEmail(email)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getAllEmployeeDetailsThunk = createAsyncThunk(
  'candidateList/getAllEmployeeDetailsThunk',
  async (_, thunkApi) => {
    try {
      return await candidateListApi.getAllEmployeeDetails()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const checkCandidateMobileNumberThunk = createAsyncThunk(
  'candidateList/checkCandidateMobileNumberThunk',
  async (candidateMobileNumber: string, thunkApi) => {
    try {
      return await candidateListApi.checkCandidateMobileNumber(
        candidateMobileNumber,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getAllCompaniesDataThunk = createAsyncThunk(
  'candidateList/getAllCompaniesDataThunk',
  async (_, thunkApi) => {
    try {
      return await candidateListApi.getAllCompaniesData()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addNewCandidateThunk = createAsyncThunk(
  'candidateList/addNewCandidate',
  async (finalData: AddNewCandidateDTO, thunkApi) => {
    try {
      return await candidateListApi.addNewCandidate(finalData)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const uploadCandidateResumeThunk = createAsyncThunk(
  'candidateList/uploadCandidateResumeThunk',
  async (data: UploadCandidateResumeDTO, thunkApi) => {
    try {
      return await candidateListApi.uploadCandidateResume(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addTechnologyThunk = createAsyncThunk(
  'candidateList/addTechnologyThunk',
  async (technology: string, thunkApi) => {
    try {
      return await candidateListApi.addTechnology(technology)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const deleteTechnologyThunk = createAsyncThunk(
  'candidateList/deleteTechnologyThunk',
  async (technologyId: number, thunkApi) => {
    try {
      return await candidateListApi.deleteTechnology(technologyId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const candidateListSlice = createSlice({
  name: 'candidateList',
  initialState: initialCandidateListState,
  reducers: {
    setCurrentAddCandidatePage: (
      state,
      action: PayloadAction<CurrentAddCandidatePage>,
    ) => {
      state.currentAddCandidatePage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchScheduledCandidate.fulfilled, (state, action) => {
        state.allCandidateDetails = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getAllJobVacanciesThunk.fulfilled, (state, action) => {
        state.allJobVacancies = action.payload
      })
      .addCase(getCountryWiseCandidatesList.fulfilled, (state, action) => {
        state.allCandidateDetails = action.payload.list
      })
      .addCase(getEmpCountries.fulfilled, (state, action) => {
        state.empCountries = action.payload
      })
      .addCase(getTechnology.fulfilled, (state, action) => {
        state.getAllTechnology = action.payload
      })
      .addCase(getAllEmployeeDetailsThunk.fulfilled, (state, action) => {
        state.allEmployeeDetailsList = action.payload
      })
      .addCase(getAllCompaniesDataThunk.fulfilled, (state, action) => {
        state.allCompaniesData = action.payload
      })
      .addMatcher(
        isAnyOf(
          searchScheduledCandidate.fulfilled,
          getAllJobVacanciesThunk.fulfilled,
          getCountryWiseCandidatesList.fulfilled,
          getEmpCountries.fulfilled,
          getTechnology.fulfilled,
          getAllEmployeeDetailsThunk.fulfilled,
          checkCandidateMobileNumberThunk.fulfilled,
          getAllCompaniesDataThunk.fulfilled,
          addNewCandidateThunk.fulfilled,
          addTechnologyThunk.fulfilled,
          deleteTechnologyThunk.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          searchScheduledCandidate.rejected,
          getAllJobVacanciesThunk.rejected,
          getCountryWiseCandidatesList.rejected,
          getEmpCountries.rejected,
          getTechnology.rejected,
          getAllEmployeeDetailsThunk.rejected,
          checkCandidateMobileNumberThunk.rejected,
          getAllCompaniesDataThunk.rejected,
          addNewCandidateThunk.rejected,
          addTechnologyThunk.rejected,
          deleteTechnologyThunk.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
      .addMatcher(
        isAnyOf(
          searchScheduledCandidate.pending,
          getAllJobVacanciesThunk.pending,
          getCountryWiseCandidatesList.pending,
          getEmpCountries.pending,
          getTechnology.pending,
          getAllEmployeeDetailsThunk.pending,
          checkCandidateMobileNumberThunk.pending,
          getAllCompaniesDataThunk.pending,
          addNewCandidateThunk.pending,
          addTechnologyThunk.pending,
          deleteTechnologyThunk.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})
const isLoading = (state: RootState): LoadingState =>
  state?.candidateList.isLoading

const getAllCandidateDetails = (state: RootState): CandidateLists[] =>
  state.candidateList.allCandidateDetails

const getAllEmpCountries = (state: RootState): country[] =>
  state.candidateList.empCountries

const listSize = (state: RootState): number => state.candidateList.listSize

const getAllTechnology = (state: RootState): GetAllTechnology[] =>
  state.candidateList.getAllTechnology

export const candidateListThunk = {
  searchScheduledCandidate,
  getEmpCountries,
  getTechnology,
  getCountryWiseCandidatesList,
  deleteCandidate,
  getAllJobVacanciesThunk,
  getAllEmployeeDetailsThunk,
  checkCandidateEmailThunk,
  checkCandidateMobileNumberThunk,
  getAllCompaniesDataThunk,
  addNewCandidateThunk,
  uploadCandidateResumeThunk,
  addTechnologyThunk,
  deleteTechnologyThunk,
}

export const candidateListSelectors = {
  isLoading,
  listSize,
  getAllCandidateDetails,
  getAllTechnology,
  getAllEmpCountries,
}

export const candidateListService = {
  ...candidateListThunk,
  actions: candidateListSlice.actions,
  selectors: candidateListSelectors,
}

export default candidateListSlice.reducer
