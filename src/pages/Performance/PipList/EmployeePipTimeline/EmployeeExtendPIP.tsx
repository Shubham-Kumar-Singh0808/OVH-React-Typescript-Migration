/* eslint-disable import/named */
import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import { useParams } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import {
  TextWhite,
  TextDanger,
  TextLabelProps,
} from '../../../../constant/ClassName'
import { dateFormat } from '../../../../constant/DateFormat'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'

const EmployeeExtendPIP = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [extendDate, setExtendDate] = useState<string>('')
  const [selectRating, setSelectRating] = useState<string>('')
  const [reasonForPIP, setReasonForPIP] = useState<string>('')
  const [improvementPlan, setImprovementPlan] = useState<string>('')
  const [isExtendBtnEnabled, setIsExtendBtnEnabled] = useState(false)
  const [isExtendDateError, setIsExtendDateError] = useState<boolean>(false)
  const { id } = useParams<{ id: string }>()
  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const viewEmployeePipDetails = useTypedSelector(
    reduxServices.pipList.selectors.viewEmployeePipDetails,
  )
  const [disabledExtendedDate, setDisabledExtendedDate] = useState<string>('')

  const handleReasonForPIP = (reason: string) => {
    setReasonForPIP(reason)
  }

  const dispatch = useAppDispatch()

  const handleImprovementPlan = (improvement: string) => {
    setImprovementPlan(improvement)
  }

  useEffect(() => {
    setDisabledExtendedDate(viewEmployeePipDetails?.extendDate as string)
  }, [viewEmployeePipDetails])

  useEffect(() => {
    if (selectRating && reasonForPIP && improvementPlan) {
      setIsExtendBtnEnabled(true)
    } else {
      setIsExtendBtnEnabled(false)
    }
  }, [selectRating, reasonForPIP, improvementPlan])

  const successToast = (
    <OToast toastMessage="PIP extend successfully" toastColor="success" />
  )

  const extendBtnHandler = async () => {
    await dispatch(
      reduxServices.pipList.extendPip({
        createdBy: viewEmployeePipDetails?.createdBy,
        createdDate: viewEmployeePipDetails?.createdDate,
        empId: viewEmployeePipDetails?.empId,
        employeeName: viewEmployeePipDetails?.employeeName,
        endDate: viewEmployeePipDetails?.endDate,
        extendDate:
          viewEmployeePipDetails?.extendDate === null
            ? extendDate
            : disabledExtendedDate,
        id: viewEmployeePipDetails.id,
        improvement: improvementPlan,
        pipflag: viewEmployeePipDetails.pipflag,
        rating: selectRating,
        remarks: reasonForPIP,
        startDate: viewEmployeePipDetails.startDate,
        updatedBy: viewEmployeePipDetails.updatedBy,
        updatedDate: viewEmployeePipDetails.updatedDate,
      }),
    )
    dispatch(reduxServices.pipList.viewPipDetails(id))
    dispatch(
      reduxServices.pipList.getPIPHistory({
        filterName: 'PIP',
        pipId: viewEmployeePipDetails.id as number,
      }),
    )
    dispatch(reduxServices.app.actions.addToast(successToast))
    dispatch(reduxServices.app.actions.addToast(undefined))
    setToggle('')
  }

  const onHandleExtendDatePicker = (value: Date) => {
    setExtendDate(moment(value).format(dateFormat))
  }

  const onHandleDisableExtendDatePicker = (value: Date) => {
    setDisabledExtendedDate(moment(value).format(dateFormat))
  }

  const disableExtendDate = new Date()
  disableExtendDate.setFullYear(disableExtendDate.getFullYear() + 1)

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(extendDate, dateFormat).format(
      newDateFormatForIsBefore,
    )
    const end = moment(
      viewEmployeePipDetails?.startDate && viewEmployeePipDetails?.endDate,
      dateFormat,
    ).format(newDateFormatForIsBefore)

    setIsExtendDateError(moment(start).isBefore(end))
  }, [
    extendDate,
    viewEmployeePipDetails?.startDate,
    viewEmployeePipDetails?.endDate,
  ])

  const extendDateMandatory = (
    <span className={extendDate ? TextWhite : TextDanger}>*</span>
  )

  const disableExtendDateMandatory = (
    <span className={disabledExtendedDate ? TextWhite : TextDanger}>*</span>
  )
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Extend PIP'}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="ExtendBack-button"
              onClick={() => setToggle('')}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end pe-3"
            >
              Employee Name:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="ExtendEmployeeName"
                type="text"
                id="employeeName"
                size="sm"
                name="employeeName"
                value={viewEmployeePipDetails?.employeeName}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end pe-3"
            >
              Start Date:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="startDate"
                type="text"
                id="startDate"
                size="sm"
                name="startDate"
                value={viewEmployeePipDetails?.startDate}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end pe-3"
            >
              End Date:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="endDate"
                type="text"
                id="endDate"
                size="sm"
                name="endDate"
                value={viewEmployeePipDetails?.endDate}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            {viewEmployeePipDetails?.extendDate === null ? (
              <>
                <CCol sm={3} md={3} className="text-end">
                  <CFormLabel className="mt-1">
                    Extend Date:
                    {extendDateMandatory}
                  </CFormLabel>
                </CCol>
                <CCol sm={3}>
                  <ReactDatePicker
                    id="extend-date"
                    data-testid="extendDate"
                    className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Extend Date"
                    name="extendDate"
                    minDate={new Date()}
                    maxDate={disableExtendDate}
                    value={extendDate}
                    onChange={(date: Date) => onHandleExtendDatePicker(date)}
                  />
                  {isExtendDateError && (
                    <span className="text-danger">
                      <b>
                        Extend date should be greater than Start date and should
                        not be in between Start date and End date.
                      </b>
                    </span>
                  )}
                </CCol>
              </>
            ) : (
              <>
                <CCol sm={3} md={3} className="text-end">
                  <CFormLabel className="mt-1">
                    Extend Date:
                    {disableExtendDateMandatory}
                  </CFormLabel>
                </CCol>
                <CCol sm={3}>
                  <ReactDatePicker
                    id="extend-date"
                    data-testid="extendDate"
                    className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                    autoComplete="off"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="Extend Date"
                    name="extendDate"
                    minDate={new Date()}
                    maxDate={disableExtendDate}
                    value={disabledExtendedDate}
                    onChange={(date: Date) =>
                      onHandleDisableExtendDatePicker(date)
                    }
                  />
                </CCol>
              </>
            )}
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Rating:
                <span className={selectRating ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="selectRating"
                data-testid="form-select1"
                name="selectRating"
                value={selectRating}
                onChange={(e) => {
                  setSelectRating(e.target.value)
                }}
              >
                <option value={''}>Select Rating</option>
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
              <span
                className={
                  reasonForPIP?.replace(/^\s*/, '') ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={reasonForPIP}
                data-testid="reasonForPIP"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleReasonForPIP(editor.getData().trim())
                }}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>
              Improvement Plan:
              <span
                className={
                  improvementPlan?.replace(/^\s*/, '') ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={improvementPlan}
                data-testid="improvementPlan"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleImprovementPlan(editor.getData().trim())
                }}
              />
            </CCol>
          </CRow>
        </CForm>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <CButton
              data-testid="clear-btn"
              color="warning"
              className="btn-ovh text-white"
              disabled={
                !isExtendBtnEnabled ||
                isExtendDateError ||
                (viewEmployeePipDetails?.extendDate === null && !extendDate)
              }
              onClick={extendBtnHandler}
            >
              Extend
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EmployeeExtendPIP
