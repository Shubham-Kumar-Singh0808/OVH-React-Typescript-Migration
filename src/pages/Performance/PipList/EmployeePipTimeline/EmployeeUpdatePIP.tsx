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
import { GetPipList } from '../../../../types/Performance/PipList/pipListTypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'

const EmployeeUpdatePIP = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const viewEmployeePipData = useTypedSelector(
    reduxServices.pipList.selectors.viewEmployeePipDetails,
  )
  const { id } = useParams<{ id: string }>()
  const initialPIPDetails = {} as GetPipList
  const [updatePIP, setUpdatePIP] = useState(initialPIPDetails)

  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  const [updateDateErrorMsg, setUpdateDateErrorMsg] = useState<boolean>(false)

  const [selectRatingNo, setSelectRatingNo] = useState<string>(
    viewEmployeePipData?.rating,
  )
  const [reasonForPIPText, setReasonForPIPText] = useState<string>(
    viewEmployeePipData?.remarks,
  )
  const [improvementPlanText, setImprovementPlanText] = useState<string>(
    viewEmployeePipData?.improvement,
  )
  const [isUpdateBtnEnabled, setIsUpdateBtnEnabled] = useState(false)

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(startDate, dateFormat).format(newDateFormatForIsBefore)
    const end = moment(endDate, dateFormat).format(newDateFormatForIsBefore)

    setUpdateDateErrorMsg(moment(end).isBefore(start))
  }, [startDate, endDate])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const handleReasonForPIP = (reason: string) => {
    setReasonForPIPText(reason)
  }

  const handleImprovementPlan = (improvement: string) => {
    setImprovementPlanText(improvement)
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (viewEmployeePipData != null) {
      setUpdatePIP(viewEmployeePipData)
    }
  }, [viewEmployeePipData])

  useEffect(() => {
    if (viewEmployeePipData != null) {
      setUpdatePIP(viewEmployeePipData)
      setStartDate(viewEmployeePipData.startDate)
      setEndDate(viewEmployeePipData.endDate)
      setSelectRatingNo(viewEmployeePipData.rating)
      setReasonForPIPText(viewEmployeePipData.remarks)
      setImprovementPlanText(viewEmployeePipData.improvement)
    }
  }, [viewEmployeePipData])

  useEffect(() => {
    if (
      startDate &&
      selectRatingNo &&
      reasonForPIPText &&
      improvementPlanText
    ) {
      setIsUpdateBtnEnabled(true)
    } else {
      setIsUpdateBtnEnabled(false)
    }
  }, [startDate, selectRatingNo, reasonForPIPText, improvementPlanText])

  const successToast = (
    <OToast toastMessage="PIP Updated successfully" toastColor="success" />
  )

  const updateBtnHandler = async () => {
    await dispatch(
      reduxServices.pipList.updatePipDetails({
        createdBy: viewEmployeePipData.createdBy,
        createdDate: viewEmployeePipData.createdDate,
        empId: viewEmployeePipData.empId,
        employeeName: viewEmployeePipData.employeeName,
        endDate,
        extendDate: viewEmployeePipData.extendDate,
        id: viewEmployeePipData.id,
        improvement: improvementPlanText,
        pipflag: viewEmployeePipData.pipflag,
        rating: selectRatingNo,
        remarks: reasonForPIPText,
        startDate,
        updatedBy: viewEmployeePipData.updatedBy,
        updatedDate: viewEmployeePipData.updatedDate,
      }),
    )
    dispatch(
      reduxServices.pipList.getPIPHistory({
        filterName: 'PIP',
        pipId: viewEmployeePipData.id as number,
      }),
    )
    dispatch(reduxServices.pipList.viewPipDetails(id))
    dispatch(reduxServices.app.actions.addToast(successToast))
    dispatch(reduxServices.app.actions.addToast(undefined))
    setToggle('')
  }
  const onHandleUpdateEndDatePicker = (value: Date) => {
    setEndDate(moment(value).format(dateFormat))
  }
  const onHandleUpdateStartDatePicker = (value: Date) => {
    setStartDate(moment(value).format(dateFormat))
  }
  const disableDate = new Date()
  disableDate.setFullYear(disableDate.getFullYear() + 1)
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Update PIP'}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="updateBack-button"
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
                data-testid="UpdateEmployeeName"
                type="text"
                id="employeeName"
                size="sm"
                name="employeeName"
                value={updatePIP?.employeeName}
                disabled={true}
              />
            </CCol>
          </CRow>

          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Start Date:
                <span className={startDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                value={startDate}
                minDate={new Date()}
                maxDate={disableDate}
                onChange={(date: Date) => onHandleUpdateStartDatePicker(date)}
                dateFormat="dd/mm/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="cycleStartDate"
                data-testid="cycleFromDate-input"
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                End Date:
                <span className={endDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <ReactDatePicker
                autoComplete="off"
                className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                value={endDate}
                minDate={new Date()}
                maxDate={disableDate}
                onChange={(date: Date) => onHandleUpdateEndDatePicker(date)}
                dateFormat="dd/mm/yyyy"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                name="cycleToDate"
                data-testid="cycleToDate-input"
              />
              {updateDateErrorMsg && (
                <span className="text-danger" data-testid="errorMessage">
                  <b>End date should be greater than Start date</b>
                </span>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Rating:
                <span className={selectRatingNo ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
            </CCol>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="selectRating"
                data-testid="form-select1"
                name="selectRating"
                value={selectRatingNo}
                onChange={(e) => {
                  setSelectRatingNo(e.target.value)
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
                  reasonForPIPText?.replace(/^\s*/, '') ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={reasonForPIPText}
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
                  improvementPlanText?.replace(/^\s*/, '')
                    ? TextWhite
                    : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={9}>
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={improvementPlanText}
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
              data-testid="save-btn"
              color="success"
              className="btn-ovh me-1 text-white"
              disabled={!isUpdateBtnEnabled || updateDateErrorMsg}
              onClick={updateBtnHandler}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EmployeeUpdatePIP
