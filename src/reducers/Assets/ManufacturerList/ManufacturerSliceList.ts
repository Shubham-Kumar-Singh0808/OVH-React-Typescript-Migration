import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import {
  AddManufacturerListProps,
  GetAllManufacturerName,
  ManufacturerDetails,
  ManufacturerList,
  ManufacturerListProps,
  ManufacturerListSliceState,
  UpdateProps,
} from '../../../types/Assets/ManufacturerList/ManufacturerType'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { AppDispatch, RootState } from '../../../stateStore'
import ManufacturerApi from '../../../middleware/Assets/ManufacturerList/ManufacturerListApi'

const getManufacturerList = createAsyncThunk(
  'category/getManufacturerList',
  async (props: ManufacturerListProps, thunkApi) => {
    try {
      return await ManufacturerApi.getManufacturerList(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const getAllLookUps = createAsyncThunk(
  'category/getAllLookUps ',
  async (_, thunkApi) => {
    try {
      return await ManufacturerApi.getAllLookUpList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)
const addManufacturer = createAsyncThunk<
  number | undefined,
  AddManufacturerListProps,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'leaveSettings/addManufacturer',
  async (employeeLeaveCalender: AddManufacturerListProps, thunkApi) => {
    try {
      return await ManufacturerApi.addManufacturer(employeeLeaveCalender)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteManufacturerName = createAsyncThunk(
  'addLocationList/deleteManufacturerName',
  async (manufacturerId: number, thunkApi) => {
    try {
      return await ManufacturerApi.deleteManufacturerName(manufacturerId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateManufacturerName = createAsyncThunk(
  'addLocationList/updateManufacturerName',
  async (props: UpdateProps, thunkApi) => {
    try {
      return await ManufacturerApi.updateManufacturerName(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialManufacturerListState: ManufacturerListSliceState = {
  manufacturerDetails: [],
  getAllManufacturerName: {} as GetAllManufacturerName,
  isLoading: ApiLoadingState.idle,
  listSize: 0,
  manufacturerList: {} as ManufacturerList,
}

const ManufacturerListSlice = createSlice({
  name: 'employeeList',
  initialState: initialManufacturerListState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getManufacturerList.pending, (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addCase(getManufacturerList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.manufacturerDetails = action.payload.list
        state.listSize = action.payload.size
      })
      .addCase(getAllLookUps.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.manufacturerList = action.payload
      })
  },
})

const ManufacturerListThunk = {
  getManufacturerList,
  getAllLookUps,
  addManufacturer,
  deleteManufacturerName,
  updateManufacturerName,
}

const isLoading = (state: RootState): LoadingState =>
  state.manufacturerList.isLoading
const manufacturerList = (state: RootState): ManufacturerDetails[] =>
  state.manufacturerList.manufacturerDetails
const listSize = (state: RootState): number => state.manufacturerList.listSize
const manufacturerData = (state: RootState): ManufacturerList =>
  state.manufacturerList.manufacturerList

export const ManufacturerListSelectors = {
  manufacturerList,
  isLoading,
  listSize,
  manufacturerData,
}

export const ManufacturerListService = {
  ...ManufacturerListThunk,
  actions: ManufacturerListSlice.actions,
  selectors: ManufacturerListSelectors,
}

export default ManufacturerListSlice.reducer
