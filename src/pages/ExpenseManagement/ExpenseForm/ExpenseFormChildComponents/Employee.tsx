import React, { useEffect } from 'react'
import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import Autocomplete from 'react-autocomplete'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import {
  AuthorizedEmployee,
  EmployeeDetails,
} from '../../../../types/ExpenseManagement/ExpenseForm/expenseFormTypes'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'

const EmployeeList = ({
  allEmployeesProfiles,
  onSelectEmployee,
  shouldReset,
  employeeAutoCompleteTarget,
  setEmployeeAutoCompleteTarget,
}: {
  allEmployeesProfiles: AuthorizedEmployee[]
  onSelectEmployee: (value: EmployeeDetails) => void
  shouldReset: boolean
  employeeAutoCompleteTarget: string | undefined
  setEmployeeAutoCompleteTarget: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
}): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (employeeAutoCompleteTarget) {
      dispatch(
        reduxServices.expenseForm.getEmployeesList(employeeAutoCompleteTarget),
      )
    }
  }, [employeeAutoCompleteTarget])

  useEffect(() => {
    if (shouldReset) setEmployeeAutoCompleteTarget('')
  }, [shouldReset])

  const onHandleSelectEmployer = (fullName: string) => {
    setEmployeeAutoCompleteTarget(fullName)
    const employee = allEmployeesProfiles.find(
      (value) => value.fullName === fullName,
    )

    onSelectEmployee(employee as EmployeeDetails)
  }

  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel
        className="col-sm-3 col-form-label text-end"
        data-testid="empLabel"
      >
        To Employee :
      </CFormLabel>
      <CCol sm={6}>
        <Autocomplete
          inputProps={{
            className: 'form-control form-control-sm',
            id: 'employee-autocomplete',
            placeholder: 'Employee Name',
          }}
          getItemValue={(emp) => emp.fullName}
          items={allEmployeesProfiles}
          data-testid="employee-input"
          wrapperStyle={{ position: 'relative' }}
          renderMenu={(children) => (
            <div
              className={
                employeeAutoCompleteTarget &&
                employeeAutoCompleteTarget.length > 0
                  ? 'autocomplete-dropdown-wrap'
                  : 'autocomplete-dropdown-wrap hide'
              }
            >
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              data-testid="trainer-option"
              className={
                isHighlighted
                  ? 'autocomplete-dropdown-item active'
                  : 'autocomplete-dropdown-item '
              }
              key={item.id}
            >
              {item.fullName}
            </div>
          )}
          value={employeeAutoCompleteTarget}
          shouldItemRender={(item, value) =>
            item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          onChange={(e) => setEmployeeAutoCompleteTarget(e.target.value)}
          onSelect={(value) => onHandleSelectEmployer(value)}
        />
        <span className={employeeAutoCompleteTarget ? TextWhite : TextDanger}>
          *
        </span>
      </CCol>
    </CRow>
  )
}

export default EmployeeList
