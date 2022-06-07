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
}

export default addNewEmployeeService
