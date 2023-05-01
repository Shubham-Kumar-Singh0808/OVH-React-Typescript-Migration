import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CButton,
  CFormInput,
  CFormSelect,
  CLink,
  CTableBody,
  CTooltip,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { UpdateProjectViewDetails } from '../../../../../types/ProjectManagement/Project/ProjectView/projectViewTypes'

const PeopleTable = (): JSX.Element => {
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectViewDetails,
  )
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false)
  const [isProjectAllocationEdit, setIsProjectAllocationEdit] =
    useState<boolean>(false)
  const [templateId, setTemplateId] = useState(0)
  const initialEmployeeAllocation = {} as UpdateProjectViewDetails
  const [editAllocateProject, setEditEmployeeAllocation] = useState(
    initialEmployeeAllocation,
  )
  const dispatch = useAppDispatch()

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessEditPeople = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project-People',
  )
  const handleEditProjectAllocationHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'allocation') {
      let targetValue = value.replace(/\D/g, '')
      if (Number(targetValue) > 100) targetValue = '100'
      setEditEmployeeAllocation((values) => {
        return { ...values, ...{ [name]: targetValue } }
      })
    } else {
      setEditEmployeeAllocation((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }

  const editProjectAllocationButtonHandler = (
    projectReport: UpdateProjectViewDetails,
  ): void => {
    setIsProjectAllocationEdit(true)
    setTemplateId(projectReport.employeeId)
    setEditEmployeeAllocation(projectReport)
  }

  const saveProjectAllocationHandler = async () => {
    const saveProjectAllocationResultAction = await dispatch(
      reduxServices.projectViewDetails.updateEmployeeAllocationProject(
        editAllocateProject,
      ),
    )
    if (
      reduxServices.projectViewDetails.updateEmployeeAllocationProject.fulfilled.match(
        saveProjectAllocationResultAction,
      )
    ) {
      setIsProjectAllocationEdit(false)
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Project Allocation has been modified."
          />,
        ),
      )
      dispatch(
        reduxServices.projectViewDetails.getProjectDetails(
          editAllocateProject.projectId,
        ),
      )
    }
  }
  const cancelProjectAllocationButtonHandler = () => {
    setIsProjectAllocationEdit(false)
  }

  useEffect(() => {
    if (editAllocateProject.allocation?.replace(/^\s*/, '')) {
      setIsSaveButtonEnabled(true)
    } else {
      setIsSaveButtonEnabled(false)
    }
  }, [editAllocateProject.allocation])

  return (
    <>
      <CTable striped responsive className="sh-project-report-details">
        <CTableHead className="profile-tab-header">
          <CTableRow>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              ID
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Name
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Designation
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Department
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Allocated Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              End Date
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Allocation
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Billable
            </CTableHeaderCell>
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Current Status
            </CTableHeaderCell>
            {userAccessEditPeople?.updateaccess && (
              <CTableHeaderCell scope="col" className="profile-tab-content">
                Actions
              </CTableHeaderCell>
            )}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getProjectDetail?.length > 0 &&
            getProjectDetail?.map((project, i) => {
              const billable = project.billable ? 'Yes' : 'No'
              const allocated = project.isAllocated
                ? 'Allocated'
                : 'De-Allocated'
              return (
                <CTableRow col-span={7} key={i}>
                  <CTableDataCell>
                    <CLink className="text-decoration-none">
                      {project.employeeId}
                    </CLink>
                  </CTableDataCell>
                  <CTableDataCell>{project.userName}</CTableDataCell>
                  <CTableDataCell>{project.desigination}</CTableDataCell>
                  <CTableDataCell>{project.department}</CTableDataCell>
                  <CTableDataCell>{project.startDate}</CTableDataCell>
                  <CTableDataCell>{project.endDate}</CTableDataCell>
                  {isProjectAllocationEdit &&
                  project.employeeId === templateId ? (
                    <CTableDataCell scope="row">
                      <div className="edit-time-control">
                        <CFormInput
                          type="text"
                          id="allocation"
                          data-testid="template-input"
                          name="allocation"
                          maxLength={3}
                          max={100}
                          autoComplete="off"
                          value={editAllocateProject.allocation}
                          onChange={handleEditProjectAllocationHandler}
                        />
                      </div>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell scope="row">
                      {project.allocation}%
                    </CTableDataCell>
                  )}
                  {isProjectAllocationEdit &&
                  project.employeeId === templateId ? (
                    <CTableDataCell scope="row" style={{ width: '90px' }}>
                      <div className="edit-time-control">
                        <CFormSelect
                          aria-label="Default select example"
                          size="sm"
                          id="billable"
                          data-testid="form-select2"
                          name="billable"
                          value={
                            editAllocateProject.billable as unknown as string
                          }
                          onChange={handleEditProjectAllocationHandler}
                        >
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </CFormSelect>
                      </div>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{billable}</CTableDataCell>
                  )}
                  {isProjectAllocationEdit &&
                  project.employeeId === templateId ? (
                    <CTableDataCell scope="row" style={{ width: '150px' }}>
                      <div className="edit-time-control">
                        <CFormSelect
                          aria-label="Default select example"
                          size="sm"
                          id="isAllocated"
                          data-testid="form-select2"
                          name="isAllocated"
                          value={
                            editAllocateProject.isAllocated as unknown as string
                          }
                          onChange={handleEditProjectAllocationHandler}
                        >
                          <option value="true">Allocated</option>
                          <option value="false">De-Allocated</option>
                        </CFormSelect>
                      </div>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{allocated}</CTableDataCell>
                  )}

                  {isProjectAllocationEdit &&
                  project.employeeId === templateId ? (
                    <>
                      <CTableDataCell scope="row" style={{ width: '100px' }}>
                        <CTooltip content="Save">
                          <CButton
                            color="success"
                            className="btn-ovh-employee-list btn-ovh me-1 mb-1"
                            onClick={saveProjectAllocationHandler}
                            disabled={!isSaveButtonEnabled}
                          >
                            <i
                              className="fa fa-floppy-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                        <CTooltip content="Cancel">
                          <CButton
                            color="warning"
                            data-testid="cancel-btn"
                            className="btn-ovh-employee-list btn-ovh me-1 mb-1"
                            onClick={cancelProjectAllocationButtonHandler}
                          >
                            <i className="fa fa-times" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      </CTableDataCell>
                    </>
                  ) : (
                    <>
                      {userAccessEditPeople?.updateaccess && (
                        <CTableDataCell scope="row" style={{ width: '100px' }}>
                          <CTooltip content="Edit">
                            <CButton
                              className="btn-ovh-employee-list btn-ovh me-1 mb-1"
                              color="info btn-ovh me-2"
                              data-testid="edit-btn"
                              onClick={() => {
                                editProjectAllocationButtonHandler(project)
                              }}
                            >
                              <i className="fa fa-pencil-square-o"></i>
                            </CButton>
                          </CTooltip>
                        </CTableDataCell>
                      )}
                    </>
                  )}
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
      <strong>
        {getProjectDetail?.length
          ? `Total Records: ${getProjectDetail?.length}`
          : `No Records found`}
      </strong>
    </>
  )
}

export default PeopleTable
