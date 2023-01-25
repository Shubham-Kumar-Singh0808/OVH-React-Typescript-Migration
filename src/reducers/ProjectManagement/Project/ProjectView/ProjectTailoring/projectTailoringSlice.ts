import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import projectTailoringApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/ProjectTailoring/projectTailoringApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  ProjectTailoring,
  ProjectTailoringList,
  ProjectTailoringSliceState,
} from '../../../../../types/ProjectManagement/Project/ProjectView/ProjectTailoring/projectTailoringTypes'

const getProjectTailoringDocument = createAsyncThunk<
  ProjectTailoringList[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('Projects/getProjectTailoringDocument', async (flag: string, thunkApi) => {
  try {
    return await projectTailoringApi.getProjectTailoringDocument(flag)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getProjectTailoring = createAsyncThunk<
  ProjectTailoring | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('Projects/getProjectTailoring', async (projectId: string, thunkApi) => {
  try {
    return await projectTailoringApi.getProjectTailoring(projectId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialProjectTailoringState: ProjectTailoringSliceState = {
  projectTailoringList: [],
  projectTailoring: {} as ProjectTailoring,
  isLoading: ApiLoadingState.idle,
}

const projectTailoringSlice = createSlice({
  name: 'projects',
  initialState: initialProjectTailoringState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProjectTailoringDocument.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.projectTailoringList = action.payload as ProjectTailoringList[]
    })
    builder.addCase(getProjectTailoring.fulfilled, (state, action) => {
      state.isLoading = ApiLoadingState.succeeded
      state.projectTailoring = action.payload as ProjectTailoring
    })
    builder.addCase(getProjectTailoringDocument.pending, (state) => {
      state.isLoading = ApiLoadingState.loading
    })
  },
})

const projectTailoringThunk = {
  getProjectTailoringDocument,
  getProjectTailoring,
}

const isLoading = (state: RootState): LoadingState =>
  state.projectTailoring.isLoading

const projectTailoringList = (state: RootState): ProjectTailoringList[] =>
  state.projectTailoring.projectTailoringList

const projectTailoring = (state: RootState): ProjectTailoring =>
  state.projectTailoring.projectTailoring

const projectTailoringSelectors = {
  isLoading,
  projectTailoringList,
  projectTailoring,
}

export const projectTailoringService = {
  ...projectTailoringThunk,
  actions: projectTailoringSlice.actions,
  selectors: projectTailoringSelectors,
}

export default projectTailoringSlice.reducer
