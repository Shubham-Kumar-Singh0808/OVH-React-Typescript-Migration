import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { WorkFromChangeHandlerProp } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const WorkFrom = ({
  dynamicFormLabelProps,
  onWorkFromHandler,
  workFromValue,
}: WorkFromChangeHandlerProp): JSX.Element => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(
      workFromValue == null ||
        workFromValue === '' ||
        workFromValue.toLowerCase() === 'office',
    )
  }, [workFromValue])

  const handleOnChange = (value: string) => {
    onWorkFromHandler(value)
    setIsActive(value === 'Office')
  }

  return (
    <CRow className="mb-3 align-items-center">
      <CFormLabel
        data-testId="workFromLabel"
        {...dynamicFormLabelProps(
          'workfrom',
          'col-sm-3 col-form-label text-end',
        )}
      >
        Work From:
      </CFormLabel>
      <CCol sm={3}>
        <CFormCheck
          inline
          type="radio"
          name="office"
          id="workfromoffice"
          data-testId="workfromoffice"
          value="Office"
          label="Office"
          defaultChecked
          checked={isActive}
          onChange={() => handleOnChange('Office')}
        />
        <CFormCheck
          inline
          type="radio"
          name="home"
          id="workfromhome"
          data-testId="workfromhome"
          value="Home"
          label="Home"
          checked={!isActive}
          onChange={() => handleOnChange('Home')}
        />
      </CCol>
    </CRow>
  )
}

export default WorkFrom
