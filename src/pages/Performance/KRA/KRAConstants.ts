import { emptyString } from '../../../constant/constantData'
import {
  IncomingEmployeeDepartment,
  IncomingKRADesignation,
} from '../../../types/Performance/KRA/KRATypes'

export const selectDepartment = 'Select Department'
export const selectDesignation = 'Select Designation'

export const getDepartmentId = (
  list: IncomingEmployeeDepartment[],
  name: string,
): number => {
  const filteredList = list.find((item) => item.departmentName === name)
  if (!filteredList) {
    return -1
  }
  return filteredList.departmentId
}

export const getDesignationId = (
  list: IncomingKRADesignation[],
  name: string,
): string => {
  const filteredList = list.find((item) => item.name === name)
  if (!filteredList) {
    return emptyString
  }
  return filteredList.id.toString()
}

export const dottedContent = (content: string): string => {
  return content.length > 25 ? content.substring(0, 25) + '...' : content
}
