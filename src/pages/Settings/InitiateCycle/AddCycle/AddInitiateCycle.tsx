import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import AddInitiateCycleTable from './AddInitiateCycleTable'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { deviceLocale } from '../../../../utils/helper'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OToast from '../../../../components/ReusableComponent/OToast'
import { usePagination } from '../../../../middleware/hooks/usePagination'

const AddInitiateCycle = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const [selectCycleName, setSelectCycleName] = useState('')
  const [fromMonth, setFromMonth] = useState<string>()
  const [toMonth, setToMonth] = useState<string>()
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [isButtonEnabled, setIsButtonEnabled] = useState(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isMonthError, setIsMonthError] = useState<boolean>(false)
  const [isDateError, setIsDateError] = useState<boolean>(false)

  const commonFormatDate = 'L'

  useEffect(() => {
    if (
      selectCycleName &&
      toMonth &&
      fromMonth &&
      startDate &&
      endDate &&
      isChecked
    ) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [selectCycleName, toMonth, fromMonth, startDate, endDate, isChecked])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  useEffect(() => {
    const tempFromMonth = new Date(
      moment(fromMonth?.toString()).format(commonFormatDate),
    )
    const tempToMonth = new Date(
      moment(toMonth?.toString()).format(commonFormatDate),
    )
    if (tempToMonth.getTime() < tempFromMonth.getTime()) {
      setIsMonthError(true)
    } else {
      setIsMonthError(false)
    }
  }, [fromMonth, toMonth])

  useEffect(() => {
    const newFromDate = new Date(
      moment(startDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(endDate?.toString()).format(commonFormatDate),
    )
    if (startDate && endDate && newToDate.getTime() < newFromDate.getTime()) {
      setIsDateError(true)
    } else {
      setIsDateError(false)
    }
  }, [startDate, endDate])

  const clearInputs = () => {
    setSelectCycleName('')
    setToMonth('')
    setFromMonth('')
    setStartDate('')
    setEndDate('')
    setIsChecked(false)
  }

  const successToast = (
    <OToast toastMessage="Cycle Added Successfully" toastColor="success" />
  )

  const failedToastMessage = (
    <OToast
      toastMessage="Sorry, Cycle already exist for this duration"
      toastColor="danger"
      data-testid="failedToast"
    />
  )

  const toggle = useTypedSelector(reduxServices.initiateCycle.selectors.toggle)

  const addButtonHandler = async () => {
    const prepareObject = {
      activateFlag: isChecked,
      cycleName: selectCycleName,
      endDate,
      fromMonth,
      startDate,
      toMonth,
    }
    const initiateAddCycleResult = await dispatch(
      reduxServices.initiateCycle.addCycle(prepareObject),
    )
    if (
      reduxServices.initiateCycle.addCycle.fulfilled.match(
        initiateAddCycleResult,
      )
    ) {
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(reduxServices.initiateCycle.getAllCycles())
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.initiateCycle.addCycle.rejected.match(
        initiateAddCycleResult,
      ) &&
      initiateAddCycleResult.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(failedToastMessage))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }

  const pageFromState = useTypedSelector(
    reduxServices.initiateCycle.selectors.pageFromState,
  )

  const pageSizeFromState = useTypedSelector(
    reduxServices.initiateCycle.selectors.pageSizeFromState,
  )

  useEffect(() => {
    dispatch(reduxServices.initiateCycle.getAllCycles())
    dispatch(reduxServices.initiateCycle.actions.setCurrentPage(1))
    dispatch(reduxServices.initiateCycle.actions.setPageSize(20))
  }, [dispatch])

  const totalListSize = useTypedSelector(
    reduxServices.initiateCycle.selectors.listSize,
  )

  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )

  useEffect(() => {
    if (selectCurrentPage) {
      setCurrentPage(selectCurrentPage)
    }
  }, [selectCurrentPage])

  const {
    paginationRange,
    setPageSize,
    setCurrentPage,
    currentPage,
    pageSize,
  } = usePagination(totalListSize, pageSizeFromState, pageFromState)

  return (
    <>
      {toggle === 'addCycle' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Add Cycle"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          <CRow className="justify-content-end">
            <CCol className="text-end" md={4}>
              <CButton
                color="info"
                className="btn-ovh me-1"
                data-testid="back-button"
                onClick={() =>
                  dispatch(reduxServices.initiateCycle.actions.setToggle(''))
                }
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
                Cycle Name:
                <span className={selectCycleName ? TextWhite : TextDanger}>
                  *
                </span>
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  data-testid="cycleName"
                  type="text"
                  id="cycleName"
                  autoComplete="off"
                  size="sm"
                  name="cycleName"
                  placeholder="Enter Cycle Name"
                  value={selectCycleName}
                  onChange={(e) => setSelectCycleName(e.target.value)}
                />
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol sm={3} md={3} className="text-end">
                <CFormLabel className="mt-2 text-decoration-none">
                  From Month :
                  <span className={fromMonth ? TextWhite : TextDanger}>*</span>
                </CFormLabel>
              </CCol>
              <CCol sm={3}>
                <ReactDatePicker
                  autoComplete="off"
                  id="fromMonth"
                  data-testid="sh-date-picker"
                  className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                  showMonthYearPicker
                  placeholderText="mm/yyyy"
                  dateFormat="MM/yyyy"
                  name="selectFromMonth"
                  value={
                    fromMonth
                      ? new Date(fromMonth).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: '2-digit',
                        })
                      : ''
                  }
                  onChange={(date: Date) => {
                    setFromMonth(moment(date).format(commonFormatDate))
                  }}
                />
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol sm={3} md={3} className="text-end">
                <CFormLabel className="mt-2 text-decoration-none">
                  To Month :
                  <span className={toMonth ? TextWhite : TextDanger}>*</span>
                </CFormLabel>
              </CCol>
              <CCol sm={3}>
                <ReactDatePicker
                  autoComplete="off"
                  id="toMonth"
                  data-testid="sh-date-picker"
                  className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                  showMonthYearPicker
                  placeholderText="mm/yyyy"
                  dateFormat="MM/yyyy"
                  name="selectToMonth"
                  value={
                    toMonth
                      ? new Date(toMonth).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: '2-digit',
                        })
                      : ''
                  }
                  onChange={(date: Date) => {
                    setToMonth(moment(date).format(commonFormatDate))
                  }}
                />
              </CCol>
              {isMonthError && (
                <CCol sm={6}>
                  <span className="text-danger">
                    <b>To Month should be greater than From Month</b>
                  </span>
                </CCol>
              )}
            </CRow>
            <CRow className="mt-3">
              <CCol sm={3} md={3} className="text-end">
                <CFormLabel className="mt-1">
                  Start Date :
                  <span className={startDate ? TextWhite : TextDanger}>*</span>
                </CFormLabel>
              </CCol>
              <CCol sm={3}>
                <ReactDatePicker
                  id="startDate"
                  data-testid="startDate"
                  className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/mm/yyyy"
                  placeholderText="dd/mm/yyyy"
                  name="cycleStartDate"
                  minDate={new Date()}
                  value={
                    startDate
                      ? new Date(startDate).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })
                      : ''
                  }
                  onChange={(date: Date) =>
                    setStartDate(moment(date).format(commonFormatDate))
                  }
                />
              </CCol>
            </CRow>
            <CRow className="mt-3">
              <CCol sm={3} md={3} className="text-end">
                <CFormLabel className="mt-1">
                  End Date :
                  <span className={endDate ? TextWhite : TextDanger}>*</span>
                </CFormLabel>
              </CCol>
              <CCol sm={3}>
                <ReactDatePicker
                  id="endDate"
                  data-testid="endDate"
                  className="form-control form-control-sm sh-date-picker form-control-not-allowed"
                  autoComplete="off"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/mm/yyyy"
                  placeholderText="dd/mm/yyyy"
                  name="cycleEndDate"
                  minDate={new Date()}
                  value={
                    endDate
                      ? new Date(endDate).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })
                      : ''
                  }
                  onChange={(date: Date) =>
                    setEndDate(moment(date).format(commonFormatDate))
                  }
                />
              </CCol>
              {isDateError && (
                <CCol sm={6}>
                  <span className="text-danger">
                    <b>End Date should be greater than Start Date</b>
                  </span>
                </CCol>
              )}
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel
                {...formLabelProps}
                className="col-sm-3 col-form-label text-end"
              >
                Activate :
                <span className={isChecked ? TextWhite : TextDanger}>*</span>
              </CFormLabel>
              <CCol sm={3} className="pt-2">
                <CFormCheck
                  data-testid="ch-All"
                  id="activate"
                  name="activate"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol md={{ span: 6, offset: 3 }}>
                <CButton
                  data-testid="save-btn"
                  className="btn-ovh me-1 text-white"
                  color="success"
                  disabled={!isButtonEnabled || isDateError || isMonthError}
                  onClick={addButtonHandler}
                >
                  Add
                </CButton>
                <CButton
                  data-testid="clear-btn"
                  color="warning"
                  className="btn-ovh text-white"
                  onClick={clearInputs}
                >
                  Clear
                </CButton>
              </CCol>
            </CRow>
          </CForm>
          <AddInitiateCycleTable
            paginationRange={paginationRange}
            setPageSize={setPageSize}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        </OCard>
      )}
    </>
  )
}

export default AddInitiateCycle