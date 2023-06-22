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
  CBadge,
} from '@coreui/react-pro'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { CompaniesListProps } from '../../../types/Recruitment/CompaniesList/CompaniesListTypes'

const CandidatesCountTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
}: CompaniesListProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const candidatesInfo = useTypedSelector(
    reduxServices.companiesList.selectors.candidatesInfoListData,
  )

  const listSizeCount = useTypedSelector(
    reduxServices.companiesList.selectors.listSize,
  )

  const totalRecords = candidatesInfo?.length
    ? `Total Records: ${listSizeCount}`
    : `No Records found...`

  const pageSizeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  const statusText = (status: string): JSX.Element => {
    if (status === 'NEW') {
      return (
        <CBadge className="rounded-pill text-white" color="info">
          {status}
        </CBadge>
      )
    } else if (status === 'IN_PROCESS') {
      return (
        <CBadge className="rounded-pill sh-badge-light">{'IN PROGRESS'}</CBadge>
      )
    } else if (status === ('HOLD' || 'CANCEL')) {
      return (
        <CBadge className="rounded-pill text-white" color="warning">
          {status}
        </CBadge>
      )
    } else if (status === ('REJECTED' || 'DID_NOT_JOIN' || 'OFFER_CANCELLED')) {
      return (
        <CBadge className="rounded-pill text-white" color="danger">
          {status}
        </CBadge>
      )
    } else if (status === ('OFFERED' || 'COMPLETED')) {
      return (
        <CBadge className="rounded-pill text-white" color="success">
          {status}
        </CBadge>
      )
    } else if (status === 'RESCHEDULED') {
      return <CBadge className="rounded-pill sh-badge-light">{status}</CBadge>
    } else if (status === 'NO_SHOW') {
      return (
        <CBadge className="rounded-pill text-white" color="danger">
          {'NO SHOW'}
        </CBadge>
      )
    }
    return <></>
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
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Company Name</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Position Applied for</CTableHeaderCell>
            <CTableHeaderCell>Job Code</CTableHeaderCell>
            <CTableHeaderCell>Mobile</CTableHeaderCell>
            <CTableHeaderCell>Email ID</CTableHeaderCell>
            <CTableHeaderCell>Experience</CTableHeaderCell>
            <CTableHeaderCell>Skills</CTableHeaderCell>
            <CTableHeaderCell>Recruiter</CTableHeaderCell>
            <CTableHeaderCell>Reference</CTableHeaderCell>
            <CTableHeaderCell>Technology</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {candidatesInfo?.length > 0 &&
            candidatesInfo?.map((item, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.currentEmployer || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{item.fullName || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {item.appliedFor.positionVacant || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {item.appliedFor.jobCode || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{item.mobile || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{item.email || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{item.experience || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{item.skills || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{item.recruiter || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {item.sourcelookUp.sourceName || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{item.technology || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {statusText(item.cadidateInterviewStatus)}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p className="mt-2">
            <strong>{totalRecords}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {listSizeCount > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={pageSizeHandler}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {listSizeCount > 20 && (
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

export default CandidatesCountTable
