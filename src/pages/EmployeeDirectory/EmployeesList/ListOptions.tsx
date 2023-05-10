import { CButton, CFormCheck } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { EmploymentStatus } from '../../../types/EmployeeDirectory/EmployeesList/employeeListTypes'
import employeeListApi from '../../../middleware/api/EmployeeDirectory/EmployeesList/employeeListApi'
import { reduxServices } from '../../../reducers/reduxServices'
import { downloadFile } from '../../../utils/helper'

const ListOptions = ({
  userCreateAccess,
  userViewAccess,
  setCurrentPage,
  setPageSize,
}: {
  userCreateAccess: boolean
  userViewAccess: boolean
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const selectedEmploymentStatus = useTypedSelector(
    reduxServices.employeeList.selectors.selectedEmploymentStatus,
  )

  const handleChangeSelectedEmploymentStatus = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(
      reduxServices.employeeList.actions.changeSelectedEmploymentStatus(
        event.target.value,
      ),
    )
    setCurrentPage(1)
    setPageSize(20)
  }

  const handleExportEmployeeData = async () => {
    const employeeListDownload = await employeeListApi.exportEmployeeData({
      searchStr: '',
      selectionStatus: selectedEmploymentStatus,
    })
    downloadFile(employeeListDownload, 'EmployeeList.csv')
  }

  return (
    <div className="mb-3 pull-right">
      <div className="d-inline">
        {userViewAccess && (
          <>
            <CFormCheck
              type="radio"
              name="employmentStatus"
              value={EmploymentStatus.active}
              id="employmentActive"
              label="Active"
              defaultChecked={
                selectedEmploymentStatus === EmploymentStatus.active
              }
              onChange={handleChangeSelectedEmploymentStatus}
              inline
            />
            <CFormCheck
              type="radio"
              name="employmentStatus"
              value={EmploymentStatus.contract}
              id="employmentContract"
              label="Employment Contract"
              defaultChecked={
                selectedEmploymentStatus === EmploymentStatus.contract
              }
              onChange={handleChangeSelectedEmploymentStatus}
              inline
            />
            <CFormCheck
              type="radio"
              name="employmentStatus"
              value={EmploymentStatus.inactive}
              id="employmentInactive"
              label="Inactive"
              defaultChecked={
                selectedEmploymentStatus === EmploymentStatus.inactive
              }
              onChange={handleChangeSelectedEmploymentStatus}
              inline
            />
            <CFormCheck
              type="radio"
              name="employmentStatus"
              value={EmploymentStatus.resigned}
              id="employmentUnderNotice"
              label="Resigned"
              defaultChecked={
                selectedEmploymentStatus === EmploymentStatus.resigned
              }
              onChange={handleChangeSelectedEmploymentStatus}
              inline
            />
            <CFormCheck
              type="radio"
              name="employmentStatus"
              value={EmploymentStatus.pip}
              id="employmentUnderNotice"
              label="PIP"
              defaultChecked={selectedEmploymentStatus === EmploymentStatus.pip}
              onChange={handleChangeSelectedEmploymentStatus}
              inline
            />
          </>
        )}
      </div>

      <div className="d-inline ml15 pull-right">
        {userViewAccess && (
          <CButton
            color="info"
            className="text-white btn-ovh"
            size="sm"
            onClick={handleExportEmployeeData}
            data-testid="employee-export-btn"
          >
            <i className="fa fa-plus me-1"></i>
            Click to Export Employee List
          </CButton>
        )}
        &nbsp; &nbsp; &nbsp;
        {userCreateAccess && (
          <Link to="/addNewEmployee">
            <CButton color="info" className="text-white btn-ovh" size="sm">
              <i className="fa fa-plus me-1"></i>
              Add Employee
            </CButton>
          </Link>
        )}
      </div>
    </div>
  )
}

export default ListOptions
