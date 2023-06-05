import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CLink,
} from '@coreui/react-pro'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'

const ProjectHiveActivityTable = (): JSX.Element => {
  const projectHiveActivityReport = useTypedSelector(
    reduxServices.projectTimeSheet.selectors.employeeHiveActivityReport,
  )

  const ManagerReportListSize = useTypedSelector(
    reduxServices.hiveActivityReport.selectors?.managerReportSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.hiveActivityReport.selectors.isLoading,
  )

  const tableHeaderCellPropsDays = {
    width: '3%',
    scope: 'col',
    className: 'text-center',
  }
  const tableHeaderCellPropsName = {
    width: '8%',
    scope: 'col',
  }
  const tableHeaderCellPropsID = {
    width: '4%',
    scope: 'col',
  }
  return (
    <>
      <CTable striped className="time-in-office-table align-middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell {...tableHeaderCellPropsName}>
              ID
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsID}>
              Name
            </CTableHeaderCell>
            {Array.from({ length: 31 }, (_, index) => {
              return (
                <React.Fragment key={index}>
                  <CTableHeaderCell {...tableHeaderCellPropsDays}>
                    {index + 1}
                  </CTableHeaderCell>
                </React.Fragment>
              )
            })}
            <CTableHeaderCell className="text-center" scope="col">
              Total
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        {isLoading !== ApiLoadingState.loading ? (
          <CTableBody>
            {projectHiveActivityReport.length > 0 &&
              projectHiveActivityReport?.map(
                (employeeRecord, employeeRecordIndex) => {
                  const sortedProjectActivityTimes =
                    employeeRecord.activityTimes
                      ?.slice()
                      .sort(
                        (activityItem1, activityItem2) =>
                          activityItem1.dayofMonth - activityItem2.dayofMonth,
                      )
                  return (
                    <CTableRow key={employeeRecordIndex}>
                      <CTableDataCell>{employeeRecord.id}</CTableDataCell>
                      <CTableDataCell>{`${employeeRecord.firstName} ${employeeRecord.lastName}`}</CTableDataCell>
                      {sortedProjectActivityTimes.map((value, index) => {
                        return (
                          <React.Fragment key={index}>
                            {value.hours === '-' ? (
                              <CTableDataCell className="text-center cursor-pointer sh-hive-activity-data-cell">
                                {value.hours}
                              </CTableDataCell>
                            ) : (
                              <CTableDataCell className="text-center">
                                <CLink className="cursor-pointer sh-hive-activity-link">
                                  {value.hours}
                                </CLink>
                              </CTableDataCell>
                            )}
                          </React.Fragment>
                        )
                      })}
                      <CTableDataCell className="text-center">
                        {employeeRecord.totalHiveTime}
                      </CTableDataCell>
                    </CTableRow>
                  )
                },
              )}
          </CTableBody>
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </CTable>
      <strong>
        {projectHiveActivityReport?.length
          ? `Total Records: ${ManagerReportListSize}`
          : `No Records found...`}
      </strong>
    </>
  )
}

export default ProjectHiveActivityTable
