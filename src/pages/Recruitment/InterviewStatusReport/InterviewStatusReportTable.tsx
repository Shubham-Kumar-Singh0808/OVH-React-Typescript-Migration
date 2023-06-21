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
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Interview Date</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>Mobile</CTableHeaderCell>
            <CTableHeaderCell>Email ID</CTableHeaderCell>
            <CTableHeaderCell>Technology</CTableHeaderCell>
            <CTableHeaderCell>Experience</CTableHeaderCell>
            <CTableHeaderCell>Source</CTableHeaderCell>
            <CTableHeaderCell>Recruiter</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Interview Round</CTableHeaderCell>
            <CTableHeaderCell>Interviewer Name</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {interviewStatusReport.list?.map((statusItem, statusItemIndex) => (
            <CTableRow key={statusItemIndex}>
              <CTableDataCell>{statusItemIndex + 1}</CTableDataCell>
              <CTableDataCell>{statusItem.interviewDate}</CTableDataCell>
              <CTableDataCell>
                <Link
                  to={`/candidatetimeline/${statusItem.candidateId}`}
                  className="text-info cursor-pointer"
                >
                  {statusItem.candidateName}
                </Link>
              </CTableDataCell>
              <CTableDataCell>{statusItem.contactNumber}</CTableDataCell>
              <CTableDataCell>{statusItem.emailId}</CTableDataCell>
              <CTableDataCell>{statusItem.technology}</CTableDataCell>
              <CTableDataCell>{statusItem.experiance}</CTableDataCell>
              <CTableDataCell>{statusItem.source}</CTableDataCell>
              <CTableDataCell>{statusItem.recruiter}</CTableDataCell>
              <CTableDataCell>{statusItem.status}</CTableDataCell>
              <CTableDataCell>{statusItem.interviewRound}</CTableDataCell>
              <CTableDataCell>{statusItem.interviewerName}</CTableDataCell>
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
