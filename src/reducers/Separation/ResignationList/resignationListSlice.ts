import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import resignationListApi from '../../../middleware/api/Separation/ResignationList/resignationListApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  CheckExitFeedBackForm,
  ClearanceDetails,
  ClearanceDetailsProps,
  GetEmpDetailsType,
  GetResignationListProps,
  ResignationList,
  ResignationListSliceState,
  SeparationChart,
  SeparationChartProps,
  SeparationTimeLine,
  submitClearanceCommentsProps,
  SubmitExitFeedBackForm,
  UpdateClearanceDetails,
} from '../../../types/Separation/ResignationList/resignationListTypes'

const getResignationList = createAsyncThunk(
  'resignationList/getResignationList',
  async (props: GetResignationListProps, thunkApi) => {
    try {
      return await resignationListApi.getResignationList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const resignationIntitiateCC = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('resignationList/resignationIntitiateCC', async (separationId, thunkApi) => {
  try {
    return await resignationListApi.resignationIntitiateCC(separationId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getSeparationTimeLine = createAsyncThunk<
  SeparationTimeLine | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'resignationList/getSeparationTimeLine',
  async (separationId: number, thunkApi) => {
    try {
      return await resignationListApi.getSeparationTimeLine(separationId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const submitClearanceCertificate = createAsyncThunk<
  number | undefined,
  submitClearanceCommentsProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'resignationList/submitClearanceCertificate',
  async (clearanceCertificate: submitClearanceCommentsProps, thunkApi) => {
    try {
      return await resignationListApi.submitClearanceCertificate(
        clearanceCertificate,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getClearanceDetails = createAsyncThunk(
  'resignationList/getClearanceDetails',
  async (props: ClearanceDetailsProps, thunkApi) => {
    try {
      return await resignationListApi.getClearanceDetails(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateCCDetails = createAsyncThunk<
  number | undefined,
  UpdateClearanceDetails,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'resignationList/updateCCDetails',
  async (updateClearanceCertificate: UpdateClearanceDetails, thunkApi) => {
    try {
      return await resignationListApi.updateCCDetails(
        updateClearanceCertificate,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSeparationChart = createAsyncThunk(
  'resignationList/getSeparationChart',
  async (props: SeparationChartProps, thunkApi) => {
    try {
      return await resignationListApi.getSeparationChart(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmpDetails = createAsyncThunk<
  GetEmpDetailsType | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('resignationList/getEmpDetails', async (separationId: number, thunkApi) => {
  try {
    return await resignationListApi.getEmpDetails(separationId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const saveExitFeedBackForm = createAsyncThunk<
  number,
  SubmitExitFeedBackForm,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'resignationList/saveExitFeedBackForm',
  async (saveFeedBackForm: SubmitExitFeedBackForm, thunkApi) => {
    try {
      return await resignationListApi.saveExitFeedBackForm(saveFeedBackForm)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const uploadRelievingLetter = createAsyncThunk(
  'resignationList/uploadRelievingLetter',
  async (prepareObject: { exitFormId: number; file: FormData }, thunkApi) => {
    try {
      return await resignationListApi.uploadRelievingLetter(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const uploadExitFeedBackFile = createAsyncThunk(
  'resignationList/uploadExitfeedBackFile',
  async (
    prepareObject: { exitFeedBackFormId: number; file: FormData },
    thunkApi,
  ) => {
    try {
      return await resignationListApi.uploadExitFeedBackFile(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateResignationTimeLine = createAsyncThunk<
  number | undefined,
  SeparationTimeLine,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'resignationList/updateCCDetails',
  async (updateSeparationTimeLine: SeparationTimeLine, thunkApi) => {
    try {
      return await resignationListApi.updateResignationTimeLine(
        updateSeparationTimeLine,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const curMonth = ''
const status = 'All'
const employeeStatus = ''

const initialResignationListState: ResignationListSliceState = {
  resignationList: { size: 0, list: [] },
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
  separationTimeLine: {} as SeparationTimeLine,
  checkExitFeedBackForm: {} as CheckExitFeedBackForm,
  separationChart: {} as SeparationChart,
  clearanceDetails: [],
  toggle: '',
  getEmpDetailsType: {} as GetEmpDetailsType,
  submitExitFeedBackForm: {} as SubmitExitFeedBackForm,
  selectMonthValue: curMonth,
  statusValue: status,
  employeeStatusValue: employeeStatus,
  fromDate: '',
  toDate: '',
}

const resignationListSlice = createSlice({
  name: 'resignationList',
  initialState: initialResignationListState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    toggle: (state, action) => {
      state.toggle = action.payload
    },
    removeClearanceDetails: (state) => {
      state.clearanceDetails = []
    },
    setMonthValue: (state, action) => {
      state.selectMonthValue = action.payload
    },
    clearSelectMonth: (state) => {
      state.selectMonthValue = ''
    },
    setStatusValue: (state, action) => {
      state.statusValue = action.payload
    },
    clearStatusValue: (state) => {
      state.statusValue = ''
    },
    setEmployeeStatusValue: (state, action) => {
      state.employeeStatusValue = action.payload
    },
    clearEmployeeStatusValue: (state) => {
      state.employeeStatusValue = ''
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload
    },
    setToDate: (state, action) => {
      state.toDate = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getResignationList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.resignationList = action.payload
      })
      .addCase(getSeparationTimeLine.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.separationTimeLine = action.payload as SeparationTimeLine
      })
      .addCase(getClearanceDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.clearanceDetails = action.payload
      })
      .addCase(getSeparationChart.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.separationChart = action.payload
      })

      .addCase(getEmpDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getEmpDetailsType = action.payload as GetEmpDetailsType
      })
      .addCase(saveExitFeedBackForm.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(
          getResignationList.pending,
          getSeparationTimeLine.pending,
          getClearanceDetails.pending,
          getSeparationChart.pending,
          getEmpDetails.pending,
          saveExitFeedBackForm.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.resignationList.isLoading

const resignationListDetails = (state: RootState): ResignationList[] =>
  state.resignationList.resignationList.list

const resignationListSize = (state: RootState): number =>
  state.resignationList.resignationList.size

const pageFromState = (state: RootState): number =>
  state.resignationList.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.resignationList.pageSize

const resignationTimeLine = (state: RootState): SeparationTimeLine =>
  state.resignationList.separationTimeLine

const managerClearanceDetails = (state: RootState): ClearanceDetails[] =>
  state.resignationList.clearanceDetails

const separationChartDetails = (state: RootState): SeparationChart =>
  state.resignationList.separationChart

const toggleValue = (state: RootState): string => state.resignationList.toggle

const getEmpFeedBackDetails = (state: RootState): GetEmpDetailsType =>
  state.resignationList.getEmpDetailsType

const getSelectedMonthValue = (state: RootState): string =>
  state.resignationList.selectMonthValue

const getSelectedStatusValue = (state: RootState): string =>
  state.resignationList.statusValue

const getSelectedEmployeeStatusValue = (state: RootState): string =>
  state.resignationList.employeeStatusValue

const getFromDateValue = (state: RootState): string | Date =>
  state.resignationList.fromDate

const getToDateValue = (state: RootState): string | Date =>
  state.resignationList.toDate

const resignationListThunk = {
  getResignationList,
  resignationIntitiateCC,
  getSeparationTimeLine,
  submitClearanceCertificate,
  getClearanceDetails,
  updateCCDetails,
  getSeparationChart,
  getEmpDetails,
  saveExitFeedBackForm,
  uploadRelievingLetter,
  uploadExitFeedBackFile,
  updateResignationTimeLine,
}

const resignationListSelectors = {
  isLoading,
  resignationListDetails,
  resignationListSize,
  pageFromState,
  pageSizeFromState,
  resignationTimeLine,
  managerClearanceDetails,
  toggleValue,
  separationChartDetails,
  getEmpFeedBackDetails,
  getSelectedMonthValue,
  getSelectedStatusValue,
  getSelectedEmployeeStatusValue,
  getFromDateValue,
  getToDateValue,
}

export const resignationListService = {
  ...resignationListThunk,
  actions: resignationListSlice.actions,
  selectors: resignationListSelectors,
}

export default resignationListSlice.reducer
