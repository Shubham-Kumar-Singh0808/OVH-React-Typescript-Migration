import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CCol,
  CRow,
  CBadge,
  CFormLabel,
  CFormTextarea,
  CTooltip,
} from '@coreui/react-pro'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'

const ProjectCreationRequestTable = ({
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  setToggle,
  userDeleteAction,
  userRejectAction,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setToggle: React.Dispatch<React.SetStateAction<string>>
  userDeleteAction: boolean
  userRejectAction: boolean
}): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false)
  const [toDeleteProjectRequestId, setToDeleteProjectRequestId] = useState(0)
  const [isYesButtonEnabled, setIsYesButtonEnabled] = useState(false)
  const [projectName, setProjectName] = useState<string>('')
  const dispatch = useAppDispatch()
  const [comments, setComments] = useState<string>('')
  const getAllProjectRequestList = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.allProjectCreationList,
  )

  const projectRequestListSize = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.allProjectCreationListSize,
  )

  const isLoading = useTypedSelector(
    reduxServices.projectCreationRequest.selectors.isLoading,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessCreateAction = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project Creation Requests',
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }

  useEffect(() => {
    if (comments?.replace(/^\s*/, '')) {
      setIsYesButtonEnabled(true)
    } else {
      setIsYesButtonEnabled(false)
    }
  }, [comments])

  const projectRequestStatusLabelColor = (status: string): JSX.Element => {
    if (status === 'Rejected') {
      return (
        <CBadge className="rounded-pill label-danger status-name">
          {status}
        </CBadge>
      )
    } else if (status === 'Approved') {
      return (
        <CBadge className="rounded-pill label-success status-name">
          {status}
        </CBadge>
      )
    } else if (status === 'Pending Approval') {
      return <CBadge className="rounded-pill label-default ">{status}</CBadge>
    }
    return <></>
  }
  const handleProjectRequestViewClick = (id: number) => {
    dispatch(reduxServices.projectCreationRequest.getProjectRequest(id))
    setToggle('projectView')
  }

  const handleProjectRequestApproveClick = (id: number) => {
    dispatch(reduxServices.projectCreationRequest.getApproveProjectRequest(id))
    setToggle('approvalProjectHistory')
  }

  const handleProjectRequestHistoryClick = (id: number) => {
    dispatch(
      reduxServices.projectCreationRequest.projectRequestHistoryDetails(id),
    )
    setToggle('projectHistory')
  }

  const handleShowDeleteModal = (
    requestId: number,
    projectRequestName: string,
  ) => {
    setToDeleteProjectRequestId(requestId)
    setIsDeleteModalVisible(true)
    setProjectName(projectRequestName)
  }

  const handleShowRejectModal = (id: number) => {
    setToDeleteProjectRequestId(id)
    setIsCancelModalVisible(true)
    setComments('')
  }

  const handleConfirmDeleteProjectRequestDetail = async () => {
    setIsDeleteModalVisible(false)
    const deleteProjectRequestResultAction = await dispatch(
      reduxServices.projectCreationRequest.deleteProjectRequest(
        toDeleteProjectRequestId,
      ),
    )
    if (
      reduxServices.projectCreationRequest.deleteProjectRequest.fulfilled.match(
        deleteProjectRequestResultAction,
      )
    ) {
      dispatch(
        reduxServices.projectCreationRequest.getAllProjectRequestList({
          endIndex: pageSize * currentPage,
          multiSearch: '',
          firstIndex: pageSize * (currentPage - 1),
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Project request deleted successfully"
          />,
        ),
      )
    } else if (
      reduxServices.projectCreationRequest.deleteProjectRequest.rejected.match(
        deleteProjectRequestResultAction,
      ) &&
      deleteProjectRequestResultAction.payload === 406
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            Project request already mapped with project.So,you can't delete"
          />,
        ),
      )
    }
  }

  const handleConfirmRejectProjectRequestDetail = async () => {
    setIsCancelModalVisible(false)
    const rejectProjectRequestResultAction = await dispatch(
      reduxServices.projectCreationRequest.rejectProjectRequest({
        comment: comments,
        requestId: toDeleteProjectRequestId,
      }),
    )
    if (
      reduxServices.projectCreationRequest.rejectProjectRequest.fulfilled.match(
        rejectProjectRequestResultAction,
      )
    ) {
      dispatch(
        reduxServices.projectCreationRequest.getAllProjectRequestList({
          endIndex: pageSize * currentPage,
          multiSearch: '',
          firstIndex: pageSize * (currentPage - 1),
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Project request rejected successfully"
          />,
        ),
      )
    }
  }

  return (
    <>
      <CTable
        striped
        className="projectCreation-request-table mt-3 align-middle"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Pricing Model</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Type</CTableHeaderCell>
            <CTableHeaderCell scope="col">Client</CTableHeaderCell>
            <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState?.loading ? (
            getAllProjectRequestList &&
            getAllProjectRequestList?.map((projectRequest, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {getItemNumber(index)}
                  </CTableDataCell>
                  <CTableDataCell className="project-width">
                    {projectRequest.projectName}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectRequest.type.charAt(0).toUpperCase() +
                      projectRequest.type.slice(1).toLowerCase()}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectRequest?.model?.charAt(0).toUpperCase() +
                      projectRequest?.model?.slice(1).toLowerCase()}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectRequest.client || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectRequest.managerName || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectRequest.startdate || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectRequest.enddate || 'N/A'}
                  </CTableDataCell>
                  <CTableDataCell>
                    {projectRequestStatusLabelColor(projectRequest.status)}
                  </CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="View">
                      <CButton
                        color="info"
                        className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                        data-testid="view-btn"
                        onClick={() =>
                          handleProjectRequestViewClick(projectRequest.id)
                        }
                      >
                        <i className="fa fa-eye  text-white"></i>
                      </CButton>
                    </CTooltip>
                    {userAccessCreateAction?.updateaccess && (
                      <CTooltip content="Approve Project">
                        <CButton
                          color="success"
                          className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                          data-testid="edit-btn"
                          onClick={() =>
                            handleProjectRequestApproveClick(projectRequest.id)
                          }
                          disabled={
                            projectRequest.status === 'Rejected' ||
                            projectRequest.status === 'Approved'
                          }
                        >
                          <i className="fa fa-check-circle-o"></i>
                        </CButton>
                      </CTooltip>
                    )}
                    <CTooltip content="Timeline">
                      <CButton
                        color="info"
                        className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                        data-testid="history-btn"
                        onClick={() =>
                          handleProjectRequestHistoryClick(projectRequest.id)
                        }
                      >
                        <i className="fa fa-bar-chart text-white"></i>
                      </CButton>
                    </CTooltip>
                    {userRejectAction && (
                      <CTooltip content="Cancel">
                        <CButton
                          color="danger"
                          className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                          data-testid="reject-btn"
                          disabled={
                            projectRequest.status === 'Rejected' ||
                            projectRequest.status === 'Approved'
                          }
                          onClick={() =>
                            handleShowRejectModal(projectRequest.id)
                          }
                        >
                          <i className="fa fa-times text-white"></i>
                        </CButton>
                      </CTooltip>
                    )}
                    {userDeleteAction && (
                      <CTooltip content="Delete">
                        <CButton
                          color="danger"
                          className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                          data-testid="delete-btn"
                          onClick={() =>
                            handleShowDeleteModal(
                              projectRequest.id,
                              projectRequest.projectName,
                            )
                          }
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
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
      {getAllProjectRequestList?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {projectRequestListSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {projectRequestListSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80, 100]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {projectRequestListSize > 20 && (
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
        modalTitle="Delete Project Request"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteProjectRequestDetail}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this <b>{projectName}</b> project
          request?
        </>
      </OModal>
      <>
        <OModal
          alignment="center"
          visible={isCancelModalVisible}
          setVisible={setIsCancelModalVisible}
          modalHeaderClass="d-none"
          confirmButtonText="Yes"
          cancelButtonText="No"
          isConfirmButtonDisabled={!isYesButtonEnabled}
          confirmButtonAction={handleConfirmRejectProjectRequestDetail}
        >
          <div>
            {`Do you really want to reject this project request ?`}

            <CRow className="mt-1 mb-0 align-items-center pt-4">
              <CFormLabel className="form-label col-form-label p-1 ps-3 pe-3">
                Comments:
                <span
                  className={
                    comments?.replace(/^\s*/, '') ? 'text-white' : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={6} className="w-100">
                <CFormTextarea
                  placeholder="Purpose"
                  aria-label="textarea"
                  id="textArea"
                  name="textArea"
                  data-testid="text-area"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></CFormTextarea>
              </CCol>
            </CRow>
          </div>
        </OModal>
      </>
    </>
  )
}

export default ProjectCreationRequestTable
