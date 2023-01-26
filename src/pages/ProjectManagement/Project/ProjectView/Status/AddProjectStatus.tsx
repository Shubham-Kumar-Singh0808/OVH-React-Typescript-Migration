import { CRow, CCol, CButton, CForm, CFormLabel } from '@coreui/react-pro'
import React, { useState } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { useParams } from 'react-router-dom'
import { deviceLocale } from '../../../../../utils/helper'
import { ckeditorConfig } from '../../../../../utils/ckEditorUtils'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'
import OToast from '../../../../../components/ReusableComponent/OToast'

const AddProjectStatus = ({
  setToggle,
}: {
  setToggle: (value: string) => void
}): JSX.Element => {
  const [currentWeekDate, setCurrentWeekDate] = useState<string>()
  const [nextWeekDate, setNextWeekDate] = useState<string>()
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [currentWeekStatus, setCurrentWeekStatus] = useState<string>()
  const [nextWeekStatus, setNextWeekStatus] = useState<string>()
  const commonFormatDate = 'l'
  const dispatch = useAppDispatch()
  const handleCurrentWeekStatus = (currentStatus: string) => {
    setCurrentWeekStatus(currentStatus)
  }
  const handleNextWeekStatus = (nextStatus: string) => {
    setNextWeekStatus(nextStatus)
  }
  const { projectId } = useParams<{ projectId: string }>()
  const clearBtnHandler = () => {
    setCurrentWeekDate('')
    setNextWeekDate('')
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }
  const toastElement = (
    <OToast toastMessage="Status Added Successfully" toastColor={'success'} />
  )
  const addProjectStatusHandler = async () => {
    const addProjectStatusReportResultAction = await dispatch(
      reduxServices.projectStatus.addProjectStatusReport({
        nextDate: nextWeekDate as string,
        nextstatus: nextWeekStatus as string,
        prevDate: currentWeekDate as string,
        prevstatus: currentWeekStatus as string,
        projectId,
      }),
    )
    if (
      reduxServices.projectStatus.addProjectStatusReport.fulfilled.match(
        addProjectStatusReportResultAction,
      )
    ) {
      setToggle('')
      dispatch(dispatch(reduxServices.app.actions.addToast(toastElement)))
      dispatch(
        reduxServices.projectStatus.getStatusReportList({
          endIndex: 20,
          firstIndex: 0,
          projectId,
        }),
      )
    }
  }
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton color="info" className="btn-ovh me-1" data-testid="back-btn">
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Current Week Date :
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              id="fromDate"
              data-testid="leaveApplyFromDate"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="fromDate"
              value={
                currentWeekDate
                  ? new Date(currentWeekDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setCurrentWeekDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            Next Week Date:
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              id="fromDate"
              data-testid="leaveApplyFromDate"
              className="form-control form-control-sm sh-date-picker sh-leave-form-control"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yy"
              name="fromDate"
              value={
                nextWeekDate
                  ? new Date(nextWeekDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: 'numeric',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setNextWeekDate(moment(date).format(commonFormatDate))
              }
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol sm={8} data-testid="ckEditor-component">
            <CFormLabel className="col-sm-3 col-form-label">
              Current Week Status:
            </CFormLabel>
            {showEditor ? (
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={currentWeekStatus}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleCurrentWeekStatus(editor.getData().trim())
                }}
              />
            ) : (
              ''
            )}
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol sm={8} data-testid="ckEditor-component">
            <CFormLabel className="col-sm-3 col-form-label">
              Comments:{' '}
            </CFormLabel>
            {showEditor ? (
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={nextWeekStatus}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleNextWeekStatus(editor.getData().trim())
                }}
              />
            ) : (
              ''
            )}
          </CCol>
        </CRow>
        <CRow>
          <CCol md={{ span: 6, offset: 3 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                color="success"
                onClick={addProjectStatusHandler}
              >
                Add
              </CButton>
              <CButton
                color="warning "
                className="btn-ovh"
                data-testid="clear-btn"
                onClick={clearBtnHandler}
              >
                Clear
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default AddProjectStatus
