import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React from 'react'
import { SelectDesignationProps } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../../utils/helper'

const Designation = ({
  dynamicFormLabelProps,
  list,
  setValue,
  setToggleShift,
  value,
  toggleValue,
  isAddDisable,
}: SelectDesignationProps): JSX.Element => {
  const onChangeHandler = (e: { target: { value: string } }) => {
    setValue(e.target.value)
  }

  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testId="designationLabel"
          {...dynamicFormLabelProps(
            'designation',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Designation:
          <span className={showIsRequired(value)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id="designation"
            size="sm"
            aria-label="designation"
            data-testid="form-select"
            name="designation"
            value={value}
            onChange={onChangeHandler}
          >
            <option value={''}>Select Designation</option>
            {list?.map((item, index) => {
              const { name } = item
              return (
                <option key={index} value={name}>
                  {name}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
        {!isAddDisable && (
          <CCol sm={3}>
            <CButton
              data-testId="designationButton"
              color="info"
              className="btn-ovh me-1"
              onClick={() => setToggleShift(!toggleValue)}
            >
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
          </CCol>
        )}
      </CRow>
    </>
  )
}

export default Designation
