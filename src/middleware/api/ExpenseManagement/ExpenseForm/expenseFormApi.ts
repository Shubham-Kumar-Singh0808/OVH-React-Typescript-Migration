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
  PaymentListResponse,
  ProjectsListResponse,
  SubCategoryListResponse,
  VendorListResponse,
} from '../../../../types/ExpenseManagement/ExpenseForm/expenseFormTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, expenseFormApiConfig } from '../../apiList'

const getCategoryDetails = async (): Promise<CategoryListResponse[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getCategoryList,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getDepartmentsDetails = async (): Promise<
  EmpDepartmentListResponse[]
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getEmpDepartments,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getCurrencyDetails = async (): Promise<CurrencyListResponse[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getCurrencyList,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getPaymentDetails = async (): Promise<PaymentListResponse[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getPaymentList,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getCountryDetails = async (): Promise<CountriesListResponse[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getCountries,
    method: AllowedHttpMethods.get,
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getAllEmployeesList = async (
  searchString: string,
): Promise<AuthorizedEmployee[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getEmployeeList,
    method: AllowedHttpMethods.get,
    params: {
      searchStr: searchString,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const editCategory = async (
  categoryId: string,
): Promise<CategoryListResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.editCategory,
    method: AllowedHttpMethods.get,
    params: { categoryId },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getSubCategoryList = async (
  categoryId: string,
): Promise<SubCategoryListResponse[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getSubCategories,
    method: AllowedHttpMethods.get,
    params: { categoryId },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const projectsList = async (
  searchString: string,
): Promise<ProjectsListResponse[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getMatchedProjects,
    method: AllowedHttpMethods.get,
    params: {
      searchStr: searchString,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const vendorsList = async (
  searchStrings: string,
): Promise<VendorListResponse[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getVendorList,
    method: AllowedHttpMethods.get,
    params: {
      searchStr: searchStrings,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getCreditCardsList = async (): Promise<CreditCardListResponse[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getCardsList,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addExpenseFormDetails = async (
  expenseForm: AddExpenseResponse,
): Promise<AddExpenseResponse> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.addExpenses,
    method: AllowedHttpMethods.post,
    data: {
      expenseForm,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const getExpenseListDetails = async (
  expenseList: AddExpenseParams,
): Promise<GetExpenseFormDetailsResponse[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: expenseFormApiConfig.getExpensesList,
    method: AllowedHttpMethods.get,
    params: {
      categoryId: expenseList.categoryId,
      country: expenseList.country,
      dateSelection: expenseList.dateSelection,
      departmentId: expenseList.departmentId,
      endIndex: expenseList.endIndex,
      from: expenseList.from,
      multipleSearch: expenseList.multipleSearch,
      paymentMode: expenseList.paymentMode,
      startIndex: expenseList.startIndex,
      subCategoryId: expenseList.subCategoryId,
      to: expenseList.to,
    },
  })
  const response = await useAxios(requestConfig)
  return response.data
}

const expensesFormApi = {
  getCategoryDetails,
  getDepartmentsDetails,
  getCurrencyDetails,
  getPaymentDetails,
  getCountryDetails,
  getAllEmployeesList,
  getSubCategoryList,
  editCategory,
  projectsList,
  vendorsList,
  getCreditCardsList,
  addExpenseFormDetails,
  getExpenseListDetails,
}

export default expensesFormApi
