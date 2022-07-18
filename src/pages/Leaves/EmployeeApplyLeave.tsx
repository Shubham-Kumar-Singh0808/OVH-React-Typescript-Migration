import { CButton, CCol, CFormLabel, CFormSelect, CRow } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import { useAppDispatch, useTypedSelector } from '../../stateStore'
import OCard from '../../components/ReusableComponent/OCard'
import { EmployeeLeaveApply } from '../../types/Leaves/employeeApplyLeaves'
import { TextDanger, TextWhite } from '../../constant/ClassName'
import { ckeditorConfig } from '../../utils/ckEditorUtils'
import { reduxServices } from '../../reducers/reduxServices'
import OToast from '../../components/ReusableComponent/OToast'

const EmployeeApplyLeave = (): JSX.Element => {
  const [showEditor, setShowEditor] = useState<boolean>(true)
  const initialEmployeeLeaveApply = {} as EmployeeLeaveApply
  const [applyLeave, setApplyLeave] = useState(initialEmployeeLeaveApply)

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )
  const employeeLeaveType = useTypedSelector(
    reduxServices.employeeApplyLeave.selectors.employeeLeaveType,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.employeeApplyLeave.getEmployeeLeaveType(employeeId))
  }, [dispatch, employeeId])

  const [fromDate, setFromDate] = useState<Date | string>()
  const [dateOfTo, setDateOfTo] = useState<Date | string>()
  const onDateChangeDateOfFromHandler = (date: Date) => {
    const formatDate = moment(date).format(commonFormatDate)
    const name = 'fromDate'
    setApplyLeave((prevState) => {
      return { ...prevState, ...{ [name]: formatDate } }
    })
    setFromDate(date)
  }

  const onChangeDateToHandler = (date: Date) => {
    console.log(date)
    const formatDate = moment(date).format(commonFormatDate)
    const name = 'dateOfTo'
    setApplyLeave((prevState) => {
      return { ...prevState, ...{ [name]: formatDate } }
    })
    setDateOfTo(date)
  }

  const handleDescription = (template: string) => {
    setApplyLeave((prevState) => {
      return { ...prevState, ...{ template } }
    })
  }

  const onChangeLeaveTypeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setApplyLeave((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }
  const formLabelProps = {
    htmlFor: 'inputNewTemplate',
    className: 'col-form-label category-label',
  }

  const commonFormatDate = 'DD/MM/YYYY'

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="Apply For Leave"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Leave Type:
          <span
            className={applyLeave.leaveCategoryName ? TextWhite : TextDanger}
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            aria-label="leaveCategoryName"
            name="leaveCategoryName"
            id="leaveCategoryName"
            value={applyLeave.leaveCategoryName}
            onChange={onChangeLeaveTypeHandler}
          >
            <option value={''}>Select a Leave</option>
            {employeeLeaveType?.map((countriesItem, index) => (
              <option key={index} value={countriesItem.id}>
                {countriesItem.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          From :
          <span className={applyLeave.fromDate ? TextWhite : TextDanger}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <DatePicker
            className="form-control"
            name="fromDate"
            maxDate={new Date()}
            id="fromDate"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            value={fromDate as string}
            onChange={(date: Date) => onDateChangeDateOfFromHandler(date)}
            selected={fromDate as Date}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4" data-testid="dateOfBirthInput">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          To :
          <span className={applyLeave.toDate ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <DatePicker
            className="form-control"
            name="dateOfTo"
            maxDate={new Date()}
            id="dateOfTo"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            value={dateOfTo as string}
            selected={dateOfTo as Date}
            onChange={(date: Date) => onChangeDateToHandler(date)}
          />
        </CCol>
      </CRow>
      <CRow className="mt-4 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          Comments:{' '}
        </CFormLabel>
        {showEditor ? (
          <CCol sm={8} data-testid="ckEditor-component">
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
          </CCol>
        ) : (
          ''
        )}
      </CRow>
      <CRow>
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
        ></CFormLabel>
        <CCol sm={4}>
          <CButton
            data-testid="btn-save"
            className="btn-ovh me-1"
            color="success"
            // disabled={!isButtonEnabled}
            // onClick={handleApplyLeave}
          >
            Apply
          </CButton>
          <CButton
            data-testid="btn-clear"
            color="warning "
            className="btn-ovh me-1"
            // onClick={handleClearInputs}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </OCard>
  )
}
export default EmployeeApplyLeave
