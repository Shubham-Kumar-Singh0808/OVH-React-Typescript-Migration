import { AppDispatch, RootState } from '../../../stateStore'
import {
  CertificationState,
  EditEmployeeCertificates,
  EmployeeCertifications,
  getAllTechnologyLookUp,
  getCertificateType,
} from '../../../types/MyProfile/Qualifications/certificationTypes'
import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import certificationsApi from '../../../middleware/api/MyProfile/Qualifications/certificationsApi'
import { AxiosError } from 'axios'
import { ValidationError } from '../../../types/commonTypes'

const initialCertificationState: CertificationState = {
  editCertificateDetails: {} as EditEmployeeCertificates,
  getAllTechnologies: [],
  typeOfCertificate: [],
  certificationDetails: [],
  isLoading: false,
  error: null,
}

const getEmployeeCertifications = createAsyncThunk<
  EmployeeCertifications[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeCertifications/getEmployeeCertifications', async (_, thunkApi) => {
  try {
    return await certificationsApi.getEmployeeCertificates()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})
const getTechnologies = createAsyncThunk<
  getAllTechnologyLookUp[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('employeeCertifications/getTechnologies', async (_, thunkApi) => {
  try {
    return await certificationsApi.getAllTechnologies()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getCertificateByTechnologyName = createAsyncThunk<
  getCertificateType[] | undefined,
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
      return await certificationsApi.getCertificateByTechnologyName(
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
      return await certificationsApi.addEmployeeCertification(
        employeeCertificateDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeCertificateByID = createAsyncThunk<
  EditEmployeeCertificates | undefined,
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
      return await certificationsApi.getCertificationInformationById(id)
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
      return await certificationsApi.updateEmployeeCertificate(
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
      return await certificationsApi.deleteEmployeeCertification(
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
        state.getAllTechnologies = action.payload as getAllTechnologyLookUp[]
      })
      .addCase(getCertificateByTechnologyName.fulfilled, (state, action) => {
        state.isLoading = false
        state.typeOfCertificate = action.payload as getCertificateType[]
      })
      .addCase(addEmployeeCertification.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(getEmployeeCertificateByID.fulfilled, (state, action) => {
        state.isLoading = false
        state.editCertificateDetails =
          action.payload as unknown as EditEmployeeCertificates
      })
      .addCase(deleteEmployeeCertificate.fulfilled, (state) => {
        state.isLoading = false
      })
      .addMatcher(
        isAnyOf(
          getEmployeeCertifications.fulfilled,
          getEmployeeCertificateByID.fulfilled,
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
          getEmployeeCertificateByID.pending,
          updateEmployeeCertificate.pending,
          deleteEmployeeCertificate.pending,
        ),
        (state) => {
          state.isLoading = true
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeCertifications.rejected,
          getTechnologies.rejected,
          getCertificateByTechnologyName.rejected,
          getEmployeeCertificateByID.rejected,
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

export const selectIsCertificationListLoading = (state: RootState): boolean =>
  state.employeeCertificates.isLoading

export const selectCertificates = (
  state: RootState,
): EmployeeCertifications[] => state.employeeCertificates.certificationDetails

export const certificationThunk = {
  getEmployeeCertifications,
  getTechnologies,
  getCertificateByTechnologyName,
  getEmployeeCertificateByID,
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
