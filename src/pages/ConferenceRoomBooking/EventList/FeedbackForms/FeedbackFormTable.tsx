import {
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import OPageSizeSelect from '../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { EventListTableProps } from '../../../../types/ConferenceRoomBooking/EventList/eventListTypes'

const FeedbackFormTable = (props: EventListTableProps): JSX.Element => {
  const feedbackFormsList = useTypedSelector(
    reduxServices.eventList.selectors.feedbackForms,
  )

  const feedbackFormListSize = useTypedSelector(
    reduxServices.eventList.selectors.feedbackFormListSize,
  )

  const {
    paginationRange,
    pageSize,
    setPageSize,
    currentPage,
    setCurrentPage,
  } = props

  const handleFeedbackFormListPageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      {feedbackFormsList.length ? (
        <>
          <CTable className="mt-4" striped align="middle">
            <CTableHead>
              <CTableRow className="text-start">
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Feedback Form Name
                </CTableHeaderCell>
                <CTableHeaderCell>Created by</CTableHeaderCell>
                <CTableHeaderCell>Created date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {feedbackFormsList?.map((feedbackForm, index) => {
                return (
                  <CTableRow key={index} className="text-start">
                    <CTableDataCell>{index + 1}</CTableDataCell>
                    <CTableDataCell>
                      {feedbackForm.feedBackFormName}
                    </CTableDataCell>
                    <CTableDataCell>{feedbackForm.createdBy}</CTableDataCell>
                    <CTableDataCell>{feedbackForm.createdDate}</CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {feedbackFormListSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {feedbackFormListSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={
                    handleFeedbackFormListPageSizeSelectChange
                  }
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {feedbackFormListSize > 20 && (
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
      ) : (
        <p className="text-center">No Records Found...</p>
      )}
    </>
  )
}

export default FeedbackFormTable
