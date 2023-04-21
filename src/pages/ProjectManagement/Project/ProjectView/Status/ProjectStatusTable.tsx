import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CButton,
  CTableBody,
  CTableDataCell,
  CCol,
  CRow,
  CLink,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'
import OLoadingSpinner from '../../../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../../../components/ReusableComponent/OPagination'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../../../../middleware/api/apiList'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { LoadingType } from '../../../../../types/Components/loadingScreenTypes'
import { ProjectStatusReport } from '../../../../../types/ProjectManagement/Project/ProjectView/Status/projectStatusTypes'

const ProjectStatusTable = ({
  paginationRange,
  currentPage,
  setCurrentPage,
  pageSize,
  setPageSize,
  setToggle,
  setEditCurrentWeekDate,
  setEditNextWeekDate,
  setEditNextWeekStatus,
  setEditCurrentWeekStatus,
  setStatusId,
}: {
  paginationRange: number[]
  currentPage: number
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
  setPageSize: React.Dispatch<React.SetStateAction<number>>
  setToggle: (value: string) => void
  setEditCurrentWeekDate: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  setEditNextWeekDate: React.Dispatch<React.SetStateAction<string | undefined>>
  setEditNextWeekStatus: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  setEditCurrentWeekStatus: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  setStatusId: React.Dispatch<React.SetStateAction<number | undefined>>
}): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [subject, setSubject] = useState<string>('')
  const [toDeleteVisaId, setToDeleteVisaId] = useState(0)
  const { projectId } = useParams<{ projectId: string }>()
  const [taskName, setTaskName] = useState('')
  const [toDeleteVisaIdName, setToDeleteVisaIdName] = useState('')

  const [modalSubject, setModalSubject] = useState<string>('')
  const [modalTaskName, setModalTaskName] = useState('')
  const [isSubjectModalVisible, setIsSubjectModalVisible] = useState(false)

  const projectStatusList = useTypedSelector(
    reduxServices.projectStatus.selectors.projectStatusReport,
  )

  const projectListSize = useTypedSelector(
    reduxServices.projectStatus.selectors.statusReportListSize,
  )
  const isLoading = useTypedSelector(
    reduxServices.projectStatus.selectors.isLoading,
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToProjectStatus = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project-Status',
  )
  const dispatch = useAppDispatch()
  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }
  const getItemNumber = (index: number) => {
    return (currentPage - 1) * pageSize + index + 1
  }
  const handleShowDeleteModal = (id: number, prevDate: string) => {
    setToDeleteVisaId(id)
    setIsDeleteModalVisible(true)
    setToDeleteVisaIdName(prevDate)
  }

  const handleConfirmDeleteProjectStatus = async () => {
    setIsDeleteModalVisible(false)
    const deleteProjectStatusResultAction = await dispatch(
      reduxServices.projectStatus.deleteProjectStatus(toDeleteVisaId),
    )
    if (
      reduxServices.projectStatus.deleteProjectStatus.fulfilled.match(
        deleteProjectStatusResultAction,
      )
    ) {
      dispatch(
        reduxServices.projectStatus.getStatusReportList({
          endIndex: pageSize * currentPage,
          firstIndex: pageSize * (currentPage - 1),
          projectId,
        }),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Status Deleted Successfully"
          />,
        ),
      )
    }
  }

  const editProjectStatusButtonHandler = (item: ProjectStatusReport): void => {
    setToggle('editProjectStatus')
    setEditCurrentWeekDate(item.prevDate)
    setEditNextWeekDate(item.nextDate)
    setEditNextWeekStatus(item.nextstatus)
    setEditCurrentWeekStatus(item.prevstatus)
    setStatusId(item.id)
  }
  const handleModalTask = (ticket: string, task: string) => {
    setIsModalVisible(true)
    setSubject(ticket)
    setTaskName(task)
  }
  const handleModal = (ticket: string, task: string) => {
    setIsSubjectModalVisible(true)
    setModalSubject(ticket)
    setModalTaskName(task)
  }
  return (
    <>
      <CTable striped className="mt-3 align-middle">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Prev. Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Prev. Task</CTableHeaderCell>
            <CTableHeaderCell scope="col">Next Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Next Task</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody color="light">
          {isLoading !== ApiLoadingState.loading ? (
            projectStatusList &&
            projectStatusList?.map((statusReport, index) => {
              const removeTag = '/(<([^>]+)>)/gi'
              const removeSpaces = statusReport.prevstatus
                .replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
                .replace(removeTag, '')
              const removeSpacesNextStatus = statusReport.nextstatus
                .replace(/\s+/g, ' ')
                .trim()
                .replace(/&nbsp;/g, '')
                .replace(removeTag, '')
              const descriptionLimit =
                removeSpaces && removeSpaces.length > 15
                  ? `${removeSpaces.substring(0, 15)}...`
                  : removeSpaces
              const nextStatus =
                removeSpacesNextStatus && removeSpacesNextStatus.length > 15
                  ? `${removeSpacesNextStatus.substring(0, 15)}...`
                  : removeSpacesNextStatus
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  <CTableDataCell>{statusReport.prevDate}</CTableDataCell>
                  <CTableDataCell>
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      data-testid={`subject-comments`}
                      onClick={() =>
                        handleModalTask(
                          statusReport.prevstatus,
                          statusReport.prevDate,
                        )
                      }
                    >
                      {parse(descriptionLimit)}
                    </CLink>
                  </CTableDataCell>
                  <CTableDataCell>{statusReport.nextDate}</CTableDataCell>
                  <CTableDataCell>
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      data-testid={`dsc-comments`}
                      onClick={() =>
                        handleModal(
                          statusReport.nextstatus,
                          statusReport.nextDate,
                        )
                      }
                    >
                      {parse(nextStatus)}
                    </CLink>
                  </CTableDataCell>
                  <CTableDataCell>
                    <>
                      {userAccessToProjectStatus?.updateaccess && (
                        <CTooltip content="Edit">
                          <CButton
                            color="info"
                            className="btn-ovh me-1 btn-ovh-employee-list"
                            data-testid="edit-btn"
                            onClick={() => {
                              editProjectStatusButtonHandler(statusReport)
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                      )}
                      {userAccessToProjectStatus?.deleteaccess && (
                        <CTooltip content="Delete">
                          <CButton
                            color="danger"
                            className="btn-ovh me-1 btn-ovh-employee-list"
                            data-testid="delete-btn"
                            onClick={() =>
                              handleShowDeleteModal(
                                statusReport.id,
                                statusReport.prevDate,
                              )
                            }
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                    </>
                  </CTableDataCell>
                </CTableRow>
              )
            })
          ) : (
            <OLoadingSpinner type={LoadingType.PAGE} />
          )}
        </CTableBody>
      </CTable>
      {projectStatusList?.length ? (
        <CRow>
          <CCol xs={4}>
            <p>
              <strong>Total Records: {projectListSize}</strong>
            </p>
          </CCol>
          <CCol xs={3}>
            {projectListSize > 20 && (
              <OPageSizeSelect
                handlePageSizeSelectChange={handlePageSizeSelectChange}
                options={[20, 40, 60, 80]}
                selectedPageSize={pageSize}
              />
            )}
          </CCol>
          {projectListSize > 20 && (
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
        modalTitle="Delete Status"
        confirmButtonText="Yes"
        cancelButtonText="No"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmDeleteProjectStatus}
        modalBodyClass="mt-0"
      >
        <>
          Do you really want to delete this{' '}
          <strong>{toDeleteVisaIdName}</strong>
        </>
      </OModal>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        modalBodyClass="model-body-text-alinement"
        visible={isModalVisible}
        setVisible={setIsModalVisible}
      >
        <>
          <h4>Weekly status Report {taskName}</h4>
          <span className="descriptionField">
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{
                __html: subject,
              }}
            />
          </span>
        </>
      </OModal>
      <OModal
        modalSize="lg"
        alignment="center"
        modalFooterClass="d-none"
        modalHeaderClass="d-none"
        modalBodyClass="model-body-text-alinement"
        visible={isSubjectModalVisible}
        setVisible={setIsSubjectModalVisible}
      >
        <>
          <h4>Weekly status Report {modalTaskName}</h4>
          <span className="descriptionField">
            <div
              className="mt-3"
              dangerouslySetInnerHTML={{
                __html: modalSubject,
              }}
            />
          </span>
        </>
      </OModal>
    </>
  )
}

export default ProjectStatusTable
