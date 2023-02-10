import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { addNewAuditApi } from '../../middleware/api/SQAAuditReport/AddNewAudit/addNewAuditApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  AddNewAuditSliceState,
  Employee,
  SaveAuditForm,
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
      .addCase(saveNewAuditForm.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(saveNewAuditForm.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.addNewAuditForm.isLoading

const employees = (state: RootState): Employee[] =>
  state.addNewAuditForm.employee

const addNewAuditThunk = {
  saveNewAuditForm,
  getProjectEmployees,
}

const addNewAuditSelectors = {
  isLoading,
  employees,
  getProjectEmployees,
}

export const addNewAuditService = {
  ...addNewAuditThunk,
  actions: addNewAuditSlice.actions,
  selectors: addNewAuditSelectors,
}

export default addNewAuditSlice.reducer
