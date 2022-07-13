import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import addTemplateApi from '../../../../middleware/api/Settings/MailConfiguration/AddTemplate/addTemplateApi'
import { AppDispatch, RootState } from '../../../../stateStore'
import { ValidationError } from '../../../../types/commonTypes'
import {
  AddNewTemplate,
  AddTemplateSliceState,
  AssetType,
  AssetTypeResponse,
} from '../../../../types/Settings/MailConfiguration/AddTemplate/addMailTemplateTypes'

const initialAddTemplateState: AddTemplateSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  getAllLookups: {
    assetTypeList: [],
  },
}

const getAssetTypes = createAsyncThunk<
  AssetTypeResponse | undefined,
  void,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('addMailTemplate/getAssetTypes', async (_, thunkApi) => {
  try {
    return await addTemplateApi.getAssetTypes()
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const addNewMailTemplate = createAsyncThunk<
  number | undefined,
  AddNewTemplate,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>(
  'addMailTemplate/addNewMailTemplate',
  async (addTemplate: AddNewTemplate, thunkApi) => {
    try {
      return await addTemplateApi.addNewMailTemplate(addTemplate)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addMailTemplateSlice = createSlice({
  name: 'addMailTemplate',
  initialState: initialAddTemplateState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAssetTypes.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.getAllLookups.assetTypeList = action.payload
          ?.assetTypeList as AssetType[]
      })
      .addCase(addNewMailTemplate.fulfilled, (state) => {
        state.isLoading = ApiLoadingState.succeeded
      })
      .addMatcher(
        isAnyOf(getAssetTypes.pending, addNewMailTemplate.pending),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(getAssetTypes.rejected, addNewMailTemplate.rejected),
        (state, action) => {
          state.isLoading = ApiLoadingState.failed
          state.error = action.payload as ValidationError
        },
      )
  },
})

const assetTypes = (state: RootState): AssetType[] =>
  state.addMailTemplate.getAllLookups.assetTypeList

const addMailTemplateThunk = {
  getAssetTypes,
  addNewMailTemplate,
}

const addTemplateSelectors = {
  assetTypes,
}

export const addTemplateService = {
  ...addMailTemplateThunk,
  actions: addMailTemplateSlice.actions,
  selectors: addTemplateSelectors,
}

export default addMailTemplateSlice.reducer
