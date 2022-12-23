import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { myKRAsApi } from '../../../middleware/api/Performance/MyKRAs/myKRAsApi'
import { AppDispatch, RootState } from '../../../stateStore'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import {
  KPIs,
  KRAs,
  MyKRAsSliceState,
} from '../../../types/Performance/MyKRAs/myKRAsTypes'

const initialKRAsState: MyKRAsSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  kras: [],
  kpis: [],
}

const getKRAForIndividualEmployee = createAsyncThunk<
  KRAs[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('myKRAs/getKRAForIndividualEmployee', async (personId: number, thunkApi) => {
  try {
    return await myKRAsApi.getKRAForIndividualEmployee(personId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const getKPIsForIndividualEmployee = createAsyncThunk<
  KPIs[] | undefined,
  number,
  {
    dispatch: AppDispatch
    state: RootState
    rejectValue: ValidationError
  }
>('myKRAs/getKPIsForIndividualEmployee', async (kraId: number, thunkApi) => {
  try {
    return await myKRAsApi.getKPIsForIndividualEmployee(kraId)
  } catch (error) {
    const err = error as AxiosError
    return thunkApi.rejectWithValue(err.response?.status as ValidationError)
  }
})

const myKRAsSlice = createSlice({
  name: 'myKRAs',
  initialState: initialKRAsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKRAForIndividualEmployee.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.kras = action.payload as KRAs[]
      })
      .addCase(getKPIsForIndividualEmployee.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.kpis = action.payload as KPIs[]
      })
      .addMatcher(
        isAnyOf(
          getKRAForIndividualEmployee.pending,
          getKPIsForIndividualEmployee.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getKRAForIndividualEmployee.rejected,
          getKPIsForIndividualEmployee.rejected,
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
const kras = (state: RootState): KRAs[] => state.myKRAs.kras
const kpis = (state: RootState): KPIs[] => state.myKRAs.kpis

const myKRAsThunk = {
  getKRAForIndividualEmployee,
  getKPIsForIndividualEmployee,
}

const myKRAsSelectors = {
  isLoading,
  kras,
  kpis,
}

export const myKRAsService = {
  ...myKRAsThunk,
  actions: myKRAsSlice.actions,
  selectors: myKRAsSelectors,
}

export default myKRAsSlice.reducer
