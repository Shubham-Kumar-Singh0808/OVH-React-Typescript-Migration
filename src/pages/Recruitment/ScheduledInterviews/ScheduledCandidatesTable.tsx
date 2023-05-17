import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CCol,
  CRow,
  CTableDataCell,
  CBadge,
  CLink,
} from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { formatInterviewModeText } from '../../../utils/scheduledInterviewsUtils'

const ScheduledCandidatesTable = (props: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  candidateTheadShow: boolean
}): JSX.Element => {
  const scheduledCandidates = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.scheduledCandidates,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
    candidateTheadShow,
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
  const dispatch = useAppDispatch()

  const formatInterviewStatusText = (interviewStatus: string): JSX.Element => {
    if (interviewStatus === 'NEW') {
      return (
        <CBadge className="rounded-pill" color="info">
          {interviewStatus}
        </CBadge>
      )
    } else if (interviewStatus === 'IN_PROCESS') {
      return (
        <CBadge className="rounded-pill sh-badge-light">{'IN PROGRESS'}</CBadge>
      )
    } else if (interviewStatus === ('HOLD' || 'CANCEL')) {
      return (
        <CBadge className="rounded-pill" color="warning">
          {interviewStatus}
        </CBadge>
      )
    } else if (
      interviewStatus === ('REJECTED' || 'DID_NOT_JOIN' || 'OFFER_CANCELLED')
    ) {
      return (
        <CBadge className="rounded-pill" color="danger">
          {interviewStatus}
        </CBadge>
      )
    } else if (interviewStatus === ('OFFERED' || 'COMPLETED')) {
      return (
        <CBadge className="rounded-pill" color="success">
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
        <CBadge className="rounded-pill" color="danger">
          {'NO SHOW'}
        </CBadge>
      )
    }
    return <></>
  }

  const tableHeaderCellPropsId = {
    width: '2%',
    scope: 'col',
  }
  const tableHeaderCellPropsName = {
    width: '8%',
    scope: 'col',
  }
  const onClickHandler = (candidateId: number, interviewCycleId: number) => {
    dispatch(reduxServices.intervieweeDetails.timeLineData(candidateId))
    dispatch(
      reduxServices.intervieweeDetails.empScheduleInterviewDetails(
        interviewCycleId,
      ),
    )
  }

  return (
    <>
      {candidateTheadShow && (
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
                <CTableHeaderCell {...tableHeaderCellPropsId}>
                  #
                </CTableHeaderCell>
                <CTableHeaderCell {...tableHeaderCellPropsName}>
                  Name
                </CTableHeaderCell>
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
                      <CTableDataCell>
                        <Link
                          className="cursor-pointer sh-Interview-Table-link"
                          to={`/candidatetimeline/${currentCandidate.candidateId}&${currentCandidate.interviewCycleId}`}
                          onClick={() =>
                            onClickHandler(
                              Number(currentCandidate.candidateId),
                              currentCandidate.interviewCycleId,
                            )
                          }
                        >
                          {currentCandidate.candidateName}
                        </Link>
                      </CTableDataCell>
                      <CTableDataCell>
                        {currentCandidate.experiance}
                      </CTableDataCell>
                      <CTableDataCell>{currentCandidate.skills}</CTableDataCell>
                      <CTableDataCell>
                        {currentCandidate.mobileNumber}
                      </CTableDataCell>
                      <CTableDataCell>
                        {currentCandidate.sourceName}
                      </CTableDataCell>
                      <CTableDataCell>
                        {currentCandidate.interviewers}
                      </CTableDataCell>
                      <CTableDataCell>
                        {currentCandidate.recruiter}
                      </CTableDataCell>
                      <CTableDataCell>
                        {currentCandidate.interviewDate}
                      </CTableDataCell>
                      <CTableDataCell>
                        {currentCandidate.interviewTime}
                      </CTableDataCell>
                      <CTableDataCell>
                        {formatInterviewModeText(
                          currentCandidate.interviewMode,
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        {currentCandidate.interviewRound}
                      </CTableDataCell>
                      <CTableDataCell>
                        {formatInterviewStatusText(
                          currentCandidate.interviewStatus,
                        )}
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
                <strong>No Records Found... </strong>
              </CRow>
            </CCol>
          )}
        </>
      )}
    </>
  )
}

export default ScheduledCandidatesTable
