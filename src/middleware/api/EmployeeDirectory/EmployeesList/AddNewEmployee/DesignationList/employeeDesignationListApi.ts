import {
  AllowedHttpMethods,
  employeeDesignationListApiConfig,
} from '../../../../apiList'
import {
  EmployeeDepartment,
  EmployeeDesignation,
} from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/DesignationList/employeeDesignationListTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../../../utils/apiUtils'

const getEmployeeDepartments = async (): Promise<
  EmployeeDepartment[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeDesignationListApiConfig.getEmployeeDepartments,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getAllEmployeeDesignations = async (): Promise<
  EmployeeDesignation[] | undefined
> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeDesignationListApiConfig.getAllEmployeeDesignation,
    method: AllowedHttpMethods.get,
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const getEmployeeDesignations = async (
  deptId: number,
): Promise<EmployeeDesignation[] | undefined> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeDesignationListApiConfig.getEmployeeDesignations,
    method: AllowedHttpMethods.get,
    params: {
      deptId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const addEmployeeDesignation = async ({
  departmentId,
  name,
}: EmployeeDesignation): Promise<EmployeeDesignation[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeDesignationListApiConfig.addEmployeeDesignation,
    method: AllowedHttpMethods.post,
    data: {
      departmentId,
      name,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const deleteEmployeeDesignation = async (
  designationId: number,
): Promise<EmployeeDesignation[]> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: employeeDesignationListApiConfig.deleteEmployeeDesignation,
    method: AllowedHttpMethods.delete,
    params: {
      designationId,
    },
  })

  const response = await useAxios(requestConfig)
  return response.data
}

const employeeDesignationListApi = {
  getEmployeeDepartments,
  getEmployeeDesignations,
  getAllEmployeeDesignations,
  addEmployeeDesignation,
  deleteEmployeeDesignation,
}

export default employeeDesignationListApi
