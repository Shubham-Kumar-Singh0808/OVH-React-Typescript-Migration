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

const ScheduleVarianceTable = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  const getProjectScheduleVariance = useTypedSelector(
    reduxServices.scheduleVariance.selectors.projectScheduleVariance,
  )
  useEffect(() => {
    dispatch(reduxServices.scheduleVariance.getScheduleVariance(projectId))
  }, [])
  return (
    <>
      {getProjectScheduleVariance.length > 0 ? (
        <CTable striped responsive className="sh-project-report-details">
          <CTableHead className="profile-tab-header">
            <CTableRow>
              <CTableHeaderCell scope="col" className="profile-tab-content">
                #
              </CTableHeaderCell>
              <CTableHeaderCell scope="col" className="profile-tab-content">
                Sprint
              </CTableHeaderCell>
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
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {getProjectScheduleVariance?.length > 0 &&
              getProjectScheduleVariance?.map((projectSchedule, i) => {
                return (
                  <CTableRow col-span={7} key={i}>
                    <CTableDataCell>{i + 1}</CTableDataCell>
                    <CTableDataCell>
                      {projectSchedule.versionName}
                    </CTableDataCell>
                    <CTableDataCell>
                      {projectSchedule.baseLineStartDate}
                    </CTableDataCell>
                    <CTableDataCell>
                      {projectSchedule.baseLineEndDate}
                    </CTableDataCell>
                    <CTableDataCell>
                      {projectSchedule.projectedStartDate}
                    </CTableDataCell>
                    <CTableDataCell>
                      {projectSchedule.projectedEndDate}
                    </CTableDataCell>
                    <CTableDataCell>{projectSchedule.status}</CTableDataCell>

                    <CTableDataCell>
                      {projectSchedule.sheduleVariance}
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
      ) : (
        <p>current project doesnt have hive project.</p>
      )}
    </>
  )
}

export default ScheduleVarianceTable
