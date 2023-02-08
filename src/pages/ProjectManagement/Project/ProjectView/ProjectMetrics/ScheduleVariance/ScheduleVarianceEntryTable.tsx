import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../../stateStore'

const ScheduleVarianceEntryTable = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  const getProjectOverallScheduleVariance = useTypedSelector(
    reduxServices.scheduleVariance.selectors.projectOverallScheduleVariance,
  )
  useEffect(() => {
    dispatch(
      reduxServices.scheduleVariance.getOverAllScheduleVariance(projectId),
    )
  }, [])
  return (
    <>
      <CTable striped responsive className="sh-project-report-details">
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              BaseLine Start Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              BaseLine End Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Actual/Projected Start Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Actual/Projected End Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Status
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              SV in %
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Comments
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Submitted By
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Submitted Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Submitted Time
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getProjectOverallScheduleVariance?.length > 0 &&
            getProjectOverallScheduleVariance?.map((projectSchedule, i) => {
              return (
                <CTableRow col-span={7} key={i}>
                  <CTableDataCell>{i + 1}</CTableDataCell>
                  <CTableDataCell>
                    {projectSchedule.baseLineStartDate}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectSchedule.baseLineEndDate}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectSchedule.overAllSheduleVariance}
                  </CTableDataCell>
                  <CTableDataCell>{projectSchedule.comments}</CTableDataCell>
                  <CTableDataCell>
                    {projectSchedule.employeeName}
                  </CTableDataCell>
                  <CTableDataCell>{projectSchedule.createdDate}</CTableDataCell>
                  <CTableDataCell>{projectSchedule.createdTime}</CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default ScheduleVarianceEntryTable
