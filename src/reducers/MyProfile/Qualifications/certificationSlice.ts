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
      return await certificationsApi.getEmployeeCertifications()
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
    return await certificationsApi.getAllTechnologies()
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
      return await certificationsApi.getCertificateByTechnologyName(
        technologyName,
      )
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
      return await certificationsApi.addNewCertificate(
        employeeCertificateDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const getEmployeeCertificateByID = createAsyncThunk<
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

export const updateCertificateInformation = createAsyncThunk<
  number | undefined,
  EmployeeCertifications,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/updateCertificateInformation',
  async (employeeCertificateDetails: EmployeeCertifications, thunkApi) => {
    try {
      return await certificationsApi.updateEmployeeCertificateDetails(
        employeeCertificateDetails,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const deleteCertificateDetails = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'employeeCertifications/deleteCertificateDetails',
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
        state.editCertificateDetails =
          action.payload as unknown as EditEmployeeCertificates
      })
      .addCase(deleteCertificateDetails.fulfilled, (state) => {
        state.isLoading = false
      })
      .addMatcher(
        isAnyOf(
          getAllEmployeeCertifications.fulfilled,
          getEmployeeCertificateByID.fulfilled,
          updateCertificateInformation.fulfilled,
        ),
        (state, action) => {
          state.isLoading = false
          state.certificationDetails =
            action.payload as EmployeeCertifications[]
        },
      )
      .addMatcher(
        isAnyOf(
          getAllTechnology.pending,
          getCertificateDetailsByTechnologyName.pending,
          getEmployeeCertificateByID.pending,
          updateCertificateInformation.pending,
          deleteCertificateDetails.pending,
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
          updateCertificateInformation.rejected,
          deleteCertificateDetails.rejected,
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

export const selectCertificateList = (
  state: RootState,
): EmployeeCertifications[] => state.employeeCertificates.certificationDetails

export const certificationThunk = {
  getAllEmployeeCertifications,
  getAllTechnology,
  getCertificateDetailsByTechnologyName,
  getEmployeeCertificateByID,
  addEmployeeCertification,
  updateCertificateInformation,
  deleteCertificateDetails,
}

export const qualificationCategoryActions = employeeCertificationsSlice.actions

export const certificationSelectors = {
  selectIsCertificationListLoading,
  selectCertificateList,
}

export default employeeCertificationsSlice.reducer
