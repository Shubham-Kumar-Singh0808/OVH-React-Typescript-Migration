import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  RecruitmentHistorySliceTypes,
  IncomingRecruitmentHistory,
} from '../../../types/MyProfile/RecruitmentHistory/RecruitmentHistoryTypes'
import recruitmentHistoryApi from '../../../middleware/api/MyProfile/RecruitmentHistory/RecruitmentHistoryApi'
import { ValidationError } from '../../../types/commonTypes'

export const initialIncomingRecruitmentHistory: IncomingRecruitmentHistory = {
  personId: -1,
  firstName: null,
  fullName: '',
  lastName: null,
  middleName: null,
  email: '',
  qualification: null,
  skill: '',
  pendingInterviewStatus: -1,
  appliedFor: '',
  experience: '',
  candidateStatus: '',
  resumePath: null,
  cycleDTOs: [],
  statusComments: '',
  timelineStatus: null,
  joineeComments: '',
  modeOfInterview: '',
  recruiter: '',
  otherDocumentPath: null,
  initialComments: '',
  holdSubStatus: '',
  addedDate: null,
  reason: '',
}

const recruitmentHistoryInitialSlice: RecruitmentHistorySliceTypes = {
  isLoading: ApiLoadingState.idle,
  error: null,
  recruitmentHistoryData: initialIncomingRecruitmentHistory,
}

const getEmployeeHistoryThunk = createAsyncThunk(
  'RecruitmentHistory/getEmployeeHistoryThunk',
  async (loggedInEmpId: number, thunkApi) => {
    try {
      return await recruitmentHistoryApi.getEmployeeHistoryApi(loggedInEmpId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const recruitmentHistorySlice = createSlice({
  name: 'RecruitmentHistory',
  initialState: recruitmentHistoryInitialSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getEmployeeHistoryThunk.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.recruitmentHistoryData = action.payload
    })
    builder.addCase(getEmployeeHistoryThunk.rejected, (state, action) => {
      state.isLoading = ApiLoadingState.failed
      state.error = action.payload as ValidationError
    })
    builder.addCase(getEmployeeHistoryThunk.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const recruitmentHistoryThunks = {
  getEmployeeHistoryThunk,
}

export const recruitmentHistoryServices = {
  ...recruitmentHistoryThunks,
  actions: recruitmentHistorySlice.actions,
}

const recruitmentHistoryReducer = recruitmentHistorySlice.reducer
export default recruitmentHistoryReducer
