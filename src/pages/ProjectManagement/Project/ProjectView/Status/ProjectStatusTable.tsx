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
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
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
  const handleShowDeleteModal = (id: number) => {
    setToDeleteVisaId(id)
    setIsDeleteModalVisible(true)
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
            toastMessage="Visa Detail deleted successfully"
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
  const handleModal = (ticket: string) => {
    setIsModalVisible(true)
    setSubject(ticket)
  }
  return (
    <>
      <CTable striped className="mt-3">
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
              return (
                <CTableRow key={index}>
                  <CTableDataCell>{getItemNumber(index)}</CTableDataCell>
                  <CTableDataCell>{statusReport.prevDate}</CTableDataCell>
                  <CTableDataCell>
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      data-testid={`subject-comments`}
                      onClick={() => handleModal(statusReport.prevstatus)}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: statusReport.prevstatus,
                        }}
                      />
                    </CLink>
                  </CTableDataCell>
                  <CTableDataCell>{statusReport.nextDate}</CTableDataCell>
                  <CTableDataCell>
                    <CLink
                      className="cursor-pointer text-decoration-none text-primary"
                      data-testid={`dsc-comments`}
                      onClick={() => handleModal(statusReport.nextstatus)}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: statusReport.nextstatus,
                        }}
                      />
                    </CLink>
                  </CTableDataCell>
                  <CTableDataCell>
                    <>
                      {userAccessToProjectStatus?.updateaccess && (
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
                      )}
                      {userAccessToProjectStatus?.deleteaccess && (
                        <CButton
                          color="danger"
                          className="btn-ovh me-1 btn-ovh-employee-list"
                          data-testid="delete-btn"
                          onClick={() => handleShowDeleteModal(statusReport.id)}
                        >
                          <i className="fa fa-trash-o" aria-hidden="true"></i>
                        </CButton>
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
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteProjectStatus}
      >
        {`Do you really want to delete this ?`}
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
        <div
          dangerouslySetInnerHTML={{
            __html: subject,
          }}
        />
      </OModal>
    </>
  )
}

export default ProjectStatusTable