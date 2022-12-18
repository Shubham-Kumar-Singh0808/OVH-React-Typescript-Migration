import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import itDeclarationFormApi from '../../../middleware/api/Finance/ITDeclarationForm/itDeclarationFormApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeeDetails,
  formSectionList,
  Invest,
  Investment,
  ITDeclarationFormSliceState,
  Sections,
  submitITDeclarationForm,
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

const addITDeclarationForm = createAsyncThunk(
  'itDeclarationForm/addITDeclarationForm',
  async (addDeclarationForm: submitITDeclarationForm, thunkApi) => {
    try {
      return await itDeclarationFormApi.addITDeclarationForm(addDeclarationForm)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const isITDeclarationFormExist = createAsyncThunk<
  boolean | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('itDeclarationForm/isITDeclarationFormExist', async (_, thunkApi) => {
  try {
    return await itDeclarationFormApi.isITDeclarationFormExist()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialITDeclarationFormState: ITDeclarationFormSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  employeeDetails: {} as EmployeeDetails,
  sections: [],
  investments: [],
  submitITDeclarationForm: {
    designation: '',
    employeeId: 0,
    employeeName: '',
    fromDate: '',
    grandTotal: 0,
    isAgree: false,
    itDeclarationFormId: null,
    organisationName: '',
    panNumber: '',
    toDate: '',
    formSectionsDTOs: [],
  },
  itDeclarationFormId: 0,
  itDeclarationFormExist: false,
  grandTotal: 0,
}

const itDeclarationFormSlice = createSlice({
  name: 'itDeclarationForm',
  initialState: initialITDeclarationFormState,
  reducers: {
    setGrandTotal: (state, action) => {
      state.grandTotal = action.payload
    },
  },
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
      .addCase(addITDeclarationForm.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.itDeclarationFormId = action.payload as number
      })
      .addCase(isITDeclarationFormExist.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.itDeclarationFormExist = action.payload as boolean
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
          addITDeclarationForm.pending,
          isITDeclarationFormExist.pending,
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
          addITDeclarationForm.rejected,
          isITDeclarationFormExist.rejected,
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

const itDeclarationFormExists = (state: RootState): boolean =>
  state.itDeclarationForm.itDeclarationFormExist

const grandTotal = (state: RootState): number =>
  state.itDeclarationForm.grandTotal

const itDeclarationFormThunk = {
  getEmployeeInfo,
  getSectionsHavingInvests,
  getInvestsBySectionId,
  addITDeclarationForm,
  isITDeclarationFormExist,
}

const itDeclarationFormSelectors = {
  employeeInformation,
  isLoading,
  sections,
  investments,
  itDeclarationFormExists,
  grandTotal,
}

export const itDeclarationFormService = {
  ...itDeclarationFormThunk,
  actions: itDeclarationFormSlice.actions,
  selectors: itDeclarationFormSelectors,
}

export default itDeclarationFormSlice.reducer
