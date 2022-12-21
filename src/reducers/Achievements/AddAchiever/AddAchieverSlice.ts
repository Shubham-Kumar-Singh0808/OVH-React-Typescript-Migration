import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import AddAchieverApi from '../../../middleware/api/Achievements/AddAchiever/AddAchieverApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { emptyString } from '../../../pages/Achievements/AchievementConstants'
import {
  AchievementTypeIdQueryParameter,
  AddAchieverInitialState,
  IncomingEmployeeImageData,
  OutgoingNewAchievementType,
  OutgoingNewAchiever,
  OutgoingUpdateAchievementType,
} from '../../../types/Achievements/AddAchiever/AddAchieverTypes'
import { ValidationError } from '../../../types/commonTypes'

const initialEmployeeData: IncomingEmployeeImageData = {
  imageData: emptyString,
  id: -1,
}

const initialState = {
  isLoading: ApiLoadingState.idle,
  achievementTypeDetails: null,
  activeEmployeeList: [],
  error: null,
  employeeData: initialEmployeeData,
} as AddAchieverInitialState

const addAchievementTypeThunk = createAsyncThunk(
  'addAchiever/addAchievementTypeThunk',
  async (outBody: OutgoingNewAchievementType, thunkApi) => {
    try {
      return await AddAchieverApi.addAchievementType(outBody)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getAchievementTypeDetailsThunk = createAsyncThunk(
  'addAchiever/getAchievementTypeDetailsThunk',
  async (query: AchievementTypeIdQueryParameter, thunkApi) => {
    try {
      return await AddAchieverApi.getAchievementTypeDetails(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateAchievementTypeDetailsThunk = createAsyncThunk(
  'addAchiever/updateAchievementTypeDetailsThunk',
  async (body: OutgoingUpdateAchievementType, thunkApi) => {
    try {
      return await AddAchieverApi.updateAchievementTypeDetails(body)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteAchievementTypeThunk = createAsyncThunk(
  'addAchiever/deleteAchievementTypeThunk',
  async (query: AchievementTypeIdQueryParameter, thunkApi) => {
    try {
      return await AddAchieverApi.deleteAchievementType(query)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getImageDataThunk = createAsyncThunk(
  'addAchiever/getImageDataThunk',
  async (empId: number, thunkApi) => {
    try {
      return await AddAchieverApi.getImageData(empId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const getActiveEmployeeListThunk = createAsyncThunk(
  'addAchiever/getActiveEmployeeListThunk',
  async (_, thunkApi) => {
    try {
      return await AddAchieverApi.getActiveEmployeeList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addAchievementThunk = createAsyncThunk(
  'addAchiever/addAchievementThunk',
  async (outBody: OutgoingNewAchiever, thunkApi) => {
    try {
      return await AddAchieverApi.addAchievement(outBody)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addAchieverSlice = createSlice({
  name: 'addAchiever',
  initialState,
  reducers: {
    clearEmployeeData: (state) => {
      state.employeeData = initialEmployeeData
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAchievementTypeDetailsThunk.fulfilled,
      (state, action) => {
        state.achievementTypeDetails = action.payload
      },
    )
    builder.addCase(getActiveEmployeeListThunk.fulfilled, (state, action) => {
      state.activeEmployeeList = action.payload
    })
    builder.addCase(getImageDataThunk.fulfilled, (state, action) => {
      state.employeeData = action.payload
    })
    builder.addMatcher(
      isAnyOf(
        addAchievementTypeThunk.pending,
        deleteAchievementTypeThunk.pending,
        updateAchievementTypeDetailsThunk.pending,
        getActiveEmployeeListThunk.pending,
        addAchievementThunk.pending,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(
        addAchievementTypeThunk.fulfilled,
        deleteAchievementTypeThunk.fulfilled,
        updateAchievementTypeDetailsThunk.fulfilled,
        getActiveEmployeeListThunk.fulfilled,
        addAchievementThunk.fulfilled,
      ),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addMatcher(
      isAnyOf(
        addAchievementTypeThunk.rejected,
        deleteAchievementTypeThunk.rejected,
        updateAchievementTypeDetailsThunk.rejected,
      ),
      (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      },
    )
  },
})

const addAchieverThunks = {
  addAchievementTypeThunk,
  getAchievementTypeDetailsThunk,
  updateAchievementTypeDetailsThunk,
  deleteAchievementTypeThunk,
  getActiveEmployeeListThunk,
  addAchievementThunk,
  getImageDataThunk,
}

export const addAchieverServices = {
  ...addAchieverThunks,
  actions: addAchieverSlice.actions,
}

const addAchieverReducer = addAchieverSlice.reducer
export default addAchieverReducer
