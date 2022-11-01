import React, { useState } from 'react'
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
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import OCard from '../../../components/ReusableComponent/OCard'
import {
  TextDanger,
  TextLabelProps,
  TextWhite,
} from '../../../constant/ClassName'
import { deviceLocale } from '../../../utils/dateFormatUtils'

const AddConfiguration = ({
  setToggle,
  reviewPeriodTo,
  reviewPeriodFrom,
  setReviewPeriodTo,
  setReviewPeriodFrom,
}: {
  setToggle: (value: string) => void
  reviewPeriodTo: Date | undefined
  reviewPeriodFrom: Date | undefined
  setReviewPeriodTo: React.Dispatch<React.SetStateAction<Date | undefined>>
  setReviewPeriodFrom: React.Dispatch<React.SetStateAction<Date | undefined>>
}): JSX.Element => {
  const [selectReviewTitle, setSelectReviewTitle] = useState('')
  const [selectReviewType, setSelectReviewType] = useState('')
  const [reviewEndDate, setReviewEndDate] = useState<string>()
  const [reviewStartDate, setReviewStartDate] = useState<string>()
  const [isShowDescription, setIsShowDescription] = useState<boolean>(true)
  const [addingDescription, setaddingDescription] = useState<string>('')
  const [servicePeriod, setServicePeriod] = useState<number | string>()
  const [level, setLevel] = useState<number | string>()

  const commonFormatDate = 'L'

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const dynamicFormLabelProps = (htmlFor: string, className: string) => {
    return {
      htmlFor,
      className,
    }
  }

  const formLabel = 'col-sm-3 col-form-label text-end'
  const handledInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'reviewTitle') {
      const newValue = value.replace(/^\s*/, '').replace(/[^a-z\s]/gi, '')
      setSelectReviewTitle(newValue)
    }
  }

  const handleText = (description: string) => {
    setaddingDescription(description)
  }

  const HandleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'minimumServicePeriod') {
      let targetValue = value.replace(/\D/g, '')
      if (Number(targetValue) > 999) targetValue = '999'
      setServicePeriod(targetValue)
    }
    if (name === 'level') {
      let targetValue = value.replace(/\D/g, '')
      if (Number(targetValue) > 9) targetValue = '9'
      setLevel(targetValue)
    }
  }

  const clearInputs = () => {
    setSelectReviewTitle('')
    setSelectReviewType('')
    setReviewEndDate('')
    setReviewStartDate('')
    setServicePeriod('')
    setIsShowDescription(false)
    setTimeout(() => {
      setIsShowDescription(true)
    }, 0)
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add Configuration"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Review Title:
              <span
                className={
                  selectReviewTitle
                    ?.replace(/^\s*/, '')
                    .replace(/[^a-z\s]/gi, '')
                    ? TextWhite
                    : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="reviewTitle"
                type="text"
                id="reviewTitle"
                size="sm"
                name="reviewTitle"
                placeholder="Name"
                value={selectReviewTitle}
                onChange={handledInputChange}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel {...dynamicFormLabelProps('reviewType', formLabel)}>
              Review Type:
              <span className={selectReviewType ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="reviewType"
                data-testid="form-select1"
                size="sm"
                aria-label="reviewType"
                name="reviewType"
                value={selectReviewType}
                onChange={(e) => {
                  setSelectReviewType(e.target.value)
                }}
              >
                <option value={''}>Select </option>
                <option>Monthly</option>
                <option>Annual</option>
                <option>Probation</option>
                <option>Quaterly</option>
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mt-3">
            <CCol sm={3} md={1} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Period From:
                <span className={reviewPeriodTo ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={2} className="text-end pe-2 ms-3 sh-date-picker-column">
              <ReactDatePicker
                id="reviewPeriodFrom"
                data-testid="sh-date-picker"
                className="form-control form-control-sm sh-date-picker"
                maxDate={new Date()}
                showMonthYearPicker
                placeholderText="mm/yyyy"
                dateFormat="MM/yyyy"
                name="selectMonth"
                selected={reviewPeriodFrom}
                onChange={(date: Date) => {
                  setReviewPeriodFrom(date)
                }}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={1} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Period To:
                <span className={reviewPeriodTo ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={2} className="text-end pe-2 ms-3 sh-date-picker-column">
              <ReactDatePicker
                id="reviewPeriodTo"
                data-testid="sh-date-picker"
                className="form-control form-control-sm sh-date-picker"
                maxDate={new Date()}
                showMonthYearPicker
                placeholderText="mm/yyyy"
                dateFormat="MM/yyyy"
                name="selectMonth"
                selected={reviewPeriodTo}
                onChange={(date: Date) => {
                  setReviewPeriodTo(date)
                }}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Review Start Date:
                <span className={reviewStartDate ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                id="reviewStartDate"
                data-testid="reviewStartDate"
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yyyy"
                placeholderText="dd/mm/yyyy"
                name="reviewStartDate"
                value={
                  reviewStartDate
                    ? new Date(reviewStartDate).toLocaleDateString(
                        deviceLocale,
                        {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        },
                      )
                    : ''
                }
                onChange={(date: Date) =>
                  setReviewStartDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Review End Date:
                <span className={reviewEndDate ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                id="reviewEndDate"
                data-testid="reviewEndDate"
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yyyy"
                placeholderText="dd/mm/yyyy"
                name="reviewEndDate"
                value={
                  reviewEndDate
                    ? new Date(reviewEndDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setReviewEndDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Review Duration (days):
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="not-allowed"
                data-testid="reviewDuration"
                id="reviewDuration"
                size="sm"
                name="reviewDuration"
                placeholder="Duration"
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Level:
              <span className={level ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="level"
                id="level"
                size="sm"
                name="level"
                placeholder="level"
                type="text"
                autoComplete="off"
                max={9}
                value={level}
                onChange={HandleInputChange}
                maxLength={1}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Minimum Service Period (days):
              <span className={servicePeriod ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                data-testid="minimumServicePeriod"
                id="minimumServicePeriod"
                size="sm"
                name="minimumServicePeriod"
                placeholder="Minimum Service Period"
                autoComplete="off"
                max={999}
                value={servicePeriod}
                onChange={HandleInputChange}
                maxLength={3}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Active:
            </CFormLabel>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="activeStatus"
            >
              <CFormCheck
                data-testid="active"
                className="mt-1"
                type="radio"
                name="active"
                id="active"
                label="Yes"
                value="false"
                inline
              />
            </CCol>
            <CCol
              className="mt-1"
              sm={2}
              md={1}
              lg={1}
              data-testid="activeStatus"
            >
              <CFormCheck
                className="mt-1"
                type="radio"
                name="active"
                id="active"
                label="No"
                value="false"
                inline
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>Description: </CFormLabel>
            {isShowDescription ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addingDescription}
                  data-testid="addingDescription"
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

export default AddConfiguration
