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
import { useTypedSelector } from '../../../stateStore'
import {
  Event,
  EventListTableProps,
} from '../../../types/ConferenceRoomBooking/EventList/eventListTypes'
import OModal from '../../../components/ReusableComponent/OModal'

const EventListTable = (props: EventListTableProps): JSX.Element => {
  const [selectedEventDetails, setSelectedEventDetails] = useState({} as Event)
  const [isEventSubjectModalVisible, setIsEventSubjectModalVisible] =
    useState<boolean>(false)

  const eventList = useTypedSelector(reduxServices.eventList.selectors.events)
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

  const handleDescriptionModal = (event: Event) => {
    setIsEventSubjectModalVisible(true)
    setSelectedEventDetails(event)
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
                      data-testid="ticket-description-link"
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
                  >
                    <i className="fa fa-edit" aria-hidden="true"></i>
                  </CButton>
                  <CButton
                    color="warning"
                    size="sm"
                    className="btn-ovh me-1"
                    data-testid={`cancel-btn${index}`}
                    disabled
                    // onClick={() => handleShowCancelModal()}
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
          <p>
            <span className="col-sm-2 text-right fw-bold">Organizer :</span>
            {selectedEventDetails.authorName?.fullName}
          </p>
          <p>
            <span className="col-sm-2 text-right fw-bold">Date :</span>
            <>
              {`${selectedEventDetails.fromDate} to ${selectedEventDetails.toDate} from
              ${selectedEventDetails.startTime} to ${selectedEventDetails.endTime}`}
            </>
          </p>
          <p>
            <span className="col-sm-2 text-right fw-bold">Location :</span>
            {`${selectedEventDetails.roomName} in ${selectedEventDetails.locationName}`}
          </p>
          <p>
            <span className="col-sm-2 text-right fw-bold">Description :</span>
            {selectedEventDetails.description !== null
              ? selectedEventDetails.description
              : 'N/A'}
          </p>
          <p>
            <span className="col-sm-2 text-right fw-bold">Trainer :</span>
            {selectedEventDetails.trainerName?.fullName !== null
              ? `${selectedEventDetails.trainerName?.fullName} - ${selectedEventDetails.trainerName?.designation}`
              : 'N/A'}
          </p>
          <p>
            <span className="col-sm-2 text-right fw-bold"></span>
          </p>
        </>
      </OModal>
    </>
  )
}

export default EventListTable
