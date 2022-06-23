import { GetList } from '../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

export const listComposer = (list: [], id: string, name: string) =>
  list.map(
    (val) =>
      ({
        id: val[id],
        name: val[name],
      } as GetList),
  )

export const showIsRequired = (value: string): string =>
  value == null || value === '' ? 'text-danger' : 'text-white'
