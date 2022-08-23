import {
  CButton,
  CCol,
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
import { ProjectReportsTableProps } from '../../../types/ProjectManagement/Project/ProjectTypes'

type DeleteProjectType = {
  id?: number
  projectName?: string
  isModelVisible: boolean
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
  const [toDeleteProject, setToDeleteProject] = useState<DeleteProjectType>({
    isModelVisible: false,
  })

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

  const handleShowDeleteModal = (visaId: number, name: string) => {
    setToDeleteProject({ id: visaId, projectName: name, isModelVisible: true })
  }

  const handleConfirmDeleteProject = async () => {
    setToDeleteProject({ ...toDeleteProject, isModelVisible: false })

    const projectId = toDeleteProject.id != null ? toDeleteProject.id : 0

    const deleteResponse = await dispatch(
      reduxServices.projectReport.deleteProjectReport(projectId.toString()),
    )
    if (
      reduxServices.projectReport.deleteProjectReport.fulfilled.match(
        deleteResponse,
      )
    ) {
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
                          />
                        ) : (
                          <i
                            className="fa fa-plus-circle cursor-pointer"
                            onClick={() => handleShowProject(value.id)}
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
                      <CTableDataCell>{value.status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          className="cursor-pointer"
                          color="danger btn-sm me-1"
                          data-testid="reject-btn"
                          onClick={() =>
                            handleShowDeleteModal(value.id, value.projectName)
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
                      (isClientProjectLoading === ApiLoadingState.succeeded ? (
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
                                        {project.allocation}%
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {project.startDate}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {project.endDate}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {project.billable ? 'Yes' : 'No'}
                                      </CTableDataCell>
                                      <CTableDataCell>
                                        {project.isAllocated
                                          ? 'Allocated'
                                          : 'Not 	Allocated'}
                                      </CTableDataCell>
                                      <CTableDataCell>
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
                                        <CButton
                                          className="cursor-pointer"
                                          color="danger btn-sm me-1"
                                          data-testid="delete-btn"
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
        visible={toDeleteProject.isModelVisible}
        setVisible={(value) =>
          setToDeleteProject({ ...toDeleteProject, isModelVisible: value })
        }
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteProject}
      >
        <p>
          Do you really want to close this
          <strong>{` ${toDeleteProject.projectName}`}</strong> project?
        </p>
      </OModal>
    </>
  )
}

export default ProjectReportsTable
