import React from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import { EmploymentStatus } from '../../../types/EmployeeDirectory/EmployeeReport/employeeReportTypes'

/** components */
import { CButton, CFormCheck } from '@coreui/react-pro'

const FilterOptions = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const selectedEmploymentStatus = useTypedSelector(
    reduxServices.employeeReports.selectors.selectedEmploymentStatus,
  )

  const handleEmployeeStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      reduxServices.employeeReports.actions.changeSelectedEmploymentStatus(
        event.target.value,
      ),
    )
  }

  return (
    <div className="pull-left mb-3">
      <div className="d-inline">
        <CFormCheck
          type="radio"
          name="employmentStatus"
          value={EmploymentStatus.active}
          id="employmentActive"
          label="Active"
          defaultChecked={selectedEmploymentStatus === EmploymentStatus.active}
          onChange={handleEmployeeStatus}
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
          onChange={handleEmployeeStatus}
          inline
        />
      </div>
    </div>
  )
}

export default FilterOptions
