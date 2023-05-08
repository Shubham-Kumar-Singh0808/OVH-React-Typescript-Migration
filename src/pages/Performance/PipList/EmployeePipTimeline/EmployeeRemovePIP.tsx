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
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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

const EmployeeRemovePIP = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [selectRatingValue, setSelectRatingValue] = useState<string>('')
  const [reasonForRemovePIP, setReasonForRemovePIP] = useState<string>('')
  const [isRemoveBtnEnabled, setIsRemoveBtnEnabled] = useState(false)
  const { id } = useParams<{ id: string }>()

  const viewPipDetails = useTypedSelector(
    reduxServices.pipList.selectors.viewEmployeePipDetails,
  )

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const handleReasonForRemovePIP = (reason: string) => {
    setReasonForRemovePIP(reason)
  }

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (selectRatingValue && reasonForRemovePIP) {
      setIsRemoveBtnEnabled(true)
    } else {
      setIsRemoveBtnEnabled(false)
    }
  }, [selectRatingValue, reasonForRemovePIP])

  const successToastMsg = (
    <OToast toastMessage="Removed from PIP successfully" toastColor="success" />
  )

  const extendBtnHandler = async () => {
    await dispatch(
      reduxServices.pipList.removeFromPip({
        createdBy: viewPipDetails.createdBy,
        createdDate: viewPipDetails.createdDate,
        empId: viewPipDetails.empId,
        employeeName: viewPipDetails.employeeName,
        endDate: viewPipDetails.endDate,
        extendDate: viewPipDetails.extendDate,
        id: viewPipDetails.id,
        improvement: viewPipDetails.improvement,
        pipflag: viewPipDetails.pipflag,
        rating: selectRatingValue,
        remarks: reasonForRemovePIP,
        startDate: viewPipDetails.startDate,
        updatedBy: viewPipDetails.updatedBy,
        updatedDate: viewPipDetails.updatedDate,
      }),
    )
    dispatch(
      reduxServices.pipList.getPIPHistory({
        filterName: 'PIP',
        pipId: viewPipDetails.id as number,
      }),
    )
    dispatch(reduxServices.pipList.viewPipDetails(id))
    dispatch(reduxServices.app.actions.addToast(successToastMsg))
    dispatch(reduxServices.app.actions.addToast(undefined))
    setToggle('')
  }

  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Remove from PIP'}
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="removeBack-button"
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
                data-testid="RemoveEmployeeName"
                type="text"
                id="employeeName"
                size="sm"
                name="employeeName"
                value={viewPipDetails?.employeeName}
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
                value={viewPipDetails?.startDate}
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
                value={viewPipDetails?.endDate}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end pe-3"
            >
              Extend Date:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                className="form-control form-control-not-allowed"
                data-testid="extendDate"
                type="text"
                id="extendDate"
                size="sm"
                name="extendDate"
                value={viewPipDetails?.extendDate as string}
                disabled={true}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CCol sm={3} md={3} className="text-end">
              <CFormLabel className="mt-1">
                Rating:
                <span className={selectRatingValue ? TextWhite : TextDanger}>
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
                value={selectRatingValue}
                onChange={(e) => {
                  setSelectRatingValue(e.target.value)
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
              Reason for Removing:
              <span
                className={
                  reasonForRemovePIP?.replace(/^\s*/, '')
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
                initData={reasonForRemovePIP}
                data-testid="reasonForRemovePIP"
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleReasonForRemovePIP(editor.getData().trim())
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
              disabled={!isRemoveBtnEnabled}
              onClick={extendBtnHandler}
            >
              Remove
            </CButton>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EmployeeRemovePIP
