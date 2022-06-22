import addNewEmployeeApi from './addNewEmployeeApi'
import getAllEmploymentTypeApi from './employmentApi'
import getAllHrDataApi from './hrDataApi'
import getAllTechnologyApi from './technologyApi'
import getCountriesApi from './countriesApi'
import getEmployeeDepartmentsApi from './employeeDepartmentsApi'
import getJobTypesApi from './jobTypeApi'
import reportingManagersApi from './reportingManagersApi'

const employeeAPi = {
  getEmployeeDepartmentsApi,
  getAllTechnologyApi,
  getCountriesApi,
  getAllEmploymentTypeApi,
  getAllHrDataApi,
  reportingManagersApi,
  addNewEmployeeApi,
  getJobTypesApi,
}

export default employeeAPi
