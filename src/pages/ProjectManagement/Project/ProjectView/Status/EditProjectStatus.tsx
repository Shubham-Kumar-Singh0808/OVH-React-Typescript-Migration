import { CRow, CCol, CButton, CForm, CFormLabel } from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { ckeditorConfig } from '../../../../../utils/ckEditorUtils'
import { deviceLocale } from '../../../../../utils/dateFormatUtils'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'
import OToast from '../../../../../components/ReusableComponent/OToast'

const EditProjectStatus = ({
  setToggle,
  editCurrentWeekDate,
  editNextWeekDate,
  editCurrentWeekStatus,
  editNextWeekStatus,
  setEditCurrentWeekDate,
  setEditNextWeekDate,
  setEditNextWeekStatus,
  setEditCurrentWeekStatus,
  statusId,
}: {
  setToggle: (value: string) => void
  editCurrentWeekDate: string | undefined
  editNextWeekDate: string | undefined
  editCurrentWeekStatus: string | undefined
  editNextWeekStatus: string | undefined
  setEditCurrentWeekDate: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  setEditNextWeekDate: React.Dispatch<React.SetStateAction<string | undefined>>
  setEditNextWeekStatus: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  setEditCurrentWeekStatus: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  statusId: number | undefined
}): JSX.Element => {
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const dispatch = useAppDispatch()
  const commonFormatDate = 'l'
  const handleCurrentWeekStatus = (currentStatus: string) => {
    setEditCurrentWeekStatus(currentStatus)
  }
  const handleNextWeekStatus = (nextStatus: string) => {
    setEditNextWeekStatus(nextStatus)
  }
  const { projectId } = useParams<{ projectId: string }>()
  const toastElement = (
    <OToast toastMessage="Status Updated Successfully" toastColor={'success'} />
  )
  const updateProjectStatusHandler = async () => {
    const updateProjectStatusReportResultAction = await dispatch(
      reduxServices.projectStatus.updateProjectStatusReport({
        addOn: null,
        nextDate: editCurrentWeekDate
          ? new Date(editCurrentWeekDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        nextstatus: editNextWeekStatus as string,
        prevDate: editNextWeekDate
          ? new Date(editNextWeekDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        prevstatus: editCurrentWeekStatus as string,
        projectId,
        id: statusId as number,
      }),
    )
    if (
      reduxServices.projectStatus.updateProjectStatusReport.fulfilled.match(
        updateProjectStatusReportResultAction,
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
  console.log(setShowEditor)
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
                editCurrentWeekDate
                  ? new Date(editCurrentWeekDate).toLocaleDateString(
                      deviceLocale,
                      {
                        year: 'numeric',
                        month: 'numeric',
                        day: '2-digit',
                      },
                    )
                  : ''
              }
              onChange={(date: Date) =>
                setEditCurrentWeekDate(moment(date).format(commonFormatDate))
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
                editNextWeekDate
                  ? new Date(editNextWeekDate).toLocaleDateString(
                      deviceLocale,
                      {
                        year: 'numeric',
                        month: 'numeric',
                        day: '2-digit',
                      },
                    )
                  : ''
              }
              onChange={(date: Date) =>
                setEditNextWeekDate(moment(date).format(commonFormatDate))
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
                initData={editCurrentWeekStatus}
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
                initData={editNextWeekStatus}
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
                onClick={updateProjectStatusHandler}
              >
                Update
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </>
  )
}

export default EditProjectStatus
