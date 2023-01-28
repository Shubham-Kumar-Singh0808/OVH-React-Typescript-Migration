import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import itDeclarationFormApi from '../../../middleware/api/Finance/ITDeclarationForm/itDeclarationFormApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  EmployeeDetails,
  FormSectionsDTO,
  Invest,
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

const addITDeclarationForm = createAsyncThunk(
  'itDeclarationForm/addITDeclarationForm',
  async (submitDeclarationForm: submitITDeclarationForm, thunkApi) => {
    try {
      return await itDeclarationFormApi.addITDeclarationForm(
        submitDeclarationForm,
      )
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const isITDeclarationFormEditable = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'itDeclarationForm/isITDeclarationFormEditable',
  async (itFormId, thunkApi) => {
    try {
      return await itDeclarationFormApi.isITDeclarationFormEditable(itFormId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateITDeclarationForm = createAsyncThunk(
  'itDeclarationForm/updateITDeclarationForm',
  async (updateDeclarationForm: submitITDeclarationForm, thunkApi) => {
    try {
      return await itDeclarationFormApi.updateITDeclarationForm(
        updateDeclarationForm,
      )
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
  submitITDeclarationForm: {
    designation: '',
    employeeId: 0,
    employeeName: '',
    fromDate: '',
    grandTotal: 0,
    isAgree: false,
    itDeclarationFormId: 0,
    organisationName: '',
    panNumber: '',
    toDate: '',
    formSectionsDTOs: [],
  },
  itDeclarationFormId: 0,
  itDeclarationFormExist: false,
  formSectionData: [],
  grandTotal: 0,
  iTDeclarationId: 0,
}

const itDeclarationFormSlice = createSlice({
  name: 'itDeclarationForm',
  initialState: initialITDeclarationFormState,
  reducers: {
    setGrandTotal: (state, action) => {
      state.grandTotal = action.payload
    },
    setFormSectionData: (state, action) => {
      state.formSectionData = action.payload
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
      .addCase(addITDeclarationForm.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(updateITDeclarationForm.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addCase(isITDeclarationFormEditable.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
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
          isITDeclarationFormExist.pending,
          addITDeclarationForm.pending,
          isITDeclarationFormEditable.pending,
          updateITDeclarationForm.pending,
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
          isITDeclarationFormExist.rejected,
          addITDeclarationForm.rejected,
          isITDeclarationFormEditable.rejected,
          updateITDeclarationForm.rejected,
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
const itDeclarationFormId = (state: RootState): number =>
  state.itDeclarationForm.itDeclarationFormId
const formSectionData = (state: RootState): FormSectionsDTO[] =>
  state.itDeclarationForm.formSectionData

const itDeclarationFormThunk = {
  getEmployeeInfo,
  getSectionsHavingInvests,
  getInvestsBySectionId,
  isITDeclarationFormExist,
  addITDeclarationForm,
  isITDeclarationFormEditable,
  updateITDeclarationForm,
}

const itDeclarationFormSelectors = {
  employeeInformation,
  isLoading,
  sections,
  investments,
  itDeclarationFormExists,
  grandTotal,
  formSectionData,
  itDeclarationFormId,
}

export const itDeclarationFormService = {
  ...itDeclarationFormThunk,
  actions: itDeclarationFormSlice.actions,
  selectors: itDeclarationFormSelectors,
}

export default itDeclarationFormSlice.reducer
