import {
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormInput,
  CButton,
  CForm,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { Link } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'

const UpdateTicket = (): JSX.Element => {
  const [showEditor, setShowEditor] = useState<boolean>(true)

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={'Update Ticket'}
      CFooterClassName="d-none"
    >
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <Link to={`/ticketApprovals`}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="backBtn"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Tracker:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="form-select-not-allowed"
              aria-label="tracker"
              id="tracker"
              data-testid="trackerSelect"
              name="tracker"
              value={'Tracker'}
              disabled={true}
            >
              <option value="">Select Tracker</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Category:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="form-select-not-allowed"
              aria-label="category"
              id="category"
              data-testid="categorySelect"
              name="category"
              value={'category'}
              disabled={true}
            >
              <option value="">Select Tracker</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Sub-Category:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              className="form-select-not-allowed"
              aria-label="sub-category"
              id="sub-category"
              data-testid="sub-category"
              name="sub-category"
              value={'sub-category'}
              disabled={true}
            >
              <option value="">Select Tracker</option>
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
              className="form-control form-control-sm sh-date-picker sh-leave-form-control form-select-not-allowed"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="fromDate"
              value={''}
              onChange={(date: Date) => console.log(date)}
              disabled={true}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            End Date:
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="fromDate"
              data-testid="leaveApprovalFromDate"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control form-select-not-allowed"
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="fromDate"
              value={''}
              onChange={(date: Date) => console.log(date)}
              disabled={true}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Subject:
          </CFormLabel>
          <CCol sm={9}>
            <CFormInput
              type="text"
              id="subjectValue"
              name="subjectValue"
              value={''}
              // onChange={(e) => {
              //   setSubjectValue(e.target.value)
              // }}
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
                  console.log(editor.getData().trim())
                }}
              />
            </CCol>
          ) : (
            ''
          )}
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Ticket Status:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="tracker"
              id="tracker"
              data-testid="trackerSelect"
              name="tracker"
              value={'Tracker'}
            >
              <option value="">Select Tracker</option>
            </CFormSelect>
          </CCol>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Priority:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="tracker"
              id="tracker"
              data-testid="trackerSelect"
              name="tracker"
              value={'Tracker'}
            >
              <option value="">Select Tracker</option>
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
              value={''}
              onChange={(date: Date) => console.log(date)}
            />
          </CCol>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Due Date:
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
              value={''}
              onChange={(date: Date) => console.log(date)}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Assignee:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="title-input"
              type="text"
              name="title"
              maxLength={50}
            />
          </CCol>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            %Done:
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="tracker"
              id="tracker"
              data-testid="trackerSelect"
              name="tracker"
              value={'Tracker'}
            >
              <option value="">Select Tracker</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Estimated Time:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              className="form-select-not-allowed"
              data-testid="title-input"
              type="text"
              name="title"
              maxLength={50}
              disabled={true}
            />
          </CCol>
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Spent Time:
          </CFormLabel>
          <CCol sm={1}>
            <CFormInput
              id="startTimeHour"
              size="sm"
              type="text"
              name="startTimeHour"
              data-testid="sh-startTimeHour"
              placeholder="Hours"
              maxLength={2}
              // value={employeeShiftDetails.startTimeHour}
              // onChange={onchangeInputHandler}
            />
          </CCol>
          <CCol sm={1}>
            <CFormInput
              id="startTimeMinutes"
              size="sm"
              type="text"
              name="startTimeMinutes"
              data-testid="sh-startTimeMinutes"
              placeholder="Min"
              maxLength={2}
              // value={employeeShiftDetails.startTimeMinutes}
              // onChange={onchangeInputHandler}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Files:
          </CFormLabel>
          <CCol sm={3}>
            <input
              type="file"
              id="fileUpload"
              // onChange={onChange}
              accept=".png, .jpg, .jpeg"
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol sm={{ span: 6, offset: 2 }}>
            <CButton
              className="cursor-pointer"
              color="success btn-ovh me-1"
              // onClick={viewButtonHandler}
            >
              Update
            </CButton>
            <CButton
              className="cursor-pointer"
              disabled={true}
              color="success btn-ovh me-1"
              // onClick={clearBtnHandler}
            >
              Approve
            </CButton>
          </CCol>
        </CRow>
      </CForm>
    </OCard>
  )
}

export default UpdateTicket
