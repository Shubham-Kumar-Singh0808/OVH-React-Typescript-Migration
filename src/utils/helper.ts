import moment from 'moment'
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

export const currentMonthDate = moment().subtract(1, 'months').format('M/YYYY')
export const previousMonthDate = moment().subtract(2, 'months').format('M/YYYY')
