import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { LoadingState, ValidationError } from '../../../types/commonTypes'
import expensesFormApi from '../../../middleware/api/ExpenseManagement/ExpenseForm/expenseFormApi'
import {
  GetExpenseFormDetailsResponse,
  AddExpenseParams,
  AddExpenseResponse,
  AuthorizedEmployee,
  CategoryListResponse,
  CountriesListResponse,
  CreditCardListResponse,
  CurrencyListResponse,
  EmpDepartmentListResponse,
  InitialExpenseFormSliceState,
  PaymentListResponse,
  ProjectsListResponse,
  SubCategoryListResponse,
  VendorListResponse,
} from '../../../types/ExpenseManagement/ExpenseForm/expenseFormTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { RootState } from '../../../stateStore'

const getCategoriesList = createAsyncThunk(
  '/ExpenseManagement/getCategoryList',
  async (_, thunkApi) => {
    try {
      return await expensesFormApi.getCategoryDetails()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmpDepartmentsList = createAsyncThunk(
  '/assetManagement/getEmpDepartments',
  async (_, thunkApi) => {
    try {
      return await expensesFormApi.getDepartmentsDetails()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getCurrenciesList = createAsyncThunk(
  '/ExpenseManagement/getCurrencyList',
  async (_, thunkApi) => {
    try {
      return await expensesFormApi.getCurrencyDetails()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getPaymentsList = createAsyncThunk(
  '/ExpenseManagement/getPaymentList',
  async (_, thunkApi) => {
    try {
      return await expensesFormApi.getPaymentDetails()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getCountriesList = createAsyncThunk(
  '/ExpenseManagement/getCountries',
  async (_, thunkApi) => {
    try {
      return await expensesFormApi.getCountryDetails()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getEmployeesList = createAsyncThunk(
  '/jobapplicant/getAllProfileEmployeesData',
  async (searchStr: string, thunkApi) => {
    try {
      return await expensesFormApi.getAllEmployeesList(searchStr)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getSubCategoriesList = createAsyncThunk(
  '/ExpenseManagement/getSubCategories',
  async (categoryId: string, thunkApi) => {
    try {
      return await expensesFormApi.getSubCategoryList(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const editCategories = createAsyncThunk(
  '/ExpenseManagement/editCategory',
  async (categoryId: string, thunkApi) => {
    try {
      return await expensesFormApi.editCategory(categoryId)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getProjectsList = createAsyncThunk(
  '/ExpenseManagement/getMatchedProjects',
  async (projectName: string, thunkApi) => {
    try {
      return await expensesFormApi.projectsList(projectName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getVendorsList = createAsyncThunk(
  '/ExpenseManagement/getVendorList',
  async (vendorName: string, thunkApi) => {
    try {
      return await expensesFormApi.vendorsList(vendorName)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getCreditCardsDetails = createAsyncThunk(
  '/ExpenseManagement/getCardsList',
  async (_, thunkApi) => {
    try {
      return await expensesFormApi.getCreditCardsList()
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const addExpensesList = createAsyncThunk(
  '/ExpenseManagement/addExpenses',
  async (expensesForm: AddExpenseResponse, thunkApi) => {
    try {
      return await expensesFormApi.addExpenseFormDetails(expensesForm)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

const getExpensesList = createAsyncThunk(
  '/ExpenseManagement/getExpensesList',
  async (expensesList: AddExpenseParams, thunkApi) => {
    try {
      return await expensesFormApi.getExpenseListDetails(expensesList)
    } catch (error) {
      const err = error as AxiosError
      return thunkApi.rejectWithValue(err.response?.status as ValidationError)
    }
  },
)

export const initialExpenseFormState: InitialExpenseFormSliceState = {
  isLoading: ApiLoadingState.idle,
  error: null,
  categoriesList: [],
  empDepartments: [],
  currencyList: [],
  paymentList: [],
  countriesList: [],
  employeesList: [],
  subCategoriesList: [],
  projectsList: [],
  vendorsList: [],
  creditCardsList: [],
  addExpensesList: {} as AddExpenseResponse,
  expensesList: [],
}

const expenseFormSlice = createSlice({
  name: 'expenseForm',
  initialState: initialExpenseFormState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.categoriesList = action.payload
      })
      .addCase(getEmpDepartmentsList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.empDepartments = action.payload
      })
      .addCase(getCurrenciesList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.currencyList = action.payload
      })
      .addCase(getPaymentsList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.paymentList = action.payload
      })
      .addCase(getCountriesList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.countriesList = action.payload
      })
      .addCase(getEmployeesList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.employeesList = action.payload
      })
      .addCase(getSubCategoriesList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.subCategoriesList = action.payload
      })
      .addCase(getCreditCardsDetails.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.creditCardsList = action.payload
      })
      .addCase(getProjectsList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.projectsList = action.payload
      })
      .addCase(getVendorsList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.vendorsList = action.payload
      })
      .addCase(getExpensesList.fulfilled, (state, action) => {
        state.isLoading = ApiLoadingState.succeeded
        state.expensesList = action.payload
      })
      .addMatcher(
        isAnyOf(editCategories.fulfilled, addExpensesList.fulfilled),
        (state) => {
          state.isLoading = ApiLoadingState.succeeded
        },
      )
      .addMatcher(
        isAnyOf(
          getCategoriesList.pending,
          getEmpDepartmentsList.pending,
          getCurrenciesList.pending,
          getCountriesList.pending,
          getPaymentsList.pending,
          getEmployeesList.pending,
          getSubCategoriesList.pending,
          editCategories.pending,
          getProjectsList.pending,
          getVendorsList.pending,
          getCreditCardsDetails.pending,
          addExpensesList.pending,
          getExpensesList.pending,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.loading
        },
      )
      .addMatcher(
        isAnyOf(
          getCategoriesList.rejected,
          getEmpDepartmentsList.rejected,
          getCurrenciesList.rejected,
          getCountriesList.rejected,
          getPaymentsList.rejected,
          getEmployeesList.rejected,
          getSubCategoriesList.rejected,
          editCategories.rejected,
          getProjectsList.rejected,
          getVendorsList.rejected,
          getCreditCardsDetails.rejected,
          addExpensesList.rejected,
          getExpensesList.rejected,
        ),
        (state) => {
          state.isLoading = ApiLoadingState.failed
        },
      )
  },
})

const isLoading = (state: RootState): LoadingState =>
  state.expenseForm.isLoading
const categoryList = (state: RootState): CategoryListResponse[] =>
  state.expenseForm.categoriesList
const departmentList = (state: RootState): EmpDepartmentListResponse[] =>
  state.expenseForm.empDepartments
const currenciesList = (state: RootState): CurrencyListResponse[] =>
  state.expenseForm.currencyList
const paymentsList = (state: RootState): PaymentListResponse[] =>
  state.expenseForm.paymentList
const countriesList = (state: RootState): CountriesListResponse[] =>
  state.expenseForm.countriesList
const employeesList = (state: RootState): AuthorizedEmployee[] =>
  state.expenseForm.employeesList
const subCategoryList = (state: RootState): SubCategoryListResponse[] =>
  state.expenseForm.subCategoriesList
const allProjectsList = (state: RootState): ProjectsListResponse[] =>
  state.expenseForm.projectsList
const allVendorsList = (state: RootState): VendorListResponse[] =>
  state.expenseForm.vendorsList
const creditCards = (state: RootState): CreditCardListResponse[] =>
  state.expenseForm.creditCardsList

const expenseFormThunk = {
  getCategoriesList,
  getEmpDepartmentsList,
  getCurrenciesList,
  getCountriesList,
  getPaymentsList,
  getEmployeesList,
  getSubCategoriesList,
  editCategories,
  getProjectsList,
  getVendorsList,
  getCreditCardsDetails,
  addExpensesList,
  getExpensesList,
}

const expenseFormSelectors = {
  isLoading,
  categoryList,
  departmentList,
  currenciesList,
  paymentsList,
  countriesList,
  employeesList,
  subCategoryList,
  allProjectsList,
  allVendorsList,
  creditCards,
}

export const expenseFormService = {
  ...expenseFormThunk,
  actions: expenseFormSlice.actions,
  selectors: expenseFormSelectors,
}

export default expenseFormSlice.reducer
