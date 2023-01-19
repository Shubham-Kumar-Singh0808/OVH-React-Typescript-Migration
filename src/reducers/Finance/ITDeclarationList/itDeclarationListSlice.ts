import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
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
  Investment,
  ITDeclarationListApiProps,
  ITDeclarationListSliceState,
  ITForm,
  UpdateSection,
} from '../../../types/Finance/ITDeclarationList/itDeclarationListTypes'

const initialITDeclarationListState: ITDeclarationListSliceState = {
  itDeclarationForms: [],
  listSize: 0,
  searchEmployee: '',
  isLoading: ApiLoadingState.idle,
  error: null,
  cycles: [],
  currentPage: 1,
  pageSize: 20,
  toggle: '',
  investments: [],
  sections: [],
  editDeclarationForm: {} as ITForm,
  isEditITForm: false,
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
    setToggle: (state, action) => {
      state.toggle = action.payload
    },
    setEditDeclarationForm: (state, action) => {
      state.editDeclarationForm = action.payload
    },
    setIsEditITForm: (state) => {
      state.isEditITForm = false
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCycles.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.cycles = action.payload
      })
      .addCase(getSections.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.sections = action.payload
      })
      .addCase(getInvestments.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.investments = action.payload
      })
      .addCase(getITDeclarationForm.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.itDeclarationForms = action.payload.itforms
        state.listSize = action.payload.itformlistsize
      })
      .addCase(addCycle.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
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
const editDeclarationForm = (state: RootState): ITForm =>
  state.itDeclarationList.editDeclarationForm
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
  editDeclarationForm,
}

export const itDeclarationListService = {
  ...itDeclarationListThunk,
  actions: itDeclarationListSlice.actions,
  selectors: itDeclarationListSelectors,
}

export default itDeclarationListSlice.reducer
