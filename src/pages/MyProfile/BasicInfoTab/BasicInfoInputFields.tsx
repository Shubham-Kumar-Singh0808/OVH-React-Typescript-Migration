import {
  CRow,
  CFormLabel,
  CCol,
  CFormInput,
  CFormCheck,
  CFormSelect,
} from '@coreui/react-pro'
import React from 'react'
import ReactDatePicker from 'react-datepicker'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { EmployeeGeneralInformation } from '../../../types/MyProfile/GeneralTab/generalInformationTypes'

const BasicInfoInputFields = ({
  dateFormat,
  commonFormLabel,
  formLabelWithPadding,
  employeeBasicInformationEditData,
  handleChange,
  baseLocationShown,
  setBaseLocationShown,
  officialBday,
  officialBdyFlag,
  newOfficialBday,
  dateIsValid,
  onDateChangeHandler,
  handleOfficialBday,
  realBirthdayShown,
  setRealBirthdayShown,
  realBday,
  realBdayFlag,
  newRealBirthday,
  handleRealBday,
}: {
  dateFormat: string
  commonFormLabel: string
  formLabelWithPadding: string
  employeeBasicInformationEditData: EmployeeGeneralInformation
  handleChange: (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => void
  baseLocationShown: boolean
  setBaseLocationShown: (value: boolean) => void
  officialBday: Date | string | undefined
  officialBdyFlag: boolean
  newOfficialBday: Date
  dateIsValid: (date: Date) => boolean
  onDateChangeHandler: (
    date: Date,
    e: {
      name: string
    },
  ) => void
  handleOfficialBday: (date: Date) => void
  realBirthdayShown: boolean
  setRealBirthdayShown: (value: boolean) => void
  realBday: string | Date | undefined
  realBdayFlag: boolean
  newRealBirthday: Date
  handleRealBday: (date: Date) => void
}): JSX.Element => {
  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }
  console.log(baseLocationShown)
  return (
    <>
      <CRow className="mt-3 ">
        <CFormLabel
          {...dynamicFormLabelProps('employeeCurrentLocation', commonFormLabel)}
        >
          Current Location:
          <span
            className={
              employeeBasicInformationEditData.curentLocation
                ? TextWhite
                : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            id="employeeCurrentLocation"
            size="sm"
            type="text"
            name="curentLocation"
            placeholder="Enter Location"
            value={employeeBasicInformationEditData.curentLocation}
            onChange={handleChange}
          />
          <CFormCheck
            className="mt-2"
            id="trigger"
            label="This is not the base location"
            checked={baseLocationShown}
            onChange={() => setBaseLocationShown(!baseLocationShown)}
          />
        </CCol>
      </CRow>
      {baseLocationShown && (
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('employeeBaseLocation', commonFormLabel)}
          >
            Base Location:
            <span
              className={
                employeeBasicInformationEditData.baseLocation
                  ? TextWhite
                  : TextDanger
              }
            >
              *
            </span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              id="employeeBaseLocation"
              size="sm"
              type="text"
              name="baseLocation"
              placeholder="Enter Location"
              value={employeeBasicInformationEditData.baseLocation}
              onChange={handleChange}
            />
          </CCol>
        </CRow>
      )}
      <CRow className="mt-3 ">
        <CFormLabel
          {...dynamicFormLabelProps('employeeGender', formLabelWithPadding)}
        >
          Gender:
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id="employeeGender"
            size="sm"
            aria-label="Gender"
            name="gender"
            value={employeeBasicInformationEditData.gender}
            onChange={handleChange}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 ">
        <CFormLabel
          {...dynamicFormLabelProps('employeeBloodGroup', commonFormLabel)}
        >
          Blood group:
          <span
            className={
              employeeBasicInformationEditData.bloodgroup
                ? TextWhite
                : TextDanger
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            id="employeeBloodGroup"
            size="sm"
            aria-label="bloodGroup"
            name="bloodgroup"
            value={employeeBasicInformationEditData.bloodgroup}
            onChange={handleChange}
          >
            <option value={''}>Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3 ">
        <CFormLabel
          {...dynamicFormLabelProps(
            'employeeOfficialBirthday',
            commonFormLabel,
          )}
        >
          Official Birthday:
          <span
            className={
              employeeBasicInformationEditData.officialBirthday
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
            id="employeeOfficialBirthday"
            data-testid="officialBirthdayInput"
            className="form-control form-control-sm sh-date-picker"
            maxDate={new Date()}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            placeholderText={
              dateFormat === 'dd/MM/yyyy' ? 'dd/mm/yyyy' : dateFormat
            }
            dateFormat={dateFormat}
            name="officialBirthday"
            value={
              (officialBday as string) ||
              (employeeBasicInformationEditData.officialBirthday as string)
            }
            selected={
              !officialBdyFlag && dateIsValid(newOfficialBday)
                ? newOfficialBday
                : (officialBday as Date)
            }
            onChange={(date: Date) => {
              onDateChangeHandler(date, { name: 'officialBirthday' })
              handleOfficialBday(date)
            }}
          />
          <CFormCheck
            className="mt-2"
            id="trigger"
            name="officialDateOfBirth"
            label=" This is not a real birthday"
            checked={realBirthdayShown}
            onChange={() => setRealBirthdayShown(!realBirthdayShown)}
          />
        </CCol>
      </CRow>
      {realBirthdayShown && (
        <CRow className="mt-3 ">
          <CFormLabel
            {...dynamicFormLabelProps('employeeRealBirthday', commonFormLabel)}
          >
            Real Birthday:
            <span
              className={
                employeeBasicInformationEditData.realBirthday
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
              id="employeeRealBirthday"
              className="form-control form-control-sm sh-date-picker"
              maxDate={new Date()}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText={
                dateFormat === 'dd/MM/yyyy' ? 'dd/mm/yyyy' : dateFormat
              }
              dateFormat={dateFormat}
              name="realBirthday"
              value={
                (realBday as string) ||
                (employeeBasicInformationEditData.realBirthday as string)
              }
              selected={
                !realBdayFlag && dateIsValid(newRealBirthday)
                  ? newRealBirthday
                  : (realBday as Date)
              }
              onChange={(date: Date) => {
                onDateChangeHandler(date, { name: 'realBirthday' })
                handleRealBday(date)
              }}
              data-testid="realBirthday"
            />
          </CCol>
        </CRow>
      )}
    </>
  )
}

export default BasicInfoInputFields
