import {
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTable,
  CTableBody,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import EmployeeProjectDetailsEntry from './EmployeeProjectDetailsEntry'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  EmployeeProjectDetailInterface,
  ProjectDetails,
} from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'

const EmployeeProjectsDetail = (
  props: EmployeeProjectDetailInterface,
): JSX.Element => {
  const [projectDetails, setProjectDetails] = useState<
    ProjectDetails | undefined
  >(undefined)
  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const allProjectDetails = useTypedSelector(
    reduxServices.employeeProjects.selectors.projectDetails,
  )

  useEffect(() => {
    dispatch(reduxServices.employeeProjects.getProjectDetails(props.projectId))
  }, [dispatch, props.projectId])

  useEffect(() => {
    if (allProjectDetails) {
      allProjectDetails
        .filter(
          (allProjectDetails) =>
            allProjectDetails.employeeId !== (employeeId as unknown as number),
        )
        .map((filtered: ProjectDetails) => {
          if (filtered.projectId === props.projectId) {
            setProjectDetails(filtered)
          }
          return filtered
        })
    }
  }, [allProjectDetails, employeeId, props.projectId])

  return (
    <>
      <CTable className="mt-2 text-left profile-tab-table-size">
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              ID
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Name
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Designation
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Allocation
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              End Date
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Billable
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Current Status
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {projectDetails ? (
            <EmployeeProjectDetailsEntry />
          ) : (
            <p>No Records Found...</p>
          )}
        </CTableBody>
      </CTable>
    </>
  )
}

export default EmployeeProjectsDetail
