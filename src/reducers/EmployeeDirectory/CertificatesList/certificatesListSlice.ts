import {
  CertificateListApiProps,
  CertificatesListSliceState,
  EmployeeCertificate,
} from '../../../types/EmployeeDirectory/CertificatesList/certificatesListTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AxiosError } from 'axios'
import { RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import certificatesApi from '../../../middleware/api/EmployeeDirectory/CertificatesList/certificatesListApi'

// fetch employees certificates action creator
const getEmployeesCertificates = createAsyncThunk(
  'certificateList/getEmployeesCertificates',
  async (props: CertificateListApiProps, thunkApi) => {
    try {
      return await certificatesApi.getEmployeesCertificates(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialCertificatesListState: CertificatesListSliceState = {
  employeeCertificationList: [],
  listSize: 0,
  isLoading: ApiLoadingState.idle,
}

const certificateListSlice = createSlice({
  name: 'certificateList',
  initialState: initialCertificatesListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeesCertificates.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeCertificationList = action.payload.list
        state.listSize = action.payload.listsize
      })
      .addMatcher(isAnyOf(getEmployeesCertificates.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const employeesCertificates = (state: RootState): EmployeeCertificate[] =>
  state.certificateList.employeeCertificationList
const listSize = (state: RootState): number => state.certificateList.listSize

const certificateListThunk = {
  getEmployeesCertificates,
}

const certificateListSelectors = {
  employeesCertificates,
  listSize,
}

export const certificateListService = {
  ...certificateListThunk,
  actions: certificateListSlice.actions,
  selectors: certificateListSelectors,
}

export default certificateListSlice.reducer
