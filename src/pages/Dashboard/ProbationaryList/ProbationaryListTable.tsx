import React from 'react'
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
import { Link } from 'react-router-dom'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { ProbationaryListTableProps } from '../../../types/Dashboard/ProbationaryEndDates/provisionPeriodTypes'

const ProbationaryListTable = (
  props: ProbationaryListTableProps,
): JSX.Element => {
  const employeesUnderProbationList = useTypedSelector(
    reduxServices.employeeProbationPeriod.selectors
      .employeesUnderProbationPeriod,
  )
  const probationListSize = useTypedSelector(
    reduxServices.employeeProbationPeriod.selectors.listSize,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handleProbationListPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      <CRow>
        <CCol xs={12} className="gap-2 d-md-flex justify-content-md-end pe-0">
          <Link to={`/dashboard`}>
            <CButton color="info btn-ovh me-1" data-testid="back-btn">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      {employeesUnderProbationList.length ? (
        <>
          <CTable className="mt-4" striped align="middle">
            <CTableHead>
              <CTableRow className="text-start">
                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {employeesUnderProbationList?.map((probation, index) => {
                return (
                  <CTableRow key={index} className="text-start">
                    <CTableDataCell>{probation.username}</CTableDataCell>
                    <CTableDataCell>{probation.provisionDate}</CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {probationListSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {probationListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={
                    handleProbationListPageSizeSelectChange
                  }
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {probationListSize > 20 && (
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
      ) : (
        <p className="text-center">No Records Found...</p>
      )}
    </>
  )
}

export default ProbationaryListTable
