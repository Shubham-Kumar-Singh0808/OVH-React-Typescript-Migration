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

  const candidatesInfoListData = useTypedSelector(
    reduxServices.companiesList.selectors.candidatesInfoListData,
  )

  const companiesListSize = useTypedSelector(
    reduxServices.companiesList.selectors.listSize,
  )

  const totalNoOfRecords = candidatesInfoListData?.length
    ? `Total Records: ${companiesListSize}`
    : `No Records found...`

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  const formatInterviewStatusText = (interviewStatus: string): JSX.Element => {
    if (interviewStatus === 'NEW') {
      return (
        <CBadge className="rounded-pill text-white" color="info">
          {interviewStatus}
        </CBadge>
      )
    } else if (interviewStatus === 'IN_PROCESS') {
      return (
        <CBadge className="rounded-pill sh-badge-light">{'IN PROGRESS'}</CBadge>
      )
    } else if (interviewStatus === ('HOLD' || 'CANCEL')) {
      return (
        <CBadge className="rounded-pill text-white" color="warning">
          {interviewStatus}
        </CBadge>
      )
    } else if (
      interviewStatus === ('REJECTED' || 'DID_NOT_JOIN' || 'OFFER_CANCELLED')
    ) {
      return (
        <CBadge className="rounded-pill text-white" color="danger">
          {interviewStatus}
        </CBadge>
      )
    } else if (interviewStatus === ('OFFERED' || 'COMPLETED')) {
      return (
        <CBadge className="rounded-pill text-white" color="success">
          {interviewStatus}
        </CBadge>
      )
    } else if (interviewStatus === 'RESCHEDULED') {
      return (
        <CBadge className="rounded-pill sh-badge-light">
          {interviewStatus}
        </CBadge>
      )
    } else if (interviewStatus === 'NO_SHOW') {
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
          {candidatesInfoListData?.length > 0 &&
            candidatesInfoListData?.map((data, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell>
                    {data.currentEmployer || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{data.fullName || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {data.appliedFor.positionVacant || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {data.appliedFor.jobCode || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{data.mobile || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{data.email || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{data.experience || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{data.skills || 'N/A'}</CTableDataCell>
                  <CTableDataCell>{data.recruiter || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {data.sourcelookUp.sourceName || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{data.technology || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {formatInterviewStatusText(data.cadidateInterviewStatus)}
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
          {companiesListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handlePageSize}
              options={[20, 40, 60, 80, 100]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {companiesListSize > 20 && (
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
