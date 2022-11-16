import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { EmployeeGeneralInformation } from '../../../types/MyProfile/GeneralTab/generalInformationTypes'

const MaritalStatusAndAnniversary = ({
  dateFormat,
  commonFormLabel,
  employeeBasicInformationEditData,
  handleChange,
  selectedAnniversary,
  dateErrorMessage,
  anniversaryFlag,
  newAnniversary,
  dateIsValid,
  onDateChangeHandler,
  handleAnniversary,
}: {
  dateFormat: string
  commonFormLabel: string
  employeeBasicInformationEditData: EmployeeGeneralInformation
  handleChange: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => void
  selectedAnniversary: Date | string | undefined
  dateErrorMessage: boolean
  anniversaryFlag: boolean
  newAnniversary: Date
  dateIsValid: (date: Date) => boolean
  onDateChangeHandler: (
    date: Date,
    e: {
      name: string
    },
  ) => void
  handleAnniversary: (date: Date) => void
}): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  return (
    <>
      <CRow className="mt-3 ">
        <CFormLabel
          {...dynamicFormLabelProps('employeeMaritalStatus', commonFormLabel)}
        >
          Marital Status:
          <span
            className={
              employeeBasicInformationEditData.maritalStatus
                ? TextWhite
                : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id="employeeMaritalStatus"
            size="sm"
            aria-label="MaritalStatus"
            name="maritalStatus"
            value={employeeBasicInformationEditData.maritalStatus}
            onChange={handleChange}
          >
            <option value={''}>Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </CFormSelect>
        </CCol>
      </CRow>
      {employeeBasicInformationEditData.maritalStatus === 'Married' && (
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('employeeAnniversary', commonFormLabel)}
          >
            Anniversary:
            <span
              className={
                employeeBasicInformationEditData.anniversary
                  ? TextWhite
                  : TextDanger
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              autoComplete="off"
              id="employeeAnniversary"
              className="form-control form-control-sm sh-date-picker"
              // peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText={
                dateFormat === 'dd/MM/yyyy' ? 'dd/mm/yyyy' : dateFormat
              }
              dateFormat={dateFormat}
              name="anniversary"
              value={
                (selectedAnniversary as string) ||
                (employeeBasicInformationEditData.anniversary as string) ||
                ''
              }
              selected={
                !anniversaryFlag && dateIsValid(newAnniversary)
                  ? newAnniversary
                  : (selectedAnniversary as Date)
              }
              onChange={(date: Date) => {
                onDateChangeHandler(date, { name: 'anniversary' })
                handleAnniversary(date)
              }}
              data-testid="anniversary"
            />
            {dateErrorMessage && (
              <p className="text-danger">
                Anniversary date should be greater than Real Birthday date....
              </p>
            )}
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default MaritalStatusAndAnniversary
