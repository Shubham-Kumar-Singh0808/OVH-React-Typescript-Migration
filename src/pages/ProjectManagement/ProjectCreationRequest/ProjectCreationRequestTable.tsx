import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCol,
  CRow,
  CBadge,
} from '@coreui/react-pro'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'

const ProjectCreationRequestTable = ({
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  setToggle,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const getAllProjectRequestList = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.allProjectCreationList,
  )

  const projectRequestListSize = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.allProjectCreationListSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.isLoading,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const projectRequestStatusLabelColor = (status: string): JSX.Element => {
    if (status === 'Rejected') {
      return (
        <CBadge className="rounded-pill label-danger status-name">
          {status}
        </CBadge>
      )
    } else if (status === 'Approved') {
      return (
        <CBadge className="rounded-pill label-success status-name">
          {status}
        </CBadge>
      )
    } else if (status === 'Pending Approval') {
      return <CBadge className="rounded-pill label-default ">{status}</CBadge>
    }
    return <></>
  }
  const handleProjectRequestViewClick = (id: number) => {
    dispatch(reduxServices.projectCreationRequest.getProjectRequest(id))
    setToggle('projectView')
  }

  const handleProjectRequestHistoryClick = (id: number) => {
    dispatch(
      reduxServices.projectCreationRequest.projectRequestHistoryDetails(id),
    )
    setToggle('projectHistory')
  }
  return (
    <>
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Pricing Model</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Client</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            getAllProjectRequestList &&
            getAllProjectRequestList?.map((projectRequest, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell className="project-width">
                    {projectRequest.projectName}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectRequest.type.charAt(0).toUpperCase() +
                      projectRequest.type.slice(1).toLowerCase()}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectRequest.model.charAt(0).toUpperCase() +
                      projectRequest.model.slice(1).toLowerCase()}
                  </CTableDataCell>
                  <CTableDataCell>{projectRequest.client}</CTableDataCell>
                  <CTableDataCell>{projectRequest.managerName}</CTableDataCell>
                  <CTableDataCell>{projectRequest.startdate}</CTableDataCell>
                  <CTableDataCell>{projectRequest.enddate}</CTableDataCell>
                  <CTableDataCell>
                    {projectRequestStatusLabelColor(projectRequest.status)}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                      data-testid="view-btn"
                      onClick={() =>
                        handleProjectRequestViewClick(projectRequest.id)
                      }
                    >
                      <i className="fa fa-eye  text-white"></i>
                    </CButton>
                    <CButton
                      color="success"
                      className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                      data-testid="edit-btn"
                    >
                      <i className="fa fa-check-circle-o"></i>
                    </CButton>
                    <CButton
                      color="info"
                      className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                      data-testid="history-btn"
                      onClick={() =>
                        handleProjectRequestHistoryClick(projectRequest.id)
                      }
                    >
                      <i className="fa fa-bar-chart text-white"></i>
                    </CButton>
                    <CButton
                      color="danger"
                      className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                      data-testid="edit-btn"
                    >
                      <i className="fa fa-times text-white"></i>
                    </CButton>
                    <CButton
                      color="danger"
                      className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                      data-testid="edit-btn"
                    >
                      <i className="fa fa-trash-o" aria-hidden="true"></i>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {getAllProjectRequestList?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {projectRequestListSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {projectRequestListSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {projectRequestListSize > 20 && (
            <CCol
              xs={5}
              className="gap-1 d-grid d-md-flex justify-content-md-end"
            >
              <OPagination
                currentPage={currentPage}
                pageSetter={setCurrentPage}
                paginationRange={paginationRange}
              />
            </CCol>
          )}
        </CRow>
      ) : (
        <CCol>
          <CRow className="mt-4 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default ProjectCreationRequestTable
