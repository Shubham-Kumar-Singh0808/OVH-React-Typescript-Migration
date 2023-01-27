import { CRow, CCol, CButton, CForm, CFormLabel } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { useParams } from 'react-router-dom'
import { deviceLocale } from '../../../../../utils/helper'
import { ckeditorConfig } from '../../../../../utils/ckEditorUtils'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
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
  const [dateError, setDateError] = useState<boolean>(false)
  const commonFormatDate = 'l'
  const dispatch = useAppDispatch()
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
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
        nextDate: nextWeekDate
          ? new Date(nextWeekDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        nextstatus: nextWeekStatus as string,
        prevDate: currentWeekDate
          ? new Date(currentWeekDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
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
  const failureToastMessage = (
    <OToast
      toastMessage="Add an employee within project date limits."
      toastColor="danger"
    />
  )

  const allocateButtonHandler = () => {
    const tempAllocationDate = new Date(
      moment(currentWeekDate).format(commonFormatDate),
    )
    const startDateParts = getProjectDetail?.startdate
      ? getProjectDetail.startdate.split('/')
      : ''
    const tempProjectStartDate = new Date(
      Number(startDateParts[2]),
      Number(startDateParts[1]) - 1,
      Number(startDateParts[0]),
    )

    const tempEndDate = new Date(moment(nextWeekDate).format(commonFormatDate))
    const endDateParts = getProjectDetail?.enddate
      ? getProjectDetail.enddate.split('/')
      : ''
    const tempProjectEndDate = new Date(
      Number(endDateParts[2]),
      Number(endDateParts[1]) - 1,
      Number(endDateParts[0]),
    )

    if (
      tempAllocationDate <= tempEndDate &&
      tempAllocationDate >= tempProjectStartDate &&
      tempAllocationDate <= tempProjectEndDate &&
      tempEndDate <= tempProjectEndDate &&
      tempEndDate >= tempProjectStartDate
    ) {
      addProjectStatusHandler()
    } else {
      dispatch(reduxServices.app.actions.addToast(failureToastMessage))
    }
  }
  useEffect(() => {
    const newFromDate = new Date(
      moment(currentWeekDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(nextWeekDate?.toString()).format(commonFormatDate),
    )
    if (
      currentWeekDate &&
      nextWeekDate &&
      newToDate.getTime() < newFromDate.getTime()
    ) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [currentWeekDate, nextWeekDate])
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="back-btn"
            onClick={() => setToggle('')}
          >
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
        {dateError && (
          <CRow className="mt-2">
            <CCol sm={{ span: 6, offset: 4 }}>
              <span className="text-danger" data-testid="errorMessage">
                Next week date should be greater than current week date and
                should be after one week from current week date
              </span>
            </CCol>
          </CRow>
        )}
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
                onClick={allocateButtonHandler}
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
