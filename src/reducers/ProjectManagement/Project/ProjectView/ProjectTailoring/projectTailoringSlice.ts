import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import projectTailoringApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/ProjectTailoring/projectTailoringApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { ValidationError } from '../../../../../types/commonTypes'
import {
  IncomingProjectTailoringList,
  OutgoingSaveProjectTailoringDocument,
  OutgoingSaveProjectTailoringDocumentInitial,
  ProcessHeadDTO,
  ProjectTailoringSliceState,
  ProjectTailoringStatusEnum,
  UpdateProjectTailorDataSliceActionProps,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'
import {
  updateManagerInputDataInList,
  updateSQAEnteredDataInList,
} from '../../../../../pages/ProjectManagement/Project/ProjectView/ProjectTailoring/ProjectTailoringHelpers'

const initialProjectTailoringState: ProjectTailoringSliceState = {
  defaultProjectTailoringDocument: [],
  projectTailoringDocument: '',
  isLoading: ApiLoadingState.idle,
  error: null,
  tailorStatus: ProjectTailoringStatusEnum.initial,
  isManagerSubmitButtonEnabled: true,
  isSQAApproveButtonEnabled: true,
  isSQARejectedButtonEnabled: true,
  isManagerUpdateButtonEnabled: true,
}

const getDefaultProjectTailoringDocument = createAsyncThunk<
  ProcessHeadDTO[],
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectTailoring/getDefaultProjectTailoringDocument',
  async (flag: string, thunkApi) => {
    try {
      return await projectTailoringApi.getDefaultProjectTailoringDocument(flag)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProjectTailoringDocument = createAsyncThunk<
  IncomingProjectTailoringList,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectTailoring/getProjectTailoringDocument',
  async (projectId: string, thunkApi) => {
    try {
      return await projectTailoringApi.getProjectTailoringDocument(projectId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

//save button api for managers
const saveProjectTailoringDocumentForManager = createAsyncThunk(
  'projectTailoring/saveProjectTailoringDocumentForManager',
  async (finalData: OutgoingSaveProjectTailoringDocumentInitial, thunkApi) => {
    try {
      return await projectTailoringApi.saveProjectTailoringDocumentForManager(
        finalData,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

// submit button api for managers, approve reject button for sqa resources
const saveProjectTailoringDocument = createAsyncThunk(
  'projectTailoring/saveProjectTailoringDocument',
  async (
    finalData:
      | OutgoingSaveProjectTailoringDocumentInitial
      | OutgoingSaveProjectTailoringDocument,
    thunkApi,
  ) => {
    try {
      return await projectTailoringApi.saveProjectTailoringDocument(finalData)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const projectTailoringSlice = createSlice({
  name: 'projectTailoring',
  initialState: initialProjectTailoringState,
  reducers: {
    setFormStatus: (
      state,
      action: PayloadAction<ProjectTailoringStatusEnum>,
    ) => {
      state.tailorStatus = action.payload
    },
    updateInitialManagerEnteredData: (
      state,
      action: PayloadAction<UpdateProjectTailorDataSliceActionProps>,
    ) => {
      const newProcessHeadDTOList = updateManagerInputDataInList(
        state.defaultProjectTailoringDocument,
        action.payload,
      )
      state.defaultProjectTailoringDocument = newProcessHeadDTOList
    },
    updateSavedManagerEnteredData: (
      state,
      action: PayloadAction<UpdateProjectTailorDataSliceActionProps>,
    ) => {
      if (typeof state.projectTailoringDocument !== 'string') {
        const newProcessHeadDTOList = updateManagerInputDataInList(
          state.projectTailoringDocument.processHeaddto,
          action.payload,
        )
        state.projectTailoringDocument = {
          ...state.projectTailoringDocument,
          processHeaddto: newProcessHeadDTOList,
        }
      }
    },
    updateSQAEnteredData: (
      state,
      action: PayloadAction<UpdateProjectTailorDataSliceActionProps>,
    ) => {
      if (typeof state.projectTailoringDocument !== 'string') {
        const newProcessHeadDTOList = updateSQAEnteredDataInList(
          state.projectTailoringDocument.processHeaddto,
          action.payload,
        )
        state.projectTailoringDocument = {
          ...state.projectTailoringDocument,
          processHeaddto: newProcessHeadDTOList,
        }
      }
    },
    setManagerSubmitButton: (state, action: PayloadAction<boolean>) => {
      state.isManagerSubmitButtonEnabled = action.payload
    },
    setSQAApproveButton: (state, action: PayloadAction<boolean>) => {
      state.isSQAApproveButtonEnabled = action.payload
    },
    setSQARejectButton: (state, action: PayloadAction<boolean>) => {
      state.isSQARejectedButtonEnabled = action.payload
    },
    setManagerUpdateButton: (state, action: PayloadAction<boolean>) => {
      state.isManagerUpdateButtonEnabled = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProjectTailoringDocument.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.projectTailoringDocument = action.payload
    })
    builder.addCase(
      getDefaultProjectTailoringDocument.fulfilled,
      (state, action) => {
        state.defaultProjectTailoringDocument = action.payload
      },
    )
    builder.addCase(getProjectTailoringDocument.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
    builder.addMatcher(
      isAnyOf(
        getProjectTailoringDocument.pending,
        getDefaultProjectTailoringDocument.pending,
        saveProjectTailoringDocumentForManager.pending,
        saveProjectTailoringDocument.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(
        getProjectTailoringDocument.fulfilled,
        getDefaultProjectTailoringDocument.fulfilled,
        saveProjectTailoringDocumentForManager.fulfilled,
        saveProjectTailoringDocument.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addMatcher(
      isAnyOf(
        getProjectTailoringDocument.rejected,
        getDefaultProjectTailoringDocument.rejected,
        saveProjectTailoringDocumentForManager.rejected,
        saveProjectTailoringDocument.rejected,
      ),
      (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      },
    )
  },
})

const projectTailoringThunk = {
  getProjectTailoringDocument,
  getDefaultProjectTailoringDocument,
  saveProjectTailoringDocumentForManager,
  saveProjectTailoringDocument,
}

export const projectTailoringService = {
  ...projectTailoringThunk,
  actions: projectTailoringSlice.actions,
}

const projectTailoringReducer = projectTailoringSlice.reducer
export default projectTailoringReducer
