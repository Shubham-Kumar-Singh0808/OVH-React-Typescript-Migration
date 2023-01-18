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
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import {
  TextWhite,
  TextDanger,
  TextLabelProps,
} from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { deviceLocale } from '../../../../utils/dateFormatUtils'

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

  const commonFormatDate = 'L'

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const viewEmployeePipDetails = useTypedSelector(
    reduxServices.pipList.selectors.viewEmployeePipDetails,
  )

  const handleReasonForPIP = (reason: string) => {
    setReasonForPIP(reason)
  }

  const dispatch = useAppDispatch()

  const handleImprovementPlan = (improvement: string) => {
    setImprovementPlan(improvement)
  }

  useEffect(() => {
    if (extendDate && selectRating && reasonForPIP && improvementPlan) {
      setIsExtendBtnEnabled(true)
    } else {
      setIsExtendBtnEnabled(false)
    }
  }, [extendDate, selectRating, reasonForPIP, improvementPlan])

  const successToast = (
    <OToast toastMessage="PIP extend successfully" toastColor="success" />
  )

  const extendBtnHandler = async () => {
    await dispatch(reduxServices.pipList.extendPip(viewEmployeePipDetails))
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
              className="col-sm-3 col-form-label text-end"
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
                value={viewEmployeePipDetails.employeeName}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
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
                value={viewEmployeePipDetails.startDate}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
              End Date :
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="endDate"
                type="text"
                id="endDate"
                size="sm"
                name="endDate"
                value={viewEmployeePipDetails.endDate}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Extend Date :
                <span className={extendDate ? TextWhite : TextDanger}>*</span>
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
                value={
                  extendDate
                    ? new Date(extendDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setExtendDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
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
              <span className={reasonForPIP ? TextWhite : TextDanger}>*</span>
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
              <span className={improvementPlan ? TextWhite : TextDanger}>
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
              disabled={!isExtendBtnEnabled}
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
