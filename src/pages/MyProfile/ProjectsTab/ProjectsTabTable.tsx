import {
  CCardBody,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { EmployeeProjectsGetParams } from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import ProjectsTabTableEntry from './ProjectsTabTableEntry'

const ProjectsTabTable = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeProjects = useTypedSelector(
    reduxServices.employeeProjects.selectors.employeeProjects,
  )

  useEffect(() => {
    setIsLoading(true)
    const prepareObject: EmployeeProjectsGetParams = {
      firstIndex: 0,
      endIndex: 20,
      projectStatus: 'All',
      type: 'All',
      employeeid: employeeId as string,
    }
    dispatch(reduxServices.employeeProjects.getEmployeeProjects(prepareObject))
  }, [dispatch, employeeId])

  useEffect(() => {
    if (employeeProjects) setIsLoading(false)
  }, [employeeProjects])

  return (
    <>
      <CCardBody className="ps-0 pe-0">
        <CTable className="text-left" striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Client</CTableHeaderCell>
              <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
              <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody color="light">
            {!isLoading ? (
              employeeProjects &&
              employeeProjects.Projs?.map((project, index) => (
                <ProjectsTabTableEntry
                  id={index}
                  project={project}
                  key={index}
                />
              ))
            ) : (
              <CTableRow color="default" className="text-center">
                <CTableDataCell colSpan={8}>
                  <CSpinner />
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </>
  )
}

export default ProjectsTabTable
