import moment from 'moment'
import { GetList } from '../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import {
  MappedTabs,
  MyProfileTabList,
} from '../types/MyProfile/ProfileLandingPage/myProfileTabsTypes'
import { UserAccessToFeatures } from '../types/Settings/UserRolesConfiguration/userAccessToFeaturesTypes'

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

export const deviceLocale: string =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language

export const mapTabsToFeatures = (
  TabsLabels: MyProfileTabList[],
  filteredTabs: UserAccessToFeatures[],
): MappedTabs[] => {
  return TabsLabels.map((currTab) => {
    const filteredFeatureTab = filteredTabs.find(
      (currFeatureTab) =>
        currFeatureTab.name === currTab.label &&
        currFeatureTab.viewaccess === true,
    )
    if (filteredFeatureTab !== undefined) {
      return {
        ...currTab,
        ...filteredFeatureTab,
      }
    }
    return { id: -1, tabName: '', label: '' }
  })
}

// Utilized in New Event Child Components for formatting time
export const convertTime = (timeString: string): string => {
  const [time, modifier] = timeString.split(' ')
  /*eslint prefer-const: ["error", {"destructuring": "all"}]*/
  let [hours, minutes] = time.split(':')
  if (hours === '12') {
    hours = '00'
  }
  if (modifier === 'PM') {
    hours = String(parseInt(hours, 10) + 12)
  }
  return `${hours}:${minutes}`
}
