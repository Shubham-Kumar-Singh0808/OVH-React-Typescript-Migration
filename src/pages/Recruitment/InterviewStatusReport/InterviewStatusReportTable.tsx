import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  getInterviewStatusReportTestId,
  getValueOfCandidateStatusMappings,
} from './InterviewStatusReportHelpers'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'

const InterviewStatusReportTable = ({
  paginationRange,
  setPageSize,
  setCurrentPage,
  pageSize,
  currentPage,
}: {
  paginationRange: number[]
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  currentPage: number
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const filterOptions = useTypedSelector(
    (state) => state.interviewStatusReport.filterOptions,
  )
  const interviewStatusReport = useTypedSelector(
    (state) => state.interviewStatusReport.interviewStatusReportList,
  )

  const pageSizeChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value))
    setCurrentPage(1)
  }

  // whenever the currentPage changes, it must update the values and call the api
  useEffect(() => {
    // not adding in dependency list because don't want to run api when selectionStatus is changing
    // want it to call api only when pagination takes place and some date filter is chosen
    if (filterOptions.selectionStatus !== '') {
      const startIndex = (currentPage - 1) * pageSize
      const endIndex = currentPage * pageSize
      dispatch(
        reduxServices.interviewStatusReport.getInterviewStatusReportThunk({
          ...filterOptions,
          startIndex,
          endIndex,
        }),
      )
      dispatch(
        reduxServices.interviewStatusReport.actions.setStartEndIndexInFilter({
          startIndex,
          endIndex,
        }),
      )
    }
  }, [currentPage, pageSize])

  return (
    <>
      <CTable responsive striped align="middle" className="mt-2">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Interview Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Mobile</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Technology</CTableHeaderCell>
            <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
            <CTableHeaderCell scope="col">Source</CTableHeaderCell>
            <CTableHeaderCell scope="col">Recruiter</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Interview Round</CTableHeaderCell>
            <CTableHeaderCell scope="col">Interviewer Name</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {interviewStatusReport.list?.map((statusItem, statusItemIndex) => (
            <CTableRow
              key={statusItemIndex}
              data-testid={getInterviewStatusReportTestId('tableRow')}
            >
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableSNo-${statusItemIndex}`,
                )}
              >
                {statusItemIndex + 1}
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableIntDate-${statusItemIndex}`,
                )}
              >
                {statusItem.interviewDate}
              </CTableDataCell>
              <CTableDataCell>
                <Link
                  to={`/candidatetimeline/${statusItem.candidateId}`}
                  className="text-info cursor-pointer"
                >
                  {statusItem.candidateName}
                </Link>
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableMobile-${statusItemIndex}`,
                )}
              >
                {statusItem.contactNumber}
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableEmail-${statusItemIndex}`,
                )}
              >
                {statusItem.emailId}
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableTechnology-${statusItemIndex}`,
                )}
              >
                {statusItem.technology}
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableExperience-${statusItemIndex}`,
                )}
              >
                {statusItem.experiance}
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableSource-${statusItemIndex}`,
                )}
              >
                {statusItem.source}
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableRecruiter-${statusItemIndex}`,
                )}
              >
                {statusItem.recruiter}
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableCandStatus-${statusItemIndex}`,
                )}
              >
                {getValueOfCandidateStatusMappings(statusItem.status)}
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableIntRound-${statusItemIndex}`,
                )}
              >
                {statusItem.interviewRound}
              </CTableDataCell>
              <CTableDataCell
                data-testid={getInterviewStatusReportTestId(
                  `tableIntName-${statusItemIndex}`,
                )}
              >
                {statusItem.interviewerName}
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <div className="d-flex flex-row align-items-center justify-content-between mt-2">
        <div>
          <b>
            {interviewStatusReport.size > 0
              ? `Total Records: ${interviewStatusReport.size}`
              : 'No Records Found...'}
          </b>
        </div>
        {interviewStatusReport.size >= 20 && (
          <>
            <div>
              <OPageSizeSelect
                handlePageSizeSelectChange={pageSizeChangeHandler}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            </div>
            <div>
              <OPagination
                currentPage={currentPage}
                pageSetter={setCurrentPage}
                paginationRange={paginationRange}
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default InterviewStatusReportTable
