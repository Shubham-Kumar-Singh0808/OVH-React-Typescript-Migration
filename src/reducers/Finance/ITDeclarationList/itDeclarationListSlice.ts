import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { itDeclarationListApi } from '../../../middleware/api/Finance/ITDeclarationList/itDeclarationListApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  AddSection,
  Cycle,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCycles.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.cycles = action.payload
      })
      .addCase(getITDeclarationForm.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.itDeclarationForms = action.payload.itforms
        state.listSize = action.payload.itformlistsize
      })
      .addMatcher(
        isAnyOf(
          addSection.fulfilled,
          deleteSection.fulfilled,
          updateSection.fulfilled,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getCycles.pending,
          getITDeclarationForm.pending,
          addSection.pending,
          deleteSection.pending,
          updateSection.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getCycles.rejected,
          getITDeclarationForm.rejected,
          deleteSection.rejected,
          addSection.rejected,
          updateSection.rejected,
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

const itDeclarationListThunk = {
  getCycles,
  getITDeclarationForm,
  addSection,
  deleteSection,
  updateSection,
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
}

export const itDeclarationListService = {
  ...itDeclarationListThunk,
  actions: itDeclarationListSlice.actions,
  selectors: itDeclarationListSelectors,
}

export default itDeclarationListSlice.reducer
