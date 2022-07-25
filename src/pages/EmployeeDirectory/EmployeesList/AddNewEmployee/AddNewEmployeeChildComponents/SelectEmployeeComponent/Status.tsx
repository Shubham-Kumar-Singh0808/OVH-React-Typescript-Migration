import React from 'react'
import DatePicker from 'react-datepicker'
import { CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import { StatusProps } from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'

const Status = ({
  dynamicFormLabelProps,
  list,
  setStatusValue,
  setStatusDateValue,
  value,
  dateValue,
  isRequired,
}: StatusProps): JSX.Element => {
  const onChangeHandler = (e: { target: { value: string } }) => {
    setStatusValue(e.target.value)
  }

  const selectedValue = value == null ? '' : value
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          data-testid="selectLabel"
          {...dynamicFormLabelProps(
            'technology',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Employee Status:
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id="relievingDate"
            size="sm"
            aria-label="relieving date"
            data-testid="formRelievingDate"
            name="relieving date"
            value={selectedValue}
            onChange={onChangeHandler}
          >
            {list?.map((item, index) => {
              const { name: optionName } = item
              return (
                <option key={index} value={optionName}>
                  {optionName}
                </option>
              )
            })}
          </CFormSelect>
        </CCol>
      </CRow>
      {selectedValue.toLowerCase() === 'inactive' && (
        <CRow className="mb-3">
          <CFormLabel
            {...dynamicFormLabelProps(
              'statusDate',
              'col-sm-3 col-form-label text-end',
            )}
          >
            Relieving Date:
            {isRequired && <span className={showIsRequired(dateValue)}>*</span>}
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              id="statusDate"
              className="form-control form-control-sm sh-date-picker"
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              data-testid="start-date-picker"
              placeholderText="dd/mm/yy"
              dateFormat="dd/mm/yy"
              name="statusDate"
              value={dateValue}
              onChange={(date: Date) => setStatusDateValue(date)}
            />
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default Status
