import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { AppDispatch, RootState } from '../../../stateStore'
import { ValidationError } from '../../../types/commonTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import {
  AddTemplateSliceState,
  MailTemplateType,
} from '../../../types/MailConfiguration/AddTemplate/addMailTemplateTypes'
import addTemplateApi from '../../../middleware/api/MailConfiguration/AddTemplate/addTemplateApi'

const initialAddTemplateState: AddTemplateSliceState = {
  mailTemplateTypes: [],
  isLoading: ApiLoadingState.idle,
  error: null,
}

const getMailTemplateType = createAsyncThunk<
  MailTemplateType[] | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('addMailTemplate/getMailTemplateType', async (_, thunkApi) => {
  try {
    return await addTemplateApi.getMailTemplateType()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const addNewMailTemplateSlice = createSlice({
  name: 'addMailTemplate',
  initialState: initialAddTemplateState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMailTemplateType.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.mailTemplateTypes = action.payload as MailTemplateType[]
      })
      .addMatcher(isAnyOf(getMailTemplateType.pending), (state) => {
        state.isLoading = ApiLoadingState.loading
      })
      .addMatcher(isAnyOf(getMailTemplateType.rejected), (state, action) => {
        state.isLoading = ApiLoadingState.failed
        state.error = action.payload as ValidationError
      })
  },
})

const templateTypes = (state: RootState): MailTemplateType[] =>
  state.addNewMailTemplate.mailTemplateTypes

export const addMailTemplateThunk = {
  getMailTemplateType,
}

export const addTemplateSelectors = {
  templateTypes,
}

export const addTemplateService = {
  ...addMailTemplateThunk,
  actions: addNewMailTemplateSlice.actions,
  selectors: addTemplateSelectors,
}

export default addNewMailTemplateSlice.reducer
