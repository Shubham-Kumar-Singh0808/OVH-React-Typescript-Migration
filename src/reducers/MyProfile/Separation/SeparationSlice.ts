import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  IncomingEmployeeSeparationForm,
  SeparationInitialStateTypes,
} from '../../../types/MyProfile/Separation/separationTypes'
import SeparationApi from '../../../middleware/api/MyProfile/Separation/SeparationApi'
import { ValidationError } from '../../../types/commonTypes'

export const initialEmployeeSeparationData: IncomingEmployeeSeparationForm = {
  separationId: -1,
  relievingDate: '',
  resignationDate: '',
  employeeId: 2081,
  employeeName: '',
  separationComments: [],
  employeeComments: '',
  managerComments: null,
  withdrawComments: null,
  primaryReasonId: null,
  primaryReasonName: '',
  reasonComments: '',
  status: '',
  canberevoked: false,
  isRevoked: false,
  isprocessInitiated: null,
  adminCcCss: null,
  hrCcCss: null,
  managerCcCss: null,
  itCcCss: null,
  finanaceCcCss: null,
  showCommentsBox: false,
  showEditButton: false,
  certificateDTO: [],
  relievingLetterPath: '',
  managerName: null,
  exitFeedbackFormPath: '',
  separationExist: null,
  showManagerClearance: null,
  showTimeline: null,
  isPIP: null,
  pipAuditDTO: null,
  contractExists: null,
  contractStartDate: null,
  contractEndDate: null,
  personalEmailFlag: null,
  initiatedDate: null,
  empStatus: null,
  certificate: null,
  seperationComments: [],
}

const initialState: SeparationInitialStateTypes = {
  isLoading: ApiLoadingState.idle,
  error: null,
  employeeSeparationData: initialEmployeeSeparationData,
}

const getEmployeeSeparationFormThunk = createAsyncThunk(
  'Separation/getEmployeeSeparationFormThunk',
  async (employeeId: number, thunkApi) => {
    try {
      return await SeparationApi.getEmployeeSeparationForm(employeeId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const separationSlice = createSlice({
  name: 'Separation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeeSeparationFormThunk.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
    builder.addCase(
      getEmployeeSeparationFormThunk.fulfilled,
      (state, action) => {
        state.employeeSeparationData = action.payload
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addCase(
      getEmployeeSeparationFormThunk.rejected,
      (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      },
    )
  },
})

const SeparationThunks = {
  getEmployeeSeparationFormThunk,
}

export const SeparationServices = {
  ...SeparationThunks,
  actions: separationSlice.actions,
}

const SeparationReducer = separationSlice.reducer
export default SeparationReducer
