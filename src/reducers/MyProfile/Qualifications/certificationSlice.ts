import { AppDispatch, RootState } from '../../../stateStore'
import {
  CertificationState,
  EmployeeCertifications,
  getAllTechnologyLookUp,
  getCertificateType,
} from '../../../types/MyProfile/Qualifications/certificationTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  addNewCertificate,
  getAllTechnologies,
  getCertificateByTechnologyName,
  getCertificationInformationById,
  getEmployeeCertifications,
} from '../../../middleware/api/MyProfile/Qualifications/certificationsApi'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'

const initialCertificationState = {} as CertificationState

export const getAllEmployeeCertifications = createAsyncThunk<
  EmployeeCertifications[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/getAllEmployeeCertifications',
  async (_, thunkApi) => {
    try {
      return await getEmployeeCertifications()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
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

export const addEmployeeCertification = createAsyncThunk<
  number | undefined,
  EmployeeCertifications,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/postNewCertificate',
  async (employeeCertificateDetails: EmployeeCertifications, thunkApi) => {
    try {
      return await addNewCertificate(employeeCertificateDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const getEmployeeCertificateByID = createAsyncThunk<
  EmployeeCertifications | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/getEmployeeCertificateByID',
  async (id: number, thunkApi) => {
    try {
      return await getCertificationInformationById(id)
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
      .addCase(getAllEmployeeCertifications.fulfilled, (state, action) => {
        state.isLoading = false
        state.certificationDetails = action.payload as EmployeeCertifications[]
      })
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
      .addCase(addEmployeeCertification.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getEmployeeCertificateByID.fulfilled, (state, action) => {
        state.isLoading = false
        state.certificationDetails =
          action.payload as unknown as EmployeeCertifications[]
      })
      .addMatcher(
        isAnyOf(
          getAllTechnology.pending,
          getCertificateDetailsByTechnologyName.pending,
          getEmployeeCertificateByID.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getAllEmployeeCertifications.rejected,
          getAllTechnology.rejected,
          getCertificateDetailsByTechnologyName.rejected,
          getEmployeeCertificateByID.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationError
        },
      )
  },
})
export default employeeCertificationsSlice.reducer
