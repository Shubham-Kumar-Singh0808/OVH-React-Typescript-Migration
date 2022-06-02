import { countryService } from './countriesSlice'
import { employeeDepartmentsService } from './getEmployeeDepartmentsSlice'
import { technologyService } from './getAllTechnologySlice'

const addNewEmployeeService = {
  employeeDepartmentsService,
  technologyService,
  countryService,
}

export default addNewEmployeeService
