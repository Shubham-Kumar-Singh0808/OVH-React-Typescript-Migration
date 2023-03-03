import React, { useEffect, useState } from 'react'
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
import { Link, useHistory, useParams } from 'react-router-dom'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { GetAppraisalCycle } from '../../../../types/Settings/Configurations/appraisalConfigurationsTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import OToast from '../../../../components/ReusableComponent/OToast'
import { showIsRequired } from '../../../../utils/helper'
import OCard from '../../../../components/ReusableComponent/OCard'
import { dateFormat } from '../../../../constant/DateFormat'

const EditConfiguration = (): JSX.Element => {
  const { cycleId } = useParams<{ cycleId: string }>()

  const initialCycle = {} as GetAppraisalCycle
  const [cycle, setCycle] = useState(initialCycle)
  const [textEditor, setTextEditor] = useState<boolean>(true)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] =
    useState<boolean>(false)
  const [isActive, setIsActive] = useState(false)

  const [editStartDate, setEditStartDate] = useState<string>(cycle.fromDate)
  const [editEndDate, setEditEndDate] = useState<string>(cycle.toDate)
  const [editFromDate, setEditFromDate] = useState<string>(
    cycle.appraisalStartDate,
  )
  const [editToDate, setEditToDate] = useState<string>(cycle.appraisalEndDate)

  const [editDateErrorMsg, setEditDateErrorMsg] = useState<boolean>(false)
  const [isDateErrorValidation, setIsDateErrorValidation] =
    useState<boolean>(false)

  const [editReviewDuration, setEditReviewDuration] = useState<string>(
    cycle.appraisalDuration,
  )

  const dispatch = useAppDispatch()

  const getEditAppraisal = useTypedSelector(
    reduxServices.appraisalConfigurations.selectors.getEditAppraisal,
  )

  useEffect(() => {
    dispatch(
      reduxServices.appraisalConfigurations.getCycleToEdit(Number(cycleId)),
    )
  }, [dispatch])

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

  const onChangeHandler = (description: string) => {
    setCycle((prevState) => {
      return { ...prevState, ...{ description } }
    })
  }

  const levelValueRegExpression = /\D/g
  const onChangeInputHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'activeState') {
      setIsActive(value === 'true')
      const activeStatus = value === 'true'
      setCycle((values) => {
        return { ...values, ...{ [name]: activeStatus } }
      })
    } else if (name === 'name') {
      const reviewTitle = value
        .replace(/-_[^a-z0-9\s]/gi, '')
        .replace(/^\s*/, '')
      setCycle((values) => {
        return { ...values, ...{ [name]: reviewTitle } }
      })
    } else if (name === 'level') {
      const levelValue = value.replace(levelValueRegExpression, '')
      setCycle((values) => {
        return { ...values, ...{ [name]: Number(levelValue) } }
      })
    } else if (name === 'servicePeriod') {
      const servicePeriodDays = value.replace(levelValueRegExpression, '')
      setCycle((values) => {
        return { ...values, ...{ [name]: Number(servicePeriodDays) } }
      })
    } else {
      setCycle((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  const formLabel = 'col-sm-3 col-form-label text-end'

  useEffect(() => {
    if (getEditAppraisal != null) {
      setCycle({
        id: getEditAppraisal.id,
        name: getEditAppraisal.name,
        description: getEditAppraisal.description,
        toDate: getEditAppraisal.toDate,
        fromDate: getEditAppraisal.fromDate,
        active: getEditAppraisal.active,
        appraisalType: getEditAppraisal.appraisalType,
        appraisalDuration: getEditAppraisal.appraisalDuration,
        level: getEditAppraisal.level,
        cycleStartedFlag: getEditAppraisal.cycleStartedFlag,
        appraisalStartDate: getEditAppraisal.appraisalStartDate,
        appraisalEndDate: getEditAppraisal.appraisalEndDate,
        servicePeriod: getEditAppraisal.servicePeriod,
      })
    }
    setEditStartDate(getEditAppraisal.fromDate)
    setEditEndDate(getEditAppraisal.toDate)
    setTextEditor(false)
    setIsActive(getEditAppraisal.active)
    setEditFromDate(getEditAppraisal.appraisalStartDate)
    setEditToDate(getEditAppraisal.appraisalEndDate)
    setEditReviewDuration(getEditAppraisal.appraisalDuration)
    setTimeout(() => {
      setTextEditor(true)
    }, 100)
  }, [getEditAppraisal])

  useEffect(() => {
    if (cycle.name && cycle.level && cycle.servicePeriod) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [cycle])
  const history = useHistory()

  const updateSuccessToastMessage = (
    <OToast
      toastMessage="Configuration has been updated"
      toastColor="success"
    />
  )

  const updateFailedToastMessage = (
    <OToast toastMessage="Cycle name should be unique." toastColor="danger" />
  )
  const failedToast = (
    <OToast
      toastMessage="Only one cycle activated at a time."
      toastColor="danger"
    />
  )

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(editStartDate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(editEndDate, dateFormat).format(newDateFormatForIsBefore)

    setEditDateErrorMsg(moment(end).isBefore(start))
  }, [editStartDate, editEndDate])

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM'
    const start = moment(editFromDate, 'MM-YYYY').format(
      newDateFormatForIsBefore,
    )
    const end = moment(editToDate, 'MM-YYYY').format(newDateFormatForIsBefore)
    setIsDateErrorValidation(moment(end).isBefore(start))
  }, [editFromDate, editToDate])

  const updateAppraisalCycleAction = async () => {
    const prepareObject = {
      active: isActive,
      appraisalDuration: editReviewDuration,
      appraisalEndDate: editToDate,
      appraisalStartDate: editFromDate,
      appraisalType: cycle.appraisalType,
      cycleStartedFlag: cycle.cycleStartedFlag,
      description: cycle.description,
      fromDate: editStartDate,
      id: cycle.id,
      level: cycle.level,
      name: cycle.name,
      servicePeriod: cycle.servicePeriod,
      toDate: editEndDate,
    }
    const updateAppraisalCycleResultAction = await dispatch(
      reduxServices.appraisalConfigurations.updateAppraisalCycle(prepareObject),
    )
    if (
      reduxServices.appraisalConfigurations.updateAppraisalCycle.fulfilled.match(
        updateAppraisalCycleResultAction,
      )
    ) {
      history.push('/appraisalCycle')
      dispatch(reduxServices.app.actions.addToast(updateSuccessToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.appraisalConfigurations.updateAppraisalCycle.rejected.match(
        updateAppraisalCycleResultAction,
      ) &&
      updateAppraisalCycleResultAction.payload === 500
    ) {
      dispatch(reduxServices.app.actions.addToast(updateFailedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.appraisalConfigurations.updateAppraisalCycle.rejected.match(
        updateAppraisalCycleResultAction,
      ) &&
      updateAppraisalCycleResultAction.payload === 412
    ) {
      dispatch(reduxServices.app.actions.addToast(failedToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const onChangeDurationHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEditReviewDuration(e.target.value)
  }

  const onChangeFromMonthHandler = (date: Date) => {
    setEditFromDate(moment(date).format('MM/YYYY'))
  }
  const onChangeToMonthHandler = (date: Date) => {
    setEditToDate(moment(date).format('MM/YYYY'))
  }

  const onHandleStartDatePicker = (value: Date) => {
    setEditStartDate(moment(value).format(dateFormat))
  }
  const onHandleEndDatePicker = (value: Date) => {
    setEditEndDate(moment(value).format(dateFormat))
  }

  const admission = moment(editStartDate, 'DD-MM-YYYY')
  const discharge = moment(editEndDate, 'DD-MM-YYYY')
  const totalDays = discharge.diff(admission, 'days')

  useEffect(() => {
    if (totalDays >= 0) {
      setEditReviewDuration(String(totalDays))
    } else {
      setEditReviewDuration(String(''))
    }
  }, [totalDays])

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Configuration"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/appraisalCycle`}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
              >
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Review Title:
              <span className={showIsRequired(cycle.name)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                data-testid="editReviewTitle"
                type="text"
                id="editReviewTitle"
                autoComplete="off"
                size="sm"
                name="name"
                placeholder="Name"
                value={cycle.name}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3 ">
            <CFormLabel {...dynamicFormLabelProps('appraisalType', formLabel)}>
              Review Type:
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                id="appraisalType"
                data-testid="form-select1"
                size="sm"
                aria-label="editReviewType"
                name="appraisalType"
                value={cycle.appraisalType}
                onChange={onChangeInputHandler}
              >
                <option>Monthly</option>
                <option>Annual</option>
                <option>Probation</option>
                <option>Quarterly</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Period From:
              </CFormLabel>
            </CCol>
            {cycle.cycleStartedFlag === true ? (
              <CCol sm={3}>
                <CFormInput
                  className="form-control form-control-not-allowed"
                  data-testid="appraisalStartDate"
                  id="appraisalStartDate"
                  size="sm"
                  placeholder="mm/yyyy"
                  name="appraisalStartDate"
                  value={editFromDate}
                  disabled={true}
                />
              </CCol>
            ) : (
              <CCol sm={3}>
                <ReactDatePicker
                  autoComplete="off"
                  id="appraisalStartDate"
                  data-testid="sh-date-picker"
                  className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                  showMonthYearPicker
                  placeholderText="mm/yyyy"
                  dateFormat="MM/yyyy"
                  name="appraisalStartDate"
                  value={editFromDate}
                  onChange={(date: Date) => onChangeFromMonthHandler(date)}
                />
              </CCol>
            )}
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Period To:
              </CFormLabel>
            </CCol>
            {cycle.cycleStartedFlag === true ? (
              <CCol sm={3}>
                <CFormInput
                  className="form-control form-control-not-allowed"
                  data-testid="appraisalEndDate"
                  id="appraisalEndDate"
                  size="sm"
                  name="appraisalEndDate"
                  placeholder="mm/yyyy"
                  value={editToDate}
                  disabled={true}
                />
              </CCol>
            ) : (
              <CCol sm={3}>
                <ReactDatePicker
                  autoComplete="off"
                  id="appraisalEndDate"
                  data-testid="sh-date-picker"
                  className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                  showMonthYearPicker
                  placeholderText="mm/yyyy"
                  dateFormat="MM/yyyy"
                  name="appraisalEndDate"
                  value={editToDate}
                  onChange={(date: Date) => onChangeToMonthHandler(date)}
                />
                {isDateErrorValidation && (
                  <span className="text-danger">
                    <b>
                      Review Period From should be greater than Review Period To
                    </b>
                  </span>
                )}
              </CCol>
            )}
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review Start Date:
              </CFormLabel>
            </CCol>
            {cycle.cycleStartedFlag === true ? (
              <CCol sm={3}>
                <CFormInput
                  className="form-control form-control-not-allowed"
                  data-testid="fromDate"
                  id="fromDate"
                  size="sm"
                  placeholder="dd/mm/yyyy"
                  name="fromDate"
                  value={editStartDate}
                  disabled={true}
                />
              </CCol>
            ) : (
              <CCol sm={3}>
                <ReactDatePicker
                  id="fromDate"
                  className="form-control form-control-sm sh-date-picker"
                  showMonthDropdown
                  showYearDropdown
                  autoComplete="off"
                  dropdownMode="select"
                  dateFormat="dd/mm/yy"
                  placeholderText="dd/mm/yyyy"
                  name="fromDate"
                  value={editStartDate}
                  onChange={(date: Date) => onHandleStartDatePicker(date)}
                />
              </CCol>
            )}
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-2 text-decoration-none">
                Review End Date:
              </CFormLabel>
            </CCol>
            {cycle.cycleStartedFlag === true ? (
              <CCol sm={3}>
                <CFormInput
                  className="form-control form-control-not-allowed"
                  data-testid="toDate"
                  id="toDate"
                  size="sm"
                  name="toDate"
                  placeholder="dd/mm/yyyy"
                  value={editEndDate}
                  disabled={true}
                />
              </CCol>
            ) : (
              <CCol sm={3}>
                <ReactDatePicker
                  id="toDate"
                  className="form-control form-control-sm sh-date-picker"
                  showMonthDropdown
                  showYearDropdown
                  autoComplete="off"
                  dropdownMode="select"
                  dateFormat="dd/mm/yy"
                  placeholderText="dd/mm/yyyy"
                  name="toDate"
                  value={editEndDate}
                  onChange={(date: Date) => onHandleEndDatePicker(date)}
                />
                {editDateErrorMsg && (
                  <span className="text-danger" data-testid="errorMessage">
                    <b>
                      Review End Date should be greater than Review Start Date
                    </b>
                  </span>
                )}
              </CCol>
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Review Duration (days):
            </CFormLabel>
            {cycle.cycleStartedFlag === true ? (
              <CCol sm={3}>
                <CFormInput
                  className="form-control form-control-not-allowed"
                  data-testid="reviewDuration"
                  id="reviewDuration"
                  size="sm"
                  name="appraisalDuration"
                  disabled={true}
                  value={cycle.appraisalDuration}
                />
              </CCol>
            ) : (
              <CCol sm={3}>
                <CFormInput
                  className="form-control form-control-not-allowed"
                  data-testid="reviewDuration"
                  id="reviewDuration"
                  size="sm"
                  name="appraisalDuration"
                  disabled={true}
                  onChange={onChangeDurationHandler}
                  value={editReviewDuration}
                />
              </CCol>
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Level:
              <span className={cycle.level ? TextWhite : TextDanger}>*</span>
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
                maxLength={1}
                value={cycle.level || ''}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Minimum Service Period (days):
              <span className={cycle.servicePeriod ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                data-testid="minimumServicePeriod"
                id="minimumServicePeriod"
                size="sm"
                name="servicePeriod"
                placeholder="Minimum Service Period"
                autoComplete="off"
                maxLength={3}
                value={cycle.servicePeriod || ''}
                onChange={onChangeInputHandler}
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
            <CCol sm={3}>
              <CFormCheck
                data-testid="active"
                className="mt-2 sh-hover-handSymbol"
                type="radio"
                name="activeState"
                id="yes"
                value="true"
                label="Yes"
                inline
                checked={isActive}
                onChange={onChangeInputHandler}
              />
              <CFormCheck
                className="mt-2 sh-hover-handSymbol"
                type="radio"
                name="activeState"
                id="no"
                label="No"
                value="false"
                inline
                checked={!isActive}
                onChange={onChangeInputHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              Description:
            </CFormLabel>
            <CCol sm={8}>
              {textEditor && (
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={cycle?.description}
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    onChangeHandler(editor.getData().trim())
                  }}
                />
              )}
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="updateBtn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={
                  !isUpdateButtonEnabled ||
                  editDateErrorMsg ||
                  isDateErrorValidation
                }
                onClick={updateAppraisalCycleAction}
              >
                Update
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </OCard>
    </>
  )
}

export default EditConfiguration
