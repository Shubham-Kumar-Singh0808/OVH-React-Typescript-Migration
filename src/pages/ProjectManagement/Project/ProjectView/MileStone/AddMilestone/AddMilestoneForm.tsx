import {
  CForm,
  CRow,
  CFormLabel,
  CCol,
  CFormSelect,
  CFormInput,
  CButton,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { reduxServices } from '../../../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../../../stateStore'
import { ckeditorConfig } from '../../../../../../utils/ckEditorUtils'
import { deviceLocale } from '../../../../../../utils/dateFormatUtils'

const EditMileStoneForm = (): JSX.Element => {
  const [title, setTitle] = useState<string>('')
  const [mileStoneCRDetails, setMileStoneCRDetails] = useState<string>()
  const [plannedEndDate, setPlannedDate] = useState<string>()
  const [actualEndDate, setActualDate] = useState<string>()
  const [billable, setBillable] = useState<boolean>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [comments, setComments] = useState<string>()
  const commonFormatDate = 'l'

  const whiteText = 'text-white'
  const dangerText = 'text-danger'
  const handleDescription = (comment: string) => {
    setComments(comment)
  }
  const getProjectDetail = useTypedSelector(
    reduxServices.projectMileStone.selectors.getMilestone,
  )

  return (
    <>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Title :<span className={title ? whiteText : dangerText}>*</span>
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              data-testid="selectSubject"
              id="subjectValue"
              name="subjectValue"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Milestone Number :
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              type="text"
              data-testid="selectSubject"
              id="subjectValue"
              name="subjectValue"
              value={getProjectDetail.milestoneNumber}
              disabled
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            CR :
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="tracker"
              id="tracker"
              data-testid="trackerSelect"
              name="tracker"
              value={mileStoneCRDetails}
              onChange={(e) => {
                setMileStoneCRDetails(e.target.value)
              }}
            >
              <option value="">Select Tracker</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Planned End Date: :
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="fromDate"
              data-testid="dateOptionSelect"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              showMonthDropdown
              showYearDropdown
              minDate={new Date()}
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              autoComplete="off"
              placeholderText="dd/mm/yy"
              name="fromDate"
              value={
                plannedEndDate
                  ? new Date(plannedEndDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setPlannedDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            End Date :
          </CFormLabel>
          <CCol sm={3}>
            <ReactDatePicker
              id="toDate"
              data-testid="dateOptionSelect"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              showMonthDropdown
              showYearDropdown
              minDate={new Date()}
              dropdownMode="select"
              autoComplete="off"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="toDate"
              value={
                actualEndDate
                  ? new Date(actualEndDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setActualDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Billable:: :
          </CFormLabel>
          <CCol sm={3}>
            <CFormSelect
              aria-label="tracker"
              id="tracker"
              data-testid="trackerSelect"
              name="tracker"
              // value={billable as boolean}
              // onChange={(e) => {
              //   setBillable(e.target.value)
              // }}
            >
              <option value="">Select Tracker</option>
            </CFormSelect>
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel
            className="col-sm-2 col-form-label text-end"
            data-testid="ckEditor-component"
          >
            Comments: :
          </CFormLabel>
          {showEditor ? (
            <CCol sm={8}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={comments}
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
        <CRow>
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="create-btn"
                color="success"
                // onClick={handleApplyTicket}
                // disabled={!isCreateButtonEnabled || dateError}
              >
                Update
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default EditMileStoneForm
