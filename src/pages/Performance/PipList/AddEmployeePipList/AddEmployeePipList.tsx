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
import React, { useEffect, useMemo, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import DatePicker from 'react-datepicker'
import { useHistory } from 'react-router-dom'
import OCard from '../../../../components/ReusableComponent/OCard'
import OToast from '../../../../components/ReusableComponent/OToast'
import {
  TextDanger,
  TextLabelProps,
  TextWhite,
} from '../../../../constant/ClassName'
import { dateFormat } from '../../../../constant/DateFormat'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import { showIsRequired } from '../../../../utils/helper'

const AddEmployeePipList = ({
  pageSize,
  searchByAdded,
  searchByEmployee,
  searchInput,
  fromDate,
  toDate,
  setToggle,
  selectDay,
}: {
  setToggle: () => void
  pageSize: number
  searchByAdded: boolean
  searchByEmployee: boolean
  searchInput: string
  fromDate: Date | string
  toDate: Date | string
  selectDay: string
}): JSX.Element => {
  const [startDate, setStartDate] = useState<string>()
  const [endDate, setEndDate] = useState<string>()
  const [dateErrorMsg, setDateErrorMsg] = useState<boolean>(false)
  const [addRating, setAddRating] = useState<string>('')
  const [isReasonForPIP, setIsReasonForPIP] = useState<boolean>(true)
  const [addReasonForPIP, setAddReasonForPIP] = useState<string>('')
  const [isImprovementPlan, setIsImprovementPlan] = useState<boolean>(true)
  const [addImprovementPlan, setAddImprovementPlan] = useState<string>('')
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [employeeName, setEmployeeName] = useState<string>('')
  const [isEmployeeNameValid, setIsEmployeeNameValid] = useState(false)
  const dispatch = useAppDispatch()
  const history = useHistory()

  useEffect(() => {
    const newDateFormatForIsBefore = 'YYYY-MM-DD'
    const start = moment(startDate, dateFormat).format(newDateFormatForIsBefore)
    const end = moment(endDate, dateFormat).format(newDateFormatForIsBefore)

    setDateErrorMsg(moment(end).isBefore(start))
  }, [startDate, endDate])

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
    setAddRating('')
    setEndDate('')
    setStartDate('')
  }

  useEffect(() => {
    if (
      startDate &&
      endDate &&
      addRating &&
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
    addRating,
    addReasonForPIP,
    addImprovementPlan,
    employeeName,
  ])

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

  const sortedFamilyDetails = useMemo(() => {
    if (allEmployeeDetails) {
      return allEmployeeDetails
        .slice()
        .sort((sortNode1, sortNode2) =>
          (sortNode1.empFirstName + ' ' + sortNode1.empLastName).localeCompare(
            sortNode2.empFirstName + ' ' + sortNode2.empLastName,
          ),
        )
    }
    return []
  }, [allEmployeeDetails])

  const employeeDetails = sortedFamilyDetails?.filter(
    (item) => item.empFirstName + ' ' + item.empLastName === employeeName,
  )

  const selectEmployeeHandler = (empName: string) => {
    setEmployeeName(empName)
  }

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
      empId: employeeDetails[0]?.employeeId,
      endDate: endDate as string,
      improvement: addImprovementPlan,
      rating: addRating,
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
          dateSelection: selectDay,
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
    } else if (
      reduxServices.pipList.addPIP.rejected.match(addPIPResultAction) &&
      addPIPResultAction.payload === 403
    ) {
      history.push('/forbidden')
    }
  }

  const disableAfterDate = new Date()
  disableAfterDate.setFullYear(disableAfterDate.getFullYear() + 1)

  const onHandleEndDatePicker = (value: Date) => {
    setEndDate(moment(value).format(dateFormat))
  }
  const onHandleStartDatePicker = (value: Date) => {
    setStartDate(moment(value).format(dateFormat))
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
              <span
                className={
                  employeeName?.replace(/^\s*/, '') ? TextWhite : TextDanger
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol md={3}>
              <Autocomplete
                inputProps={{
                  className: 'form-control form-control-sm',
                  autoComplete: 'on',
                  placeholder: 'Employee Name',
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
              <span className={startDate ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="startDate"
                className="form-control form-control-sm sh-date-picker"
                showMonthDropdown
                showYearDropdown
                autoComplete="off"
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="Start Date"
                name="startDate"
                maxDate={disableAfterDate}
                value={startDate}
                onChange={(date: Date) => onHandleStartDatePicker(date)}
              />
            </CCol>
          </CRow>
          <CRow className="mt-3">
            <CFormLabel className={formLabel}>
              End Date :
              <span className={endDate ? TextWhite : TextDanger}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                id="endDate"
                className="form-control form-control-sm sh-date-picker"
                showMonthDropdown
                showYearDropdown
                autoComplete="off"
                dropdownMode="select"
                dateFormat="dd/mm/yy"
                placeholderText="End Date"
                maxDate={disableAfterDate}
                name="endDate"
                value={endDate}
                onChange={(date: Date) => onHandleEndDatePicker(date)}
              />
              {dateErrorMsg && (
                <span className="text-danger" data-testid="errorMessage">
                  <b>End date should be greater than Start date</b>
                </span>
              )}
            </CCol>
          </CRow>
          <CRow className="employeeAllocation-form mt-3">
            <CFormLabel className={formLabel}>
              Rating:
              <span className={showIsRequired(addRating)}>*</span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                id="Select"
                data-testid="form-select1"
                name="Select"
                value={addRating}
                onChange={(e) => {
                  setAddRating(e.target.value)
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
              <span
                className={
                  addReasonForPIP?.replace(/^\s*/, '') ? TextWhite : TextDanger
                }
              >
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
              <span
                className={
                  addImprovementPlan?.replace(/^\s*/, '')
                    ? TextWhite
                    : TextDanger
                }
              >
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
                disabled={!isAddButtonEnabled || dateErrorMsg}
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
