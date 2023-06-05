import { emptyString } from '../../../constant/constantData'
import {
  IncomingEmployeeDepartment,
  IncomingKRADesignation,
} from '../../../types/Performance/KRA/KRATypes'

export const selectDepartment = 'Select Department'
export const selectDesignation = 'Select Designation'
export const KRAFormLabelClass = 'col-sm-3 col-form-label text-end'

export const regexAlphanumeric = /^[\w\-\s]+$/
export const regexNumberOnly = /^\d\d[1-9]$/ ///[^1-9]\d/gi
export type ModalContent = string | JSX.Element | JSX.Element[]
export const getDepartmentId = (
  list: IncomingEmployeeDepartment[],
  name: string,
): number => {
  const filteredList = list?.find((item) => item.departmentName === name)
  if (!filteredList) {
    return -1
  }
  return filteredList.departmentId
}

export const getDesignationId = (
  list: IncomingKRADesignation[],
  name: string,
): string => {
  const filteredList = list?.find((item) => item.name === name)
  if (!filteredList) {
    return emptyString
  }
  return filteredList.id.toString()
}

export const dottedContent = (content: string): string => {
  return content?.length > 25 ? content.substring(0, 25) + '...' : content
}

export const canPercentageBeAdded = (
  incomingValue: number,
  enteredValue: number,
): boolean => {
  if (incomingValue === -1 || enteredValue === 0) {
    return true
  }
  return enteredValue <= 100 - incomingValue
}

export const canNewPercentBeUpdatedKRA = (
  incomingValue: number,
  previousValue: number,
  newValue: number,
): boolean => {
  //This case is if new incoming api value is 100 or edited value is same as rendered value
  if (incomingValue >= 100 || newValue === previousValue) {
    return newValue <= previousValue
  }
  // If user enters greater value than the rendered value
  if (newValue > previousValue) {
    return newValue <= 100 - incomingValue + previousValue
  }
  // if user enters lower value than the rendered value
  return previousValue >= newValue
}
