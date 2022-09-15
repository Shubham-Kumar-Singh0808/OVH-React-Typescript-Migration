import { cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
  CButton,
} from '@coreui/react-pro'
import React from 'react'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { EventListTableProps } from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'

const EventListTable = (props: EventListTableProps): JSX.Element => {
  const eventList = useTypedSelector(reduxServices.eventList.selectors.events)
  const selectedMonth = useTypedSelector(
    reduxServices.employeeDesignationReports.selectors.selectedDesignation,
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
  } = props

  const handleEventListPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      <CTable className="mt-4" striped align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
            <CTableHeaderCell>Location</CTableHeaderCell>
            <CTableHeaderCell>Room</CTableHeaderCell>
            <CTableHeaderCell>Event Type</CTableHeaderCell>
            <CTableHeaderCell>Start Date</CTableHeaderCell>
            <CTableHeaderCell>End Date</CTableHeaderCell>
            <CTableHeaderCell>Booked Timings</CTableHeaderCell>
            <CTableHeaderCell>Author</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {eventList.length ? (
            <>
              {eventList.map((event, index) => {
                return (
                  <CTableRow key={index}>
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>{event.agenda}</CTableDataCell>
                    <CTableDataCell>{event.locationName}</CTableDataCell>
                    <CTableDataCell>{event.roomName}</CTableDataCell>
                    <CTableDataCell>{event.eventTypeName}</CTableDataCell>
                    <CTableDataCell>{event.fromDate}</CTableDataCell>
                    <CTableDataCell>{event.toDate}</CTableDataCell>
                    <CTableDataCell>
                      {event.startTime}
                      <span>to</span>
                      {event.endTime}
                    </CTableDataCell>
                    <CTableDataCell>{event.authorName.fullName}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        color="info"
                        className="btn-ovh me-2"
                        data-testid={`holiday-edit-btn${index}`}
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </CButton>
                      <CButton
                        color="danger"
                        size="sm"
                        data-testid={`holiday-delete-btn${index}`}
                      >
                        <CIcon className="text-white" icon={cilTrash} />
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                )
              })}
            </>
          ) : (
            <CRow className="mt-4">
              <h5>No Records Found... </h5>
            </CRow>
          )}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {eventListSize}</strong>
          </p>
        </CCol>
        <CCol xs={3}>
          {eventListSize > 20 && (
            <OPageSizeSelect
              handlePageSizeSelectChange={handleEventListPageSizeSelectChange}
              options={[20, 40, 60, 80]}
              selectedPageSize={pageSize}
            />
          )}
        </CCol>
        {eventListSize > 20 && (
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
    </>
  )
}

export default EventListTable
