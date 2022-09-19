import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import EventListFilterOptions from './EventListFilterOptions'
import EventListTable from './EventListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EventList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [selectDate, setSelectDate] = useState<string>('Current Month')
  const [eventFromDate, setEventFromDate] = useState<string>('')
  const [eventToDate, setEventToDate] = useState<string>('')
  const isLoading = useTypedSelector(
    reduxServices.eventList.selectors.isLoading,
  )

  const eventListSize = useTypedSelector(
    reduxServices.eventList.selectors.listSize,
  )

  const {
    paginationRange,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
  } = usePagination(eventListSize, 20)

  useEffect(() => {
    dispatch(
      reduxServices.eventList.getAllEvents({
        startIndex: pageSize * (currentPage - 1),
        endIndex: pageSize * currentPage,
        dateSelection: selectDate,
        eventTypeId: 0,
        searchFromDate: eventFromDate,
        searchToDate: eventToDate,
      }),
    )
  }, [currentPage, dispatch, pageSize, selectDate])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Event List"
        CFooterClassName="d-none"
      >
        <CRow className="mb-4">
          <EventListFilterOptions
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            eventFromDate={eventFromDate}
            setEventFromDate={setEventFromDate}
            eventToDate={eventToDate}
            setEventToDate={setEventToDate}
          />
          {isLoading !== ApiLoadingState.loading ? (
            <>
              <CCol xs={12} className="mt-4 mb-4 ps-0 pe-0">
                <EventListTable
                  paginationRange={paginationRange}
                  setPageSize={setPageSize}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  pageSize={pageSize}
                />
              </CCol>
            </>
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CRow>
      </OCard>
    </>
  )
}

export default EventList
