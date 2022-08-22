import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { ProjectReportsTableProps } from '../../../types/ProjectManagement/Project/ProjectTypes'

const ProjectReportsTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  updateaccess,
}: ProjectReportsTableProps): JSX.Element => {
  const projectReports = useTypedSelector(
    reduxServices.projectReport.selectors.projectReports,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      {projectReports.Projs.length ? (
        <>
          <CTable striped align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="text-center"></CTableHeaderCell>
                <CTableHeaderCell scope="col">Project Code</CTableHeaderCell>
                <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Pricing Model</CTableHeaderCell>
                <CTableHeaderCell scope="col">Client</CTableHeaderCell>
                <CTableHeaderCell scope="col">Resources</CTableHeaderCell>
                <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Delivery Manager
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {projectReports?.Projs.map((value, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell className="text-center">
                      <i className="fa fa-minus-circle cursor-pointer" />
                    </CTableDataCell>

                    <CTableDataCell>{value.projectCode}</CTableDataCell>
                    <CTableDataCell>{value.projectName}</CTableDataCell>
                    <CTableDataCell>{value.type}</CTableDataCell>
                    <CTableDataCell>{value.client}</CTableDataCell>
                    <CTableDataCell>{value.count}</CTableDataCell>
                    <CTableDataCell>{value.managerName}</CTableDataCell>
                    <CTableDataCell>{value.deliveryManager}</CTableDataCell>
                    <CTableDataCell>{value.startdate}</CTableDataCell>
                    <CTableDataCell>{value.enddate}</CTableDataCell>
                    <CTableDataCell>{value.status}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        className="cursor-pointer"
                        color="danger btn-sm me-1"
                        data-testid="reject-btn"
                      >
                        <i
                          className="fa fa-times text-white"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                    </CTableDataCell>
                    <CTableDataCell style={{ width: '120px' }}>
                      <CButton
                        className="cursor-pointer"
                        color="info btn-sm me-1"
                        data-testid="view-btn"
                      >
                        <i
                          className="fa fa-eye text-white"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                      <CButton
                        className="cursor-pointer"
                        color="primary btn-sm me-1"
                        data-testid="edit-btn"
                      >
                        <i
                          className="fa fa-edit text-white"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                      <CButton
                        className="cursor-pointer"
                        color="danger btn-sm me-1"
                        data-testid="delete-btn"
                      >
                        <i
                          className="fa fa-trash-o text-white"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {projectReports.Projsize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {projectReports.Projsize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {projectReports.Projsize > 20 && (
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
        </>
      ) : (
        <CCol>
          <CRow className="category-no-data">
            <h4 className="text-center">No data to display</h4>
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default ProjectReportsTable
