import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import ProcessAreaApi from '../../../middleware/api/Settings/ProcessArea/ProcessAreaApi'
import { RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ProcessAreaSliceState } from '../../../types/Settings/ProcessAreas/processAreaTypes'

const getProjectTailoringDocument = createAsyncThunk(
  'processArea/getProjectTailoringDocument',
  async (flag: string, thunkApi) => {
    try {
      return await ProcessAreaApi.getProjectTailoringDocument(flag)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialProcessAreaState: ProcessAreaSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  getProjectTailoringDocument: [],
}

const ProcessAreaSlice = createSlice({
  name: 'processArea',
  initialState: initialProcessAreaState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProjectTailoringDocument.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getProjectTailoringDocument = action.payload
      })
      .addMatcher(isAnyOf(getProjectTailoringDocument.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getProjectTailoringDocument.rejected), (state) => {
        state.isLoading = ApiLoadingState.failed
      })
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.initiateCycle.isLoading

const processAreaThunk = {
  getProjectTailoringDocument,
}

const processAreaSelectors = {
  isLoading,
}

export const processAreaService = {
  ...processAreaThunk,
  actions: ProcessAreaSlice.actions,
  selectors: processAreaSelectors,
}

export default ProcessAreaSlice.reducer
