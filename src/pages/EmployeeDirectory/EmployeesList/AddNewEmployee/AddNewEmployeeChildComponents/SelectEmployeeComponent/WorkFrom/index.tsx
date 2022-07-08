import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'
import { WorkFromChangeHandlerProp } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const WorkFrom = ({
  dynamicFormLabelProps,
  onWorkFromHandler,
  workFromValue,
}: WorkFromChangeHandlerProp): JSX.Element => {
  const workStatus = !!(
    workFromValue == null ||
    workFromValue === '' ||
    workFromValue.toLowerCase() === 'office'
  )
  return (
    <CRow className="mb-3 align-items-center">
      <CFormLabel
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
          name="workfrom"
          id="workfromoffice"
          value="Office"
          label="Office"
          defaultChecked
          checked={workStatus}
          onChange={() => onWorkFromHandler('Office')}
        />
        <CFormCheck
          inline
          type="radio"
          name="workfrom"
          id="workfromhome"
          value="Home"
          label="Home"
          checked={!workStatus}
          onChange={() => onWorkFromHandler('Home')}
        />
      </CCol>
    </CRow>
  )
}

export default WorkFrom
