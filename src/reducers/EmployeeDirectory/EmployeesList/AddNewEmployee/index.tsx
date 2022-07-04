import { addEmployeeService } from './addNewEmployeeSlice'
import { countryService } from './countriesSlice'
import { employeeDepartmentsService } from './getEmployeeDepartmentsSlice'
import { employmentService } from './getEmploymentSlice'
import { hrDataService } from './hrDataSlice'
import { jobTypeService } from './getJobTypeSlice'
import { reportingManagersService } from './reportingManagersSlice'
import { technologyService } from './getAllTechnologySlice'
import { userervice } from './userSlice'

const addNewEmployeeService = {
  employeeDepartmentsService,
  technologyService,
  countryService,
  hrDataService,
  reportingManagersService,
  addEmployeeService,
  employmentService,
  jobTypeService,
  userervice,
}

export default addNewEmployeeService
