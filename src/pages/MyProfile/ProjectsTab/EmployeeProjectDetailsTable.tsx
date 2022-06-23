import {
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTable,
  CTableBody,
  CTableDataCell,
  CSpinner,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  EmployeeProjectDetailInterface as EmployeeProjectDetailsTable,
  ProjectDetails,
} from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import EmployeeProjectDetailsEntry from './EmployeeProjectDetailsEntry'

const EmployeeProjectsDetail = (
  props: EmployeeProjectDetailsTable,
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
      <CTable className="mt-2 text-center profile-tab-table-size">
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
            <EmployeeProjectDetailsEntry
              id={props.projectId}
              projectDetails={projectDetails}
            />
          ) : (
            <CTableRow color="default" className="text-center">
              <CTableDataCell colSpan={7}>
                <CSpinner data-testid="project-loader" />
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
    </>
  )
}

export default EmployeeProjectsDetail
