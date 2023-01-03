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
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setToggle: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteProjectRequestId, setToDeleteProjectRequestId] = useState(0)
  const [isYesButtonEnabled, setIsYesButtonEnabled] = useState(false)
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

  const userAccessDeleteAction = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project Creation Requests',
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

  useEffect(() => {
    if (comments) {
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

  const handleShowDeleteModal = (requestId: number) => {
    setToDeleteProjectRequestId(requestId)
    setIsDeleteModalVisible(true)
  }

  const handleShowRejectModal = (id: number) => {
    setToDeleteProjectRequestId(id)
    setIsDeleteModalVisible(true)
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
    setIsDeleteModalVisible(false)
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
      <CTable striped className="mt-3">
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
          {isLoading !== ApiLoadingState.loading ? (
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
                    {projectRequest.model.charAt(0).toUpperCase() +
                      projectRequest.model.slice(1).toLowerCase()}
                  </CTableDataCell>
                  <CTableDataCell>{projectRequest.client}</CTableDataCell>
                  <CTableDataCell>{projectRequest.managerName}</CTableDataCell>
                  <CTableDataCell>{projectRequest.startdate}</CTableDataCell>
                  <CTableDataCell>{projectRequest.enddate}</CTableDataCell>
                  <CTableDataCell>
                    {projectRequestStatusLabelColor(projectRequest.status)}
                  </CTableDataCell>
                  <CTableDataCell>
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
                    <CButton
                      color="danger"
                      className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                      data-testid="edit-btn"
                      disabled={
                        projectRequest.status === 'Rejected' ||
                        projectRequest.status === 'Approved'
                      }
                      onClick={() => handleShowRejectModal(projectRequest.id)}
                    >
                      <i className="fa fa-times text-white"></i>
                    </CButton>
                    {userAccessDeleteAction?.deleteaccess && (
                      <CButton
                        color="danger"
                        className="btn-ovh btn-ovh btn-ovh-employee-list me-1"
                        data-testid="edit-btn"
                        onClick={() => handleShowDeleteModal(projectRequest.id)}
                      >
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                      </CButton>
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
                options={[20, 40, 60, 80]}
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
        alignment="center"
        visible={isDeleteModalVisible}
        setVisible={setIsDeleteModalVisible}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteProjectRequestDetail}
      >
        {`Do you really want to delete this OVH-Test project request?`}
      </OModal>
      <>
        <OModal
          alignment="center"
          visible={isDeleteModalVisible}
          setVisible={setIsDeleteModalVisible}
          modalHeaderClass="d-none"
          confirmButtonText="Yes"
          cancelButtonText="No"
          isConfirmButtonDisabled={!isYesButtonEnabled}
          confirmButtonAction={handleConfirmRejectProjectRequestDetail}
        >
          <div>
            {`Do you really want to reject this project request ?`}

            <CRow className="mt-1 mb-0 align-items-center">
              <CFormLabel className="col-sm-3 col-form-label text-end p-1 pe-3">
                Comments:
                <span className={comments ? 'text-white' : 'text-danger'}>
                  *
                </span>
              </CFormLabel>
              <CCol sm={6} className="w-500">
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
