import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
} from '@coreui/react-pro'
import React from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const ScheduledInterviewsTable = (props: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const scheduledCandidatesForEmployee = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.scheduledCandidatesForEmployee,
  )
  return (
    <>
      <CTable
        striped
        responsive
        className={
          !scheduledCandidatesForEmployee.list?.length
            ? 'ps-0 pe-0 mt-4 sh-scheduledInterviewsTable'
            : 'ps-0 pe-0 mt-4'
        }
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Name of the Interviewer</CTableHeaderCell>
            <CTableHeaderCell>Experience</CTableHeaderCell>
            <CTableHeaderCell>Interview Date</CTableHeaderCell>
            <CTableHeaderCell>Interview Time</CTableHeaderCell>
            <CTableHeaderCell>Mode of Interview</CTableHeaderCell>
            <CTableHeaderCell>Interview Round</CTableHeaderCell>
            <CTableHeaderCell>Interview Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        {scheduledCandidatesForEmployee.list?.length ? (
          <CTableBody>
            {scheduledCandidatesForEmployee.list?.map(
              (currentCandidate, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {currentCandidate.candidateName}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {currentCandidate.interviewers}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {currentCandidate.experiance}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {currentCandidate.interviewDate}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {currentCandidate.interviewTime}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {currentCandidate.interviewMode}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {currentCandidate.interviewRound}
                    </CTableDataCell>
                    <CTableDataCell className="text-center">
                      {currentCandidate.interviewStatus}
                    </CTableDataCell>
                  </CTableRow>
                )
              },
            )}
          </CTableBody>
        ) : (
          <></>
        )}
      </CTable>
      {scheduledCandidatesForEmployee.list?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>
                Total Records: {scheduledCandidatesForEmployee.size}
              </strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {scheduledCandidatesForEmployee.size > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80, 100]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {scheduledCandidatesForEmployee.size > 20 && (
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
      ) : (
        <CCol>
          <CRow className="mt-3 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
    </>
  )
}

export default ScheduledInterviewsTable
