import axios from 'axios'
import { employeeAllocationApiConfig, AllowedHttpMethods } from '../../apiList'
import { getAuthenticatedRequestConfig } from '../../../../utils/apiUtils'
import {
  EmployeeAllocationReportProps,
  EmployeeAllocationReportType,
  ProjectUnderEmployees,
  ProjectUnderEmployeesProps,
  UpdateEmployeeAllocationProject,
} from '../../../../types/ProjectManagement/EmployeeAllocation/employeeAllocationTypes'

const commonParamsUtil = (props: EmployeeAllocationReportProps) => {
  return {
    Billingtype: props.Billingtype ?? '',
    EmployeeStatus: props.EmployeeStatus ?? '',
    dateSelection: props.dateSelection ?? '',
    departmentNames: String(props.departmentNames ?? ''),
    employeeName: props.employeeName ?? '',
    endIndex: props.endIndex ?? 20,
    enddate: props.enddate ?? '',
    firstIndex: props.firstIndex ?? 0,
    startdate: props.startdate ?? '',
    technology: props.technology ?? '',
  }
}

const getEmployeeAllocationReport = async (
  props: EmployeeAllocationReportProps,
): Promise<EmployeeAllocationReportType> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAllocationApiConfig.getEmployeeAllocationReport,
    method: AllowedHttpMethods.get,
    params: commonParamsUtil(props),
  })
  const response = await axios(requestConfig)
  return response.data
}

const projectUnderEmployeesReport = async (
  props: ProjectUnderEmployeesProps,
): Promise<ProjectUnderEmployees[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAllocationApiConfig.projectUnderEmployees,
    method: AllowedHttpMethods.get,
    params: {
      dateSelection: props.dateSelection ?? '',
      employeeid: props.employeeid ?? '',
      enddate: props.enddate ?? '',
      isAllocated: props.isAllocated ?? '',
      isBillale: props.isBillale ?? '',
      startdate: props.startdate ?? '',
    },
  })
  const response = await axios(requestConfig)
  return response.data
}

const updateEmployeeAllocationProject = async (
  updateEmployeeAllocation: UpdateEmployeeAllocationProject,
): Promise<number | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeAllocationApiConfig.updateEmployeeAllocateProject,
    method: AllowedHttpMethods.post,
    data: updateEmployeeAllocation,
  })
  const response = await axios(requestConfig)
  return response.data
}

const employeeAllocationReportApi = {
  getEmployeeAllocationReport,
  projectUnderEmployeesReport,
  updateEmployeeAllocationProject,
}

export default employeeAllocationReportApi
