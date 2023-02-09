import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CButton,
} from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import OLoadingSpinner from '../../components/ReusableComponent/OLoadingSpinner'
import OPageSizeSelect from '../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../components/ReusableComponent/OPagination'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { reduxServices } from '../../reducers/reduxServices'
import { useTypedSelector } from '../../stateStore'
import { LoadingType } from '../../types/Components/loadingScreenTypes'

const SQAAuditReportTable = ({
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const sqaAuditReportResponse = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReport,
  )

  const sqaAuditReportListSize = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReportListSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.isLoading,
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
  return (
    <>
      <CTable striped className="mt-3">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Audit Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
            <CTableHeaderCell scope="col">Audit Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Audit Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">PCI %</CTableHeaderCell>
            <CTableHeaderCell scope="col">Follow-UP Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reschedule</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            sqaAuditReportResponse &&
            sqaAuditReportResponse?.map((auditReport, index) => {
              const auditRescheduleStatus = auditReport?.auditRescheduleStatus
                ? 'Yes'
                : 'No'
              const projectType =
                auditReport?.projectType === 'true' ? 'Development' : 'Support'
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  <CTableDataCell>{auditReport?.auditType}</CTableDataCell>
                  <CTableDataCell>{projectType}</CTableDataCell>
                  <CTableDataCell>{auditReport?.projectName}</CTableDataCell>
                  <CTableDataCell>{auditReport?.projectManager}</CTableDataCell>
                  <CTableDataCell>{auditReport?.auditDate}</CTableDataCell>
                  <CTableDataCell>
                    {auditReport?.startTime}-{auditReport.endTime}
                  </CTableDataCell>
                  <CTableDataCell>{auditReport.auditStatus}</CTableDataCell>
                  <CTableDataCell>{auditReport.pci || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {auditReport.followUpDate || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{auditRescheduleStatus}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="success"
                      className="btn-ovh-employee-list me-1 mt-1"
                      data-testid="edit-btn"
                    >
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                    </CButton>
                    <CButton
                      color="info"
                      className="btn-ovh-employee-list me-1 mt-1"
                      data-testid="edit-btn"
                    >
                      <i
                        className="fa fa-eye  text-white"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                    <Link to={`editAuditForm/${auditReport.id}`}>
                      <CButton
                        color="info"
                        className="btn-ovh-employee-list me-1 mt-1"
                        data-testid="edit-btn"
                      >
                        <i
                          className="fa fa-edit text-white"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                    </Link>
                    <CButton
                      color="danger"
                      className="btn-ovh-employee-list me-1 mt-1"
                      data-testid="edit-btn"
                    >
                      <i
                        className="fa fa-times text-white"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                    <CButton
                      color="danger"
                      className="btn-ovh-employee-list me-1 mt-1"
                      data-testid="edit-btn"
                    >
                      <i
                        className="fa fa-trash-o text-white"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                    <CButton
                      color="info"
                      className="btn-ovh-employee-list me-1 mt-1"
                      data-testid="edit-btn"
                    >
                      <i
                        className="fa fa-bar-chart text-white"
                        aria-hidden="true"
                      ></i>
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
      {sqaAuditReportResponse?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {sqaAuditReportListSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {sqaAuditReportListSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {sqaAuditReportListSize > 20 && (
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

export default SQAAuditReportTable
