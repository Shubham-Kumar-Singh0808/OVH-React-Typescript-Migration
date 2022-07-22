import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CCol,
  CRow,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { formatInterviewModeText } from '../../../utils/scheduledInterviewsUtils'

const ScheduledCandidatesTable = (props: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  isTheadShow: boolean
}): JSX.Element => {
  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    isTheadShow,
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

  const scheduledCandidates = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.scheduledCandidates,
  )

  return (
    <>
      {isTheadShow && (
        <>
          <CTable
            striped
            responsive
            className={
              !scheduledCandidates.list?.length
                ? 'ps-0 pe-0 mt-4 sh-scheduledInterviewsTable'
                : 'ps-0 pe-0 mt-4'
            }
          >
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Experience</CTableHeaderCell>
                <CTableHeaderCell>Skills</CTableHeaderCell>
                <CTableHeaderCell>Mobile</CTableHeaderCell>
                <CTableHeaderCell>Source</CTableHeaderCell>
                <CTableHeaderCell>Name of Interviewer</CTableHeaderCell>
                <CTableHeaderCell>Recruiter</CTableHeaderCell>
                <CTableHeaderCell>Interview Date</CTableHeaderCell>
                <CTableHeaderCell>Interview Time</CTableHeaderCell>
                <CTableHeaderCell>Mode of Interview</CTableHeaderCell>
                <CTableHeaderCell>Interview Round</CTableHeaderCell>
                <CTableHeaderCell>Interview Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            {scheduledCandidates.list?.length ? (
              <CTableBody>
                {scheduledCandidates.list?.map((currentCandidate, index) => {
                  return (
                    <CTableRow key={index}>
                      <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.candidateName}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.experiance}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.skills}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.mobileNumber}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.sourceName}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.interviewers}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.recruiter}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.interviewDate}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.interviewTime}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {formatInterviewModeText(
                          currentCandidate.interviewMode,
                        )}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.interviewRound}
                      </CTableDataCell>
                      <CTableDataCell className="text-center">
                        {currentCandidate.interviewStatus}
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            ) : (
              <></>
            )}
          </CTable>
          {scheduledCandidates.list?.length ? (
            <CRow>
              <CCol xs={4}>
                <p>
                  <strong>Total Records: {scheduledCandidates.size}</strong>
                </p>
              </CCol>
              <CCol xs={3}>
                {scheduledCandidates.size > 20 && (
                  <OPageSizeSelect
                    handlePageSizeSelectChange={handlePageSizeSelectChange}
                    options={[20, 40, 60, 80, 100]}
                    selectedPageSize={pageSize}
                  />
                )}
              </CCol>
              {scheduledCandidates.size > 20 && (
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
      )}
    </>
  )
}

export default ScheduledCandidatesTable
