import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import itDeclarationFormApi from '../../../middleware/api/Finance/ITDeclarationForm/itDeclarationFormApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeeDetails,
  Invest,
  ITDeclarationFormSliceState,
  Sections,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'

const getEmployeeInfo = createAsyncThunk(
  'itDeclarationForm/getEmployeeInfo',
  async (_, thunkApi) => {
    try {
      return await itDeclarationFormApi.getEmployeeInfo()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSectionsHavingInvests = createAsyncThunk(
  'itDeclarationForm/getSectionsHavingInvests',
  async (_, thunkApi) => {
    try {
      return await itDeclarationFormApi.getSectionsHavingInvests()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getInvestsBySectionId = createAsyncThunk<
  Invest[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'itDeclarationForm/getInvestsBySectionId',
  async (sectionId: number, thunkApi) => {
    try {
      return await itDeclarationFormApi.getInvestsBySectionId(sectionId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const initialITDeclarationFormState: ITDeclarationFormSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  employeeDetails: {} as EmployeeDetails,
  sections: [],
  investments: [],
}

const itDeclarationFormSlice = createSlice({
  name: 'itDeclarationForm',
  initialState: initialITDeclarationFormState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEmployeeInfo.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeeDetails = action.payload
      })
      .addCase(getSectionsHavingInvests.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.sections = action.payload
      })
      .addCase(getInvestsBySectionId.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.investments = [
          ...state.investments,
          ...(action.payload as Invest[]),
        ]
      })
      .addMatcher(
        isAnyOf(
          getEmployeeInfo.pending,
          getSectionsHavingInvests.pending,
          getInvestsBySectionId.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getEmployeeInfo.rejected,
          getSectionsHavingInvests.rejected,
          getInvestsBySectionId.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const employeeInformation = (state: RootState): EmployeeDetails =>
  state.itDeclarationForm.employeeDetails

const sections = (state: RootState): Sections[] =>
  state.itDeclarationForm.sections

const isLoading = (state: RootState): LoadingState =>
  state.itDeclarationForm.isLoading

const investments = (state: RootState): Invest[] =>
  state.itDeclarationForm.investments

const itDeclarationFormThunk = {
  getEmployeeInfo,
  getSectionsHavingInvests,
  getInvestsBySectionId,
}

const itDeclarationFormSelectors = {
  employeeInformation,
  isLoading,
  sections,
  investments,
}

export const itDeclarationFormService = {
  ...itDeclarationFormThunk,
  actions: itDeclarationFormSlice.actions,
  selectors: itDeclarationFormSelectors,
}

export default itDeclarationFormSlice.reducer
