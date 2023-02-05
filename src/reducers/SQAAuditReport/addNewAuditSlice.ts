import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { addNewAuditApi } from '../../middleware/api/SQAAuditReport/AddNewAudit/addNewAuditApi'
import { AppDispatch, RootState } from '../../stateStore'
import { LoadingState, ValidationError } from '../../types/commonTypes'
import {
  AddNewAuditSliceState,
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
  'supportManagement/addSubCategory',
  async (newSubCategoryDetails: SaveAuditForm, thunkApi) => {
    try {
      return await addNewAuditApi.saveNewAuditForm(newSubCategoryDetails)
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

const addNewAuditThunk = {
  saveNewAuditForm,
}

const addNewAuditSelectors = {
  isLoading,
}

export const addNewAuditService = {
  ...addNewAuditThunk,
  actions: addNewAuditSlice.actions,
  selectors: addNewAuditSelectors,
}

export default addNewAuditSlice.reducer
