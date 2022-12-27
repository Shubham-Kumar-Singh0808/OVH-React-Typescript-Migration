import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import AddNomineeApi from '../../../middleware/api/Achievements/AddNominee/AddNomineeApi'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  AddNomineeInitialState,
  IncomingNominationFormDetails,
} from '../../../types/Achievements/AddNominee/AddNomineeTypes'
import { ValidationError } from '../../../types/commonTypes'

const initialState: AddNomineeInitialState = {
  isLoading: ApiLoadingState.idle,
  nominationFormDetails: {
    achievementType: null,
    achievementTypeId: null,
    activateFlag: null,
    createdBy: null,
    createdDate: null,
    cycleID: -1,
    cycleName: '',
    employeeId: null,
    employeeName: null,
    finalComments: null,
    fromMonth: '',
    id: null,
    nominationQuestionDataDtosId: [],
    nominationStatus: null,
    rating: null,
    toMonth: '',
  },
  questionsInformation: [],
  error: null,
}

const nominationFormDetailsThunk = createAsyncThunk(
  'addNominee/nominationFormDetailsThunk',
  async (_, thunkApi) => {
    try {
      return await AddNomineeApi.nominationFormDetails()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addNomineeThunk = createAsyncThunk(
  'addNominee/addNomineeThunk',
  async (outBody: IncomingNominationFormDetails, thunkApi) => {
    try {
      return await AddNomineeApi.addNominee(outBody)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status)
    }
  },
)

const addNomineeSlice = createSlice({
  name: 'addNominee',
  initialState,
  reducers: {
    setQuestionInformationList: (state, action) => {
      state.questionsInformation = action.payload
    },
    setQuestionInformationIndexContent: (state, action) => {
      const newList = [...state.questionsInformation]
      const { description, index } = action.payload
      newList[index].description = description as string
      if (description.length > 200) {
        newList[index].isDone = true
      } else {
        newList[index].isDone = false
      }
      state.questionsInformation = newList
    },
  },
  extraReducers: (builder) => {
    builder.addCase(nominationFormDetailsThunk.fulfilled, (state, action) => {
      state.nominationFormDetails = action.payload
    })
    builder.addMatcher(
      isAnyOf(nominationFormDetailsThunk.fulfilled, addNomineeThunk.fulfilled),
      (state) => {
        state.isLoading = ApiLoadingState.succeeded
      },
    )
    builder.addMatcher(
      isAnyOf(nominationFormDetailsThunk.pending, addNomineeThunk.pending),
      (state) => {
        state.isLoading = ApiLoadingState.loading
      },
    )
    builder.addMatcher(
      isAnyOf(nominationFormDetailsThunk.rejected, addNomineeThunk.rejected),
      (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      },
    )
  },
})

const addNomineeThunks = {
  nominationFormDetailsThunk,
  addNomineeThunk,
}

export const addNomineeService = {
  ...addNomineeThunks,
  actions: addNomineeSlice.actions,
}

const addNomineeReducer = addNomineeSlice.reducer
export default addNomineeReducer
