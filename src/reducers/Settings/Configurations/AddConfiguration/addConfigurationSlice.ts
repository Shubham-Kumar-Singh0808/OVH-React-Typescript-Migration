import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addConfigurationApi from '../../../../middleware/api/Settings/Configurations/AddConfiguration/addConfigurationApi'
import { AppDispatch, RootState } from '../../../../stateStore'
import { ValidationError } from '../../../../types/commonTypes'
import {
  AddConfigurationSliceState,
  AddCycle,
} from '../../../../types/Settings/Configurations/AddConfiguration/addConfigurationTypes'

const addNewCycle = createAsyncThunk<
  number | undefined,
  AddCycle,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'addConfiguration/addAppraisalCycle',
  async (newCycleDetails: AddCycle, thunkApi) => {
    try {
      return await addConfigurationApi.getAddAppraisalCycle(newCycleDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAddCycleState: AddConfigurationSliceState = {
  cycleRecords: {} as AddCycle,
  isLoading: ApiLoadingState.idle,
  error: null,
}

const addNewConfigurationSlice = createSlice({
  name: 'addConfiguration',
  initialState: initialAddCycleState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewCycle.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(addNewCycle.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(addNewCycle.rejected, (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const addConfigurationThunk = {
  addNewCycle,
}

const cycleRecords = (state: RootState): AddCycle =>
  state.addConfiguration.cycleRecords

const addConfigurationSelectors = {
  cycleRecords,
}

export const addConfigurationService = {
  ...addConfigurationThunk,
  actions: addNewConfigurationSlice.actions,
  selectors: addConfigurationSelectors,
}

export default addNewConfigurationSlice.reducer
