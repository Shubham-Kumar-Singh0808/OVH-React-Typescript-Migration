import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
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
  const SelectCustom = useTypedSelector(
    reduxServices.eventList.selectors.SelectCustom,
  )
  const FromDateFilter = useTypedSelector(
    reduxServices.eventList.selectors.FromDateFilter,
  )
  const ToDateFilter = useTypedSelector(
    reduxServices.eventList.selectors.ToDateFilter,
  )
  const [selectDate, setSelectDate] = useState<string>(SelectCustom)
  const [eventFromDate, setEventFromDate] = useState<string>(
    FromDateFilter as string,
  )
  const [eventToDate, setEventToDate] = useState<string>(ToDateFilter as string)
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
  }, [currentPage, dispatch, pageSize, selectDate, eventFromDate, eventToDate])

  useEffect(() => {
    dispatch(reduxServices.eventList.actions.setFromDateFilter(eventFromDate))
    dispatch(reduxServices.eventList.actions.setToDateFilter(eventToDate))
    dispatch(reduxServices.eventList.actions.setSelectCustom(selectDate))
  }, [dispatch, selectDate, eventFromDate, eventToDate])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Event List"
        CFooterClassName="d-none"
      >
        <CRow>
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
              <CRow>
                <CCol md={12} className="mt-4 mb-4">
                  <EventListTable
                    paginationRange={paginationRange}
                    setPageSize={setPageSize}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    pageSize={pageSize}
                    selectDate={selectDate}
                  />
                </CCol>
              </CRow>
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
