import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'
import React from 'react'
import { WorkFromChangeHandlerProp } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const WorkFrom = ({
  dynamicFormLabelProps,
  onWorkFromHandler,
}: WorkFromChangeHandlerProp): JSX.Element => {
  return (
    <>
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
          {/* <CFormSwitch
            size="lg"
            label="No"
            id="formSwitchCheckCheckedDisabled"
            defaultChecked
          /> */}

          <CFormCheck
            inline
            type="radio"
            name="workfrom"
            id="workfromoffice"
            value="Office"
            label="Office"
            defaultChecked
            onChange={() => onWorkFromHandler('Office')}
          />
          <CFormCheck
            inline
            type="radio"
            name="workfrom"
            id="workfromhome"
            value="Home"
            label="Home"
            onChange={() => onWorkFromHandler('Home')}
          />
        </CCol>
      </CRow>
    </>
  )
}

export default WorkFrom
