import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import ReactDatePicker from 'react-datepicker'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { useHistory } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { EmployeeLeaveApply } from '../../../types/Leaves/ApplyLeave/employeeApplyLeaves'
import { TextDanger, TextWhite } from '../../../constant/ClassName'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'
import { deviceLocale } from '../../../utils/dateFormatUtils'

const EmployeeApplyLeaveFilterOptions = (): JSX.Element => {
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const initialEmployeeLeaveApply = {} as EmployeeLeaveApply
  const [applyLeave, setApplyLeave] = useState(initialEmployeeLeaveApply)
  const commonFormatDate = 'l'
  const [fromDate, setFromDate] = useState<string>()
  const [toDate, setToDate] = useState<string>()
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [dateError, setDateError] = useState<boolean>(false)
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const history = useHistory()
  const employeeLeaveType = useTypedSelector(
    reduxServices.employeeApplyLeave.selectors.employeeLeaveType,
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.employeeApplyLeave.getEmployeeLeaveType(employeeId))
  }, [dispatch, employeeId])

  const handleDescription = (employeeComments: string) => {
    setApplyLeave((prevState) => {
      return { ...prevState, ...{ employeeComments } }
    })
  }

  const onChangeLeaveTypeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setApplyLeave((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const currentDate = new Date().setHours(0, 0, 0, 0)

  const handleApplyLeave = async () => {
    const prepareObject = {
      ...applyLeave,
      ...{
        employeeId,
        leaveAppliedOn: new Date(currentDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: 'numeric',
          day: '2-digit',
        }),
        id: '',
        fromDate: fromDate
          ? new Date(fromDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        toDate: toDate
          ? new Date(toDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
      },
    }
    const applyLeaveResultAction = await dispatch(
      reduxServices.employeeApplyLeave.employeeApplyLeave(prepareObject),
    )
    if (
      reduxServices.employeeApplyLeave.employeeApplyLeave.fulfilled.match(
        applyLeaveResultAction,
      )
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Leave applied successfully"
          />,
        ),
      )
      history.push('/employeeLeaveSummary')
    } else if (
      reduxServices.employeeApplyLeave.employeeApplyLeave.rejected.match(
        applyLeaveResultAction,
      ) &&
      applyLeaveResultAction.payload === 302
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            Leave already applied on mentioned date."
          />,
        ),
      )
    } else if (
      reduxServices.employeeApplyLeave.employeeApplyLeave.rejected.match(
        applyLeaveResultAction,
      ) &&
      applyLeaveResultAction.payload === 500
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            Leave Application Cannot Process."
          />,
        ),
      )
    } else if (
      reduxServices.employeeApplyLeave.employeeApplyLeave.rejected.match(
        applyLeaveResultAction,
      ) &&
      applyLeaveResultAction.payload === 406
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="            
            You are Under Notice,So you can't apply for a leave"
          />,
        ),
      )
    }
  }

  useEffect(() => {
    if (applyLeave.leaveCategoryName && fromDate && toDate) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [applyLeave.leaveCategoryName, fromDate, toDate])

  const handleClearInputFields = () => {
    setApplyLeave({
      employeeComments: '',
      leaveCategoryName: '',
    })
    setFromDate('')
    setToDate('')
    setShowEditor(false)
    setTimeout(() => {
      setShowEditor(true)
    }, 100)
  }

  useEffect(() => {
    const newFromDate = new Date(
      moment(fromDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(toDate?.toString()).format(commonFormatDate),
    )
    if (fromDate && toDate && newToDate.getTime() < newFromDate.getTime()) {
      setDateError(true)
    } else {
      setDateError(false)
    }
  }, [fromDate, toDate])

  return (
    <>
      <CRow className="mt-1">
        <CCol sm={8}>
          <CFormLabel className="col-sm-3 col-form-label">
            Leave Type:
            <span
              className={applyLeave.leaveCategoryName ? TextWhite : TextDanger}
            >
              {' '}
              *
            </span>
          </CFormLabel>
          <CFormSelect
            data-testid="leaveApply-form-select"
            aria-label="leaveCategoryName"
            name="leaveCategoryName"
            id="leaveCategoryName"
            value={applyLeave.leaveCategoryName}
            onChange={onChangeLeaveTypeHandler}
          >
            <option value={''}>Select a Leave</option>
            {employeeLeaveType?.map((countriesItem, index) => (
              <option key={index} value={countriesItem.name}>
                {countriesItem.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol sm={8}>
          <CRow>
            <CCol sm={6}>
              <CFormLabel className="col-sm-4 col-form-label">
                From :
                <span className={fromDate ? TextWhite : TextDanger}> *</span>
              </CFormLabel>
              <ReactDatePicker
                id="fromDate"
                data-testid="leaveApplyFromDate"
                className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="fromDate"
                value={
                  fromDate
                    ? new Date(fromDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: 'numeric',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setFromDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
            <CCol sm={6}>
              <CFormLabel className="col-sm-3 col-form-label">
                To:
                <span className={toDate ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
              <ReactDatePicker
                id="toDate"
                data-testid="leaveApprovalFromDate"
                className="form-control form-control-sm sh-date-picker sh-leave-form-control"
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="dd/mm/yy"
                name="toDate"
                value={
                  toDate
                    ? new Date(toDate).toLocaleDateString(deviceLocale, {
                        year: 'numeric',
                        month: 'numeric',
                        day: '2-digit',
                      })
                    : ''
                }
                onChange={(date: Date) =>
                  setToDate(moment(date).format(commonFormatDate))
                }
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
      {dateError && (
        <CRow className="mt-2">
          <CCol sm={{ span: 6, offset: 4 }}>
            <span className="text-danger">
              To date should be greater than From date
            </span>
          </CCol>
        </CRow>
      )}
      <CRow className="mt-3">
        <CCol sm={8} data-testid="ckEditor-component">
          <CFormLabel className="col-sm-3 col-form-label">
            Comments:{' '}
          </CFormLabel>
          {showEditor ? (
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={applyLeave?.employeeComments}
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                handleDescription(editor.getData().trim())
              }}
            />
          ) : (
            ''
          )}
        </CCol>
      </CRow>
      <CRow className="mt-4">
        <CCol sm={4}>
          <CButton
            className="cursor-pointer sh-ovh-btn-new"
            color="primary me-1"
            data-testid="sh-view-button"
            disabled={!isButtonEnabled}
            onClick={handleApplyLeave}
          >
            Apply
          </CButton>
          <CButton
            className="cursor-pointer sh-ovh-btn-new"
            data-testid="sh-clear-button"
            disabled={false}
            color="light me-1"
            onClick={handleClearInputFields}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </>
  )
}
export default EmployeeApplyLeaveFilterOptions
