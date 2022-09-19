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
  CLink,
  CCardHeader,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  Event,
  EventListApiProps,
  EventListTableProps,
} from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'
import OModal from '../../../components/ReusableComponent/OModal'

const EventListTable = (
  props: EventListTableProps,
  { dateSelection, searchFromDate, searchToDate }: EventListApiProps,
): JSX.Element => {
  const [selectedEventDetails, setSelectedEventDetails] = useState({} as Event)
  const [isEventSubjectModalVisible, setIsEventSubjectModalVisible] =
    useState<boolean>(false)
  const [eventId, setEventId] = useState(0)
  const [isEventCancelModalVisible, setIsEventCancelModalVisible] =
    useState(false)
  const eventList = useTypedSelector(reduxServices.eventList.selectors.events)
  const eventListSize = useTypedSelector(
    reduxServices.eventList.selectors.listSize,
  )
  const dispatch = useAppDispatch()
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

  const handleDescriptionModal = (event: Event) => {
    setIsEventSubjectModalVisible(true)
    setSelectedEventDetails(event)
  }

  const handleShowCancelEventModal = (eventID: number) => {
    setEventId(eventID)
    setIsEventCancelModalVisible(true)
  }

  const handleCancelEvent = async () => {
    setIsEventCancelModalVisible(false)
    const cancelEventResultAction = await dispatch(
      reduxServices.eventList.cancelEvent(eventId),
    )
    if (
      reduxServices.employeeLeaveSummary.cancelEmployeeLeave.fulfilled.match(
        cancelEventResultAction,
      )
    ) {
      dispatch(
        reduxServices.eventList.getAllEvents({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
          dateSelection,
          eventTypeId: 0,
          searchFromDate,
          searchToDate,
        }),
      )
    }
  }

  return (
    <>
      <CTable className="mt-4 mb-4" striped align="middle">
        <CTableHead>
          <CTableRow className="text-start">
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
          {eventList.map((event, index) => {
            const descriptionLimit =
              event.agenda && event.agenda.length > 30
                ? `${event.agenda.substring(0, 30)}...`
                : event.agenda
            return (
              <CTableRow key={index} className="text-start">
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row" className="sh-organization-link">
                  {event.agenda ? (
                    <CLink
                      className="cursor-pointer text-decoration-none"
                      data-testid="eventList-description-link"
                      onClick={() => handleDescriptionModal(event)}
                    >
                      {parse(descriptionLimit as string)}
                    </CLink>
                  ) : (
                    'N/A'
                  )}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {event.locationName}
                </CTableDataCell>
                <CTableDataCell scope="row">{event.roomName}</CTableDataCell>
                <CTableDataCell scope="row">
                  {event.eventTypeName}
                </CTableDataCell>
                <CTableDataCell scope="row">{event.fromDate}</CTableDataCell>
                <CTableDataCell scope="row">{event.toDate}</CTableDataCell>
                <CTableDataCell scope="row">
                  {event.startTime}
                  <span>to</span>
                  {event.endTime}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {event.authorName.fullName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CButton
                    color="info"
                    size="sm"
                    className="btn-ovh me-1"
                    data-testid={`holiday-edit-btn${index}`}
                    disabled={event.disableEdit}
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </CButton>
                  <CButton
                    color="warning"
                    size="sm"
                    className="btn-ovh me-1"
                    data-testid={`cancel-btn${index}`}
                    onClick={() => handleShowCancelEventModal(event.id)}
                  >
                    <i className="fa fa-times" aria-hidden="true"></i>
                  </CButton>
                  <CButton
                    color="info"
                    size="sm"
                    className="btn-ovh-employee-list"
                  >
                    <i className="text-white fa fa-eye"></i>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <strong>
            {eventList?.length
              ? `Total Records: ${eventList.length}`
              : `No Records Found...`}
          </strong>
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
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isEventSubjectModalVisible}
        setVisible={setIsEventSubjectModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <>
          <CCardHeader>{selectedEventDetails.agenda}</CCardHeader>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold">Organizer :</span>
            {selectedEventDetails.authorName?.fullName}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold">Date :</span>
            <>
              {`${selectedEventDetails.fromDate} to ${selectedEventDetails.toDate} from
              ${selectedEventDetails.startTime} to ${selectedEventDetails.endTime}`}
            </>
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold">Location :</span>
            {`${selectedEventDetails.roomName} in ${selectedEventDetails.locationName}`}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold">Description :</span>
            {selectedEventDetails.description !== null
              ? selectedEventDetails.description
              : 'N/A'}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold">Trainer :</span>
            {selectedEventDetails.trainerName?.fullName !== null
              ? `${selectedEventDetails.trainerName?.fullName} - ${selectedEventDetails.trainerName?.designation}`
              : 'N/A'}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold">Attendees:</span>
            {selectedEventDetails.employeeDto?.length ? (
              <CTable className="mt-4 mb-4" align="middle">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Name of Employee</CTableHeaderCell>
                    <CTableHeaderCell>Designation</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {selectedEventDetails.employeeDto?.map((emp, index) => {
                    return (
                      <CTableRow key={index}>
                        <CTableDataCell>{emp.fullName}</CTableDataCell>
                        <CTableDataCell>{emp.designation}</CTableDataCell>
                      </CTableRow>
                    )
                  })}
                </CTableBody>
              </CTable>
            ) : (
              <>N/A</>
            )}
          </p>
        </>
      </OModal>
      <OModal
        visible={isEventCancelModalVisible}
        setVisible={setIsEventCancelModalVisible}
        modalTitle="Cancel Event"
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleCancelEvent}
      >
        <>Do you Really want to cancel this Event ?</>
      </OModal>
    </>
  )
}

export default EventListTable
