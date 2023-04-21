import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CButton,
  CTableDataCell,
  CCol,
  CRow,
  CLink,
  CBadge,
  CTooltip,
} from '@coreui/react-pro'
import parse from 'html-react-parser'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OToast from '../../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { usePagination } from '../../../middleware/hooks/usePagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import { GetBookingsForSelection } from '../../../types/ConferenceRoomBooking/BookingList/bookingListTypes'
import { deviceLocale } from '../../../utils/dateFormatUtils'

const BookingListTable = ({
  location,
  room,
  meetingStatus,
  selectDateOptions,
  selectDate,
}: {
  location: string
  room: string
  meetingStatus: string
  selectDateOptions: string
  selectDate: string
}): JSX.Element => {
  const [isAgendaModalVisible, setIsAgendaModalVisible] =
    useState<boolean>(false)
  const [toCancelBookingId, setToCancelBookingId] = useState(0)
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  const [modalAgenda, setModalAgenda] = useState({} as GetBookingsForSelection)
  const BookingsForSelection = useTypedSelector(
    reduxServices.bookingList.selectors.bookingsForSelection,
  )
  const isLoading = useTypedSelector(
    reduxServices.bookingList.selectors.isLoading,
  )

  const pageFromState = useTypedSelector(
    reduxServices.bookingList.selectors.pageFromState,
  )
  const pageSizeFromState = useTypedSelector(
    reduxServices.bookingList.selectors.pageSizeFromState,
  )
  const dispatch = useAppDispatch()
  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(
    BookingsForSelection.length,
    pageSizeFromState,
    pageFromState,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleAgendaModal = (booking: GetBookingsForSelection) => {
    setIsAgendaModalVisible(true)
    setModalAgenda(booking)
  }

  const roomBookingStatusLabelColor = (bookingStatus: string): JSX.Element => {
    if (bookingStatus === 'New') {
      return (
        <CBadge className="rounded-pill label-default">{bookingStatus}</CBadge>
      )
    } else if (bookingStatus === 'Cancelled') {
      return (
        <CBadge className="rounded-pill label-danger status-name">
          {bookingStatus}
        </CBadge>
      )
    } else if (bookingStatus === 'In Progress') {
      return (
        <CBadge className="rounded-pill label-success">{bookingStatus}</CBadge>
      )
    } else if (bookingStatus === 'Completed') {
      return (
        <CBadge className="rounded-pill label-danger">{bookingStatus}</CBadge>
      )
    }
    return <></>
  }

  const handleShowCancelModal = (visaId: number) => {
    setToCancelBookingId(visaId)
    setIsCancelModalVisible(true)
  }

  const handleConfirmCancelBookingDetails = async () => {
    setIsCancelModalVisible(false)
    const cancelBookingResultAction = await dispatch(
      reduxServices.bookingList.cancelRoomBooking(toCancelBookingId),
    )
    if (
      reduxServices.bookingList.cancelRoomBooking.fulfilled.match(
        cancelBookingResultAction,
      )
    ) {
      dispatch(
        reduxServices.bookingList.getBookingsForSelection({
          location: Number(location),
          meetingStatus,
          room,
          status: selectDate
            ? new Date(selectDate).toLocaleDateString(deviceLocale, {
                year: 'numeric',
                month: 'numeric',
                day: '2-digit',
              })
            : '' || selectDateOptions,
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Meeting status updated Successfully"
          />,
        ),
      )
    }
  }
  const history = useHistory()
  const editButtonHandler = (id: number) => {
    history.push(`/MeetingRequestEdit/${id}`)
    dispatch(reduxServices.bookingList.editMeetingRequest(id))
  }

  return (
    <>
      <CTable responsive striped className="text-start mt-5">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Agenda</CTableHeaderCell>
            <CTableHeaderCell scope="col">Booked Timings</CTableHeaderCell>
            <CTableHeaderCell scope="col">Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Room</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Author</CTableHeaderCell>
            <CTableHeaderCell scope="col">Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            BookingsForSelection &&
            BookingsForSelection.map((bookingItem, index) => {
              const agendaLimit =
                bookingItem.agenda && bookingItem.agenda.length > 30
                  ? `${bookingItem.agenda.substring(0, 30)}...`
                  : bookingItem.agenda
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row" className="sh-organization-link">
                    {bookingItem.agenda ? (
                      <CLink
                        className="cursor-pointer text-decoration-none"
                        data-testid="ticket-agenda-link"
                        onClick={() => handleAgendaModal(bookingItem)}
                      >
                        {parse(agendaLimit)}
                      </CLink>
                    ) : (
                      'N/A'
                    )}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.startTime} to {bookingItem.endTime}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.fromDate}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.roomName}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {roomBookingStatusLabelColor(bookingItem.meetingStatus)}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.authorName.firstName +
                      '' +
                      bookingItem.authorName.lastName}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {bookingItem.isAuthorisedUser ? (
                      <>
                        <CTooltip content="Edit">
                          <CButton
                            color="info"
                            className="btn-ovh me-2"
                            onClick={() => editButtonHandler(bookingItem.id)}
                            disabled={
                              bookingItem?.disableEdit ||
                              bookingItem.meetingStatus !== 'New'
                            }
                          >
                            <i className="fa fa-edit" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Cancel">
                          <CButton
                            color="btn btn-warning"
                            className="btn-ovh me-2"
                            onClick={() =>
                              handleShowCancelModal(bookingItem.id)
                            }
                            disabled={
                              bookingItem?.disableEdit ||
                              bookingItem.meetingStatus !== 'New'
                            }
                          >
                            <i
                              className="fa fa-times text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                      </>
                    ) : (
                      ''
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {BookingsForSelection.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {BookingsForSelection.length}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {BookingsForSelection.length > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {BookingsForSelection.length > 20 && (
            <CCol
              xs={5}
              className="gap-1 d-grid d-md-flex justify-content-md-end"
            >
              <OPagination
                currentPage={currentPage}
                pageSetter={setCurrentPage}
                paginationRange={paginationRange}
              />
            </CCol>
          )}
        </CRow>
      ) : (
        <CCol>
          <CRow className="mt-2 ms-2">
            <p>
              <strong>No Records Found... </strong>
            </p>
          </CRow>
        </CCol>
      )}
      <OModal
        modalSize="lg"
        alignment="center"
        visible={isAgendaModalVisible}
        setVisible={setIsAgendaModalVisible}
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
      >
        <>
          <h4 className="model-header-text mb-3">{modalAgenda.agenda}</h4>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">
              Organizer :
            </span>
            {modalAgenda.authorName?.fullName}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">Date :</span>
            <>
              {`${modalAgenda.fromDate} from
              ${modalAgenda.startTime} to ${modalAgenda.endTime}`}
            </>
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">Location :</span>
            {`${modalAgenda.roomName} in ${modalAgenda.locationName}`}
          </p>
          <p className="d-flex">
            <span className="col-sm-2 text-right fw-bold px-3">Attendees:</span>
            {modalAgenda.employeeDto?.length ? (
              <CCol sm={5}>
                <CTable align="middle" className="bookingList-model-table">
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell className="pt-0 ps-0">
                        Name of Employee
                      </CTableHeaderCell>
                      <CTableHeaderCell className="pt-0">
                        Designation
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {modalAgenda?.employeeDto?.map((emp, index) => {
                      return (
                        <CTableRow key={index}>
                          <CTableDataCell>{emp.fullName}</CTableDataCell>
                          <CTableDataCell>{emp.designation}</CTableDataCell>
                        </CTableRow>
                      )
                    })}
                  </CTableBody>
                </CTable>
              </CCol>
            ) : (
              <>N/A</>
            )}
          </p>
        </>
      </OModal>
      <OModal
        alignment="center"
        visible={isCancelModalVisible}
        setVisible={setIsCancelModalVisible}
        modalTitle="Cancel Meeting Room"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmCancelBookingDetails}
        modalBodyClass="mt-0"
      >
        <>Do you really want to cancel this Meeting ?</>
      </OModal>
    </>
  )
}

export default BookingListTable
