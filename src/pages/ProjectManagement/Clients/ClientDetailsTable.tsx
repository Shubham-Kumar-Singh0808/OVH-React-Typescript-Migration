import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react-pro'
import React from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const ClientDetailsTable = (): JSX.Element => {
  const isLoading = useTypedSelector(
    reduxServices.clients.selectors.isLoadingProjectDetails,
  )
  const projectsUnderClient = useTypedSelector(
    reduxServices.clients.selectors.projectsUnderClient,
  )

  const tableHeaderCellPropsStatus = {
    width: '10%',
    scope: 'col',
    className: 'profile-tab-content',
  }

  const projectStatus = (status: string, projectHealth: string) => {
    let health
    if (projectHealth === 'Green') {
      health = (
        <span
          data-testid="project-health"
          className="profile-tab-label profile-tab-label-success"
        >
          {status}
        </span>
      )
    }
    if (projectHealth === 'Orange') {
      health = (
        <span
          data-testid="project-health"
          className="profile-tab-label profile-tab-label-warning"
        >
          {status}
        </span>
      )
    }
    if (projectHealth === 'Red') {
      health = (
        <span
          data-testid="project-health"
          className="profile-tab-label profile-tab-label-failed"
        >
          {status}
        </span>
      )
    }
    if (projectHealth === 'Gray' || projectHealth === null) {
      health = (
        <span
          data-testid="project-health"
          className="profile-tab-label profile-tab-label-gray"
        >
          {status}
        </span>
      )
    }
    return health
  }

  return (
    <>
      <CTable striped className="mt-2 text-start profile-tab-table-size">
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Project Code
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Project Name
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Pricing Model
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Resources
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Project Manager
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Delivery Manager
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              Start Date
            </CTableHeaderCell>
            <CTableHeaderCell className="profile-tab-content" scope="col">
              End Date
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsStatus}>
              Status
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {isLoading !== ApiLoadingState.loading ? (
            projectsUnderClient &&
            projectsUnderClient?.map((project, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {project.projectCode}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {project.projectName}
                  </CTableDataCell>
                  <CTableDataCell scope="row">{project.type}</CTableDataCell>
                  <CTableDataCell scope="row">{project.count}</CTableDataCell>
                  <CTableDataCell scope="row">
                    {project.managerName}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {project.deliveryManager}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {project.startdate}
                  </CTableDataCell>
                  <CTableDataCell scope="row">{project.enddate}</CTableDataCell>
                  <CTableDataCell scope="row">
                    {projectStatus(project.status, project.health)}
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
          <CTableRow className="client-No-Records">
            {!projectsUnderClient?.length &&
              isLoading !== ApiLoadingState.loading && (
                <CCol className="text-start ms-4">
                  <CRow>
                    <h5>No Records Found... </h5>
                  </CRow>
                </CCol>
              )}
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default ClientDetailsTable
