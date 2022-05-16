import { AppDispatch, RootState } from '../../../stateStore'
import {
  CertificationState,
  getAllTechnologyLookUp,
  getCertificateType,
} from '../../../types/MyProfile/Qualifications/certificationTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  getAllTechnologies,
  getCertificateByTechnologyName,
} from '../../../middleware/api/MyProfile/Qualifications/qualificationsApi'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'

const initialCertificationState = {} as CertificationState

export const getAllTechnology = createAsyncThunk<
  getAllTechnologyLookUp[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeCertifications/getAllTechnology', async (_, thunkApi) => {
  try {
    return await getAllTechnologies()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

export const getCertificateDetailsByTechnologyName = createAsyncThunk<
  getCertificateType[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/getCertificateDetailsByTechnologyName',
  async (technologyName: string, thunkApi) => {
    try {
      return await getCertificateByTechnologyName(technologyName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const employeeCertificationsSlice = createSlice({
  name: 'employeeCertifications',
  initialState: initialCertificationState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTechnology.fulfilled, (state, action) => {
        state.isLoading = false
        state.getAllTechnologies = action.payload as getAllTechnologyLookUp[]
      })
      .addCase(
        getCertificateDetailsByTechnologyName.fulfilled,
        (state, action) => {
          state.isLoading = false
          state.typeOfCertificate = action.payload as getCertificateType[]
        },
      )
      .addMatcher(
        isAnyOf(
          getAllTechnology.pending,
          getCertificateDetailsByTechnologyName.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
  },
})
export default employeeCertificationsSlice.reducer
