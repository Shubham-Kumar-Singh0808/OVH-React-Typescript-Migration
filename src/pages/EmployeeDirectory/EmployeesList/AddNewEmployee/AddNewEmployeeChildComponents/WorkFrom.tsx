import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'

import { DynamicFormLabelProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const WorkFrom = ({
  dynamicFormLabelProps,
}: DynamicFormLabelProps): JSX.Element => {
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
          <span
          //   className={
          //     employeeBasicInformationEditData.curentLocation
          //       ? 'text-white'
          //       : 'text-danger'
          //   }
          >
            *
          </span>
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
          />
          <CFormCheck
            inline
            type="radio"
            name="workfrom"
            id="workfromhome"
            value="Home"
            label="Home"
          />
        </CCol>
      </CRow>
    </>
  )
}

export default WorkFrom
