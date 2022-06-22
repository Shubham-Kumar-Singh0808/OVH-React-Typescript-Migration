import { addEmployeeService } from './addNewEmployeeSlice'
import { countryService } from './countriesSlice'
import { employeeDepartmentsService } from './getEmployeeDepartmentsSlice'
import { hrDataService } from './hrDataSlice'
import { reportingManagersService } from './reportingManagersSlice'
import { technologyService } from './getAllTechnologySlice'

const addNewEmployeeService = {
  employeeDepartmentsService,
  technologyService,
  countryService,
  hrDataService,
  reportingManagersService,
  addEmployeeService,
}

export default addNewEmployeeService
