import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
  CButton,
  CTooltip,
} from '@coreui/react-pro'
import { TableProps } from '../../../types/Recruitment/CandidateList/CandidateListTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const CandidateListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: TableProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const getCandidateDetails = useTypedSelector(
    reduxServices.candidateList.selectors.getAllCandidateDetails,
  )

  const CandidateListSize = useTypedSelector(
    reduxServices.candidateList.selectors.listSize,
  )

  const totalNoOfRecords = getCandidateDetails?.length
    ? `Total Records: ${CandidateListSize}`
    : `No Records found...`

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  return (
    <>
      <CTable
        striped
        responsive
        className="text-start text-left align-middle alignment"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">
              Position Applied for
            </CTableHeaderCell>

            <CTableHeaderCell scope="col">Job Code</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
            <CTableHeaderCell scope="col"> Email ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
            <CTableHeaderCell scope="col">Skills</CTableHeaderCell>
            <CTableHeaderCell scope="col">Recruiter</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reference</CTableHeaderCell>

            <CTableHeaderCell scope="col">Country</CTableHeaderCell>

            <CTableHeaderCell scope="col">Status</CTableHeaderCell>

            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getCandidateDetails?.length > 0 &&
            getCandidateDetails?.map((data, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>{data.fullName}</CTableDataCell>
                  <CTableDataCell>{data.appliedForVacancy}</CTableDataCell>
                  <CTableDataCell>{data.appliedFor.jobCode}</CTableDataCell>
                  <CTableDataCell>{data.mobile}</CTableDataCell>
                  <CTableDataCell>{data.email}</CTableDataCell>
                  <CTableDataCell>{data.experience}</CTableDataCell>
                  <CTableDataCell>{data.skills}</CTableDataCell>
                  <CTableDataCell>{data.recruiter}</CTableDataCell>
                  <CTableDataCell>
                    {data.sourcelookUp.sourceName}
                  </CTableDataCell>
                  <CTableDataCell>{data.country.name}</CTableDataCell>
                  <CTableDataCell>
                    {data.cadidateInterviewStatus}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="Edit">
                      <CButton
                        color="info btn-ovh me-1"
                        className="btn-ovh-employee-list me-1"
                        data-testid={`btn-edit${index}`}
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Timeline">
                      <CButton
                        color="info btn-ovh me-1"
                        className="btn-ovh-employee-list me-1"
                        data-testid={`sc-timeline-btn${index}`}
                      >
                        <i className="fa fa-bar-chart" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                    <CTooltip content="Delete">
                      <CButton
                        data-testid={`btn-delete${index}`}
                        size="sm"
                        color="danger btn-ovh me-1"
                        className="btn-ovh-employee-list me-1"
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
                    </CTooltip>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p className="mt-2">
            <strong>{totalNoOfRecords}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {CandidateListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {CandidateListSize > 20 && (
          <CCol
            xs={5}
            className="d-grid gap-1 d-md-flex justify-content-md-end"
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
  )
}

export default CandidateListTable
