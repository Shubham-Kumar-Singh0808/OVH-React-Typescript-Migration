import { countryService } from './countriesSlice'
import { employeeDepartmentsService } from './getEmployeeDepartmentsSlice'
import { hrDataService } from './hrDataSlice'
import { technologyService } from './getAllTechnologySlice'

const addNewEmployeeService = {
  employeeDepartmentsService,
  technologyService,
  countryService,
  hrDataService,
}

export default addNewEmployeeService
