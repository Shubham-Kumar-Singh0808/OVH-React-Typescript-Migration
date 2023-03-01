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
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import AddConfigurationOptions from './AddConfigurationOptions'
import {
  TextDanger,
  TextLabelProps,
  TextWhite,
} from '../../../../constant/ClassName'
import { deviceLocale } from '../../../../utils/helper'
import OCard from '../../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { AddCycle } from '../../../../types/Settings/Configurations/AddConfiguration/addConfigurationTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { dateFormat } from '../../../../constant/DateFormat'
import { usePagination } from '../../../../middleware/hooks/usePagination'

const AddConfiguration = ({
  setToggle,
}: {
  setToggle: () => void
}): JSX.Element => {
  const [selectReviewTitle, setSelectReviewTitle] = useState('')
  const [selectReviewType, setSelectReviewType] = useState('')
  const [reviewPeriodFromDate, setReviewPeriodFromDate] = useState<string>()
  const [reviewPeriodToDate, setReviewPeriodToDate] = useState<string>()
  const [isShowDescription, setIsShowDescription] = useState<boolean>(true)
  const [addingDescription, setAddingDescription] = useState<string>('')
  const [servicePeriod, setServicePeriod] = useState<number | string>()
  const [level, setLevel] = useState<number | string>(1)
  const [reviewStartDate, setReviewStartDate] = useState<string>()
  const [reviewEndDate, setReviewEndDate] = useState<string>()
  const [isDateValidation, setIsDateValidation] = useState<boolean>(false)
  const [isDateErrorValidation, setIsDateErrorValidation] =
    useState<boolean>(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [selectActiveStatus, setSelectActiveStatus] = useState<string>('')
  const [reviewDuration, setReviewDuration] = useState<string>('')

  const dispatch = useAppDispatch()

  const commonFormatDate = 'L'

  const errorMsgs = useTypedSelector(
    reduxServices.addConfigurations.selectors.selectError,
  )

  const remainingDays = moment(reviewEndDate).diff(
    moment(reviewStartDate),
    'days',
  )

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(reviewStartDate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(reviewEndDate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsDateValidation(moment(end).isBefore(start))
  }, [reviewStartDate, reviewEndDate])

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(reviewPeriodFromDate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(reviewPeriodToDate, dateFormat).format(
      newDateFormatForIsBefore,
    )

    setIsDateErrorValidation(moment(end).isBefore(start))
  }, [reviewPeriodFromDate, reviewPeriodToDate])

  useEffect(() => {
    if (
      selectReviewTitle?.length > 0 &&
      selectReviewType &&
      reviewPeriodToDate &&
      reviewPeriodFromDate &&
      servicePeriod &&
      reviewStartDate &&
      reviewEndDate &&
      level
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [
    selectReviewTitle,
    selectReviewType,
    reviewPeriodToDate,
    reviewPeriodFromDate,
    reviewStartDate,
    reviewEndDate,
    servicePeriod,
    level,
  ])

  useEffect(() => {
    if (remainingDays > 0) {
      setReviewDuration(String(remainingDays))
    } else {
      setReviewDuration(String(''))
    }
  }, [remainingDays])

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
    setReviewPeriodToDate('')
    setReviewPeriodFromDate('')
    setServicePeriod('')
    setAddingDescription('')
    setIsShowDescription(false)
    setReviewStartDate('')
    setReviewEndDate('')
    setSelectActiveStatus('')
    setLevel('')
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
  const appraisalCycleListSize = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.listSize,
  )
  const { currentPage, pageSize } = usePagination(appraisalCycleListSize, 20)

  const handleAddNewCycle = async () => {
    const prepareObject = {
      active: selectActiveStatus,
      appraisalDuration: Number(reviewDuration),
      appraisalEndDate: reviewPeriodToDate
        ? new Date(reviewPeriodToDate).toLocaleDateString(deviceLocale, {
            year: 'numeric',
            month: '2-digit',
          })
        : '',
      appraisalStartDate: reviewPeriodFromDate
        ? new Date(reviewPeriodFromDate).toLocaleDateString(deviceLocale, {
            year: 'numeric',
            month: '2-digit',
          })
        : '',
      appraisalType: selectReviewType,
      description: addingDescription,
      fromDate: reviewStartDate
        ? new Date(reviewStartDate).toLocaleDateString(deviceLocale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : '',
      level,
      name: selectReviewTitle,
      servicePeriod,
      toDate: reviewEndDate
        ? new Date(reviewEndDate).toLocaleDateString(deviceLocale, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
        : '',
    } as AddCycle

    const addCycleResultAction = await dispatch(
      reduxServices.addConfigurations.addNewCycle(prepareObject),
    )
    if (
      reduxServices.addConfigurations.addNewCycle.fulfilled.match(
        addCycleResultAction,
      )
    ) {
      dispatch(
        reduxServices.appraisalConfigurations.getAppraisalCycle({
          startIndex: pageSize * (currentPage - 1),
          endIndex: pageSize * currentPage,
        }),
      )
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

  const onHandleStartDate = (value: Date) => {
    setReviewStartDate(moment(value).format(dateFormat))
  }

  const onHandleEndDate = (value: Date) => {
    setReviewEndDate(moment(value).format(dateFormat))
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
                <span className={reviewPeriodFromDate ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                autoComplete="off"
                id="employeeRealBirthday"
                data-testid="sh-date-picker"
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                showMonthYearPicker
                placeholderText="mm/yyyy"
                dateFormat="MM/yyyy"
                name="selectMonth"
                value={
                  reviewPeriodFromDate
                    ? new Date(reviewPeriodFromDate).toLocaleDateString(
                        deviceLocale,
                        {
                          year: 'numeric',
                          month: '2-digit',
                        },
                      )
                    : ''
                }
                onChange={(date: Date) => {
                  setReviewPeriodFromDate(moment(date).format(commonFormatDate))
                }}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Period To:
                <span className={reviewPeriodToDate ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                autoComplete="off"
                id="employeeRealBirthday"
                data-testid="sh-date-picker"
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                showMonthYearPicker
                placeholderText="mm/yyyy"
                dateFormat="MM/yyyy"
                name="selectMonth"
                value={
                  reviewPeriodToDate
                    ? new Date(reviewPeriodToDate).toLocaleDateString(
                        deviceLocale,
                        {
                          year: 'numeric',
                          month: '2-digit',
                        },
                      )
                    : ''
                }
                onChange={(date: Date) => {
                  setReviewPeriodToDate(moment(date).format(commonFormatDate))
                }}
              />
            </CCol>
            {isDateErrorValidation && (
              <CCol sm={6}>
                <span className="text-danger">
                  <b>
                    Review Period From should be greater than Review Period To
                  </b>
                </span>
              </CCol>
            )}
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
                value={reviewStartDate}
                onChange={(date: Date) => onHandleStartDate(date)}
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
                value={reviewEndDate}
                onChange={(date: Date) => onHandleEndDate(date)}
              />
            </CCol>
            {isDateValidation && (
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
                disabled={
                  !isButtonEnabled ||
                  isDateErrorValidation ||
                  isDateErrorValidation
                }
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
