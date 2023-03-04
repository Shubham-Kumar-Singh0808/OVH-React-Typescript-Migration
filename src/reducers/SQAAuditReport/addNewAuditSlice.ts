import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { addNewAuditApi } from '../../middleware/api/SQAAuditReport/AddNewAudit/addNewAuditApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  AddNewAuditSliceState,
  EditAuditFormData,
  Employee,
  SaveAuditForm,
  UpdateSQAAudit,
} from '../../types/SQAAuditReport/AddNewAudit/addNewAuditTypes'

const initialAddNewAuditFormState: AddNewAuditSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  saveAuditForm: {
    auditDate: '',
    auditRescheduleStatus: false,
    auditType: '',
    endTime: '',
    formStatus: '',
    projectManagerId: 0,
    projectId: 0,
    projectType: '',
    startTime: '',
    auditeeIds: [],
    auditorIds: [],
    projectName: '',
  },
  editAuditForm: {} as EditAuditFormData,
  employee: [],
}

const saveNewAuditForm = createAsyncThunk<
  number | undefined,
  SaveAuditForm,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'addNewAuditForm/saveNewAuditForm',
  async (newSubCategoryDetails: SaveAuditForm, thunkApi) => {
    try {
      return await addNewAuditApi.saveNewAuditForm(newSubCategoryDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const editAuditFormDetails = createAsyncThunk<
  EditAuditFormData | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('addNewAuditForm/editAuditFormDetails', async (auditId, thunkApi) => {
  try {
    return await addNewAuditApi.editAuditFormDetails(auditId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getProjectEmployees = createAsyncThunk<
  Employee[],
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('addNewAuditForm/getProjectEmployees', async (projectId, thunkApi) => {
  try {
    return await addNewAuditApi.getProjectEmployees(projectId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const updateSQAAuditForm = createAsyncThunk<
  number | undefined,
  UpdateSQAAudit,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'addNewAuditForm/updateSQAAuditForm',
  async (updateSQAAuditDetails: UpdateSQAAudit, thunkApi) => {
    try {
      return await addNewAuditApi.updateSQAAuditForm(updateSQAAuditDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addNewAuditSlice = createSlice({
  name: 'addNewAuditForm',
  initialState: initialAddNewAuditFormState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveNewAuditForm.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(getProjectEmployees.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employee = action.payload
      })
      .addCase(editAuditFormDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.editAuditForm = action.payload as EditAuditFormData
      })
      .addCase(updateSQAAuditForm.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(
          saveNewAuditForm.pending,
          editAuditFormDetails.pending,
          updateSQAAuditForm.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          saveNewAuditForm.rejected,
          editAuditFormDetails.rejected,
          updateSQAAuditForm.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.addNewAuditForm.isLoading

const selectedAuditDetails = (state: RootState): EditAuditFormData =>
  state.addNewAuditForm.editAuditForm

const employees = (state: RootState): Employee[] =>
  state.addNewAuditForm.employee

const addNewAuditThunk = {
  saveNewAuditForm,
  editAuditFormDetails,
  getProjectEmployees,
  updateSQAAuditForm,
}

const addNewAuditSelectors = {
  isLoading,
  selectedAuditDetails,
  employees,
  getProjectEmployees,
}

export const addNewAuditService = {
  ...addNewAuditThunk,
  actions: addNewAuditSlice.actions,
  selectors: addNewAuditSelectors,
}

export default addNewAuditSlice.reducer
