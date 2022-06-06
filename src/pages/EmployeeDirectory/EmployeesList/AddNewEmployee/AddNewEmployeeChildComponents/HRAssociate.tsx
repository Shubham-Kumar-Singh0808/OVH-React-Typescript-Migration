import {
  CCol,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'

import { HrDataProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import React from 'react'

const HRAssociate = ({
  dynamicFormLabelProps,
  hrDataList,
}: HrDataProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'hrassociate',
            'col-sm-3 col-form-label text-end',
          )}
        >
          HR Associate:
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
          <CFormSelect
            id="country"
            size="sm"
            aria-label="country"
            name="country"
            value=""
          >
            <option value={''}>Select Country</option>
            {hrDataList?.map((curItem) => (
              <option key={curItem.fullName} value={curItem.fullName}>
                {curItem.fullName}
              </option>
            ))}
          </CFormSelect>
          <CFormInput
            id="hrassociate"
            size="sm"
            type="text"
            name="hrassociate"
            placeholder="HR Associate"
            value=""
          />
        </CCol>
      </CRow>
    </>
  )
}

export default HRAssociate
