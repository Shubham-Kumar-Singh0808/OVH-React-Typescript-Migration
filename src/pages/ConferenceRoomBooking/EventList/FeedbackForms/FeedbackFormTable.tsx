import {
  CCol,
  CLink,
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
import eventListApi from '../../../../middleware/api/ConferenceRoomBooking/EventList/eventListApi'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { EventListTableProps } from '../../../../types/ConferenceRoomBooking/EventList/eventListTypes'
import { downloadFile } from '../../../../utils/helper'

const FeedbackFormTable = (props: EventListTableProps): JSX.Element => {
  const feedbackFormsList = useTypedSelector(
    reduxServices.eventList.selectors.feedbackForms,
  )

  const feedbackFormListSize = useTypedSelector(
    reduxServices.eventList.selectors.feedbackFormListSize,
  )

  const tenantKey = useTypedSelector(
    reduxServices.authentication.selectors.selectTenantKey,
  )
  const authenticatedToken = useTypedSelector(
    reduxServices.authentication.selectors.selectToken,
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
  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const handleDownloadFeedbackForm = async (feedbackFormName: string) => {
    const employeeFeedbackForm = await eventListApi.downloadFeedbackForm({
      fileName: feedbackFormName,
      token: tenantKey,
      tenantKey: authenticatedToken,
    })
    downloadFile(employeeFeedbackForm, feedbackFormName)
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
                    <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                    <CTableDataCell>
                      <CLink
                        className="cursor-pointer sh-hive-activity-link"
                        onClick={() =>
                          handleDownloadFeedbackForm(
                            feedbackForm.feedBackFormName,
                          )
                        }
                      >
                        {feedbackForm.feedBackFormName}
                      </CLink>
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
        <strong>No Records Found...</strong>
      )}
    </>
  )
}

export default FeedbackFormTable
