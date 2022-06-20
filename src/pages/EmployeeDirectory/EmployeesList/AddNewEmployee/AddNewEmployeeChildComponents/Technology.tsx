import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'

import React from 'react'
import { TechnologyProps } from '../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'

const Technology = ({
  dynamicFormLabelProps,
  technologyList,
  setTechnologyValue,
  technologyValue,
}: TechnologyProps): JSX.Element => {
  const onDepartmentChangeHandler = (e: { target: { value: string } }) => {
    setTechnologyValue(e.target.value)
  }
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
            value={technologyValue}
            onChange={onDepartmentChangeHandler}
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
