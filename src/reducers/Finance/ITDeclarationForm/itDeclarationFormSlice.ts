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
  UploadITDocumentDTO,
} from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'

export const initialSubmitITDeclarationForm: submitITDeclarationForm = {
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
}

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

const uploadITDeclareDocuments = createAsyncThunk(
  'itDeclarationForm/uploadITDeclareDocuments',
  async (finalData: UploadITDocumentDTO, thunkApi) => {
    try {
      return await itDeclarationFormApi.uploadITDocument(finalData)
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
  submitITDeclarationForm: initialSubmitITDeclarationForm,
  itDeclarationFormId: 0,
  itDeclarationFormExist: false,
  grandTotal: 0,
  formSectionData: [],
  isSubmitButtonEnabled: false,
  modal: {
    showModal: false,
    modalDescription: '',
  },
  uploadedDocumentId: -1,
}

const itDeclarationFormSlice = createSlice({
  name: 'itDeclarationForm',
  initialState: initialITDeclarationFormState,
  reducers: {
    setFormSectionData: (state, action) => {
      state.formSectionData = action.payload
    },
    setSubmitButtonEnabled: (state) => {
      state.isSubmitButtonEnabled = true
    },
    setSubmitButtonDisabled: (state) => {
      state.isSubmitButtonEnabled = false
    },
    setGrandTotalFinal: (state) => {
      const sectionsCopy = state.submitITDeclarationForm?.formSectionsDTOs
      let totalSum = 0
      for (let i = 0; i < sectionsCopy?.length; i++) {
        totalSum += sectionsCopy[i].formInvestmentDTO.reduce((accum, item) => {
          if (item.customAmount === '') {
            //equivalent to 0
            return accum
          }
          return accum + +item.customAmount
        }, 0)
      }
      state.grandTotal = totalSum
    },
    setFormSectionDTO: (state, action) => {
      //used to set the form sections data that is to be sent through api
      const sectionIndex =
        state.submitITDeclarationForm?.formSectionsDTOs.findIndex(
          (item) =>
            item.sectionId === action.payload.sectionId &&
            item.isOld === action.payload.isOld,
        )
      if (sectionIndex !== -1) {
        state.submitITDeclarationForm?.formSectionsDTOs.splice(
          sectionIndex,
          1,
          action.payload,
        )
      } else {
        state.submitITDeclarationForm?.formSectionsDTOs.push(action.payload)
      }
    },
    removeFormSectionDTO: (state, action) => {
      //if section whole is removed, remove from store too
      const findIndex =
        state.submitITDeclarationForm?.formSectionsDTOs.findIndex(
          (item) =>
            item.sectionId === action.payload.sectionId &&
            item.isOld === action.payload.isOld,
        )
      console.log(findIndex)
      if (findIndex !== -1) {
        state.submitITDeclarationForm?.formSectionsDTOs.splice(findIndex, 1)
      }
    },
    removeFormSectionInvestmentDTO: (state, action) => {
      // remove investment from section in the store
      const findIndex =
        state.submitITDeclarationForm?.formSectionsDTOs.findIndex(
          (item) =>
            item.sectionId === action.payload.sectionId &&
            item.isOld === action.payload.isOld,
        )
      if (findIndex !== -1) {
        const findIndexInvestment =
          state.submitITDeclarationForm?.formSectionsDTOs[
            findIndex
          ]?.formInvestmentDTO.findIndex(
            (item) => +item.investmentId === action.payload.investmentId,
          )
        if (findIndexInvestment !== -1) {
          state.submitITDeclarationForm?.formSectionsDTOs[
            findIndex
          ].formInvestmentDTO.splice(findIndex, 1)
        }
      }
    },
    resetSubmitITDeclarationForm: (state) => {
      // used for clear button functionality
      state.submitITDeclarationForm = initialSubmitITDeclarationForm
    },
    modalVisible: (state, action) => {
      state.modal.showModal = action.payload.value
    },
    setModalDescription: (state, action) => {
      state.modal = {
        ...state.modal,
        modalDescription: action.payload.description,
      }
    },
    setAgreeCheckbox: (state, action) => {
      state.submitITDeclarationForm.isAgree = action.payload.value
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
        state.uploadedDocumentId = Number(action.payload)
      })
      .addCase(isITDeclarationFormExist.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.itDeclarationFormExist = action.payload as boolean
      })
      .addCase(getInvestsBySectionId.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.investments = [
          ...state.investments,
          ...Object.values(action.payload as Invest[]),
        ]
      })
      .addCase(uploadITDeclareDocuments.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(
          getEmployeeInfo.pending,
          getSectionsHavingInvests.pending,
          getInvestsBySectionId.pending,
          isITDeclarationFormExist.pending,
          addITDeclarationForm.pending,
          uploadITDeclareDocuments.pending,
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
          uploadITDeclareDocuments.rejected,
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
const formSectionData = (state: RootState): FormSectionsDTO[] =>
  state.itDeclarationForm.formSectionData

const itDeclarationFormThunk = {
  getEmployeeInfo,
  getSectionsHavingInvests,
  getInvestsBySectionId,
  isITDeclarationFormExist,
  addITDeclarationForm,
  uploadITDeclareDocuments,
}

const itDeclarationFormSelectors = {
  employeeInformation,
  isLoading,
  sections,
  investments,
  itDeclarationFormExists,
  grandTotal,
  formSectionData,
}

export const itDeclarationFormService = {
  ...itDeclarationFormThunk,
  actions: itDeclarationFormSlice.actions,
  selectors: itDeclarationFormSelectors,
}

export default itDeclarationFormSlice.reducer
