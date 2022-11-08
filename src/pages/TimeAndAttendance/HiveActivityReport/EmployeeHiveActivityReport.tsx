import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CLink,
} from '@coreui/react-pro'
import React from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EmployeeHiveActivityReport = (): JSX.Element => {
  const employeeHiveActivityReport = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.employeeHiveActivityReport,
  )

  const isLoading = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.isLoading,
  )

  return (
    <>
      <CTable striped className="time-in-office-table">
        <CTableHead>
          <CTableRow>
            {Array.from({ length: 31 }, (_, index) => {
              return (
                <CTableHeaderCell
                  className="text-center"
                  key={index}
                  scope="col"
                >
                  {index + 1}
                </CTableHeaderCell>
              )
            })}
            <CTableHeaderCell className="text-center" scope="col">
              Total
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        {isLoading !== ApiLoadingState.loading ? (
          <CTableBody>
            <CTableRow>
              {employeeHiveActivityReport.activityTimes
                ?.slice()
                .sort(
                  (activityItem1, activityItem2) =>
                    activityItem1.dayofMonth - activityItem2.dayofMonth,
                )
                .map((activity, index) => {
                  return (
                    <React.Fragment key={index}>
                      {activity.hours === '-' ? (
                        <CTableDataCell className="text-center cursor-pointer sh-hive-activity-data-cell">
                          {activity.hours}
                        </CTableDataCell>
                      ) : (
                        <CTableDataCell className="text-center">
                          <CLink className="cursor-pointer sh-hive-activity-link">
                            {activity.hours}
                          </CLink>
                        </CTableDataCell>
                      )}
                    </React.Fragment>
                  )
                })}
              <CTableDataCell className="text-center">
                {employeeHiveActivityReport.totalHiveTime}
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </CTable>
    </>
  )
}

export default EmployeeHiveActivityReport
