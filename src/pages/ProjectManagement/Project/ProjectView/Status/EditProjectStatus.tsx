import { CRow, CCol, CButton, CForm, CFormLabel } from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import moment from 'moment'
import DatePicker from 'react-datepicker'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ckeditorConfig } from '../../../../../utils/ckEditorUtils'
import { deviceLocale } from '../../../../../utils/dateFormatUtils'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'
import OToast from '../../../../../components/ReusableComponent/OToast'

type EditCurrentWeekDate = string | Date | undefined
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
  editCurrentWeekDate: EditCurrentWeekDate
  editNextWeekDate: EditCurrentWeekDate
  editCurrentWeekStatus: string | undefined
  editNextWeekStatus: string | undefined
  setEditCurrentWeekDate: React.Dispatch<
    React.SetStateAction<EditCurrentWeekDate>
  >
  setEditNextWeekDate: React.Dispatch<React.SetStateAction<EditCurrentWeekDate>>
  setEditNextWeekStatus: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  setEditCurrentWeekStatus: React.Dispatch<
    React.SetStateAction<string | undefined>
  >
  statusId: number | undefined
}): JSX.Element => {
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const [dateError, setDateError] = useState<boolean>(false)
  const [isUpdateButtonEnabled, setIsUpdateButtonEnabled] = useState(false)
  const [errorMessageCount, setErrorMessageCount] = useState<number>(0)
  const getProjectDetail = useTypedSelector(
    reduxServices.projectViewDetails.selectors.projectDetail,
  )
  const dispatch = useAppDispatch()
  const commonFormatDate = 'l'
  const handleEditCurrentWeekStatus = (currentStatus: string) => {
    setEditCurrentWeekStatus(currentStatus)
  }
  const handleEditNextWeekStatus = (nextStatus: string) => {
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
        nextDate: editNextWeekDate
          ? new Date(editNextWeekDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
          : '',
        nextstatus: editNextWeekStatus as string,
        prevDate: editCurrentWeekDate
          ? new Date(editCurrentWeekDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: '2-digit',
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
  const failureToastMessage = (
    <OToast
      toastMessage="Add an employee within project date limits."
      toastColor="danger"
    />
  )
  const allocateButtonHandler = () => {
    const tempAllocationDate = new Date(
      moment(editCurrentWeekDate).format(commonFormatDate),
    )
    const startDateParts = getProjectDetail?.startdate
      ? getProjectDetail.startdate.split('/')
      : ''
    const tempProjectStartDate = new Date(
      Number(startDateParts[2]),
      Number(startDateParts[1]) - 1,
      Number(startDateParts[0]),
    )

    const tempEndDate = new Date(
      moment(editNextWeekDate).format(commonFormatDate),
    )
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
      updateProjectStatusHandler()
    } else {
      setErrorMessageCount((messageCount) => messageCount + 1)
      dispatch(reduxServices.app.actions.addToast(failureToastMessage))
    }
  }
  useEffect(() => {
    const newFromDate = new Date(
      moment(editCurrentWeekDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(editNextWeekDate?.toString()).format(commonFormatDate),
    )
    const diffInDays =
      (newToDate.getTime() - newFromDate.getTime()) / (1000 * 3600 * 24)

    if (
      (editCurrentWeekDate &&
        editNextWeekDate &&
        newToDate.getTime() < newFromDate.getTime()) ||
      (editCurrentWeekDate && editNextWeekDate && diffInDays < 7)
    ) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [editCurrentWeekDate, editNextWeekDate])
  useEffect(() => {
    if (
      editCurrentWeekDate &&
      editCurrentWeekStatus &&
      editNextWeekDate &&
      editNextWeekStatus
    ) {
      setIsUpdateButtonEnabled(true)
    } else {
      setIsUpdateButtonEnabled(false)
    }
  }, [
    editCurrentWeekDate,
    editCurrentWeekStatus,
    editNextWeekDate,
    editNextWeekStatus,
  ])
  console.log(setShowEditor)
  console.log(errorMessageCount)
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1 add-project-back-btn"
            data-testid="back-btn"
            onClick={() => setToggle('')}
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-4 mb-4">
          <CFormLabel className="col-sm-3 col-form-label text-end mt-1">
            Current Week Date :
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              id="fromDate"
              data-testid="leaveApplyFromDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="fromDate"
              value={
                editCurrentWeekDate
                  ? new Date(editCurrentWeekDate).toLocaleDateString(
                      deviceLocale,
                      {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      },
                    )
                  : ''
              }
              onChange={(date: Date) =>
                setEditCurrentWeekDate(moment(date).format(commonFormatDate))
              }
              selected={editCurrentWeekDate as Date}
            />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CFormLabel className="col-sm-3 col-form-label">
            Current Week Status:
          </CFormLabel>
          <CCol sm={12} data-testid="ckEditor-component">
            {showEditor ? (
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editCurrentWeekStatus}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleEditCurrentWeekStatus(editor.getData().trim())
                }}
              />
            ) : (
              ''
            )}
          </CCol>
        </CRow>
        <CRow className="mt-4 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end mt-1">
            Next Week Date:
          </CFormLabel>
          <CCol sm={3}>
            <DatePicker
              id="fromDate"
              data-testid="leaveApplyFromDate"
              className="form-control form-control-sm sh-date-picker"
              showMonthDropdown
              showYearDropdown
              autoComplete="off"
              dropdownMode="select"
              dateFormat="dd/mm/yy"
              placeholderText="dd/mm/yyyy"
              name="fromDate"
              value={
                editNextWeekDate
                  ? new Date(editNextWeekDate).toLocaleDateString(
                      deviceLocale,
                      {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      },
                    )
                  : ''
              }
              onChange={(date: Date) =>
                setEditNextWeekDate(moment(date).format(commonFormatDate))
              }
              selected={editNextWeekDate as Date}
            />
          </CCol>
        </CRow>
        {dateError && (
          <CRow className="mt-2">
            <CCol sm={{ span: 6, offset: 3 }}>
              <span className="text-danger" data-testid="errorMessage">
                <b>
                  Next week date should be greater than current week date and
                  should be after one week from current week date
                </b>
              </span>
            </CCol>
          </CRow>
        )}
        <CRow className="mt-3">
          <CFormLabel className="col-sm-3 col-form-label">Comments:</CFormLabel>
          <CCol sm={12} data-testid="ckEditor-component">
            {showEditor ? (
              <CKEditor<{
                onChange: CKEditorEventHandler<'change'>
              }>
                initData={editNextWeekStatus}
                config={ckeditorConfig}
                debug={true}
                onChange={({ editor }) => {
                  handleEditNextWeekStatus(editor.getData().trim())
                }}
              />
            ) : (
              ''
            )}
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol md={{ span: 6, offset: 3 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                color="success"
                onClick={allocateButtonHandler}
                disabled={!isUpdateButtonEnabled || dateError}
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
