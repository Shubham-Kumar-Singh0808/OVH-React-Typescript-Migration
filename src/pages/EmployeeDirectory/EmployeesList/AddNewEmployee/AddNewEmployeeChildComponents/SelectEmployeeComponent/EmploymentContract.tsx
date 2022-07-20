import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import React, { useEffect, useState } from 'react'
import { StartEndDateChangeHandlerProp } from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'

const EmploymentContract = ({
  dynamicFormLabelProps,
  onContractExistHandler,
  onStartDateChangeHandler,
  onEndDateChangeHandler,
  isContractExist,
  isRequired,
  startDateValue,
  endDateValue,
}: StartEndDateChangeHandlerProp): JSX.Element => {
  const startDate =
    startDateValue == null ? '' : startDateValue.toLocaleDateString()
  const endDate = endDateValue == null ? '' : endDateValue.toLocaleDateString()

  const classNameStyle = 'col-sm-3 col-form-label text-end'

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(isContractExist)
  }, [isContractExist])

  const handleOnChange = (value: string) => {
    const isExist = value === 'Office'
    onContractExistHandler(isExist)
    setIsActive(isExist)
  }

  const isDateCorrect = (startValue: Date, endValue: Date): boolean => {
    if (startValue == null || endValue == null) return false

    const start = new Date(startValue)
    const end = new Date(endValue)

    return start > end
  }

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
            checked={isActive}
            onChange={() => handleOnChange('true')}
          />
          <CFormCheck
            inline
            type="radio"
            name="employmentcontract"
            id="employmentcontractno"
            value="No"
            label="No"
            checked={!isActive}
            defaultChecked
            onChange={() => handleOnChange('false')}
          />
        </CCol>
      </CRow>
      {isContractExist ? (
        <>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps('contractstartdate', classNameStyle)}
            >
              Contract Start Date:
              {isRequired && (
                <span className={showIsRequired(startDate)}>*</span>
              )}
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
                data-testid="start-date-picker"
                placeholderText="dd/mm/yy"
                dateFormat="dd/mm/yy"
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
              {isRequired && <span className={showIsRequired(endDate)}>*</span>}
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
                placeholderText="dd/mm/yy"
                dateFormat="dd/mm/yy"
                data-testid="end-date-picker"
                name="contractenddate"
                value={endDate}
                onChange={(date: Date) => onEndDateChangeHandler(date)}
              />
              <span></span>
            </CCol>
            {isDateCorrect(startDateValue, endDateValue) && (
              <CCol sm={3}>
                <p style={{ color: 'red' }}>
                  <b>End date should be greater than Start date</b>
                </p>
              </CCol>
            )}
          </CRow>
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default EmploymentContract
