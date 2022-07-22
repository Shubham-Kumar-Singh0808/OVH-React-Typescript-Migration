import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../../stateStore'
import {
  MailTemplateType,
  MailTemplateTypeState,
} from '../../../../types/Settings/MailConfiguration/AddMailTemplateType/addTemplateType'
import { LoadingState, ValidationError } from '../../../../types/commonTypes'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import mailTemplateTypeApi from '../../../../middleware/api/Settings/MailConfiguration/AddMailTemplateType/addMailTemplateTypeApi'

const getMailTemplateTypes = createAsyncThunk(
  'emailTemplate/getMailTemplateTypes',
  async (_, thunkApi) => {
    try {
      return await mailTemplateTypeApi.getMailTemplateTypes()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addMailTemplateType = createAsyncThunk<
  MailTemplateType[] | undefined,
  string,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('emailTemplate/addMailTemplateType', async (name, thunkApi) => {
  try {
    return await mailTemplateTypeApi.addMailTemplateType(name)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const deleteMailTemplateType = createAsyncThunk<
  MailTemplateType[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('emailTemplate/deleteMailTemplateType', async (id, thunkApi) => {
  try {
    return await mailTemplateTypeApi.deleteMailTemplateType(id)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const initialMailTemplateTypeState: MailTemplateTypeState = {
  mailTemplateType: [],
  isLoading: ApiLoadingState.idle,
  currentPage: 1,
  pageSize: 20,
}

const mailTemplateSliceSlice = createSlice({
  name: 'category',
  initialState: initialMailTemplateTypeState,
  reducers: {
    clearCategories: (state) => {
      state.mailTemplateType = []
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        isAnyOf(
          getMailTemplateTypes.pending,
          addMailTemplateType.pending,
          deleteMailTemplateType.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getMailTemplateTypes.fulfilled,
          addMailTemplateType.fulfilled,
          deleteMailTemplateType.fulfilled,
        ),
        (state, action) => {
          state.isLoading = ApiLoadingState.succeeded
          state.mailTemplateType = action.payload as MailTemplateType[]
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState => state.category.isLoading
const mailTemplateType = (state: RootState): MailTemplateType[] =>
  state.addMailTemplateType.mailTemplateType
const pageFromState = (state: RootState): number => state.category.currentPage
const pageSizeFromState = (state: RootState): number => state.category.pageSize

const mailTemplateTypeThunk = {
  getMailTemplateTypes,
  addMailTemplateType,
  deleteMailTemplateType,
}

const mailTemplateSelectors = {
  isLoading,
  mailTemplateType,
  pageFromState,
  pageSizeFromState,
}

export const mailTemplateTypeService = {
  ...mailTemplateTypeThunk,
  actions: mailTemplateSliceSlice.actions,
  selectors: mailTemplateSelectors,
}

export default mailTemplateSliceSlice.reducer
