import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import OCard from '../../../../components/ReusableComponent/OCard'
import {
  TextDanger,
  TextLabelProps,
  TextWhite,
} from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { deviceLocale, showIsRequired } from '../../../../utils/helper'

const AddEmployeePipList = ({
  setToggle,
}: {
  setToggle: () => void
}): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | string>()
  const [endDate, setEndDate] = useState<Date | string>()
  const [dateErrorMsg, setDateErrorMsg] = useState<boolean>(false)
  const [selectRating, setSelectRating] = useState<string>('')
  const [isReasonForPIP, setIsReasonForPIP] = useState<boolean>(true)
  const [addReasonForPIP, setAddReasonForPIP] = useState<string>('')
  const [isImprovementPlan, setIsImprovementPlan] = useState<boolean>(true)
  const [addImprovementPlan, setAddImprovementPlan] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const commonFormatDate = 'l'

  useEffect(() => {
    const newFromDate = new Date(
      moment(startDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(endDate?.toString()).format(commonFormatDate),
    )
    if (startDate && endDate && newToDate.getTime() < newFromDate.getTime()) {
      setDateErrorMsg(true)
    } else {
      setDateErrorMsg(false)
    }
  }, [startDate, endDate])

  const endDateValue = endDate
    ? new Date(endDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const startDateValue = startDate
    ? new Date(startDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const handleText = (comments: string) => {
    setAddReasonForPIP(comments)
    setAddImprovementPlan(comments)
  }

  const clearInputs = () => {
    setAddReasonForPIP('')
    setIsReasonForPIP(false)
    setTimeout(() => {
      setIsReasonForPIP(true)
    }, 0)
    setAddImprovementPlan('')
    setIsImprovementPlan(false)
    setTimeout(() => {
      setIsImprovementPlan(true)
    }, 0)
    setSelectRating('')
    setEndDate('')
    setStartDate('')
  }

  useEffect(() => {
    if (
      startDate &&
      endDate &&
      selectRating &&
      addReasonForPIP &&
      addImprovementPlan
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [startDate, endDate, selectRating, addReasonForPIP, addImprovementPlan])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add PIP"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={setToggle}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">
                Start Date :
                <span className={showIsRequired(startDate as string)}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <ReactDatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yy"
                name="fromDate"
                autoComplete="off"
                id="fromDate"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={startDateValue}
                onChange={(date: Date) => setStartDate(date)}
                selected={startDate as Date}
              />
            </CCol>
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">
                End Date :
                <span className={showIsRequired(endDate as string)}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <ReactDatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yy"
                name="toDate"
                id="toDate"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={endDateValue}
                onChange={(date: Date) => setEndDate(date)}
                selected={endDate as Date}
              />
              {dateErrorMsg && (
                <span className="text-danger" data-testid="errorMessage">
                  End date should be greater than Start date
                </span>
              )}
            </CCol>
          </CRow>
          <CRow className="employeeAllocation-form">
            <CCol sm={2} md={1} className="text-end">
              <CFormLabel className="mt-1">
                Rating:
                <span className={showIsRequired(selectRating)}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="Select"
                data-testid="form-select1"
                name="Select"
                value={selectRating}
                onChange={(e) => {
                  setSelectRating(e.target.value)
                }}
              >
                <option>Select Rating</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>
              Reason for PIP:
              <span className={addReasonForPIP ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            {isReasonForPIP ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addReasonForPIP}
                  data-testid="allocateEmployeeComment"
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handleText(editor.getData().trim())
                  }}
                />
              </CCol>
            ) : (
              ''
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>
              Improvement Plan:
              <span className={addImprovementPlan ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            {isImprovementPlan ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addImprovementPlan}
                  data-testid="allocateEmployeeComment"
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handleText(editor.getData().trim())
                  }}
                />
              </CCol>
            ) : (
              ''
            )}
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={!isAddButtonEnabled}
              >
                Add
              </CButton>
              <CButton
                data-testid="clear-btn"
                color="warning"
                className="btn-ovh text-white"
                onClick={clearInputs}
              >
                Clear
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default AddEmployeePipList
