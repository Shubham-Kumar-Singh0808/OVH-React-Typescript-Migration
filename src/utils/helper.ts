import { GetList } from '../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

export const listComposer = (list: [], id: string, name: string) =>
  list.map(
    (val) =>
      ({
        id: val[id],
        name: val[name],
      } as GetList),
  )
