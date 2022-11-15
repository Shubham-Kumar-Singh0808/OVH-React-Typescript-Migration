import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../../stateStore'
import { SelectDesignationProps } from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'

const Designation = ({
  dynamicFormLabelProps,
  list,
  setValue,
  setToggleShift,
  value,
  isRequired,
  toggleValue,
  isAddDisable,
}: SelectDesignationProps): JSX.Element => {
  const onChangeHandler = (e: { target: { value: string } }) => {
    setValue(e.target.value)
  }
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )
  const userAccessToAddDesignation = userAccessToFeatures?.find(
    (feature) => feature.name === 'Add Designation',
  )
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testid="designationLabel"
          {...dynamicFormLabelProps(
            'designation',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Designation:
          {isRequired && <span className={showIsRequired(value)}>*</span>}
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id="designation"
            size="sm"
            aria-label="designation"
            data-testid="formDesignation"
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
            {userAccessToAddDesignation?.viewaccess && (
              <CButton
                data-testid="designationButton"
                color="info"
                className="btn-ovh me-1"
                onClick={() => setToggleShift(!toggleValue)}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            )}
          </CCol>
        )}
      </CRow>
    </>
  )
}

export default Designation
