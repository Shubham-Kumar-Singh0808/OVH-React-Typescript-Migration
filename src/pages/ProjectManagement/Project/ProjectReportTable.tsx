import {
  CButton,
  CCol,
  CFormInput,
  CFormSelect,
  CLink,
  CRow,
  CSpinner,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import OModal from '../../../components/ReusableComponent/OModal'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import OToast from '../../../components/ReusableComponent/OToast'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { ProjectDetails } from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import { ProjectReportsTableProps } from '../../../types/ProjectManagement/Project/ProjectTypes'

type CloseProjectType = {
  id?: number
  projectName?: string
  isCloseModelVisible: boolean
}

type DeleteProjectType = {
  id?: number
  projectName?: string
  isDeleteModelVisible: boolean
}

type DeallocationProjectType = {
  data?: ProjectDetails
  projectId?: number
  isDeallocatedModelVisible: boolean
}

type AllocationProjectType = {
  data?: ProjectDetails
  projectId?: number
  isAllocatedVisible: boolean
}

type SubProjectType = {
  allocation?: number
  billable?: string
  isAllocated?: boolean
}

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

const ProjectReportsTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  updateaccess,
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

  const listSize = useTypedSelector(
    reduxServices.projectReport.selectors.listSize,
  )

  const projectClients = useTypedSelector(
    reduxServices.projectReport.selectors.projectClients,
  )

  const isClientProjectLoading = useTypedSelector(
    reduxServices.projectReport.selectors.isClientProjectLoading,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
  }

  const handleShowProject = (projectId: number) => {
    setIsShow(!isShow)
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
    data: ProjectDetails,
    projectId: number,
  ) => {
    setToDeallocatedProject({
      data,
      projectId,
      isDeallocatedModelVisible: true,
    })
  }

  const handleAllocationModal = (data: ProjectDetails, projectId: number) => {
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
        : ({} as ProjectDetails)

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

  const handleUpdateProject = async (project: ProjectDetails) => {
    const payload = {
      ...project,
      ...subProject,
      billable: subProject?.billable === 'Yes',
    }

    const deallocateResponse = await dispatch(
      reduxServices.projectReport.updateProjectReport(payload),
    )

    if (
      reduxServices.projectReport.updateProjectReport.fulfilled.match(
        deallocateResponse,
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

  const test = (
    isTrue: boolean,
    firstValue: string | number,
    secondValue: string | number,
  ): string | number => (isTrue ? firstValue : secondValue)

  return (
    <>
      {projectReports != null && projectReports.length ? (
        <>
          <CTable striped align="middle">
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
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                <CTableHeaderCell scope="col"></CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {projectReports?.map((value, index) => {
                return (
                  <>
                    <CTableRow key={index}>
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
                      <CTableDataCell>{value.type}</CTableDataCell>
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
                        <CButton
                          className="cursor-pointer"
                          color="danger btn-sm me-1"
                          data-testid="close-btn"
                          onClick={() =>
                            handleShowCloseModal(value.id, value.projectName)
                          }
                        >
                          <i
                            className="fa fa-times text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTableDataCell>
                      <CTableDataCell style={{ width: '120px' }}>
                        <CButton
                          className="cursor-pointer"
                          color="info btn-sm me-1"
                          data-testid="view-btn"
                        >
                          <i
                            className="fa fa-eye text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                        <Link to={`/editproject/${value.id}`}>
                          <CButton
                            className="cursor-pointer"
                            color="primary btn-sm me-1"
                            data-testid="edit-btn"
                          >
                            <i
                              className="fa fa-edit text-white"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </Link>
                        <CButton
                          className="cursor-pointer"
                          color="danger btn-sm me-1"
                          data-testid="delete-btn"
                          disabled={value.count > 0}
                          onClick={() =>
                            handleShowDeleteModal(value.id, value.projectName)
                          }
                        >
                          <i
                            className="fa fa-trash-o text-white"
                            aria-hidden="true"
                          ></i>
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                    {isShow &&
                      selectedProject === value.id &&
                      (projectClients != null ? (
                        <CTableRow>
                          <CTableDataCell colSpan={8}>
                            <CTable responsive striped>
                              <CTableHead color="info">
                                <CTableRow>
                                  <CTableHeaderCell scope="col">
                                    ID
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    Name
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    Designation
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    Department
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    Allocation
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    Allocated Date
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    End Date
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    Billable
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    Current Status
                                  </CTableHeaderCell>
                                  <CTableHeaderCell scope="col">
                                    Actions
                                  </CTableHeaderCell>
                                </CTableRow>
                              </CTableHead>
                              <CTableBody>
                                {projectClients?.map((project, i) => {
                                  return (
                                    <CTableRow col-span={7} key={i}>
                                      <CTableDataCell>
                                        <CLink className="text-decoration-none">
                                          {project.employeeId}
                                        </CLink>
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {project.projectName}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {project.desigination}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {project.department}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {toAllocatedProject.isAllocatedVisible &&
                                        project.employeeId ===
                                          toAllocatedProject.data
                                            ?.employeeId ? (
                                          <CFormInput
                                            id={project.employeeId.toString()}
                                            data-testid={project.employeeId}
                                            size="sm"
                                            type="number"
                                            name={project.employeeId.toString()}
                                            className="input-xs"
                                            defaultValue={project.allocation}
                                            onChange={handleOnChangeAllocation}
                                          />
                                        ) : (
                                          <span>{project.allocation}%</span>
                                        )}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {project.startDate}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {project.endDate}
                                      </CTableDataCell>
                                      <CTableDataCell style={{ width: '84px' }}>
                                        {toAllocatedProject.isAllocatedVisible &&
                                        project.employeeId ===
                                          toAllocatedProject.data
                                            ?.employeeId ? (
                                          <span>
                                            <CFormSelect
                                              id="billable"
                                              size="sm"
                                              aria-label="billable"
                                              data-testid="formBillable"
                                              className="input-xs"
                                              name="billable"
                                              defaultValue={
                                                project.billable ? 'Yes' : 'No'
                                              }
                                              onChange={handleOnChangeBillable}
                                            >
                                              {[
                                                { label: 'Yes', name: 'Yes' },
                                                { label: 'No', name: 'No' },
                                              ].map((item, index) => {
                                                const {
                                                  name: optionName,
                                                  label,
                                                } = item
                                                return (
                                                  <option
                                                    key={index}
                                                    value={label}
                                                  >
                                                    {optionName}
                                                  </option>
                                                )
                                              })}
                                            </CFormSelect>
                                          </span>
                                        ) : (
                                          test(project.billable, 'Yes', 'No')
                                        )}
                                      </CTableDataCell>
                                      <CTableDataCell
                                        style={{ width: '137px' }}
                                      >
                                        {toAllocatedProject.isAllocatedVisible &&
                                        project.employeeId ===
                                          toAllocatedProject.data
                                            ?.employeeId ? (
                                          <span>
                                            <CFormSelect
                                              id="allocated"
                                              size="sm"
                                              aria-label="allocated"
                                              data-testid="formallocated"
                                              className="input-xs"
                                              name="allocated"
                                              defaultValue={test(
                                                project.isAllocated,
                                                allocated,
                                                deAllocated,
                                              )}
                                              onChange={
                                                handleOnChangeIsAllocated
                                              }
                                            >
                                              {[
                                                {
                                                  label: allocated,
                                                  name: allocated,
                                                },
                                                {
                                                  label: deAllocated,
                                                  name: deAllocated,
                                                },
                                              ].map((item, index) => {
                                                const { name, label } = item
                                                return (
                                                  <option
                                                    key={index}
                                                    value={label}
                                                  >
                                                    {name}
                                                  </option>
                                                )
                                              })}
                                            </CFormSelect>
                                          </span>
                                        ) : (
                                          test(
                                            project.isAllocated,
                                            allocated,
                                            deAllocated,
                                          )
                                        )}
                                      </CTableDataCell>
                                      <CTableDataCell
                                        style={{ width: '100px' }}
                                      >
                                        {toAllocatedProject.isAllocatedVisible &&
                                        project.employeeId ===
                                          toAllocatedProject.data
                                            ?.employeeId ? (
                                          <CButton
                                            className="cursor-pointer text-white"
                                            color="success btn-sm me-1"
                                            data-testid="update-project-btn"
                                            onClick={() =>
                                              handleUpdateProject(project)
                                            }
                                          >
                                            <i
                                              className="fa fa-floppy-o"
                                              aria-hidden="true"
                                            ></i>
                                          </CButton>
                                        ) : (
                                          <CButton
                                            className="cursor-pointer"
                                            color="primary btn-sm me-1"
                                            data-testid="edit-btn"
                                            onClick={() =>
                                              handleAllocationModal(
                                                project,
                                                value.id,
                                              )
                                            }
                                          >
                                            <i
                                              className="fa fa-edit text-white"
                                              aria-hidden="true"
                                            ></i>
                                          </CButton>
                                        )}
                                        <CButton
                                          className="cursor-pointer"
                                          color="danger btn-sm me-1"
                                          data-testid="delete-sub-btn"
                                          disabled={!project.isAllocated}
                                          onClick={() =>
                                            handleShowDeallocationModal(
                                              project,
                                              value.id,
                                            )
                                          }
                                        >
                                          <i
                                            className="fa fa-trash-o text-white"
                                            aria-hidden="true"
                                          ></i>
                                        </CButton>
                                      </CTableDataCell>
                                    </CTableRow>
                                  )
                                })}
                              </CTableBody>
                            </CTable>
                          </CTableDataCell>
                        </CTableRow>
                      ) : (
                        <CCol data-testid="spinner">
                          <CRow className="category-loading-spinner">
                            <CSpinner />
                          </CRow>
                        </CCol>
                      ))}
                  </>
                )
              })}
            </CTableBody>
          </CTable>
          <CRow>
            <CCol xs={4}>
              <p>
                <strong>Total Records: {listSize}</strong>
              </p>
            </CCol>
            <CCol xs={3}>
              {listSize > 20 && (
                <OPageSizeSelect
                  handlePageSizeSelectChange={handlePageSizeSelectChange}
                  options={[20, 40, 60, 80]}
                  selectedPageSize={pageSize}
                />
              )}
            </CCol>
            {listSize > 20 && (
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
        </>
      ) : (
        <CCol data-testid="spinner">
          <CRow className="category-loading-spinner">
            <CSpinner />
          </CRow>
        </CCol>
      )}
      <OModal
        alignment="center"
        visible={toCloseProject.isCloseModelVisible}
        setVisible={(value) =>
          setToCloseProject({ ...toCloseProject, isCloseModelVisible: value })
        }
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
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
        modalHeaderClass="d-none"
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
        modalHeaderClass="d-none"
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
