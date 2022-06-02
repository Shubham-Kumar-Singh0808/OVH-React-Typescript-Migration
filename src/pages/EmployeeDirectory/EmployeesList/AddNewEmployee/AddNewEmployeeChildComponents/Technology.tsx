import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import React from 'react'
import { TechnologyProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const Technology = ({
  dynamicFormLabelProps,
  technologyList,
}: TechnologyProps): JSX.Element => {
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'technology',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Technology:
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
            id="technology"
            size="sm"
            aria-label="technology"
            name="technology"
            value=""
          >
            <option value={''}>Select Technology</option>
            {technologyList?.map((curItem, ind) => (
              <option key={curItem.name} value={curItem.name}>
                {curItem.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default Technology
