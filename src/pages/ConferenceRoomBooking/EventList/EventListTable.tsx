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
} from '@coreui/react-pro'
import React, { useState } from 'react'
import parse from 'html-react-parser'
import { Link, useHistory } from 'react-router-dom'
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
  const role = useTypedSelector(
    (state) => state.authentication.authenticatedUser.role,
  )
  const history = useHistory()
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

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
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

  const attendees = selectedEventDetails.employeeDto?.length ? (
    <CTable align="middle" className="bookingList-model-table">
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell className="pt-0">Name of Employee</CTableHeaderCell>
          <CTableHeaderCell className="pt-0">Designation</CTableHeaderCell>
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
  )

  const trainer =
    selectedEventDetails.trainerName?.fullName !== null
      ? `${selectedEventDetails.trainerName?.fullName} - ${selectedEventDetails.trainerName?.designation}`
      : 'N/A'

  const eventDescription =
    selectedEventDetails.description !== null
      ? selectedEventDetails.description
      : 'N/A'

  const editButtonHandler = (id: number) => {
    dispatch(reduxServices.eventList.editEvent(id))
    history.push(`/editEvent/${id}`)
  }
  return (
    <>
      <CTable className="mt-2 mb-2" striped responsive align="middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col" className="ps-0">
              S.No
            </CTableHeaderCell>
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
          {eventList?.map((event, index) => {
            const descriptionLimit =
              event.agenda && event.agenda.length > 30
                ? `${event.agenda.substring(0, 30)}...`
                : event.agenda
            return (
              <CTableRow key={index} className="ps-0">
                <CTableDataCell scope="row">
                  {getItemNumber(index)}
                </CTableDataCell>
                <CTableDataCell scope="row" className="sh-organization-link">
                  {event.agenda ? (
                    <CLink
                      className="cursor-pointer"
                      data-testid="eventList-description-link"
                      onClick={() => handleDescriptionModal(event)}
                    >
                      {parse(descriptionLimit)}
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
                  {`${event.startTime} to ${event.endTime}`}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {event.authorName.fullName}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {role !== 'Employee' && (
                    <div className="buttons-events">
                      <CButton
                        color="info"
                        className="btn-ovh me-1 btn-sm btn-ovh-employee-list cursor-pointer"
                        data-testid={`editEvent-btn${index}`}
                        onClick={() => editButtonHandler(event.id)}
                      >
                        <i className="fa fa-edit" aria-hidden="true"></i>
                      </CButton>
                      <CButton
                        color="warning"
                        className="btn-ovh me-1 btn-sm btn-ovh-employee-list cursor-pointer"
                        data-testid={`cancelEvent-btn${index}`}
                        disabled={
                          event.disableEdit || event.meetingStatus !== 'New'
                        }
                        onClick={() => handleShowCancelEventModal(event.id)}
                      >
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </CButton>
                      <Link to={`/trainingFeedBackForm/${event.id}`}>
                        <CButton
                          className="btn-ovh me-2 sh-eye-btn-color btn-sm btn-ovh-employee-list cursor-pointer"
                          data-testid={`viewEvent-btn${index}`}
                        >
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </CButton>
                      </Link>
                    </div>
                  )}
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow className="mt-3">
        <CCol md={3} className="pull-left">
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
          <h4 className="model-header-text mb-3">
            {selectedEventDetails.agenda}
          </h4>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">
              Organizer :
            </span>
            {selectedEventDetails.authorName?.fullName}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">Date :</span>
            <>
              {`${selectedEventDetails.fromDate} to ${selectedEventDetails.toDate} from
              ${selectedEventDetails.startTime} to ${selectedEventDetails.endTime}`}
            </>
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">Location :</span>
            {`${selectedEventDetails.roomName} in ${selectedEventDetails.locationName}`}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">
              Description :
            </span>
            {eventDescription}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">Trainer :</span>
            {trainer}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">Attendees:</span>
            {attendees}
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
