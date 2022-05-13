import 'react-datepicker/dist/react-datepicker.css'

import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'

import DatePicker from 'react-datepicker'
import DownloadSampleFileButton from './DownloadSampleFileButton'
import React from 'react'

const BasicInfoTab = (): JSX.Element => {
  // onchange handler for date pickers
  const onDateChangeHandler = (date: Date, e: { name: string }) => {
    // if (employeeData) {
    //   let formatDate = moment(date).format('DD/MM/YYYY')
    //   let name = e.name
    //   setEmployeeData((prevState) => {
    //     return { ...prevState, ...{ [name]: formatDate } }
    //   })
    // }
  }

  return (
    <>
      <CForm className="form-horizontal ng-pristine ng-valid-pattern ng-valid-email ng-valid ng-valid-required">
        <DownloadSampleFileButton />
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Employee ID:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-sm-15 col-form-label text-end"></CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Email ID:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-sm-15 col-form-label text-end"></CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Full Name:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-sm-15 col-form-label text-end"></CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Current Location:
            <span className="text-danger">*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              size="sm"
              type="text"
              name="curentLocation"
              placeholder="Enter Location"
            />
            <CFormCheck
              className="mt-2"
              id="trigger"
              label="This is not the base location"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Base Location:
            <span className="text-danger">*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              size="sm"
              type="text"
              name="baseLocation"
              placeholder="Enter Location"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Gender:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect size="sm" aria-label="Gender" name="gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Blood group:
            <span className="text-danger">*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect size="sm" aria-label="bloodGroup" name="bloodgroup">
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
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Official Birthday:
            <span className="text-danger">*</span>
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              className="form-control form-control-sm"
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="dd/mm/yyyy"
              name="officialBirthday"
              // value={employeeData.officialBirthday}
              onChange={(date: Date) =>
                onDateChangeHandler(date, { name: 'officialBirthday' })
              }
            />
            <CFormCheck
              className="mt-2"
              id="trigger"
              name="officialDateOfBirth"
              label=" This is not a real birthday"
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Real Birthday:
            <span className="text-danger">*</span>
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              className="form-control form-control-sm"
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="dd/mm/yyyy"
              name="realBirthday"
              // value={employeeData.realBirthday}
              onChange={(date: Date) =>
                onDateChangeHandler(date, { name: 'realBirthday' })
              }
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Marital Status:
            <span className="text-danger">*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              size="sm"
              aria-label="MaritalStatus"
              name="maritalStatus"
            >
              <option value={''}>Select Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </CFormSelect>
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Anniversary:
            <span className="text-danger">*</span>
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              className="form-control form-control-sm"
              maxDate={new Date()}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="dd/mm/yyyy"
              name="realBirthday"
              // value={employeeData.anniversary}
              onChange={(date: Date) =>
                onDateChangeHandler(date, { name: 'anniversary' })
              }
            />
          </CCol>
        </CRow>

        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Department:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              basicInformationdepartmentName
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Reporting Manager:
          </CFormLabel>
          <CCol sm={6}>
            <CFormLabel className="col-sm-15 col-form-label text-end">
              basicInformationempManager
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Employment Type:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              basicInformationemploymentTypeName
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Job Type:
          </CFormLabel>
          <CCol sm={2}>
            <CFormLabel className="col-form-label text-end">
              basicInformationjobTypeName
            </CFormLabel>
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Personal Email:
            <span className="text-danger">*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              size="sm"
              type="text"
              name="personalEmail"
              placeholder="Personal Email"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Skype ID:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              size="sm"
              type="text"
              name="skypeId"
              placeholder="Enter SkypeID"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Profile Picture:
          </CFormLabel>
          <CCol sm={3}>
            <div className="profile-avatar">
              <img width="120px" height="120px;" alt="User Profile" />
            </div>
            <CFormInput
              type="file"
              className="form-control form-control-sm mt-2"
              id="exampleFormControlFile1"
              accept="image/*"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3 ">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            About Me:
          </CFormLabel>
          <CCol sm={9}></CCol>
        </CRow>
        <CRow className="mt-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Upload RBT CV:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="file"
              name="file"
              className="form-control form-control-sm"
              id="exampleFormControlFile2"
              accept=".doc, .docx, .pdf"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol md={{ span: 6, offset: 3 }}></CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              className="btn-ovh btn btn-success mt-4"
              size="sm"
              type="submit"
            >
              Save
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default BasicInfoTab
