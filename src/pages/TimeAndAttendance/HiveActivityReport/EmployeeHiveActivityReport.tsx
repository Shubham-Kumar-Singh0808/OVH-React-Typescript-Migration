import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeHiveActivityReport = (): JSX.Element => {
  const employeeHiveActivityReport = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.employeeHiveActivityReport,
  )
  return (
    <>
      <CTable striped className="time-in-office-table">
        <CTableHead>
          <CTableRow>
            {employeeHiveActivityReport.activityTimes.map(
              (currentActivity, index) => {
                return (
                  <CTableHeaderCell
                    key={index}
                    scope="col"
                    className="text-center"
                  >
                    {currentActivity.dayofMonth}
                  </CTableHeaderCell>
                )
              },
            )}
            <CTableHeaderCell className="text-center" scope="col">
              Total
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            {employeeHiveActivityReport.activityTimes.map((activity, index) => {
              return (
                <CTableDataCell className="text-center" key={index}>
                  {activity.hours}
                </CTableDataCell>
              )
            })}
            <CTableDataCell className="text-center">
              {employeeHiveActivityReport.totalHiveTime}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default EmployeeHiveActivityReport
