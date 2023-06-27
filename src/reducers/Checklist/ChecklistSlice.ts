import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../middleware/api/apiList'
import {
  CheckListSliceState,
  GetChecklistParams,
} from '../../types/Checklist/ChecklistTypes'
import ChecklistApi from '../../middleware/api/Checklist/ChecklistApi'
import { ValidationError } from '../../types/commonTypes'

const initialCheckListSlice: CheckListSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  incomingChecklist: { size: 0, list: [] },
  checklistParams: { endIndex: 20, startIndex: 0 },
}

const getCheckListThunk = createAsyncThunk(
  'Checklist/getCheckListThunk',
  async (finalParams: GetChecklistParams, thunkApi) => {
    try {
      return await ChecklistApi.getChecklist(finalParams)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const checkListSlice = createSlice({
  name: 'Checklist',
  initialState: initialCheckListSlice,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCheckListThunk.fulfilled, (state, action) => {
      state.incomingChecklist = action.payload
    })
    builder.addMatcher(isAnyOf(getCheckListThunk.pending), (state) => {
      state.isLoading = ApiLoadingState.loading
      state.error = null
    })
    builder.addMatcher(isAnyOf(getCheckListThunk.fulfilled), (state) => {
      state.isLoading = ApiLoadingState.succeeded
    })
    builder.addMatcher(isAnyOf(getCheckListThunk.rejected), (state, action) => {
      state.error = action.payload as ValidationError
      state.isLoading = ApiLoadingState.failed
    })
  },
})

const ChecklistThunks = {
  getCheckListThunk,
}

export const ChecklistServices = {
  ...ChecklistThunks,
  actions: checkListSlice.actions,
}

const ChecklistReducer = checkListSlice.reducer
export default ChecklistReducer
