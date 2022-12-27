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
} from '@coreui/react-pro'
import React, { useState } from 'react'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import { UpdateProjectViewDetails } from '../../../../../types/ProjectManagement/Project/ProjectView/projectViewTypes'

const PeopleTable = (): JSX.Element => {
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectViewDetails,
  )
  const [isProjectAllocationEdit, setIsProjectAllocationEdit] =
    useState<boolean>(false)
  const [templateId, setTemplateId] = useState(0)
  const initialEmployeeAllocation = {} as UpdateProjectViewDetails
  const [editEmployeeAllocation, setEditEmployeeAllocation] = useState(
    initialEmployeeAllocation,
  )
  const dispatch = useAppDispatch()
  const handleEditProjectAllocationHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    setEditEmployeeAllocation((values) => {
      return { ...values, ...{ [name]: value } }
    })
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
        editEmployeeAllocation,
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
          editEmployeeAllocation.projectId,
        ),
      )
    }
  }
  const cancelProjectAllocationButtonHandler = () => {
    setIsProjectAllocationEdit(false)
  }
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
            <CTableHeaderCell scope="col" className="profile-tab-content">
              Actions
            </CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getProjectDetail?.length > 0 &&
            getProjectDetail?.map((project, i) => {
              const billable = project.billable ? 'yes' : 'No'
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
                          value={editEmployeeAllocation.allocation}
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
                    <CTableDataCell scope="row">
                      <div className="edit-time-control">
                        <CFormSelect
                          aria-label="Default select example"
                          size="sm"
                          id="billable"
                          data-testid="form-select2"
                          name="billable"
                          value={
                            editEmployeeAllocation.billable as unknown as string
                          }
                          onChange={handleEditProjectAllocationHandler}
                        >
                          <option value="true">yes</option>
                          <option value="false">No</option>
                        </CFormSelect>
                      </div>
                    </CTableDataCell>
                  ) : (
                    <CTableDataCell>{billable}</CTableDataCell>
                  )}
                  {isProjectAllocationEdit &&
                  project.employeeId === templateId ? (
                    <CTableDataCell scope="row">
                      <div className="edit-time-control">
                        <CFormSelect
                          aria-label="Default select example"
                          size="sm"
                          id="isAllocated"
                          data-testid="form-select2"
                          name="isAllocated"
                          value={
                            editEmployeeAllocation.isAllocated as unknown as string
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
                  <CTableDataCell scope="row">
                    {isProjectAllocationEdit &&
                    project.employeeId === templateId ? (
                      <>
                        <CButton
                          color="success"
                          className="btn-ovh me-1 mb-1"
                          onClick={saveProjectAllocationHandler}
                        >
                          <i className="fa fa-floppy-o" aria-hidden="true"></i>
                        </CButton>
                        <CButton
                          color="warning"
                          data-testid="cancel-btn"
                          className="btn-ovh me-1 mb-1"
                          onClick={cancelProjectAllocationButtonHandler}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </CButton>
                      </>
                    ) : (
                      <>
                        <CButton
                          color="info btn-ovh me-2"
                          data-testid="edit-btn"
                          onClick={() => {
                            editProjectAllocationButtonHandler(project)
                          }}
                        >
                          <i className="fa fa-pencil-square-o"></i>
                        </CButton>
                      </>
                    )}
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
        <strong>
          {getProjectDetail?.length
            ? `Total Records: ${getProjectDetail?.length}`
            : `No Records found`}
        </strong>
      </CTable>
    </>
  )
}

export default PeopleTable