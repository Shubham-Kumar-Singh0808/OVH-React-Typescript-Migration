import { GetList } from '../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

export const listComposer = (list: [], id: string, name: string): GetList[] =>
  list.map(
    (val) =>
      ({
        id: val[id],
        name: val[name],
      } as GetList),
  )

export const showIsRequired = (value: string): string =>
  value == null || value === '' ? 'text-danger' : 'text-white'

export const downloadFile = (
  excelDownload: Blob | undefined,
  downloadFormat: string,
) => {
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
