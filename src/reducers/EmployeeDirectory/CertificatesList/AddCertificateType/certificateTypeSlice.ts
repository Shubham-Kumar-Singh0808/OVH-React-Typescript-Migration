import { AppDispatch, RootState } from '../../../../stateStore'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  CertificateType,
  CertificateTypeSliceState,
} from '../../../../types/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypes'
import certificateTypeApi from '../../../../middleware/api/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypeApi'

const getCertificateTypeList = createAsyncThunk<
  CertificateType[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('certificateType/getCertificateTypeList', async (_, thunkApi) => {
  try {
    return await certificateTypeApi.getCertificateTypeList()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const addCertificateType = createAsyncThunk<
  CertificateType[] | undefined,
  CertificateType,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'certificateType/addCertificateType',
  async ({ technologyId, certificateType }: CertificateType, thunkApi) => {
    try {
      return await certificateTypeApi.addCertificateType({
        technologyId,
        certificateType,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialCertificateTypeState: CertificateTypeSliceState = {
  certificateTypes: [],
  isLoading: ApiLoadingState.idle,
  error: null,
}
const certificateTypeSlice = createSlice({
  name: 'certificateType',
  initialState: initialCertificateTypeState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCertificateTypeList.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
      .addCase(addCertificateType.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(getCertificateTypeList.pending, addCertificateType.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getCertificateTypeList.fulfilled),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.certificateTypes = action.payload as CertificateType[]
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.certificateType.isLoading
const certificateTypeList = (state: RootState): CertificateType[] =>
  state.certificateType.certificateTypes

const isError = (state: RootState): ValidationError =>
  state.certificateType.error

export const certificateTypeThunk = {
  getCertificateTypeList,
  addCertificateType,
}

export const certificateTypeSelectors = {
  isLoading,
  certificateTypeList,
  isError,
}

export const certificateTypeService = {
  ...certificateTypeThunk,
  actions: certificateTypeSlice.actions,
  selectors: certificateTypeSelectors,
}

export default certificateTypeSlice.reducer
