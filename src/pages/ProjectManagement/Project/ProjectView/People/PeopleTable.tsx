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
  CRow,
  CTableBody,
} from '@coreui/react-pro'
import React, { useState } from 'react'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../stateStore'
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
  return (
    <>
      <CTableRow>
        <CTableDataCell colSpan={13} className="pe-4 ps-4">
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
            {getProjectDetail?.length > 0 ? (
              <CTableBody>
                {getProjectDetail?.map((project, i) => {
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
                        <CTableDataCell>
                          {project.billable ? 'Yes' : 'No'}
                        </CTableDataCell>
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
                        <CTableDataCell>
                          {project.isAllocated ? 'Allocated' : 'De-Allocated'}
                        </CTableDataCell>
                      )}
                      <CTableDataCell
                        style={{ width: '150px' }}
                      ></CTableDataCell>
                      <CTableDataCell scope="row">
                        {isProjectAllocationEdit &&
                        project.employeeId === templateId ? (
                          <>
                            <CButton
                              color="success"
                              className="btn-ovh me-1 mb-1"
                              //   onClick={saveProjectAllocationHandler}
                            >
                              <i
                                className="fa fa-floppy-o"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                            <CButton
                              color="warning"
                              data-testid="cancel-btn"
                              className="btn-ovh me-1 mb-1"
                              //   onClick={cancelProjectAllocationButtonHandler}
                            >
                              <i className="fa fa-times" aria-hidden="true"></i>
                            </CButton>
                          </>
                        ) : (
                          <>
                            <CButton
                              color="info btn-ovh me-2"
                              data-testid="edit-btn"
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
            ) : (
              <CRow className="mt-4">
                <h5>No Records Found... </h5>
              </CRow>
            )}
          </CTable>
        </CTableDataCell>
      </CTableRow>
    </>
  )
}

export default PeopleTable
