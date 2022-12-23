import { CCol, CFormLabel } from '@coreui/react-pro'
import React from 'react'
import Autocomplete from 'react-autocomplete'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { IncomingActiveEmployee } from '../../../../types/Achievements/AddAchiever/AddAchieverTypes'
import {
  emptyString,
  newAchievementLabelClass,
} from '../../AchievementConstants'
import AchievementEntryContainer from '../AchievementTypeList/AchievementEntryContainer'

const FilterEmployeeName = ({
  allEmployees,
  onSelectEmployee,
  employeeName,
  setEmployeeName,
  customClass,
  labelClass,
}: {
  allEmployees: IncomingActiveEmployee[]
  onSelectEmployee: (value: string) => void
  employeeName: string | undefined
  setEmployeeName: React.Dispatch<React.SetStateAction<string | undefined>>
  customClass?: string | undefined
  labelClass?: string | undefined
}): JSX.Element => {
  console.log(employeeName)

  const selectEmployeeHandler = (empName: string) => {
    setEmployeeName(empName)
  }

  const onFocusOut = () => {
    const selectedEmployee = allEmployees.find(
      (value) => value.empFirstName + ' ' + value.empLastName === employeeName,
    )
    const selEmpName =
      selectedEmployee?.empFirstName + ' ' + selectedEmployee?.empLastName

    onSelectEmployee(selEmpName)
  }

  return (
    <AchievementEntryContainer customClass={customClass}>
      <CFormLabel
        data-testid="ach-emp-name"
        className={labelClass ? labelClass : newAchievementLabelClass}
      >
        Employee Name:
        <span
          className={
            employeeName === undefined ||
            employeeName === emptyString ||
            employeeName.trim().length === 0
              ? TextDanger
              : TextWhite
          }
        >
          *
        </span>
      </CFormLabel>
      <CCol md={3}>
        <Autocomplete
          inputProps={{
            className: 'form-control form-control-sm',
            autoComplete: 'on',
            placeholder: 'Employee Name',
            onBlur: onFocusOut,
          }}
          wrapperStyle={{ position: 'relative' }}
          items={allEmployees}
          getItemValue={(item) => item.empFirstName + ' ' + item.empLastName}
          value={employeeName}
          renderMenu={(children) => (
            <div
              className={
                employeeName && employeeName.length > 0
                  ? 'autocomplete-dropdown-wrap'
                  : 'autocomplete-dropdown-wrap hide'
              }
            >
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              className={
                isHighlighted
                  ? 'autocomplete-dropdown-item active'
                  : 'autocomplete-dropdown-item'
              }
              key={item.employeeId}
            >
              {item.empFirstName + ' ' + item.empLastName}
            </div>
          )}
          shouldItemRender={(item, value) =>
            item.empFirstName.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          onChange={(e) => setEmployeeName(e.target.value)}
          onSelect={(value) => selectEmployeeHandler(value)}
        />
      </CCol>
    </AchievementEntryContainer>
  )
}

export default FilterEmployeeName
