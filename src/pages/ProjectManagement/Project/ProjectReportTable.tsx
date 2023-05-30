import {
  CButton,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectDetailsTable from './ProjectDetailsTable'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OToast from '../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'
import {
  AllocationProjectType,
  CloseProjectType,
  DeallocationProjectType,
  DeleteProjectType,
  ProjectReportsTableProps,
  SubProjectType,
} from '../../../types/ProjectManagement/Project/ProjectTypes'
import { ProjectDetails as ProjectInfo } from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import { ApiLoadingState } from '../../../middleware/api/apiList'

const allocated = 'Allocated'
const deAllocated = 'De-Allocated'

const initValue = {
  endIndex: 20,
  firstIndex: 0,
  health: 'All',
  projectStatus: 'INPROGRESS',
  type: 'All',
  projectDatePeriod: '',
  intrnalOrNot: false,
  multiSearch: '',
}

const getConditionValue = (
  isTrue: boolean,
  firstValue: string | number,
  secondValue: string | number,
): string | number => (isTrue ? firstValue : secondValue)

const ProjectReportsTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  isCloseBtnVisible,
  userAccess,
}: ProjectReportsTableProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const [isShow, setIsShow] = useState(false)
  const [selectedProject, setSelectedProject] = useState<number>()
  const [toCloseProject, setToCloseProject] = useState<CloseProjectType>({
    isCloseModelVisible: false,
  })
  const [toDeleteProject, setToDeleteProject] = useState<DeleteProjectType>({
    isDeleteModelVisible: false,
  })
  const [toDeallocatedProject, setToDeallocatedProject] =
    useState<DeallocationProjectType>({
      isDeallocatedModelVisible: false,
    })
  const [toAllocatedProject, setAllocatedProject] =
    useState<AllocationProjectType>({
      isAllocatedVisible: false,
    })
  const [subProject, setSubProject] = useState<SubProjectType>()

  const projectReports = useTypedSelector(
    reduxServices.projectReport.selectors.projectReports,
  )

  const isProjectLoading = useTypedSelector(
    reduxServices.projectReport.selectors.isProjectLoading,
  )

  const isClientProjectLoading = useTypedSelector(
    reduxServices.projectReport.selectors.isClientProjectLoading,
  )

  const listSize = useTypedSelector(
    reduxServices.projectReport.selectors.listSize,
  )

  const projectClients = useTypedSelector(
    reduxServices.projectReport.selectors.projectClients,
  )

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessProjectClose = userAccessToFeatures?.find(
    (feature) => feature.name === 'ProjectClose',
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleShowProject = (projectId: number) => {
    setIsShow(true)
    setSelectedProject(projectId)
    dispatch(
      reduxServices.projectReport.getFetchProjectClients(projectId.toString()),
    )
  }

  const handleShowCloseModal = (visaId: number, name: string) => {
    setToCloseProject({
      id: visaId,
      projectName: name,
      isCloseModelVisible: true,
    })
  }

  const handleShowDeleteModal = (visaId: number, name: string) => {
    setToDeleteProject({
      id: visaId,
      projectName: name,
      isDeleteModelVisible: true,
    })
  }

  const handleShowDeallocationModal = (
    data: ProjectInfo,
    projectId: number,
  ) => {
    setToDeallocatedProject({
      data,
      projectId,
      isDeallocatedModelVisible: true,
    })
  }

  const handleAllocationModal = (data: ProjectInfo, projectId: number) => {
    setSubProject(undefined)
    setAllocatedProject({
      data,
      projectId,
      isAllocatedVisible: true,
    })
  }

  const handleOnChangeAllocation = (e: { target: { value: string } }) => {
    setSubProject({
      ...subProject,
      allocation: Number(e.target.value),
    })
  }

  const handleOnChangeBillable = (e: { target: { value: string } }) => {
    setSubProject({
      ...subProject,
      billable: e.target.value,
    })
  }

  const handleOnChangeIsAllocated = (e: { target: { value: string } }) => {
    setSubProject({
      ...subProject,
      isAllocated: e.target.value === allocated,
    })
  }

  const handleConfirmCloseProject = async () => {
    setToCloseProject({ ...toCloseProject, isCloseModelVisible: false })

    const projectId = toCloseProject.id != null ? toCloseProject.id : 0

    const closeResponse = await dispatch(
      reduxServices.projectReport.closeProjectReport(projectId.toString()),
    )
    if (
      reduxServices.projectReport.closeProjectReport.fulfilled.match(
        closeResponse,
      )
    ) {
      dispatch(
        reduxServices.projectReport.getFetchActiveProjectReports(initValue),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage={`${toCloseProject.projectName} successfully closed`}
          />,
        ),
      )
    }
  }

  const handleConfirmDeleteProject = async () => {
    setToDeleteProject({ ...toDeleteProject, isDeleteModelVisible: false })

    const projectId = toDeleteProject.id != null ? toDeleteProject.id : -0

    const deleteResponse = await dispatch(
      reduxServices.projectReport.deleteProjectReport(projectId.toString()),
    )

    if (
      reduxServices.projectReport.deleteProjectReport.fulfilled.match(
        deleteResponse,
      )
    ) {
      dispatch(
        reduxServices.projectReport.getFetchActiveProjectReports(initValue),
      )
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage={`${toDeleteProject.projectName} successfully deleted`}
          />,
        ),
      )
    }
  }

  const handleDeallocatedProject = async () => {
    setToDeallocatedProject({
      ...toDeallocatedProject,
      isDeallocatedModelVisible: false,
    })

    const payload =
      toDeallocatedProject.data != null
        ? {
            ...toDeallocatedProject.data,
            isAllocated: false,
          }
        : ({} as ProjectInfo)

    const deallocateResponse = await dispatch(
      reduxServices.projectReport.deallocateProjectReport(payload),
    )

    if (
      reduxServices.projectReport.deallocateProjectReport.fulfilled.match(
        deallocateResponse,
      )
    ) {
      const projectId =
        toDeallocatedProject.projectId != null
          ? toDeallocatedProject.projectId
          : 0
      dispatch(
        reduxServices.projectReport.getFetchProjectClients(
          projectId.toString(),
        ),
      )
    }
  }

  const handleUpdateProject = async (project: ProjectInfo) => {
    const payload = {
      ...project,
      ...subProject,
      billable: subProject?.billable === 'Yes',
    }

    const updateResponse = await dispatch(
      reduxServices.projectReport.updateProjectReport(payload),
    )

    if (
      reduxServices.projectReport.updateProjectReport.fulfilled.match(
        updateResponse,
      ) &&
      selectedProject != null
    ) {
      dispatch(
        reduxServices.projectReport.getFetchProjectClients(
          selectedProject.toString(),
        ),
      )

      setAllocatedProject({
        isAllocatedVisible: false,
      })
    }
  }

  const handleCancelUpdate = () => {
    setAllocatedProject({
      isAllocatedVisible: false,
    })
  }

  const handleViewModel = (projectId: number) => {
    dispatch(reduxServices.projectViewDetails.getProjectDetails(projectId))
    dispatch(reduxServices.projectViewDetails.getProject(projectId))
    dispatch(reduxServices.projectTimeLine.projectHistoryDetails(projectId))
    dispatch(
      reduxServices.projectChangeRequest.getProjectChangeRequestList({
        endIndex: pageSize * currentPage,
        firstIndex: pageSize * (currentPage - 1),
        projectid: String(projectId),
      }),
    )
    dispatch(
      reduxServices.projectMileStone.getProjectMileStone({
        endIndex: pageSize * currentPage,
        firstIndex: pageSize * (currentPage - 1),
        projectid: String(projectId),
      }),
    )
    dispatch(reduxServices.projectInvoices.getClosedMilestonesAndCRs(projectId))
  }

  const totalRecordsToDisplay = projectReports?.length
    ? `Total Records: ${listSize}`
    : `No Records found...`

  return (
    <>
      {isProjectLoading !== ApiLoadingState.loading ? (
        <>
          <CTable striped responsive className="ps-1 pe-1 align-middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className="text-center"></CTableHeaderCell>
                <CTableHeaderCell scope="col">Project Code</CTableHeaderCell>
                <CTableHeaderCell scope="col">Project Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Pricing Model</CTableHeaderCell>
                <CTableHeaderCell scope="col">Client</CTableHeaderCell>
                <CTableHeaderCell scope="col">Resources</CTableHeaderCell>
                <CTableHeaderCell scope="col">Project Manager</CTableHeaderCell>
                <CTableHeaderCell scope="col">
                  Delivery Manager
                </CTableHeaderCell>
                <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
                <CTableHeaderCell
                  scope="col"
                  className="sh-project-report-status"
                >
                  Status
                </CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell
                  scope="col"
                  className="sh-project-report-actions"
                >
                  Action
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody color="light">
              {projectReports?.map((value, index) => {
                return (
                  <React.Fragment key={index}>
                    <CTableRow>
                      <CTableDataCell className="text-center">
                        {isShow && selectedProject === value.id ? (
                          <i
                            className="fa fa-minus-circle cursor-pointer"
                            onClick={() => setIsShow(false)}
                            data-testid="minus-btn"
                          />
                        ) : (
                          <i
                            className="fa fa-plus-circle cursor-pointer"
                            onClick={() => handleShowProject(value.id)}
                            data-testid="plus-btn"
                          />
                        )}
                      </CTableDataCell>

                      <CTableDataCell>{value.projectCode}</CTableDataCell>
                      <CTableDataCell>{value.projectName}</CTableDataCell>
                      <CTableDataCell>
                        {value.type.charAt(0).toUpperCase()}
                        {value.type.slice(1).toLowerCase()}
                      </CTableDataCell>
                      <CTableDataCell>{value.client}</CTableDataCell>
                      <CTableDataCell>{value.count}</CTableDataCell>
                      <CTableDataCell>{value.managerName}</CTableDataCell>
                      <CTableDataCell>{value.deliveryManager}</CTableDataCell>
                      <CTableDataCell>{value.startdate}</CTableDataCell>
                      <CTableDataCell>{value.enddate}</CTableDataCell>
                      <CTableDataCell style={{ width: '120px' }}>
                        <span
                          className={`label label-table ${
                            value.health != null
                              ? 'label-' + value.health.toLowerCase()
                              : 'label-gray'
                          }`}
                        >
                          {value.status}
                        </span>
                      </CTableDataCell>
                      <CTableDataCell>
                        {isCloseBtnVisible &&
                          userAccessProjectClose?.viewaccess && (
                            <CTooltip content="Close">
                              {value.status === 'Closed' ? (
                                <></>
                              ) : (
                                <>
                                  <CButton
                                    className="btn-ovh-employee-list me-1"
                                    color="danger btn-ovh me-1"
                                    data-testid="close-btn"
                                    onClick={() =>
                                      handleShowCloseModal(
                                        value.id,
                                        value.projectName,
                                      )
                                    }
                                  >
                                    <i
                                      className="fa fa-times text-white sh-fa-times"
                                      aria-hidden="true"
                                    ></i>
                                  </CButton>
                                </>
                              )}
                            </CTooltip>
                          )}
                      </CTableDataCell>
                      <CTableDataCell style={{ width: '120px' }}>
                        <Link to={`/viewProject/${value.id}`}>
                          <CTooltip content="View">
                            <CButton
                              className="btn-ovh-employee-list me-1"
                              color="info-light btn-ovh me-1"
                              data-testid="view-btn"
                              onClick={() => handleViewModel(value.id)}
                            >
                              <i
                                className="fa fa-eye text-white"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                        </Link>
                        {userAccess.updateaccess && (
                          <Link to={`/editproject/${value.id}`}>
                            <CTooltip content="Edit">
                              <CButton
                                className="btn-ovh-employee-list me-1"
                                color="primary btn-ovh me-1"
                                data-testid="edit-btn"
                              >
                                <i
                                  className="fa fa-edit text-white"
                                  aria-hidden="true"
                                ></i>
                              </CButton>
                            </CTooltip>
                          </Link>
                        )}
                        {userAccess.deleteaccess && (
                          <CTooltip content="Delete">
                            <CButton
                              className="btn-ovh-employee-list me-1"
                              color="danger btn-ovh me-1"
                              data-testid="delete-btn"
                              disabled={value.count > 0}
                              onClick={() =>
                                handleShowDeleteModal(
                                  value.id,
                                  value.projectName,
                                )
                              }
                            >
                              <i
                                className="fa fa-trash-o text-white"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </CTooltip>
                        )}
                      </CTableDataCell>
                    </CTableRow>
                    {isShow &&
                      selectedProject === value.id &&
                      (projectClients != null &&
                      isClientProjectLoading !== ApiLoadingState.loading ? (
                        <ProjectDetailsTable
                          toAllocatedProject={toAllocatedProject}
                          handleOnChangeAllocation={handleOnChangeAllocation}
                          getConditionValue={getConditionValue}
                          handleOnChangeBillable={handleOnChangeBillable}
                          handleOnChangeIsAllocated={handleOnChangeIsAllocated}
                          handleUpdateProject={handleUpdateProject}
                          handleAllocationModal={handleAllocationModal}
                          handleShowDeallocationModal={
                            handleShowDeallocationModal
                          }
                          handleCancelUpdate={handleCancelUpdate}
                          allocated={allocated}
                          deAllocated={deAllocated}
                          value={value}
                        />
                      ) : (
                        <OLoadingSpinner type={LoadingType.PAGE} />
                      ))}
                  </React.Fragment>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4} md={3}>
              <p className="mt-2">
                <strong>{totalRecordsToDisplay}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {listSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80, 100]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {listSize > 20 && (
              <CCol
                xs={5}
                md={6}
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
        </>
      ) : (
        <CCol data-testid="spinner">
          <CRow className="category-loading-spinner">
            <OLoadingSpinner type={LoadingType.PAGE} />
          </CRow>
        </CCol>
      )}
      <OModal
        alignment="center"
        visible={toCloseProject.isCloseModelVisible}
        setVisible={(value) =>
          setToCloseProject({ ...toCloseProject, isCloseModelVisible: value })
        }
        modalTitle="Close Project"
        confirmButtonText="Yes"
        cancelButtonText="No"
        modalBodyClass="mt-0"
        closeButtonClass="d-none"
        confirmButtonAction={handleConfirmCloseProject}
      >
        <p>
          Do you really want to close this
          <strong>{` ${toCloseProject.projectName}`}</strong> project?
        </p>
      </OModal>
      <OModal
        alignment="center"
        visible={toDeleteProject.isDeleteModelVisible}
        setVisible={(value) =>
          setToDeleteProject({
            ...toDeleteProject,
            isDeleteModelVisible: value,
          })
        }
        modalTitle="Delete Project"
        modalBodyClass="mt-0"
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteProject}
      >
        <p>
          Do you really want to delete this
          <strong>{` ${toDeleteProject.projectName}`}</strong> project?
        </p>
      </OModal>
      <OModal
        alignment="center"
        visible={toDeallocatedProject.isDeallocatedModelVisible}
        setVisible={(value) =>
          setToDeallocatedProject({
            ...toDeallocatedProject,
            isDeallocatedModelVisible: value,
          })
        }
        modalTitle="De-Allocate Employee"
        modalBodyClass="mt-0"
        closeButtonClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleDeallocatedProject}
      >
        <p>Do you really want to deallocate employee?</p>
      </OModal>
    </>
  )
}

export default ProjectReportsTable
