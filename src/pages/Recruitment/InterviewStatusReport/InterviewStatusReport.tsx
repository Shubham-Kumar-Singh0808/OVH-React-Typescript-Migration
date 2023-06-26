import React, { useEffect } from 'react'
import { CCardHeader } from '@coreui/react-pro'
import InterviewStatusReportTable from './InterviewStatusReportTable'
import InterviewStatusReportFilterOptions from './InterviewStatusReportFilterOptions/InterviewStatusReportFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { usePagination } from '../../../middleware/hooks/usePagination'

const InterviewStatusReport = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const interviewStatusReport = useTypedSelector(
    (state) => state.interviewStatusReport.interviewStatusReportList,
  )
  // calling apis as soon as the page loads
  useEffect(() => {
    dispatch(reduxServices.interviewStatusReport.getAllEmpCountriesThunk())
    dispatch(reduxServices.interviewStatusReport.getAllTechnologyThunk())
  }, [])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    pageSize,
    currentPage,
  } = usePagination(interviewStatusReport.size)

  console.log(useTypedSelector((state) => state.interviewStatusReport))

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Interview Status Report"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <InterviewStatusReportFilterOptions setCurrentPage={setCurrentPage} />
      <CCardHeader className="mt-2">
        <h4>List Of Candidates</h4>
      </CCardHeader>
      <InterviewStatusReportTable
        paginationRange={paginationRange}
        setPageSize={setPageSize}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        currentPage={currentPage}
      />
    </OCard>
  )
}

export default InterviewStatusReport
