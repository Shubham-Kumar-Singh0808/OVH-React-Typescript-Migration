import React from 'react'
import Autocomplete from 'react-autocomplete'
import { EmployeeListItem } from '../../../../types/Recruitment/CandidateList/CandidateListTypes'

const AutoFillSourceName = ({
  allEmployeesList,
  employeeName,
  setEmployeeName,
  placeholderValue,
  implementFocusOut = false,
}: {
  allEmployeesList: EmployeeListItem[]
  employeeName: string
  setEmployeeName: React.Dispatch<React.SetStateAction<string>>
  placeholderValue: string
  implementFocusOut?: boolean
}): JSX.Element => {
  const onFocusOut = () => {
    if (implementFocusOut) {
      const selectedEmployee = allEmployeesList.find(
        (value) => value.fullName.toLowerCase() === employeeName.toLowerCase(),
      )
      if (selectedEmployee === undefined) {
        setEmployeeName('')
        return
      }
      setEmployeeName(selectedEmployee.fullName)
    }
  }

  const handleSelectedEmployee = (value: string) => {
    setEmployeeName(value)
  }

  return (
    <Autocomplete
      inputProps={{
        className: 'form-control form-control-sm',
        autoComplete: 'on',
        placeholder: placeholderValue,
        onBlur: onFocusOut,
      }}
      items={allEmployeesList}
      getItemValue={(name) => name.fullName}
      value={employeeName}
      onChange={(e) => setEmployeeName(e.target.value.trim())}
      wrapperStyle={{ position: 'relative' }}
      onSelect={(val) => handleSelectedEmployee(val)}
      renderMenu={(children) => (
        <div
          data-testid="addCand-empNames-autoComplete"
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
          {item.fullName}
        </div>
      )}
      shouldItemRender={(item, value) =>
        item.firstName.toLowerCase().indexOf(value.toLowerCase()) > -1
      }
    />
  )
}

export default AutoFillSourceName
