import React, { useEffect, useState } from 'react'
import moment from 'moment'
import ScheduledInterviewsTable from './ScheduledInterviewsTable'
import ScheduledCandidatesTable from './ScheduledCandidatesTable'
import ScheduledInterviewsFilterOptions from './ScheduledInterviewsFilterOptions'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { usePagination } from '../../../middleware/hooks/usePagination'

const ScheduledInterviews = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const commonFormatDate = 'DD/MM/YYYY'
  const [searchValue, setSearchValue] = useState<string>('')
  const [isTheadShow, setIsTheadShow] = useState<boolean>(true)
  const [candidateTheadShow, setCandidateTheadShow] = useState<boolean>(true)
  const [filterByInterviewStatus, setFilterByInterviewStatus] =
    useState<string>('pending')
  const [filterByTechnology, setFilterByTechnology] = useState<string>('')
  const [filterByMeFromDate, setFilterByMeFromDate] = useState<string>(
    moment(new Date()).clone().startOf('month').format(commonFormatDate),
  )
  const [filterByMeToDate, setFilterByMeToDate] = useState<string>(
    moment(new Date()).clone().endOf('month').format(commonFormatDate),
  )
  const [filterByAllFromDate, setFilterByAllFromDate] = useState<string>(
    moment(new Date()).format(commonFormatDate),
  )
  const [filterByAllToDate, setFilterByAllToDate] = useState<string>(
    moment(new Date()).format(commonFormatDate),
  )

  const getTechnologies = useTypedSelector(
    (state) => state.employeeCertificates.getAllTechnologies,
  )

  const selectedView = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.selectedView,
  )

  const isLoading = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.isLoading,
  )

  const scheduledCandidatesListSize = useTypedSelector(
    reduxServices.scheduledInterviews.selectors.scheduledCandidatesListSize,
  )

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(scheduledCandidatesListSize, 20)

  useEffect(() => {
    dispatch(reduxServices.employeeCertifications.getTechnologies())
  }, [dispatch])

  useEffect(() => {
    if (selectedView === 'Me') {
      dispatch(
        reduxServices.scheduledInterviews.getScheduledCandidatesForEmployee({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          fromDate: filterByMeFromDate,
          toDate: filterByMeToDate,
          status: filterByInterviewStatus,
        }),
      )
    } else if (selectedView === 'All') {
      dispatch(
        reduxServices.scheduledInterviews.getScheduledCandidates({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          fromDate: filterByAllFromDate,
          toDate: filterByAllToDate,
          search: searchValue,
          skill: filterByTechnology,
        }),
      )
    }
  }, [
    searchValue,
    filterByTechnology,
    filterByMeToDate,
    filterByMeFromDate,
    filterByInterviewStatus,
    filterByAllFromDate,
    filterByMeToDate,
    selectedView,
    currentPage,
    pageSize,
    dispatch,
  ])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={
          selectedView === 'Me'
            ? 'Scheduled Interviews'
            : 'Scheduled Candidates'
        }
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <ScheduledInterviewsFilterOptions
          getTechnologies={getTechnologies}
          setSearchValue={setSearchValue}
          setFilterByTechnology={setFilterByTechnology}
          filterByMeFromDate={filterByMeFromDate}
          setFilterByMeFromDate={setFilterByMeFromDate}
          filterByMeToDate={filterByMeToDate}
          setFilterByMeToDate={setFilterByMeToDate}
          filterByInterviewStatus={filterByInterviewStatus}
          setFilterByInterviewStatus={setFilterByInterviewStatus}
          filterByAllFromDate={filterByAllFromDate}
          setFilterByAllFromDate={setFilterByAllFromDate}
          filterByAllToDate={filterByAllToDate}
          setFilterByAllToDate={setFilterByAllToDate}
          setIsTheadShow={setIsTheadShow}
          setCandidateTheadShow={setCandidateTheadShow}
          candidateTheadShow={candidateTheadShow}
        />
        {isLoading !== ApiLoadingState.loading ? (
          <>
            {selectedView === 'Me' &&
              isLoading === ApiLoadingState.succeeded && (
                <ScheduledInterviewsTable
                  paginationRange={paginationRange}
                  setPageSize={setPageSize}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  isTheadShow={isTheadShow}
                />
              )}
            {selectedView === 'All' &&
              isLoading === ApiLoadingState.succeeded && (
                <ScheduledCandidatesTable
                  paginationRange={paginationRange}
                  setPageSize={setPageSize}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  isTheadShow={candidateTheadShow}
                />
              )}
          </>
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </OCard>
    </>
  )
}

export default ScheduledInterviews
