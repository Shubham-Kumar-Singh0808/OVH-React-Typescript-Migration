/* eslint-disable sonarjs/cognitive-complexity */
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeAllocationEntryTable = (): JSX.Element => {
  const allocationStatusLabelColor = (status: string): JSX.Element => {
    if (status === 'New') {
      return <CBadge className="rounded-pill label-default">{status}</CBadge>
    } else if (status === 'In Progress') {
      return <CBadge className="rounded-pill label-success">{status}</CBadge>
    } else if (status === 'Closed') {
      return <CBadge className="rounded-pill label-success">{status}</CBadge>
    }
    return <></>
  }

  const projectUnderReport = useTypedSelector(
    reduxServices.employeeAllocationReport.selectors.employeeUnderProject,
  )

  return (
    <>
      <CTableRow>
        <CTableDataCell colSpan={8}>
          <CTable responsive striped className="Allocation-table">
            <CTableHead color="info">
              <CTableRow>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Project Name
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Manager
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Status
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Allocation Date
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  End Date
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Allocation(%)
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Billable
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Current Status
                </CTableHeaderCell>
                <CTableHeaderCell className="profile-tab-content" scope="col">
                  Actions
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {projectUnderReport?.map((projectReport, KRAindex) => {
                const billable = projectReport.billable ? 'yes' : 'No'
                const allocated = projectReport.isAllocated
                  ? 'Allocated'
                  : 'De-Allocated'
                return (
                  <CTableRow key={KRAindex} col-span={7}>
                    <CTableDataCell scope="row">
                      <Link to={`#`} className="employee-name">
                        {projectReport.projectName}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {projectReport.managerName}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {allocationStatusLabelColor(projectReport.status)}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {projectReport.startdate}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {projectReport.enddate}
                    </CTableDataCell>
                    <CTableDataCell scope="row">
                      {projectReport.allocation}%
                    </CTableDataCell>
                    <CTableDataCell scope="row">{billable}</CTableDataCell>
                    <CTableDataCell scope="row">{allocated}</CTableDataCell>
                    <CTableDataCell scope="row">
                      <>
                        <CButton
                          color="info btn-ovh me-2"
                          data-testid="edit-btn"
                        >
                          <i className="fa fa-pencil-square-o"></i>
                        </CButton>
                      </>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CTableDataCell>
      </CTableRow>
    </>
  )
}
export default EmployeeAllocationEntryTable
