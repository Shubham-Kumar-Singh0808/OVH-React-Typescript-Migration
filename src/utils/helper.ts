import moment from 'moment'
import { GetList } from '../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

export const listComposer = (
  list: never[],
  id: string,
  name: string,
): GetList[] => {
  if (list == null || list.length === 0 || !Array.isArray(list)) return []

  return list.map(
    (val) =>
      ({
        id: val[id],
        name: val[name],
      } as GetList),
  )
}

export const showIsRequired = (value: string): string =>
  value == null || value === '' ? 'text-danger' : 'text-white'

export const downloadFile = (
  excelDownload: Blob | undefined,
  downloadFormat: string,
): void => {
  if (excelDownload) {
    const url = window.URL.createObjectURL(
      new Blob([excelDownload], {
        type: excelDownload.type,
      }),
    )
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', downloadFormat)
    document.body.appendChild(link)
    link.click()
    link.remove()
  }
}
export const currentMonthDate = moment().subtract(1, 'months').format('M/YYYY')
export const previousMonthDate = moment().subtract(2, 'months').format('M/YYYY')

const matcher =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

export const isEmail = (value: string): boolean => !matcher.test(value)
