import { AppDispatch, RootState } from '../../../../stateStore'
import {
  CertificateType,
  CertificationState,
  EditEmployeeCertificates,
  EmployeeCertifications,
  Technology,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'

import { AxiosError } from 'axios'
import { ValidationError } from '../../../../types/commonTypes'
import employeeCertificationsApi from '../../../../middleware/api/MyProfile/QualificationsTab/EmployeeCertifications/employeeCertificationsApi'

const initialCertificationState: CertificationState = {
  editCertificateDetails: {} as EditEmployeeCertificates,
  getAllTechnologies: [],
  typeOfCertificate: [],
  certificationDetails: [],
  isLoading: false,
  error: null,
}

const getEmployeeCertificates = createAsyncThunk<
  EmployeeCertifications[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeCertifications/getEmployeeCertificates', async (_, thunkApi) => {
  try {
    return await employeeCertificationsApi.getEmployeeCertificates()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
const getTechnologies = createAsyncThunk<
  Technology[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeCertifications/getTechnologies', async (_, thunkApi) => {
  try {
    return await employeeCertificationsApi.getTechnologies()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getCertificateByTechnologyName = createAsyncThunk<
  CertificateType[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/getCertificateByTechnologyName',
  async (technologyName: string, thunkApi) => {
    try {
      return await employeeCertificationsApi.getCertificateByTechnologyName(
        technologyName,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addEmployeeCertification = createAsyncThunk<
  number | undefined,
  EmployeeCertifications,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/addEmployeeCertification',
  async (employeeCertificateDetails: EmployeeCertifications, thunkApi) => {
    try {
      return await employeeCertificationsApi.addEmployeeCertification(
        employeeCertificateDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeCertificate = createAsyncThunk<
  EditEmployeeCertificates | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/getEmployeeCertificate',
  async (id: number, thunkApi) => {
    try {
      return await employeeCertificationsApi.getEmployeeCertificate(id)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateEmployeeCertificate = createAsyncThunk<
  number | undefined,
  EmployeeCertifications,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/updateEmployeeCertificate',
  async (employeeCertificateDetails: EmployeeCertifications, thunkApi) => {
    try {
      return await employeeCertificationsApi.updateEmployeeCertificate(
        employeeCertificateDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteEmployeeCertificate = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/deleteEmployeeCertificate',
  async (certificationId, thunkApi) => {
    try {
      return await employeeCertificationsApi.deleteEmployeeCertificate(
        certificationId,
      )
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
      .addCase(getTechnologies.fulfilled, (state, action) => {
        state.isLoading = false
        state.getAllTechnologies = action.payload as Technology[]
      })
      .addCase(getCertificateByTechnologyName.fulfilled, (state, action) => {
        state.isLoading = false
        state.typeOfCertificate = action.payload as CertificateType[]
      })
      .addCase(addEmployeeCertification.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getEmployeeCertificate.fulfilled, (state, action) => {
        state.isLoading = false
        state.editCertificateDetails =
          action.payload as unknown as EditEmployeeCertificates
      })
      .addCase(deleteEmployeeCertificate.fulfilled, (state) => {
        state.isLoading = false
      })
      .addMatcher(
        isAnyOf(
          getEmployeeCertificates.fulfilled,
          getEmployeeCertificate.fulfilled,
          updateEmployeeCertificate.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false
          state.certificationDetails =
            action.payload as EmployeeCertifications[]
        },
      )
      .addMatcher(
        isAnyOf(
          getTechnologies.pending,
          getCertificateByTechnologyName.pending,
          getEmployeeCertificate.pending,
          updateEmployeeCertificate.pending,
          deleteEmployeeCertificate.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeCertificates.rejected,
          getTechnologies.rejected,
          getCertificateByTechnologyName.rejected,
          getEmployeeCertificate.rejected,
          updateEmployeeCertificate.rejected,
          deleteEmployeeCertificate.rejected,
        ),
        (state, action) => {
          state.isLoading = false
          state.error = action.payload as ValidationError
        },
      )
  },
})

const selectIsCertificationListLoading = (state: RootState): boolean =>
  state.employeeCertificates.isLoading

const selectCertificates = (state: RootState): EmployeeCertifications[] =>
  state.employeeCertificates.certificationDetails

export const certificationThunk = {
  getEmployeeCertificates,
  getTechnologies,
  getCertificateByTechnologyName,
  getEmployeeCertificate,
  addEmployeeCertification,
  updateEmployeeCertificate,
  deleteEmployeeCertificate,
}

export const qualificationCategoryActions = employeeCertificationsSlice.actions

export const certificationSelectors = {
  selectIsCertificationListLoading,
  selectCertificates,
}

export default employeeCertificationsSlice.reducer
