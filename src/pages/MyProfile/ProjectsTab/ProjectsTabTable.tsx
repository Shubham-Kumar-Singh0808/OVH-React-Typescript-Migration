import {
  CCardBody,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import ProjectsTabTableEntry from './ProjectsTabTableEntry'

const ProjectsTabTable = (): JSX.Element => {
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  return (
    <>
      <CCardBody className="ps-0 pe-0">
        <CTable striped className="text-center">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Client</CTableHeaderCell>
              <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
              <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
              <CTableHeaderCell scope="col">Month</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <ProjectsTabTableEntry />
          </CTableBody>
        </CTable>
      </CCardBody>
    </>
  )
}

export default ProjectsTabTable
