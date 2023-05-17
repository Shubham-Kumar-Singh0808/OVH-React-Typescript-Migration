import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
// eslint-disable-next-line no-duplicate-imports
import type { PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { itDeclarationListApi } from '../../../middleware/api/Finance/ITDeclarationList/itDeclarationListApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import { Section } from '../../../types/Finance/InvestmentCheckList/investmentCheckListTypes'
import {
  AddInvestmentData,
  AddSection,
  Cycle,
  EditITDeclarationEmployeeDetails,
  FinalUpdateITFormDTO,
  FormInvestment,
  FormSection,
  Investment,
  ITDeclarationFormToggleType,
  ITDeclarationListApiProps,
  ITDeclarationListModal,
  ITDeclarationListSliceState,
  ITForm,
  UpdateSection,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'
import itDeclarationFormApi from '../../../middleware/api/Finance/ITDeclarationForm/itDeclarationFormApi'
import { UploadITDocumentDTO } from '../../../types/Finance/ITDeclarationForm/itDeclarationFormTypes'

export const initialUpdateITDeclarationFormDTO: ITForm = {
  itDeclarationFormId: -1,
  employeeId: 0,
  employeeName: '',
  panNumber: null,
  filePath: null,
  designation: '',
  fromDate: '',
  grandTotal: 0,
  isAgree: null,
  organisationName: '',
  toDate: '',
  formSectionsDTOs: [],
  cycleId: -1,
}

export const initialEmployeeDetails: EditITDeclarationEmployeeDetails = {
  employeeId: -1,
  fullName: '',
  pan: null,
  designation: '',
  activeCyle: '',
  joinDate: '',
}

const initialITDeclarationListState: ITDeclarationListSliceState = {
  itDeclarationForms: [],
  listSize: 0,
  searchEmployee: '',
  isLoading: ApiLoadingState.idle,
  error: null,
  cycles: [],
  currentPage: 1,
  pageSize: 20,
  toggle: ITDeclarationFormToggleType.HomePage,
  investments: [],
  sections: [],
  updatedITDeclarationFormDTO: initialUpdateITDeclarationFormDTO,
  employeeDetails: initialEmployeeDetails,
  sectionsWithInvests: [],
  modal: {
    showModal: false,
    description: '',
    confirmBtnText: 'Confirm',
    cancelBtnText: 'Cancel',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    confirmButtonFunction: () => {},
  },
  isUpdateITFormButtonEnabled: false,
}

const getCycles = createAsyncThunk(
  'itDeclarationList/getCycles',
  async (_, thunkApi) => {
    try {
      return await itDeclarationListApi.getCycles()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addCycle = createAsyncThunk(
  'itDeclarationList/addCycle',
  async (addNewCycle: Cycle, thunkApi) => {
    try {
      return await itDeclarationListApi.addCycle(addNewCycle)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSections = createAsyncThunk(
  'itDeclarationList/getSections',
  async (_, thunkApi) => {
    try {
      return await itDeclarationListApi.getSections()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addSection = createAsyncThunk(
  'itDeclarationList/addSection',
  async (addNewSection: AddSection, thunkApi) => {
    try {
      return await itDeclarationListApi.addSection(addNewSection)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateSection = createAsyncThunk(
  'itDeclarationList/updateSection',
  async (editSection: UpdateSection, thunkApi) => {
    try {
      return await itDeclarationListApi.updateSection(editSection)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteSection = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('itDeclarationList/deleteSection', async (secId, thunkApi) => {
  try {
    return await itDeclarationListApi.deleteSection(secId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getInvestments = createAsyncThunk(
  'itDeclarationList/getInvestments',
  async (_, thunkApi) => {
    try {
      return await itDeclarationListApi.getInvestments()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addInvestment = createAsyncThunk(
  'itDeclarationList/addInvestment',
  async (addInvestmentData: AddInvestmentData, thunkApi) => {
    try {
      return await itDeclarationListApi.addInvestment(addInvestmentData)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const deleteInvestment = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('itDeclarationList/deleteInvestment', async (investId, thunkApi) => {
  try {
    return await itDeclarationListApi.deleteInvestment(investId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const deleteCycle = createAsyncThunk<
  number | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('itDeclarationList/deleteCycle', async (cycleId, thunkApi) => {
  try {
    return await itDeclarationListApi.deleteCycle(cycleId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getITDeclarationForm = createAsyncThunk(
  'itDeclarationList/getITDeclarationForm',
  async (props: ITDeclarationListApiProps, thunkApi) => {
    try {
      return await itDeclarationListApi.getITDeclarationForm(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const isCycleExist = createAsyncThunk(
  'itDeclarationList/isCycleExist',
  async (props: { cycleId: number; cycleName: string }, thunkApi) => {
    try {
      return await itDeclarationListApi.isCycleExist(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateCycle = createAsyncThunk(
  'itDeclarationList/updateCycle',
  async (editCycle: Cycle, thunkApi) => {
    try {
      return await itDeclarationListApi.updateCycle(editCycle)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const updateInvestment = createAsyncThunk(
  'itDeclarationList/updateInvestment',
  async (editInvestment: Investment, thunkApi) => {
    try {
      return await itDeclarationListApi.updateInvestment(editInvestment)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const isInvestmentExist = createAsyncThunk(
  'itDeclarationList/isInvestmentExist',
  async (
    props: { investmentId: number; investmentName: string; sectionId: number },
    thunkApi,
  ) => {
    try {
      return await itDeclarationListApi.isInvestmentExist(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const isSectionExist = createAsyncThunk(
  'itDeclarationList/isSectionExist',
  async (props: { sectionName: string; sectionId: number }, thunkApi) => {
    try {
      return await itDeclarationListApi.isSectionExist(props)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeeDetails = createAsyncThunk(
  'itDeclarationList/getEmployeeDetails',
  async (_, thunkApi) => {
    try {
      return await itDeclarationListApi.getEmployeeInfo()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const isITFormEditable = createAsyncThunk(
  'itDeclarationList/isITFormEditable',
  async (itFormId: number, thunkApi) => {
    try {
      return await itDeclarationListApi.isITFormEditable(itFormId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSectionsHavingInvests = createAsyncThunk(
  'itDeclarationList/getSectionsHavingInvests',
  async (_, thunkApi) => {
    try {
      //to prevent redundancy, using the api from itDeclarationFormApi
      return await itDeclarationFormApi.getSectionsHavingInvests()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const editITForm = createAsyncThunk(
  'itDeclarationList/editITForm',
  async (data: FinalUpdateITFormDTO, thunkApi) => {
    try {
      return await itDeclarationListApi.editITForm(data)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const uploadITDeclarationDocument = createAsyncThunk(
  'itDeclarationList/uploadITDeclarationDocument',
  async (itDocument: UploadITDocumentDTO, thunkApi) => {
    try {
      //preventing redunancy
      return await itDeclarationFormApi.uploadITDocument(itDocument)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const itDeclarationListSlice = createSlice({
  name: 'itDeclarationList',
  initialState: initialITDeclarationListState,
  reducers: {
    setSearchEmployee: (state, action) => {
      state.searchEmployee = action.payload as string
    },
    clearEmployees: (state) => {
      state.itDeclarationForms = []
    },
    clearSearch: (state) => {
      state.searchEmployee = ''
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
    setToggle: (state, action: PayloadAction<ITDeclarationFormToggleType>) => {
      state.toggle = action.payload
    },
    clickBackButton: (state) => {
      state.toggle = ITDeclarationFormToggleType.HomePage
    },
    editThisForm: (state, action: PayloadAction<ITForm>) => {
      state.updatedITDeclarationFormDTO = action.payload
    },
    setIsAgreeChecked: (state, action: PayloadAction<{ value: boolean }>) => {
      state.updatedITDeclarationFormDTO = {
        ...state.updatedITDeclarationFormDTO,
        isAgree: action.payload.value,
      }
    },
    addSectionInUpdateIT: (state, action: PayloadAction<FormSection>) => {
      const formSectionList = state.updatedITDeclarationFormDTO.formSectionsDTOs
      formSectionList.push(action.payload)
      state.updatedITDeclarationFormDTO = {
        ...state.updatedITDeclarationFormDTO,
        formSectionsDTOs: formSectionList,
      }
    },
    removeSectionInUpdateIT: (
      state,
      action: PayloadAction<{ sectionId: number; isOld: boolean }>,
    ) => {
      const { sectionId, isOld } = action.payload
      console.log(sectionId)
      console.log(isOld)
      const formSectionList = state.updatedITDeclarationFormDTO.formSectionsDTOs
      const filteredList = formSectionList.filter(
        (section) => section.sectionId !== sectionId || section.isOld !== isOld,
      )
      console.log(filteredList)
      state.updatedITDeclarationFormDTO = {
        ...state.updatedITDeclarationFormDTO,
        formSectionsDTOs: filteredList,
      }
    },
    addInvestmentToSection: (
      state,
      action: PayloadAction<{
        sectionId: number
        investment: FormInvestment
        isOld: boolean
      }>,
    ) => {
      const { sectionId, isOld, investment } = action.payload
      const sectionIndex =
        state.updatedITDeclarationFormDTO.formSectionsDTOs.findIndex(
          (section) =>
            section.sectionId === sectionId && section.isOld === isOld,
        )
      if (sectionIndex !== -1) {
        const sections = state.updatedITDeclarationFormDTO.formSectionsDTOs
        sections[sectionIndex].formInvestmentDTO.push(investment)
        state.updatedITDeclarationFormDTO = {
          ...state.updatedITDeclarationFormDTO,
          formSectionsDTOs: sections,
        }
      }
    },
    deleteInvestmentFromSection: (
      state,
      action: PayloadAction<{
        sectionId: number
        investmentId: number
        isOld: boolean
      }>,
    ) => {
      const { sectionId, investmentId, isOld } = action.payload
      const sectionIndex =
        state.updatedITDeclarationFormDTO.formSectionsDTOs?.findIndex(
          (sec) => sec.sectionId === sectionId && sec.isOld === isOld,
        )
      if (sectionIndex !== -1) {
        const newInvestmentList =
          state.updatedITDeclarationFormDTO.formSectionsDTOs[
            sectionIndex
          ].formInvestmentDTO.filter(
            (investment) => investment.investmentId !== investmentId,
          )
        if (newInvestmentList.length === 0) {
          state.updatedITDeclarationFormDTO.formSectionsDTOs.splice(
            sectionIndex,
            1,
          )
        } else {
          state.updatedITDeclarationFormDTO.formSectionsDTOs[
            sectionIndex
          ].formInvestmentDTO = newInvestmentList
        }
      }
    },
    updateInvestmentOfSection: (
      state,
      action: PayloadAction<{
        investment: FormInvestment
        investmentIndex: number
        sectionId: number
        isOld: boolean
      }>,
    ) => {
      const { sectionId, investment, investmentIndex, isOld } = action.payload
      const sectionIndex =
        state.updatedITDeclarationFormDTO.formSectionsDTOs.findIndex(
          (sec) => sec.sectionId === sectionId && sec.isOld === isOld,
        )
      if (sectionIndex !== -1) {
        const previousStateValue =
          state.updatedITDeclarationFormDTO.formSectionsDTOs[sectionIndex]
            .formInvestmentDTO[investmentIndex]
        if (previousStateValue.formInvestmentId !== null) {
          // doing this way because API is being sent that way. Edited Investments have string amount
          const finalInvestment = {
            ...previousStateValue,
            investmentName: investment.investmentName,
            customAmount: investment.customAmount.toString(),
            investmentId: investment.investmentId,
          }
          state.updatedITDeclarationFormDTO.formSectionsDTOs[
            sectionIndex
          ].formInvestmentDTO.splice(investmentIndex, 1, finalInvestment)
        } else {
          // this is for new investments
          const finalInvestment = {
            ...investment,
            investmentName: null,
          }
          state.updatedITDeclarationFormDTO.formSectionsDTOs[
            sectionIndex
          ].formInvestmentDTO.splice(investmentIndex, 1, finalInvestment)
        }
      }
    },
    setModal: (state, action: PayloadAction<ITDeclarationListModal>) => {
      state.modal = action.payload
    },
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.modal = {
        ...state.modal,
        showModal: action.payload,
      }
    },
    setGrandTotal: (state, action: PayloadAction<number>) => {
      state.updatedITDeclarationFormDTO = {
        ...state.updatedITDeclarationFormDTO,
        grandTotal: action.payload,
      }
    },
    setUpdateITButtonBoolean: (state, action: PayloadAction<boolean>) => {
      state.isUpdateITFormButtonEnabled = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCycles.fulfilled, (state, action) => {
        state.cycles = action.payload
      })
      .addCase(getSections.fulfilled, (state, action) => {
        state.sections = action.payload
      })
      .addCase(getInvestments.fulfilled, (state, action) => {
        state.investments = action.payload
      })
      .addCase(getITDeclarationForm.fulfilled, (state, action) => {
        state.itDeclarationForms = action.payload.itforms
        state.listSize = action.payload.itformlistsize
      })
      .addCase(getEmployeeDetails.fulfilled, (state, action) => {
        state.employeeDetails = action.payload
      })
      .addCase(getSectionsHavingInvests.fulfilled, (state, action) => {
        state.sectionsWithInvests = action.payload
      })
      .addMatcher(
        isAnyOf(
          addSection.fulfilled,
          deleteSection.fulfilled,
          updateSection.fulfilled,
          addInvestment.fulfilled,
          deleteInvestment.fulfilled,
          deleteCycle.fulfilled,
          isCycleExist.fulfilled,
          updateCycle.fulfilled,
          isInvestmentExist.fulfilled,
          updateInvestment.fulfilled,
          isSectionExist.fulfilled,
          getEmployeeDetails.fulfilled,
          isITFormEditable.fulfilled,
          getSectionsHavingInvests.fulfilled,
          editITForm.fulfilled,
          uploadITDeclarationDocument.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getCycles.pending,
          getSections.pending,
          getITDeclarationForm.pending,
          addSection.pending,
          deleteSection.pending,
          updateSection.pending,
          getInvestments.pending,
          addInvestment.pending,
          deleteInvestment.pending,
          addCycle.pending,
          deleteCycle.pending,
          isCycleExist.pending,
          updateCycle.pending,
          isInvestmentExist.pending,
          updateInvestment.pending,
          isSectionExist.pending,
          getEmployeeDetails.pending,
          isITFormEditable.pending,
          getSectionsHavingInvests.pending,
          editITForm.pending,
          uploadITDeclarationDocument.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getCycles.rejected,
          getSections.rejected,
          getITDeclarationForm.rejected,
          deleteSection.rejected,
          addSection.rejected,
          updateSection.rejected,
          getInvestments.rejected,
          addInvestment.rejected,
          deleteInvestment.rejected,
          addCycle.rejected,
          deleteCycle.rejected,
          isCycleExist.rejected,
          updateCycle.rejected,
          isInvestmentExist.rejected,
          updateInvestment.rejected,
          isSectionExist.rejected,
          getEmployeeDetails.rejected,
          isITFormEditable.rejected,
          getSectionsHavingInvests.rejected,
          editITForm.rejected,
          uploadITDeclarationDocument.rejected,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.itDeclarationList.isLoading
const cycles = (state: RootState): Cycle[] => state.itDeclarationList.cycles
const sections = (state: RootState): Section[] =>
  state.itDeclarationList.sections
const itDeclarationForms = (state: RootState): ITForm[] =>
  state.itDeclarationList.itDeclarationForms
const listSize = (state: RootState): number => state.itDeclarationList.listSize
const searchEmployee = (state: RootState): string =>
  state.itDeclarationList.searchEmployee
const pageFromState = (state: RootState): number =>
  state.itDeclarationList.currentPage
const pageSizeFromState = (state: RootState): number =>
  state.itDeclarationList.pageSize
const toggle = (state: RootState): string => state.itDeclarationList.toggle
const investments = (state: RootState): Investment[] =>
  state.itDeclarationList.investments

const itDeclarationListThunk = {
  getCycles,
  getITDeclarationForm,
  addSection,
  deleteSection,
  updateSection,
  getInvestments,
  addInvestment,
  deleteInvestment,
  getSections,
  addCycle,
  deleteCycle,
  isCycleExist,
  updateCycle,
  isInvestmentExist,
  updateInvestment,
  isSectionExist,
  getEmployeeDetails,
  isITFormEditable,
  getSectionsHavingInvests,
  editITForm,
  uploadITDeclarationDocument,
}

const itDeclarationListSelectors = {
  isLoading,
  cycles,
  itDeclarationForms,
  listSize,
  searchEmployee,
  pageFromState,
  pageSizeFromState,
  toggle,
  investments,
  sections,
}

export const itDeclarationListService = {
  ...itDeclarationListThunk,
  actions: itDeclarationListSlice.actions,
  selectors: itDeclarationListSelectors,
}

export default itDeclarationListSlice.reducer
