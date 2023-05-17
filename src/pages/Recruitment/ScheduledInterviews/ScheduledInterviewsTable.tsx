import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CBadge,
} from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { formatInterviewModeText } from '../../../utils/scheduledInterviewsUtils'

const ScheduledInterviewsTable = (props: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  isTheadShow: boolean
}): JSX.Element => {
  const dispatch = useAppDispatch()

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

  const scheduledCandidatesForEmployee = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.scheduledCandidatesForEmployee,
  )

  const formatInterviewStatusText = (
    interviewStatus: string | null,
  ): JSX.Element => {
    if (interviewStatus === 'pending') {
      return (
        <CBadge className="rounded-pill pb-1" color="warning">
          {interviewStatus}
        </CBadge>
      )
    } else if (interviewStatus === 'completed') {
      return (
        <CBadge className="rounded-pill pb-1" color="success">
          {interviewStatus}
        </CBadge>
      )
    }
    return <></>
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
      {isTheadShow && (
        <CRow>
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
                    console.log(currentCandidate.personId)

                    return (
                      <CTableRow key={index}>
                        <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                        <CTableDataCell className="text-center">
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
                          {formatInterviewModeText(
                            currentCandidate.interviewMode,
                          )}
                        </CTableDataCell>
                        <CTableDataCell className="text-center">
                          {currentCandidate.interviewRound}
                        </CTableDataCell>
                        <CTableDataCell className="text-center sh-interview-badge">
                          {formatInterviewStatusText(currentCandidate.status)}
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
                <strong>No Records Found... </strong>
              </CRow>
            </CCol>
          )}
        </CRow>
      )}
    </>
  )
}

export default ScheduledInterviewsTable
