import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'

const CreateNewTicketFilterOptions = (): JSX.Element => {
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const commonFormatDate = 'l'
  const deviceLocale: string =
    navigator.languages && navigator.languages.length
      ? navigator.languages[0]
      : navigator.language

  const currentDate = new Date().setHours(0, 0, 0, 0)
  const formLabelProps = {
    htmlFor: 'inputCreateTicket',
    className: 'col-form-label createticket-label',
  }
  const handleDescription = (e: any) => {
    setShowEditor(e.target.value)
  }
  return (
    <>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Tracker:
            <span>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect aria-label="tracker" name="tracker" id="tracker">
              <option value={''}>Select Tracker</option>
              <option value="Brother">Brother</option>
              <option value="Daughter">Daughter</option>
              <option value="Father">Father</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Department:
            <span>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="department"
              name="department"
              id="department"
            >
              <option value={''}>Select Department</option>
              <option value="Brother">Brother</option>
              <option value="Daughter">Daughter</option>
              <option value="Father">Father</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Category:
            <span>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect aria-label="category" name="category" id="category">
              <option value={''}>Select Category</option>
              <option value="Brother">Brother</option>
              <option value="Daughter">Daughter</option>
              <option value="Father">Father</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Sub-Category:
            <span>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="sub-category"
              name="sub-category"
              id="sub-category"
            >
              <option value={''}>Select sub-Category</option>
              <option value="Brother">Brother</option>
              <option value="Daughter">Daughter</option>
              <option value="Father">Father</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Start Date:
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="fromDate"
              data-testid="leaveApprovalFromDate"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="fromDate"
              value={
                fromDate
                  ? new Date(fromDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setFromDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            End Date::
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="toDate"
              data-testid="leaveApprovalFromDate"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="toDate"
              value={
                toDate
                  ? new Date(toDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setToDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Subject:
            <span>*</span>
          </CFormLabel>
          <CCol sm={9}>
            <CFormInput
              type="text"
              id="Name"
              name="personName"
              placeholder="Subject"
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Description:
          </CFormLabel>
          {showEditor ? (
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                // initData={employeeSkill?.comments}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleDescription(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            {...formLabelProps}
            className="col-sm-2 col-form-label text-end"
          >
            Priority:
            <span>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect aria-label="category" name="category" id="category">
              <option value={''}>Normal</option>
              <option value="Brother">Brother</option>
              <option value="Daughter">Daughter</option>
              <option value="Father">Father</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Files:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              id="uploadedFile"
              className="form-control"
              type="file"
              name="file"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton className="btn-ovh me-1" color="success">
                Create
              </CButton>
              <CButton color="warning " className="btn-ovh">
                Clear
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default CreateNewTicketFilterOptions
