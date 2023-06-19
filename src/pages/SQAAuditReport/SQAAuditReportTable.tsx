import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CButton,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SQAAuditReschedule from './SQAAuditReschedule'
import OLoadingSpinner from '../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../components/ReusableComponent/OPagination'
import OToast from '../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../middleware/api/apiList'
import { reduxServices } from '../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import { LoadingType } from '../../types/Components/loadingScreenTypes'

const SQAAuditReportTable = ({
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [toDeleteSQAAuditId, setToDeleteSQAAuditId] = useState(0)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [auditType, setAuditType] = useState<string>('')
  const [isRejectModalVisible, setIsRejectModalVisible] = useState(false)
  const [isRescheduleModalVisible, setIsRescheduleModalVisible] =
    useState(false)

  const sqaAuditReportResponse = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReport,
  )

  const sqaAuditReportListSize = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.sqaAuditReportListSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.sqaAuditReport.selectors.isLoading,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessSqaAuditReport = userAccessToFeatures?.find(
    (feature) => feature.name === 'SQA Audit Report',
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  const editButtonHandler = (id: number) => {
    dispatch(reduxServices.addNewAuditForm.editAuditFormDetails(id))
  }

  const handleShowDeleteModal = (auditId: number, auditSQAType: string) => {
    setToDeleteSQAAuditId(auditId)
    setIsDeleteModalVisible(true)
    setAuditType(auditSQAType)
  }

  const handleShowCancelModal = (auditId: number, sqaAuditType: string) => {
    setToDeleteSQAAuditId(auditId)
    setIsRejectModalVisible(true)
    setAuditType(sqaAuditType)
  }

  const handleShowRescheduleModal = (auditId: number) => {
    setToDeleteSQAAuditId(auditId)
    setIsRescheduleModalVisible(true)
    dispatch(reduxServices.sqaAuditReport.getSQAAuditDetails(auditId))
  }

  const handleConfirmDeleteSQAAudit = async () => {
    setIsDeleteModalVisible(false)
    const deleteSQAAuditResultAction = await dispatch(
      reduxServices.sqaAuditReport.deleteProjectAuditDetails(
        toDeleteSQAAuditId,
      ),
    )
    if (
      reduxServices.sqaAuditReport.deleteProjectAuditDetails.fulfilled.match(
        deleteSQAAuditResultAction,
      )
    ) {
      dispatch(
        reduxServices.sqaAuditReport.getSQAAuditReport({
          endIndex: pageSize * currentPage,
          multiSearch: '',
          startIndex: pageSize * (currentPage - 1),
          SQAAuditSelectionDate: '',
          auditRescheduleStatus: '',
          auditStatus: '',
          from: '',
          to: '',
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Audit Deleted successfully"
          />,
        ),
      )
    }
  }

  const handleConfirmCancelSQAAudit = async () => {
    setIsRejectModalVisible(false)
    const cancelSQAAuditResultAction = await dispatch(
      reduxServices.sqaAuditReport.closeProjectAuditDetails(toDeleteSQAAuditId),
    )
    if (
      reduxServices.sqaAuditReport.closeProjectAuditDetails.fulfilled.match(
        cancelSQAAuditResultAction,
      )
    ) {
      dispatch(
        reduxServices.sqaAuditReport.getSQAAuditReport({
          endIndex: pageSize * currentPage,
          multiSearch: '',
          startIndex: pageSize * (currentPage - 1),
          SQAAuditSelectionDate: '',
          auditRescheduleStatus: '',
          auditStatus: '',
          from: '',
          to: '',
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Audit Closed Successfully"
          />,
        ),
      )
    }
  }

  const handleSQAAuditHistoryClick = (id: number) => {
    dispatch(reduxServices.sqaAuditReport.getNewSQAAuditTimelineDetails(id))
  }

  const handleClickSQAAuditViewReport = (id: number) => {
    dispatch(reduxServices.sqaAuditReport.getSQAAuditDetails(id))
  }

  return (
    <>
      <CTable striped className="mt-3 align-middle alignment">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Audit Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
            <CTableHeaderCell scope="col">Audit Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Audit Time</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">PCI %</CTableHeaderCell>
            <CTableHeaderCell scope="col">Follow-UP Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Reschedule</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            sqaAuditReportResponse &&
            sqaAuditReportResponse?.map((auditReport, index) => {
              const auditRescheduleStatus = auditReport?.auditRescheduleStatus
                ? 'Yes'
                : 'No'
              const projectType =
                auditReport?.projectType === 'true' ? 'Development' : 'Support'
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  <CTableDataCell>{auditReport?.auditType}</CTableDataCell>
                  <CTableDataCell>{projectType}</CTableDataCell>
                  <CTableDataCell>{auditReport?.projectName}</CTableDataCell>
                  <CTableDataCell>{auditReport?.projectManager}</CTableDataCell>
                  <CTableDataCell>{auditReport?.auditDate}</CTableDataCell>
                  <CTableDataCell>
                    {auditReport?.startTime} - {auditReport.endTime}
                  </CTableDataCell>
                  <CTableDataCell>{auditReport.auditStatus}</CTableDataCell>
                  <CTableDataCell>{auditReport.pci || 'N/A'}</CTableDataCell>
                  <CTableDataCell>
                    {auditReport.followUpDate || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>{auditRescheduleStatus}</CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="Reschedule">
                      <CButton
                        color="success"
                        size="sm"
                        className="btn-ovh-employee-list me-1 sqa-btn"
                        data-testid="edit-btn"
                        onClick={() =>
                          handleShowRescheduleModal(auditReport.id)
                        }
                        disabled={auditReport.formStatus !== 'Submit'}
                      >
                        <i
                          className="fa fa-calendar text-white"
                          aria-hidden="true"
                        ></i>
                      </CButton>
                    </CTooltip>
                    <Link to={`/viewProjectAudit/${auditReport.id}`}>
                      <CTooltip content="View">
                        <CButton
                          color="info"
                          className="btn-ovh-employee-list me-1 sqa-btn"
                          data-testid="edit-btn"
                          onClick={() =>
                            handleClickSQAAuditViewReport(auditReport?.id)
                          }
                        >
                          <i
                            className="fa fa-eye  text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTooltip>
                    </Link>
                    {userAccessSqaAuditReport?.updateaccess && (
                      <Link to={`editAuditForm/${auditReport.id}`}>
                        <CTooltip content="Edit">
                          <CButton
                            color="info"
                            className="btn-ovh-employee-list me-1 mt-1 sqa-btn"
                            data-testid="edit-btn"
                            onClick={() => editButtonHandler(auditReport.id)}
                            disabled={auditReport.disableEditButton === true}
                          >
                            <i
                              className="fa fa-edit text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                      </Link>
                    )}
                    {userAccessSqaAuditReport?.deleteaccess && (
                      <>
                        <CTooltip content="Cancel">
                          <CButton
                            color="danger"
                            className="btn-ovh-employee-list me-1 mt-1 sqa-btn"
                            data-testid="cancel-btn"
                            onClick={() =>
                              handleShowCancelModal(
                                auditReport.id,
                                auditReport.auditType,
                              )
                            }
                            disabled={
                              auditReport.formStatus === 'Save' ||
                              auditReport.auditStatus === 'Closed'
                            }
                          >
                            <i
                              className="fa fa-times text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Delete">
                          <CButton
                            color="danger"
                            className="btn-ovh-employee-list me-1 mt-1 sqa-btn"
                            data-testid="delete-btn"
                            onClick={() =>
                              handleShowDeleteModal(
                                auditReport.id,
                                auditReport.auditType,
                              )
                            }
                            disabled={auditReport.formStatus !== 'Save'}
                          >
                            <i
                              className="fa fa-trash-o text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                      </>
                    )}
                    <Link to={`/newProjectAuditTimeline/${auditReport.id}`}>
                      <CTooltip content="Timeline">
                        <CButton
                          color="info"
                          className="btn-ovh-employee-list me-1 mt-1 sqa-btn"
                          data-testid="edit-btn"
                          onClick={() =>
                            handleSQAAuditHistoryClick(auditReport?.id)
                          }
                        >
                          <i
                            className="fa fa-bar-chart text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTooltip>
                    </Link>
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {sqaAuditReportResponse?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {sqaAuditReportListSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {sqaAuditReportListSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {sqaAuditReportListSize > 20 && (
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
          <CRow className="mt-4 ms-3">
            <h5>No Records Found... </h5>
          </CRow>
        </CCol>
      )}
      <OModal
        closeButtonClass="d-none"
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalTitle="Delete SQA Audit"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteSQAAudit}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this <b>{auditType}</b> audit?
        </>
      </OModal>
      <OModal
        closeButtonClass="d-none"
        alignment="center"
        visible={isRejectModalVisible}
        setVisible={setIsRejectModalVisible}
        modalTitle="Close SQA Audit"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmCancelSQAAudit}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to close this <b>{auditType}</b> audit?
        </>
      </OModal>
      <OModal
        modalSize="lg"
        closeButtonClass="d-none"
        alignment="center"
        visible={isRescheduleModalVisible}
        setVisible={setIsRescheduleModalVisible}
        modalBodyClass="mt-0"
        modalFooterClass="d-none"
      >
        <>
          <SQAAuditReschedule
            setIsRescheduleModalVisible={setIsRescheduleModalVisible}
          />
        </>
      </OModal>
    </>
  )
}

export default SQAAuditReportTable
