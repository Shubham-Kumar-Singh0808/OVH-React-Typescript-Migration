import {
  CButton,
  CCol,
  CImage,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import React from 'react'
import { EmployeeListTableProps } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import OPageSizeSelect from '../../../components/ReusableComponent/OPageSizeSelect'
import OPagination from '../../../components/ReusableComponent/OPagination'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { baseImageExtension } from '../../Achievements/AchievementConstants'

const EmployeeListTable = ({
  paginationRange,
  pageSize,
  setPageSize,
  currentPage,
  setCurrentPage,
  updateaccess,
  userEditAccess,
}: EmployeeListTableProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const employees = useTypedSelector(
    reduxServices.employeeList.selectors.employees,
  )
  const listSize = useTypedSelector(
    reduxServices.employeeList.selectors.listSize,
  )

  const handlePageSizeSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setPageSize(Number(event.target.value))
    setCurrentPage(1)
    dispatch(reduxServices.app.actions.setPersistCurrentPage(1))
  }

  return (
    <>
      <>
        <CTable striped align="middle">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col"></CTableHeaderCell>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email ID</CTableHeaderCell>
              <CTableHeaderCell scope="col" className="text-center">
                Mobile
              </CTableHeaderCell>
              <CTableHeaderCell scope="col">Designation</CTableHeaderCell>
              <CTableHeaderCell scope="col">Department</CTableHeaderCell>
              <CTableHeaderCell scope="col">Blood Group</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date of Joining</CTableHeaderCell>
              <CTableHeaderCell scope="col">Country</CTableHeaderCell>
              {updateaccess ? (
                <CTableHeaderCell scope="col" data-testid="action-header">
                  Actions
                </CTableHeaderCell>
              ) : (
                <div data-testid="no-action-header"></div>
              )}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {employees?.length > 0 &&
              employees.map((employee, index) => {
                const imageUrl = employee.thumbPicture
                const baseUrl = baseImageExtension
                const url = new URL(imageUrl, baseUrl)
                const finalImageUrl = url.href
                return (
                  <CTableRow key={index}>
                    <CTableHeaderCell scope="row">
                      <CImage src={finalImageUrl} className="employee-thumb" />
                    </CTableHeaderCell>
                    <CTableDataCell>{employee.id}</CTableDataCell>
                    <CTableDataCell>
                      <Link
                        to={`/employeeProfile/${employee.id}`}
                        className="employee-name"
                        data-testid={`employee-profile-link${index}`}
                      >
                        {employee.fullName}
                      </Link>
                    </CTableDataCell>
                    <CTableDataCell>{employee.emailId}</CTableDataCell>
                    <CTableDataCell className="text-center">
                      {employee.mobile}
                    </CTableDataCell>
                    <CTableDataCell>{employee.designation}</CTableDataCell>
                    <CTableDataCell>{employee.departmentName}</CTableDataCell>
                    <CTableDataCell>{employee.bloodgroup}</CTableDataCell>
                    <CTableDataCell>{employee.dateOfJoining}</CTableDataCell>
                    <CTableDataCell>{employee.country}</CTableDataCell>
                    {updateaccess ? (
                      <CTableDataCell data-testid="action-cell">
                        {userEditAccess && (
                          <div className="sh-btn-group">
                            <Link to={`/employeeProfile/${employee.id}`}>
                              <CTooltip content="View">
                                <CButton
                                  color="info"
                                  size="sm"
                                  className="btn-ovh-employee-list"
                                >
                                  <i className="text-white fa fa-eye"></i>
                                </CButton>
                              </CTooltip>
                            </Link>
                            &nbsp;
                            <Link to={`/editEmployee/${employee.id}`}>
                              <CTooltip content="Edit">
                                <CButton
                                  color="info"
                                  size="sm"
                                  className="btn-ovh-employee-list"
                                >
                                  <i className="text-white fa fa-pencil-square-o"></i>
                                </CButton>
                              </CTooltip>
                            </Link>
                          </div>
                        )}
                      </CTableDataCell>
                    ) : (
                      <div data-testid="no-action-cell"></div>
                    )}
                  </CTableRow>
                )
              })}
          </CTableBody>
        </CTable>
        <CRow>
          <CCol md={3} className="no-records">
            <strong>
              {listSize ? `Total Records: ${listSize}` : `Employee Not Found.`}
            </strong>
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
    </>
  )
}

export default EmployeeListTable
