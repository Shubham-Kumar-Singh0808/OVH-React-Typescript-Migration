import moment from 'moment'
import { EmployeeReport } from '../../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'
import {
  AttendanceRecord,
  EmployeeAttendance,
  GetMyAttendanceProps,
} from '../../../../types/TimeAndAttendance/MyAttendance/myAttendanceTypes'
import {
  getAuthenticatedRequestConfig,
  useAxios,
} from '../../../../utils/apiUtils'
import { AllowedHttpMethods, myAttendanceApiConfig } from '../../apiList'

const getMyAttendance = async (
  props: GetMyAttendanceProps,
): Promise<EmployeeAttendance> => {
  const requestConfig = getAuthenticatedRequestConfig({
    url: myAttendanceApiConfig.getMyAttendance,
    method: AllowedHttpMethods.get,
    params: {
      start: props.start,
      end: props.end,
      employeeId: props.loggedInEmployeeId,
    },
  })

  const response = await useAxios(requestConfig)

  return response.data.map((item: AttendanceRecord) => {
    const itemCopy = item
    if (!itemCopy.start.includes('-')) {
      itemCopy.start = moment(item.start, 'DD MMM YYYY').format('YYYY-MM-DD')
    }
    return itemCopy
  })
}

const myAttendanceApi = { getMyAttendance }

export default myAttendanceApi
