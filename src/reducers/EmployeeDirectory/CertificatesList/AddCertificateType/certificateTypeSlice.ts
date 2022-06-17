import { AppDispatch, RootState } from '../../../../stateStore'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import {
  CertificateType,
  CertificateTypeSliceState,
} from '../../../../types/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypes'
import certificateTypesApi from '../../../../middleware/api/EmployeeDirectory/CertificatesList/AddCertificateType/certificateTypeApi'

const getCertificateTypes = createAsyncThunk<
  CertificateType[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('certificateType/getCertificateTypes', async (_, thunkApi) => {
  try {
    return await certificateTypesApi.getCertificateTypes()
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
      return await certificateTypesApi.addCertificateType({
        technologyId,
        certificateType,
      })
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteCertificateType = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('certificateType/deleteCertificateType', async (certificateId, thunkApi) => {
  try {
    return await certificateTypesApi.deleteCertificateType(certificateId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

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
      .addCase(getCertificateTypes.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
      .addCase(getCertificateTypes.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.certificateTypes = action.payload as CertificateType[]
      })
      .addMatcher(
        isAnyOf(addCertificateType.fulfilled, deleteCertificateType.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getCertificateTypes.pending,
          addCertificateType.pending,
          deleteCertificateType.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.certificateType.isLoading
const certificateTypes = (state: RootState): CertificateType[] =>
  state.certificateType.certificateTypes

const isError = (state: RootState): ValidationError =>
  state.certificateType.error

const certificateTypeThunk = {
  getCertificateTypes,
  addCertificateType,
  deleteCertificateType,
}

const certificateTypeSelectors = {
  isLoading,
  certificateTypes,
  isError,
}

export const certificateTypeService = {
  ...certificateTypeThunk,
  actions: certificateTypeSlice.actions,
  selectors: certificateTypeSelectors,
}

export default certificateTypeSlice.reducer
