import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import { AppDispatch, RootState } from '../../../../stateStore'
import { ValidationError } from '../../../../types/commonTypes'
import {
  AddNewVendorSliceState,
  AddVendor,
  Department,
} from '../../../../types/Assets/VendorList/AddVendorDetails/addVendorDetailsType'
import addNewVendorApi from '../../../../middleware/api/Assets/VendorList/AddVendorDetailsApi/addVendorDetailsApi'

const getDepartment = createAsyncThunk<
  Department[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('addVendorDetails/getDepartment', async (_, thunkApi) => {
  try {
    return await addNewVendorApi.getDepartment()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const addNewVendor = createAsyncThunk<
  string | undefined,
  AddVendor,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'addVendorDetails/addNewVendor',
  async (newVendorDetails: AddVendor, thunkApi) => {
    try {
      return await addNewVendorApi.addNewVendor(newVendorDetails)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialAddVendorState: AddNewVendorSliceState = {
  department: [],
  isLoading: ApiLoadingState.idle,
  error: null,
  addVendorDetails: {} as AddVendor,
}

const addNewVendorSlice = createSlice({
  name: 'addNewVendor',
  initialState: initialAddVendorState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.department = action.payload as Department[]
      })
      .addCase(addNewVendor.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(getDepartment.pending, addNewVendor.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getDepartment.rejected, addNewVendor.rejected),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const department = (state: RootState): Department[] =>
  state.addNewVendor.department

const addNewVendorThunk = {
  getDepartment,
  addNewVendor,
}
const addNewVendorSelectors = {
  department,
}

export const addNewVendorService = {
  ...addNewVendorThunk,
  actions: addNewVendorSlice.actions,
  selectors: addNewVendorSelectors,
}

export default addNewVendorSlice.reducer
