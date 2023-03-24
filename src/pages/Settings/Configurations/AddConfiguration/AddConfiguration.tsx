import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import moment from 'moment'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import AddConfigurationOptions from './AddConfigurationOptions'
import {
  TextDanger,
  TextLabelProps,
  TextWhite,
} from '../../../../constant/ClassName'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { AddCycle } from '../../../../types/Settings/Configurations/AddConfiguration/addConfigurationTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { dateFormat } from '../../../../constant/DateFormat'

const AddConfiguration = ({
  setToggle,
}: {
  setToggle: () => void
}): JSX.Element => {
  const [selectReviewTitle, setSelectReviewTitle] = useState('')
  const [selectReviewType, setSelectReviewType] = useState('')

  const [isShowDescription, setIsShowDescription] = useState<boolean>(true)
  const [addingDescription, setAddingDescription] = useState<string>('')
  const [servicePeriod, setServicePeriod] = useState<number | string>()
  const [level, setLevel] = useState<number | string>(1)

  const [fromMonth, setFromMonth] = useState<string>()
  const [toMonth, setToMonth] = useState<string>()
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()

  const [isMonthError, setIsMonthError] = useState<boolean>(false)
  const [isDateError, setIsDateError] = useState<boolean>(false)

  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [selectActiveStatus, setSelectActiveStatus] = useState<string>('')
  const [reviewDuration, setReviewDuration] = useState<string>('')

  const dispatch = useAppDispatch()

  const onHandleFromMonth = (value: Date) => {
    setFromMonth(moment(value).format('MM/yyyy'))
  }

  const onHandleToMonth = (value: Date) => {
    setToMonth(moment(value).format('MM/yyyy'))
  }

  const onHandleStartDate = (value: Date) => {
    setStartDate(moment(value).format(dateFormat))
  }

  const onHandleEndDate = (value: Date) => {
    setEndDate(moment(value).format(dateFormat))
  }

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM'
    const fromMonthValidation = moment(fromMonth, 'MM-YYYY').format(
      newDateFormatForIsBefore,
    )
    const toMonthValidation = moment(toMonth, 'MM-YYYY').format(
      newDateFormatForIsBefore,
    )

    setIsMonthError(moment(toMonthValidation).isBefore(fromMonthValidation))
  }, [fromMonth, toMonth])

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const startDateValidation = moment(startDate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const endDateValidation = moment(endDate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsDateError(moment(endDateValidation).isBefore(startDateValidation))
  }, [startDate, endDate])

  const errorMsgs = useTypedSelector(
    reduxServices.addConfigurations.selectors.selectError,
  )

  const admission = moment(startDate, 'DD-MM-YYYY')
  const discharge = moment(endDate, 'DD-MM-YYYY')
  const totalDays = discharge.diff(admission, 'days')

  useEffect(() => {
    if (
      selectReviewTitle?.length > 0 &&
      selectReviewType &&
      servicePeriod &&
      level &&
      toMonth &&
      fromMonth &&
      startDate &&
      endDate
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [
    selectReviewTitle,
    selectReviewType,
    servicePeriod,
    level,
    toMonth,
    fromMonth,
    startDate,
    endDate,
  ])

  useEffect(() => {
    if (totalDays >= 0) {
      setReviewDuration(String(totalDays))
    } else {
      setReviewDuration(String(''))
    }
  }, [totalDays])

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

  const handleText = (description: string) => {
    setAddingDescription(description)
  }

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'reviewTitle') {
      const newValue = value.replace(/-_[^a-z0-9\s]/gi, '').replace(/^\s*/, '')
      setSelectReviewTitle(newValue)
    }
  }

  const clearInputs = () => {
    setSelectReviewTitle('')
    setSelectReviewType('')
    setServicePeriod('')
    setAddingDescription('')
    setIsShowDescription(false)
    setSelectActiveStatus('')
    setLevel('')
    setToMonth('')
    setFromMonth('')
    setStartDate('')
    setEndDate('')
    setReviewDuration('')
    setTimeout(() => {
      setIsShowDescription(true)
    }, 0)
  }
  const successMessage = (
    <OToast
      toastMessage="Configuration Added Successfully."
      toastColor="success"
    />
  )

  const WarningMessage = (
    <OToast
      toastColor="danger"
      toastMessage="Only one cycle activated at a time."
    />
  )

  const dateWarningToastMsg = (
    <OToast toastColor="danger" toastMessage="Duplicate date range." />
  )

  const cycleNameWarningToastMsg = (
    <OToast toastColor="danger" toastMessage="Cycle name sholud be unique." />
  )

  const handleAddNewCycle = async () => {
    const prepareObject = {
      active: selectActiveStatus,
      appraisalDuration: Number(reviewDuration),
      appraisalEndDate: toMonth,
      appraisalStartDate: fromMonth,
      appraisalType: selectReviewType,
      description: addingDescription,
      fromDate: startDate,
      level,
      name: selectReviewTitle,
      servicePeriod,
      toDate: endDate,
    } as AddCycle

    const addCycleResultAction = await dispatch(
      reduxServices.addConfigurations.addNewCycle(prepareObject),
    )
    if (
      reduxServices.addConfigurations.addNewCycle.fulfilled.match(
        addCycleResultAction,
      )
    ) {
      dispatch(reduxServices.appraisalConfigurations.getAppraisalCycle())
      dispatch(reduxServices.app.actions.addToast(successMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
      setToggle()
    } else if (errorMsgs === 412) {
      dispatch(reduxServices.app.actions.addToast(WarningMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (errorMsgs === 409) {
      dispatch(reduxServices.app.actions.addToast(dateWarningToastMsg))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (errorMsgs === 406) {
      dispatch(reduxServices.app.actions.addToast(cycleNameWarningToastMsg))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
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
              onClick={setToggle}
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
              <span className={selectReviewTitle ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="reviewTitle"
                type="text"
                id="reviewTitle"
                autoComplete="off"
                size="sm"
                name="reviewTitle"
                placeholder="Name"
                value={selectReviewTitle}
                onChange={handleInputChange}
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
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Period From:
                <span className={fromMonth ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <DatePicker
                autoComplete="off"
                id="fromMonth"
                data-testid="sh-date-picker"
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                showMonthYearPicker
                placeholderText="mm/yyyy"
                dateFormat="MM/yyyy"
                name="fromMonth"
                value={fromMonth}
                onChange={onHandleFromMonth}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Period To:
                <span className={toMonth ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <DatePicker
                autoComplete="off"
                id="toMonth"
                data-testid="sh-date-picker"
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                showMonthYearPicker
                placeholderText="mm/yyyy"
                dateFormat="MM/yyyy"
                name="toMonth"
                value={toMonth}
                onChange={onHandleToMonth}
              />
            </CCol>
            {isMonthError && (
              <CCol sm={6}>
                <span className="text-danger">
                  <b>
                    Review Period To should be greater than Review Period From
                  </b>
                </span>
              </CCol>
            )}
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Review Start Date:
                <span className={startDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <DatePicker
                id="startDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                data-testid="start-date-picker"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/mm/yy"
                name="startDate"
                value={startDate}
                onChange={(date: Date) => onHandleStartDate(date)}
                autoComplete="off"
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Review End Date:
                <span className={endDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <DatePicker
                id="endDate"
                className="form-control form-control-sm sh-date-picker"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                data-testid="start-date-picker"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/mm/yy"
                name="endDate"
                value={endDate}
                onChange={(date: Date) => onHandleEndDate(date)}
                autoComplete="off"
              />
            </CCol>
            {isDateError && (
              <CCol sm={6}>
                <span className="text-danger">
                  <b>
                    Review End Date should be greater than Review Start Date
                  </b>
                </span>
              </CCol>
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Review Duration (days):
              <span className={reviewDuration ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="reviewDuration"
                id="reviewDuration"
                size="sm"
                autoComplete="off"
                name="reviewDuration"
                placeholder="Duration"
                disabled={true}
                value={reviewDuration}
              />
            </CCol>
          </CRow>
          <AddConfigurationOptions
            selectActiveStatus={selectActiveStatus}
            setSelectActiveStatus={setSelectActiveStatus}
            level={level}
            setLevel={setLevel}
            servicePeriod={servicePeriod}
            setServicePeriod={setServicePeriod}
          />
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>Description:</CFormLabel>
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
                disabled={!isButtonEnabled || isDateError || isMonthError}
                onClick={handleAddNewCycle}
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
