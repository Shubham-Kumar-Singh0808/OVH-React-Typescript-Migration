import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import React from 'react'
import { StartEndDateChangeHandlerProp } from '../../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../../utils/helper'

const EmploymentContract = ({
  dynamicFormLabelProps,
  onContractExistHandler,
  onStartDateChangeHandler,
  onEndDateChangeHandler,
  isContractExist,
  startDateValue,
  endDateValue,
}: StartEndDateChangeHandlerProp): JSX.Element => {
  const startDate =
    startDateValue == null ? '' : startDateValue.toLocaleDateString()
  const endDate = endDateValue == null ? '' : endDateValue.toLocaleDateString()

  const classNameStyle = 'col-sm-3 col-form-label text-end'
  return (
    <>
      <CRow className="mb-3 align-items-center">
        <CFormLabel
          {...dynamicFormLabelProps('employmentcontract', classNameStyle)}
        >
          Employment Contract:
        </CFormLabel>
        <CCol sm={3}>
          <CFormCheck
            inline
            type="radio"
            name="employmentcontract"
            id="employmentcontractyes"
            value="Yes"
            label="Yes"
            checked={isContractExist === 'true'}
            onChange={() => onContractExistHandler('true')}
          />
          <CFormCheck
            inline
            type="radio"
            name="employmentcontract"
            id="employmentcontractno"
            value="No"
            label="No"
            checked={isContractExist === 'false'}
            defaultChecked
            onChange={() => onContractExistHandler('false')}
          />
        </CCol>
      </CRow>
      {isContractExist === 'true' ? (
        <>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps('contractstartdate', classNameStyle)}
            >
              Contract Start Date:
              <span className={showIsRequired(startDate)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="contractstartdate"
                className="form-control form-control-sm sh-date-picker"
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Select start date"
                name="contractstartdate"
                value={startDate}
                onChange={(date: Date) => onStartDateChangeHandler(date)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps('contractenddate', classNameStyle)}
            >
              Contract End Date:
              <span className={showIsRequired(endDate)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="contractenddate"
                className="form-control form-control-sm sh-date-picker"
                maxDate={new Date()}
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="Select end date"
                name="contractenddate"
                value={endDate}
                onChange={(date: Date) => onEndDateChangeHandler(date)}
              />
              <span></span>
            </CCol>
          </CRow>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default EmploymentContract
