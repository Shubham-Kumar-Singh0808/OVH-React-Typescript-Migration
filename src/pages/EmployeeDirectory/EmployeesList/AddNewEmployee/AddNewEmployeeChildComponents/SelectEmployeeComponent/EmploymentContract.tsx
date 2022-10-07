import { CCol, CFormCheck, CFormLabel, CRow } from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { StartEndDateChangeHandlerProp } from '../../../../../../types/EmployeeDirectory/EmployeesList/AddNewEmployee/addNewEmployeeType'
import { showIsRequired } from '../../../../../../utils/helper'
import { dateFormat } from '../../../../../../constant/DateFormat'

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
  const classNameStyle = 'col-sm-3 col-form-label text-end'

  const [isActive, setIsActive] = useState(false)
  const [isGreaterThanStart, setIsGreaterThanStart] = useState(false)

  useEffect(() => {
    setIsActive(isContractExist)
  }, [isContractExist])

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(startDateValue, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(endDateValue, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsGreaterThanStart(moment(end).isBefore(start))
  }, [startDateValue, endDateValue])

  const handleOnChange = (value: string) => {
    const isExist = value.toLowerCase() === 'office'
    onContractExistHandler(isExist)
    setIsActive(isExist)
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
            label="Yes"
            checked={isActive}
            onChange={() => handleOnChange('office')}
          />
          <CFormCheck
            inline
            type="radio"
            name="employmentcontract"
            id="employmentcontractno"
            label="No"
            checked={!isActive}
            defaultChecked
            onChange={() => handleOnChange('home')}
          />
        </CCol>
      </CRow>
      {isContractExist && (
        <>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps('contractstartdate', classNameStyle)}
            >
              Contract Start Date:
              {isRequired && (
                <span className={showIsRequired(startDateValue)}>*</span>
              )}
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="contractstartdate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                data-testid="start-date-picker"
                placeholderText="dd/mm/yy"
                dateFormat="dd/mm/yy"
                name="contractstartdate"
                value={startDateValue}
                onChange={(date: Date) => onStartDateChangeHandler(date)}
              />
            </CCol>
          </CRow>
          <CRow className="mb-3">
            <CFormLabel
              {...dynamicFormLabelProps('contractenddate', classNameStyle)}
            >
              Contract End Date:
              {isRequired && (
                <span className={showIsRequired(endDateValue)}>*</span>
              )}
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="contractenddate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                data-testid="end-date-picker"
                dateFormat="dd/mm/yy"
                name="contractenddate"
                value={endDateValue}
                onChange={(date: Date) => onEndDateChangeHandler(date)}
              />
              <span></span>
            </CCol>
            {isGreaterThanStart && (
              <CCol sm={3}>
                <p style={{ color: 'red' }}>
                  <b>End date should be greater than Start date</b>
                </p>
              </CCol>
            )}
          </CRow>
        </>
      )}
    </>
  )
}

export default EmploymentContract
