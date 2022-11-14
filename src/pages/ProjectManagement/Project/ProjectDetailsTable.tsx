import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CLink,
  CFormInput,
  CFormSelect,
  CButton,
  CRow,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { ProjectDetails as ProjectInfo } from '../../../types/MyProfile/ProjectsTab/employeeProjectTypes'
import {
  AllocationProjectType,
  ProjectReport,
} from '../../../types/ProjectManagement/Project/ProjectTypes'

type CommonOnChangeType = {
  target: {
    value: string
  }
}

const ProjectDetailsTable = ({
  toAllocatedProject,
  handleOnChangeAllocation,
  getConditionValue,
  handleOnChangeBillable,
  handleOnChangeIsAllocated,
  handleUpdateProject,
  handleAllocationModal,
  handleShowDeallocationModal,
  handleCancelUpdate,
  allocated,
  deAllocated,
  value,
}: {
  toAllocatedProject: AllocationProjectType
  handleOnChangeAllocation: (e: CommonOnChangeType) => void
  getConditionValue: (
    isTrue: boolean,
    firstValue: string | number,
    secondValue: string | number,
  ) => string | number
  handleOnChangeBillable: (e: CommonOnChangeType) => void
  handleOnChangeIsAllocated: (e: CommonOnChangeType) => void
  handleUpdateProject: (project: ProjectInfo) => Promise<void>
  handleAllocationModal: (data: ProjectInfo, projectId: number) => void
  handleShowDeallocationModal: (data: ProjectInfo, projectId: number) => void
  handleCancelUpdate: () => void
  allocated: string
  deAllocated: string
  value: ProjectReport
}): JSX.Element => {
  const projectClients = useTypedSelector(
    reduxServices.projectReport.selectors.projectClients,
  )

  return (
    <>
      <CTableRow>
        <CTableDataCell colSpan={12} className="pe-0 ps-4">
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
                  Allocation
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  Allocated Date
                </CTableHeaderCell>
                <CTableHeaderCell scope="col" className="profile-tab-content">
                  End Date
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
            {projectClients?.length > 0 ? (
              <CTableBody>
                {projectClients?.map((project, i) => {
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
                      <CTableDataCell>
                        {toAllocatedProject.isAllocatedVisible &&
                        project.employeeId ===
                          toAllocatedProject?.data?.employeeId ? (
                          <>
                            <CFormInput
                              id={project.employeeId.toString()}
                              data-testid="allocation"
                              size="sm"
                              type="number"
                              name={project.employeeId.toString()}
                              className="input-xs"
                              defaultValue={project.allocation}
                              onChange={handleOnChangeAllocation}
                            />
                            <span>%</span>
                          </>
                        ) : (
                          <span>{project.allocation}%</span>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>{project.startDate}</CTableDataCell>
                      <CTableDataCell>{project.endDate}</CTableDataCell>
                      <CTableDataCell style={{ width: '84px' }}>
                        {toAllocatedProject.isAllocatedVisible &&
                        project.employeeId ===
                          toAllocatedProject?.data?.employeeId ? (
                          <span>
                            <CFormSelect
                              id="billable"
                              size="sm"
                              aria-label="billable"
                              data-testid="formBillable"
                              className="input-xs"
                              name="billable"
                              defaultValue={getConditionValue(
                                project.billable,
                                'Yes',
                                'No',
                              )}
                              onChange={handleOnChangeBillable}
                            >
                              {[
                                { label: 'Yes', name: 'Yes' },
                                { label: 'No', name: 'No' },
                              ].map((item, billableIndex) => {
                                const { name: optionName, label } = item
                                return (
                                  <option key={billableIndex} value={label}>
                                    {optionName}
                                  </option>
                                )
                              })}
                            </CFormSelect>
                          </span>
                        ) : (
                          getConditionValue(project.billable, 'Yes', 'No')
                        )}
                      </CTableDataCell>
                      <CTableDataCell style={{ width: '137px' }}>
                        {toAllocatedProject.isAllocatedVisible &&
                        project.employeeId ===
                          toAllocatedProject?.data?.employeeId ? (
                          <span>
                            <CFormSelect
                              id="allocated"
                              size="sm"
                              aria-label="allocated"
                              data-testid="formallocated"
                              className="input-xs"
                              name="allocated"
                              defaultValue={getConditionValue(
                                project.isAllocated,
                                allocated,
                                deAllocated,
                              )}
                              onChange={handleOnChangeIsAllocated}
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
                              ].map((item, arrayIndex) => {
                                const { name, label } = item
                                return (
                                  <option key={arrayIndex} value={label}>
                                    {name}
                                  </option>
                                )
                              })}
                            </CFormSelect>
                          </span>
                        ) : (
                          getConditionValue(
                            project.isAllocated,
                            allocated,
                            deAllocated,
                          )
                        )}
                      </CTableDataCell>
                      <CTableDataCell style={{ width: '100px' }}>
                        {toAllocatedProject.isAllocatedVisible &&
                        project.employeeId ===
                          toAllocatedProject?.data?.employeeId ? (
                          <>
                            <CButton
                              className="btn-ovh-employee-list cursor-pointer text-white"
                              color="success btn-ovh me-1"
                              data-testid="update-project-btn"
                              onClick={() => handleUpdateProject(project)}
                            >
                              <i
                                className="fa fa-floppy-o"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                            <CButton
                              className="btn-ovh-employee-list cursor-pointer"
                              color="danger btn-ovh me-1"
                              data-testid="cancel-sub-btn"
                              onClick={handleCancelUpdate}
                            >
                              <i
                                className="fa fa-times text-white sh-fa-times"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                          </>
                        ) : (
                          <>
                            <CButton
                              className="btn-ovh-employee-list cursor-pointer"
                              color="primary btn-ovh me-1"
                              data-testid="edit-sub-project-btn"
                              onClick={() =>
                                handleAllocationModal(project, value.id)
                              }
                            >
                              <i
                                className="fa fa-edit text-white"
                                aria-hidden="true"
                              ></i>
                            </CButton>
                            <CButton
                              className="btn-ovh-employee-list cursor-pointer"
                              color="danger btn-ovh me-1"
                              data-testid="delete-sub-btn"
                              disabled={!project.isAllocated}
                              onClick={() =>
                                handleShowDeallocationModal(project, value.id)
                              }
                            >
                              <i
                                className="fa fa-trash-o text-white"
                                aria-hidden="true"
                              ></i>
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

export default ProjectDetailsTable
