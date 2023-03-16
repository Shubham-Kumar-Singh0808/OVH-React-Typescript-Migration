import {
  CRow,
  CCol,
  CFormLabel,
  CFormSelect,
  CButton,
  CMultiSelect,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import ReviewListSearchFilterOptions from './ReviewListSearchFilterOptions'
import {
  reviewListStatus,
  employeeStatus,
  reviewRatings,
} from '../../../constant/constantData'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { deviceLocale, commonDateFormat } from '../../../utils/dateFormatUtils'
import { ReviewListData } from '../../../types/Performance/ReviewList/reviewListTypes'
import { downloadFile, showIsRequired } from '../../../utils/helper'
import { reviewListApi } from '../../../middleware/api/Performance/ReviewList/reviewListApi'

const ReviewListFilterOptions = ({
  setIsTableView,
  setFilterByDepartment,
  setFilterByDesignation,
}: {
  setFilterByDepartment: (value: string) => void
  setFilterByDesignation: (value: string) => void
  setIsTableView: (value: boolean) => void
  initialReviewList: ReviewListData
}): JSX.Element => {
  const activeCycle = useTypedSelector(
    reduxServices.reviewList.selectors.isActiveCycle,
  )

  type Option = {
    label: string
    value: string
    text: string
  }

  const [cycle, setCycle] = useState<number | string>()
  const [selectDepartment, setSelectedDepartment] = useState<number | string>()
  const [selectDesignation, setSelectDesignation] = useState<number | string>()
  const [selectStatus, setSelectStatus] = useState<string>()
  const [selectEmpstatus, setSelectEmpStatus] = useState<string>('')
  const [reviewFromDate, setReviewFromDate] = useState<string>('')
  const [reviewToDate, setReviewToDate] = useState<string>('')
  const [selectedRating, setSelectedRating] = useState<Option[]>([])
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [dateError, setDateError] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectRadio, setSelectRadio] = useState<string>('')
  const [showExportButton, setShowExportButton] = useState<boolean>(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const appraisalCycles = useTypedSelector(
    reduxServices.reviewList.selectors.appraisalCycles,
  )
  const designations = useTypedSelector(
    reduxServices.reviewList.selectors.designations,
  )
  const departments = useTypedSelector(
    reduxServices.reviewList.selectors.departments,
  )
  // const role = useTypedSelector(
  //   (state) => state.authentication.authenticatedUser.role,
  // )
  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const dispatch = useAppDispatch()

  const ratingOptions: Option[] = [
    { label: 'Option 1', value: 'option1', text: 'Option 1' },
    { label: 'Option 2', value: 'option2', text: 'Option 2' },
    { label: 'Option 3', value: 'option3', text: 'Option 3' },
    // add more options as needed
  ]

  const handleRatingsChange = (value: Option[]) => {
    setSelectedRating(value)
  }

  useEffect(() => {
    if (cycle) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [cycle])

  useEffect(() => {
    if (activeCycle?.active === true) {
      setCycle(String(activeCycle.id))
    }
  }, [activeCycle])

  useEffect(() => {
    if (!departments)
      dispatch(reduxServices.reviewList.getEmployeeDepartments())
    if (selectDepartment) {
      dispatch(
        reduxServices.reviewList.getDesignations(selectDepartment as number),
      )
    }
  }, [dispatch, selectDesignation, selectDepartment, departments])

  useEffect(() => {
    const start = moment(reviewFromDate, commonDateFormat).format(
      commonDateFormat,
    )
    const end = moment(reviewToDate, commonDateFormat).format(commonDateFormat)

    setDateError(moment(end).isBefore(start))
  }, [reviewFromDate, reviewToDate])

  const checkRole = (roleValue: string) => {
    if (roleValue === 'true') {
      return 'EmpName'
    } else if (roleValue === 'false') {
      return 'AddedBy'
    } else {
      return ''
    }
  }

  const dispatchApiCall = (roleValue?: string, searchInput?: string) => {
    return dispatch(
      reduxServices.reviewList.getReviewList({
        appraisalFormStatus: '',
        cycleId: activeCycle?.id,
        departmentName: (selectDepartment as string) || '',
        designationName: (selectDesignation as string) || '',
        empStatus: selectEmpstatus,
        employeeID: employeeId,
        endIndex: 20,
        fromDate: reviewFromDate
          ? new Date(reviewFromDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        ratings: [],
        role: checkRole(roleValue as string),
        searchString: searchInput as string,
        startIndex: 0,
        toDate: reviewToDate
          ? new Date(reviewToDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
      }),
    )
  }

  const onViewHandler = () => {
    setFilterByDepartment(selectDepartment as string)
    setFilterByDesignation(selectDesignation as string)
    setIsTableView(true)
    setShowExportButton(true)
    dispatchApiCall()
  }

  const searchBtnHandler = () => {
    dispatchApiCall(selectRadio, searchValue)
  }

  const searchButtonOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      dispatchApiCall(selectRadio, searchValue)
    }
  }

  const handleClearFilters = () => {
    setCycle('')
    setSelectedDepartment('')
    setSelectDesignation('')
    setSelectStatus('')
    setSelectEmpStatus('')
    setSelectRadio('')
    setReviewToDate('')
    setReviewFromDate('')
    setDateError(false)
    setSearchValue('')
    setShowExportButton(false)
    setIsChecked(false)
    setSelectedRating([])
    dispatch(reduxServices.reviewList.actions.clearReviewList())
  }

  const handleExportReviewList = async () => {
    const reviewListDownload = await reviewListApi.exportReviewList({
      activecycleId: cycle as number,
      empStatus: selectEmpstatus,
      departmentName: selectDepartment as string,
      designationName: selectDesignation as string,
      appraisalFormStatus: '',
      status: selectStatus as string,
      search: searchValue,
      ratings: '',
      fromDate: reviewFromDate || null,
      toDate: reviewToDate || null,
    })
    downloadFile(reviewListDownload, 'AppraisalList.csv')
  }

  return (
    <>
      <CRow className="mt-4">
        <CCol sm={3}>
          <CFormLabel>
            Configurations :
            <span className={showIsRequired(cycle as string)}>*</span>
          </CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="configurations"
            data-testid="select-configurations"
            name="configurations"
            value={cycle}
            onChange={(e) => {
              setCycle(e.target.value)
            }}
          >
            <option value="">Select Appraisal Title</option>
            <option value="Custom">Custom</option>
            {appraisalCycles?.map((title, index) => (
              <option key={index} value={title.id}>
                {title.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol sm={3}>
          <CFormLabel>Department :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            className="approval-status-select"
            size="sm"
            id="department"
            data-testid="dept-name"
            name="department"
            value={selectDepartment}
            onChange={(e) => {
              setSelectedDepartment(e.target.value)
            }}
          >
            <option value="">Select Department</option>
            {departments
              ?.slice()
              .sort((dept1, dept2) =>
                dept1.departmentName.localeCompare(dept2.departmentName),
              )
              ?.map((dept, index) => (
                <option key={index} value={dept.departmentId}>
                  {dept.departmentName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
        <CCol sm={3}>
          <CFormLabel>Designation :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="designation"
            data-testid="designation-name"
            name="designation"
            value={selectDesignation}
            onChange={(e) => {
              setSelectDesignation(e.target.value)
            }}
          >
            <option value="">Select Designation</option>
            {designations &&
              designations
                ?.slice()
                .sort((catg1, catg2) => catg1.name.localeCompare(catg2.name))
                ?.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
          </CFormSelect>
        </CCol>
        <CCol sm={3}>
          <CFormLabel>Status :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="status"
            data-testid="select-status"
            name="status"
            value={selectStatus}
            onChange={(e) => {
              setSelectStatus(e.target.value)
            }}
          >
            {reviewListStatus?.map((status, index) => (
              <option key={index} value={status.label}>
                {status.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-4">
        {cycle === 'Custom' && (
          <>
            <CCol sm={3}>
              <CRow>
                <CFormLabel>
                  From:
                  {(reviewFromDate == null || reviewFromDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
                <ReactDatePicker
                  autoComplete="off"
                  id="from-date"
                  data-testid="reviewListFromDate"
                  className="form-control form-control-sm sh-date-picker"
                  dateFormat="MM/yyyy"
                  maxDate={new Date()}
                  showMonthYearPicker
                  placeholderText="mm/yyyy"
                  name="reviewListFromDate"
                  value={
                    reviewFromDate
                      ? new Date(reviewFromDate).toLocaleDateString(
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
                    setReviewFromDate(moment(date).format(commonDateFormat))
                  }
                />
              </CRow>
            </CCol>
            <CCol sm={3} className="justify-content-md-end">
              <CRow>
                <CFormLabel>
                  To:
                  {(reviewToDate == null || reviewToDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
                <ReactDatePicker
                  autoComplete="off"
                  id="from-date"
                  data-testid="reviewListToDate"
                  className="form-control form-control-sm sh-date-picker"
                  dateFormat="MM/yyyy"
                  maxDate={new Date()}
                  showMonthYearPicker
                  placeholderText="mm/yyyy"
                  name="reviewListToDate"
                  value={
                    reviewToDate
                      ? new Date(reviewToDate).toLocaleDateString(
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
                    setReviewToDate(moment(date).format(commonDateFormat))
                  }
                />
                {dateError && (
                  <CCol sm={12} className="mt-1 pt-1">
                    <span className="text-danger fw-bold">
                      To month should be greater than From month
                    </span>
                  </CCol>
                )}
              </CRow>
            </CCol>
          </>
        )}
        <CCol sm={3}>
          <CFormLabel>Ratings:</CFormLabel>
          <CMultiSelect
            options={selectedRating ? ratingOptions : selectedRating}
            onChange={() => handleRatingsChange}
            selectionType="counter"
            data-testid="ratings"
            className="py-1"
          />
        </CCol>
        <CCol sm={3}>
          <CFormLabel>Employee Status :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="employeeStatus"
            data-testid="emp-status"
            name="employeeStatus"
            value={selectEmpstatus}
            onChange={(e) => {
              setSelectEmpStatus(e.target.value)
            }}
          >
            {employeeStatus?.map((status, statusIndex) => (
              <option key={statusIndex} value={status.name}>
                {status.label}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      {showExportButton && (
        <CRow className="justify-content-end mt-4">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1 text-white"
              data-testid="rl-export-button"
              onClick={handleExportReviewList}
            >
              <i className="fa fa-plus me-1"></i>Click to Export
            </CButton>
          </CCol>
        </CRow>
      )}
      <CRow className="mt-3">
        <CCol sm={{ span: 6, offset: 4 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            data-testid="view-button"
            disabled={!isButtonEnabled}
            onClick={onViewHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            color="warning btn-ovh me-1"
            data-testid="clear-button"
            onClick={handleClearFilters}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      <ReviewListSearchFilterOptions
        isChecked={isChecked}
        setIsChecked={setIsChecked}
        setSelectRadio={setSelectRadio}
        selectRadio={selectRadio}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchButtonOnKeyDown={searchButtonOnKeyDown}
        searchBtnHandler={searchBtnHandler}
      />
    </>
  )
}

export default ReviewListFilterOptions
