import addNewEmployeeApi from './addNewEmployeeApi'
import getAllHrDataApi from './hrDataApi'
import getAllTechnologyApi from './technologyApi'
import getCountriesApi from './countriesApi'
import getEmployeeDepartmentsApi from './employeeDepartmentsApi'
import reportingManagersApi from './reportingManagersApi'

const employeeAPi = {
  getEmployeeDepartmentsApi,
  getAllTechnologyApi,
  getCountriesApi,
  getAllHrDataApi,
  reportingManagersApi,
  addNewEmployeeApi,
}

export default employeeAPi
