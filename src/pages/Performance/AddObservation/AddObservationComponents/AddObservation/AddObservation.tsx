import {
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormText,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import WrapperComponent from '../WrapperComponent'
import { selectRating } from '../../AddObservationConstants'
import { useTypedSelector } from '../../../../../stateStore'
import { TextDanger, TextWhite } from '../../../../../constant/ClassName'
import {
  datePickerFormattedData,
  emptyString,
} from '../../../../../constant/constantData'
import { ckeditorConfig } from '../../../../../utils/ckEditorUtils'
import { commonDateFormat } from '../../../../../utils/dateFormatUtils'

const AddObservation = () => {
  const performanceRatings = useTypedSelector(
    (state) => state.addObservation.performanceRating,
  )

  const [writtenRemark, setWrittenRemark] = useState<string>(emptyString)
  const [writtenSubject, setWrittenSubject] = useState<string>(emptyString)
  const [enteredDate, setEnteredDate] = useState<string>(emptyString)

  const writtenRemarkHandler = (value: string) => {
    setWrittenRemark(value)
  }

  return (
    <WrapperComponent title="Add Observation">
      <CForm>
        <CContainer className="mt-3 ms-2">
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Employee:
              <span className={TextDanger}>*</span>
            </CFormLabel>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Subject:
              <span className={TextDanger}>*</span>
            </CFormLabel>
            <CCol md={3}>
              <CFormInput type="text" maxLength={100} value={writtenSubject} />
              <CFormText>{writtenSubject.length}/100</CFormText>
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Month:
              <span className={TextDanger}>*</span>
            </CFormLabel>
            <CCol md={3}>
              <ReactDatePicker
                placeholderText="mm/yyyy"
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker"
                dropdownMode="select"
                showMonthYearPicker
                peekNextMonth
                value={datePickerFormattedData(enteredDate)}
                onChange={(date: Date) => {
                  setEnteredDate(moment(date).format(commonDateFormat))
                }}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Rating:
              <span className={TextDanger}>*</span>
            </CFormLabel>
            <CCol md={3}>
              <CFormSelect value={selectRating}>
                <option value={selectRating}>{selectRating}</option>
                {performanceRatings.map((item, index) => (
                  <option key={index} value={item.rating.toString()}>
                    {item.rating.toString()}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Remark:
              <span
                className={
                  writtenRemark === emptyString ||
                  writtenRemark.trim().length === 0
                    ? TextDanger
                    : TextWhite
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={8}>
              <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
                initData={emptyString}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  writtenRemarkHandler(editor.getData().trim())
                }}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 mb-3 align-items-center">
            <CFormLabel className="col-sm-2 col-form-label text-end">
              Upload File:
              <span className={TextWhite}>*</span>
            </CFormLabel>
          </CRow>
        </CContainer>
      </CForm>
    </WrapperComponent>
  )
}

export default AddObservation
