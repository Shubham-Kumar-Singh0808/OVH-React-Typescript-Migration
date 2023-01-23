import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import ReactDatePicker from 'react-datepicker'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import {
  TextDanger,
  TextLabelProps,
  TextWhite,
} from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { deviceLocale, showIsRequired } from '../../../../utils/helper'

const AddEmployeePipList = ({
  pageSize,
  searchByAdded,
  searchByEmployee,
  searchInput,
  selectDate,
  fromDate,
  toDate,
  setToggle,
}: {
  setToggle: () => void
  pageSize: number
  searchByAdded: boolean
  searchByEmployee: boolean
  searchInput: string
  selectDate: string
  fromDate: Date | string
  toDate: Date | string
}): JSX.Element => {
  const [startDate, setStartDate] = useState<Date | string>()
  const [endDate, setEndDate] = useState<Date | string>()
  const [dateErrorMsg, setDateErrorMsg] = useState<boolean>(false)
  const [selectRating, setSelectRating] = useState<string>('')
  const [isReasonForPIP, setIsReasonForPIP] = useState<boolean>(true)
  const [addReasonForPIP, setAddReasonForPIP] = useState<string>('')
  const [isImprovementPlan, setIsImprovementPlan] = useState<boolean>(true)
  const [addImprovementPlan, setAddImprovementPlan] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [employeeName, setEmployeeName] = useState<string>('')

  const commonFormatDate = 'l'
  const dispatch = useAppDispatch()

  useEffect(() => {
    const newFromDate = new Date(
      moment(startDate?.toString()).format(commonFormatDate),
    )
    const newToDate = new Date(
      moment(endDate?.toString()).format(commonFormatDate),
    )
    if (startDate && endDate && newToDate.getTime() < newFromDate.getTime()) {
      setDateErrorMsg(true)
    } else {
      setDateErrorMsg(false)
    }
  }, [startDate, endDate])

  const endDateValue = endDate
    ? new Date(endDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const startDateValue = startDate
    ? new Date(startDate).toLocaleDateString(deviceLocale, {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit',
      })
    : ''

  const handleText = (comments: string) => {
    setAddReasonForPIP(comments)
  }

  const handlePIPReason = (comments: string) => {
    setAddImprovementPlan(comments)
  }

  const clearInputs = () => {
    setAddReasonForPIP('')
    setEmployeeName('')
    setIsReasonForPIP(false)
    setTimeout(() => {
      setIsReasonForPIP(true)
    }, 0)
    setAddImprovementPlan('')
    setIsImprovementPlan(false)
    setTimeout(() => {
      setIsImprovementPlan(true)
    }, 0)
    setSelectRating('')
    setEndDate('')
    setStartDate('')
  }

  useEffect(() => {
    if (
      startDate &&
      endDate &&
      selectRating &&
      addReasonForPIP &&
      addImprovementPlan &&
      employeeName
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [
    startDate,
    endDate,
    selectRating,
    addReasonForPIP,
    addImprovementPlan,
    employeeName,
  ])

  const ratings = useTypedSelector(
    reduxServices.pipList.selectors.performanceRatings,
  )

  useEffect(() => {
    dispatch(reduxServices.pipList.activeEmployee())
    dispatch(reduxServices.pipList.getPerformanceRatings())
  }, [dispatch])

  const formLabelProps = {
    htmlFor: 'inputNewHandbook',
    className: 'col-form-label category-label',
  }

  const formLabel = 'col-sm-3 col-form-label text-end'

  const allEmployeeDetails = useTypedSelector(
    reduxServices.pipList.selectors.employeeData,
  )

  const onFocusOut = () => {
    const selectedEmployee = allEmployeeDetails.find(
      (value) => value.empFirstName + ' ' + value.empLastName === employeeName,
    )
    const selEmpName =
      selectedEmployee?.empFirstName + ' ' + selectedEmployee?.empLastName
    setEmployeeName(selEmpName)
  }

  const selectEmployeeHandler = (empName: string) => {
    setEmployeeName(empName)
  }

  const empId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const successToast = (
    <OToast
      toastMessage="Added in PIP successfully
    "
      toastColor="success"
    />
  )
  const failureToast = (
    <OToast
      toastMessage="This employee is already in PIP for the particular Time Period"
      toastColor="danger"
    />
  )

  const selectCurrentPage = useTypedSelector(
    reduxServices.app.selectors.selectCurrentPage,
  )
  const selectedEmployeePipStatus = useTypedSelector(
    reduxServices.pipList.selectors.selectedEmployeePipStatus,
  )
  const addButtonHandler = async () => {
    const prepareObject = {
      empId: Number(empId),
      endDate: endDate as string,
      improvement: addImprovementPlan,
      rating: selectRating,
      remarks: addReasonForPIP,
      startDate: startDate as string,
    }
    const addPIPResultAction = await dispatch(
      reduxServices.pipList.addPIP(prepareObject),
    )

    if (reduxServices.pipList.addPIP.fulfilled.match(addPIPResultAction)) {
      setToggle()
      dispatch(reduxServices.app.actions.addToast(successToast))
      dispatch(
        reduxServices.pipList.getAllPIPList({
          startIndex: pageSize * (selectCurrentPage - 1),
          endIndex: pageSize * selectCurrentPage,
          selectionStatus: selectedEmployeePipStatus,
          dateSelection: selectDate,
          from: (fromDate as string) || '',
          multiSearch: searchInput,
          searchByAdded,
          searchByEmployee,
          to: (toDate as string) || '',
        }),
      )
      dispatch(reduxServices.app.actions.addToast(undefined))
    } else if (
      reduxServices.pipList.addPIP.rejected.match(addPIPResultAction) &&
      addPIPResultAction.payload === 409
    ) {
      dispatch(reduxServices.app.actions.addToast(failureToast))
      dispatch(reduxServices.app.actions.addToast(undefined))
    }
  }
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Add PIP"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="back-button"
              onClick={setToggle}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-3">
            <CFormLabel {...formLabelProps} className={formLabel}>
              Employee Name:
              <span className={employeeName ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol md={3}>
              <Autocomplete
                inputProps={{
                  className: 'form-control form-control-sm',
                  autoComplete: 'on',
                  placeholder: 'Employee Name',
                  onBlur: onFocusOut,
                }}
                wrapperStyle={{ position: 'relative' }}
                items={allEmployeeDetails}
                getItemValue={(item) =>
                  item.empFirstName + ' ' + item.empLastName
                }
                value={employeeName}
                renderMenu={(children) => (
                  <div
                    className={
                      employeeName && employeeName.length > 0
                        ? 'autocomplete-dropdown-wrap'
                        : 'autocomplete-dropdown-wrap hide'
                    }
                  >
                    {children}
                  </div>
                )}
                renderItem={(item, isHighlighted) => (
                  <div
                    className={
                      isHighlighted
                        ? 'autocomplete-dropdown-item active'
                        : 'autocomplete-dropdown-item'
                    }
                    key={item.employeeId}
                  >
                    {item.empFirstName + ' ' + item.empLastName}
                  </div>
                )}
                shouldItemRender={(item, value) =>
                  item.empFirstName.toLowerCase().indexOf(value.toLowerCase()) >
                  -1
                }
                onChange={(e) => setEmployeeName(e.target.value)}
                onSelect={(value) => selectEmployeeHandler(value)}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel className={formLabel}>
              Start Date :
              <span className={showIsRequired(startDate as string)}>*</span>
            </CFormLabel>
            <CCol sm={2}>
              <ReactDatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yy"
                name="fromDate"
                autoComplete="off"
                id="fromDate"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={startDateValue}
                onChange={(date: Date) => setStartDate(date)}
                selected={startDate as Date}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel className={formLabel}>
              End Date :
              <span className={showIsRequired(endDate as string)}>*</span>
            </CFormLabel>
            <CCol sm={2}>
              <ReactDatePicker
                className="form-control form-control-sm sh-date-picker"
                data-testid="date-picker"
                placeholderText="dd/mm/yy"
                name="toDate"
                id="toDate"
                autoComplete="off"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                value={endDateValue}
                onChange={(date: Date) => setEndDate(date)}
                selected={endDate as Date}
              />
              {dateErrorMsg && (
                <span className="text-danger" data-testid="errorMessage">
                  End date should be greater than Start date
                </span>
              )}
            </CCol>
          </CRow>
          <CRow className="employeeAllocation-form mt-3">
            <CFormLabel className={formLabel}>
              Rating:
              <span className={showIsRequired(selectRating)}>*</span>
            </CFormLabel>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="Select"
                data-testid="form-select1"
                name="Select"
                value={selectRating}
                onChange={(e) => {
                  setSelectRating(e.target.value)
                }}
              >
                <option value={''}>Select Rating</option>
                {ratings.length > 0 &&
                  ratings?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.rating}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>
              Reason for PIP:
              <span className={addReasonForPIP ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            {isReasonForPIP ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addReasonForPIP}
                  data-testid="allocateEmployeeComment"
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handleText(editor.getData().trim())
                  }}
                />
              </CCol>
            ) : (
              ''
            )}
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className={TextLabelProps}>
              Improvement Plan:
              <span className={addImprovementPlan ? TextWhite : TextDanger}>
                *
              </span>
            </CFormLabel>
            {isImprovementPlan ? (
              <CCol sm={9}>
                <CKEditor<{
                  onChange: CKEditorEventHandler<'change'>
                }>
                  initData={addImprovementPlan}
                  data-testid="allocateEmployeeComment"
                  config={ckeditorConfig}
                  debug={true}
                  onChange={({ editor }) => {
                    handlePIPReason(editor.getData().trim())
                  }}
                />
              </CCol>
            ) : (
              ''
            )}
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              <CButton
                data-testid="save-btn"
                className="btn-ovh me-1 text-white"
                color="success"
                disabled={!isAddButtonEnabled}
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
      </OCard>
    </>
  )
}

export default AddEmployeePipList