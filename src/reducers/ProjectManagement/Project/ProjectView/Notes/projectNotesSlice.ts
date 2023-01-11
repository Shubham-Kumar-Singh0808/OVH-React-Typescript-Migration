import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import projectNotesApi from '../../../../../middleware/api/ProjectManagement/Projects/ProjectView/Notes/projectNotesApi'
import { AppDispatch, RootState } from '../../../../../stateStore'
import { LoadingState, ValidationError } from '../../../../../types/commonTypes'
import {
  PostNotesProps,
  ProjectNotesState,
  ProjectNotesTimeLine,
} from '../../../../../types/ProjectManagement/Project/ProjectView/Notes/projectNotesTypes'

const getProjectNotesTimeLine = createAsyncThunk<
  ProjectNotesTimeLine[] | undefined,
  number | string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectNotes/getProjectNotesTimeLine',
  async (projectid: number | string, thunkApi) => {
    try {
      return await projectNotesApi.getProjectNotesTimeLine(projectid)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const postProjectNotes = createAsyncThunk<
  number | string,
  PostNotesProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'projectNotes/postProjectNotes',
  async (postNotes: PostNotesProps, thunkApi) => {
    try {
      return await projectNotesApi.postProjectNotes(postNotes)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const uploadProjectNotesImage = createAsyncThunk(
  'projectNotes/uploadProjectNotesImage',
  async (prepareObject: { postid: number; file: FormData }, thunkApi) => {
    try {
      return await projectNotesApi.uploadProjectNotesImage(prepareObject)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialProjectNotesState: ProjectNotesState = {
  projectNotesTimeLine: [],
  isLoading: ApiLoadingState.idle,
}

const projectNotesSlice = createSlice({
  name: 'projectView',
  initialState: initialProjectNotesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProjectNotesTimeLine.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectNotesTimeLine = action.payload as ProjectNotesTimeLine[]
      })
      .addCase(getProjectNotesTimeLine.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
  },
})

const projectNotesThunk = {
  getProjectNotesTimeLine,
  postProjectNotes,
  uploadProjectNotesImage,
}

const isProjectNotesLoading = (state: RootState): LoadingState =>
  state.projectNotes.isLoading

const projectNotesTimeLine = (state: RootState): ProjectNotesTimeLine[] =>
  state.projectNotes.projectNotesTimeLine

const projectNotesSelectors = {
  isProjectNotesLoading,
  projectNotesTimeLine,
}

export const projectNotesService = {
  ...projectNotesThunk,
  actions: projectNotesSlice.actions,
  selectors: projectNotesSelectors,
}

export default projectNotesSlice.reducer
