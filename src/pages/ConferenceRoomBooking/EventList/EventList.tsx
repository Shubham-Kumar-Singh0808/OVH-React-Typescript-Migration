import { CCol, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import EventListFilterOptions from './EventListFilterOptions'
import EventListTable from './EventListTable'
import OCard from '../../../components/ReusableComponent/OCard'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const EventList = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [selectOption, setSelectOption] = useState<string>('')
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
        dateSelection: selectOption,
        eventTypeId: 0,
        searchFromDate: '',
        searchToDate: '',
      }),
    )
  }, [currentPage, dispatch, pageSize, selectOption])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Event List"
        CFooterClassName="d-none"
      >
        <CRow className="mb-4">
          <EventListFilterOptions
            selectMonth={selectOption}
            setSelectMonth={setSelectOption}
          />
          <CCol xs={12} className="mt-4 mb-4 ps-0 pe-0">
            <EventListTable
              paginationRange={paginationRange}
              setPageSize={setPageSize}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              pageSize={pageSize}
            />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EventList
