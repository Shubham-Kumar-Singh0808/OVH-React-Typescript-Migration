import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const Employee = ({
  employeeAutoCompleteTarget,
  setEmployeeAutoCompleteTarget,
}: {
  employeeAutoCompleteTarget: string
  setEmployeeAutoCompleteTarget: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const formLabel = 'col-sm-3 col-form-label text-end'
  const allEmployees = useTypedSelector(
    reduxServices.expenseForm.selectors.employeesList,
  )
  const [isEnable, setIsEnable] = useState(false)

  const onHandleSelectEmployeeName = (employeeName: string) => {
    setEmployeeAutoCompleteTarget(employeeName)
    setIsEnable(true)
  }
  const employeeItemsLayout = (
    id: string | number,
    fullName: string,
    isHighlighted: boolean,
  ): JSX.Element => {
    return (
      <div
        data-testid="option"
        className={
          isHighlighted
            ? 'autocomplete-dropdown-item active'
            : 'autocomplete-dropdown-item '
        }
        key={id}
      >
        {fullName}
      </div>
    )
  }
  return (
    <>
      <CRow className="mt-2 mb-2">
        <CFormLabel {...formLabelProps} className={formLabel}>
          To Employee:
        </CFormLabel>
        <CCol sm={3}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm2',
              id: 'employee-autocomplete',
              placeholder: 'Employee Name',
            }}
            getItemValue={(item) => item.fullName}
            data-testid="employeeautocomplete"
            items={allEmployees}
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
            renderItem={(item, isHighlighted) =>
              employeeItemsLayout(item.id, item.fullName, isHighlighted)
            }
            value={employeeAutoCompleteTarget}
            shouldItemRender={(item, empValue) =>
              item?.fullName?.toLowerCase().indexOf(empValue.toLowerCase()) > -1
            }
            onChange={(e) => setEmployeeAutoCompleteTarget(e.target.value)}
            onSelect={(selectedVal) => onHandleSelectEmployeeName(selectedVal)}
          />
          <CCol>
            {/* {!employeeResult[0]?.fullName && (
              <span>please enter valid name</span>
            )} */}
            {/* <span
              className={isEnable ? TextWhite : TextDanger}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                marginTop: '0.25rem',
              }}
            >
              Please select valid employee
            </span> */}
          </CCol>
        </CCol>
      </CRow>
    </>
  )
}

export default Employee
