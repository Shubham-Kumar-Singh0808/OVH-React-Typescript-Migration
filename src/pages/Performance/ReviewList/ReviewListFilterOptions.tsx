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

const ReviewListFilterOptions = ({
  setIsTableView,
  setFilterByDepartment,
  setFilterByDesignation,
  setSelectCycleId,
  selectCycleId,
  initialReviewList,
  setReviewListParams,
}: {
  setFilterByDepartment: (value: string) => void
  setFilterByDesignation: (value: string) => void
  setIsTableView: (value: boolean) => void
  selectCycleId: number
  setSelectCycleId: (value: number) => void
  initialReviewList: ReviewListData
  setReviewListParams: React.Dispatch<React.SetStateAction<ReviewListData>>
}): JSX.Element => {
  const [cycle, setCycle] = useState<number | string>()
  const [selectDepartment, setSelectedDepartment] = useState<number | string>()
  const [selectDesignation, setSelectDesignation] = useState<number | string>()
  const [selectStatus, setSelectStatus] = useState<string>()
  const [selectEmpstatus, setSelectEmpStatus] = useState<string>('Active')
  const [reviewFromDate, setReviewFromDate] = useState<string>('')
  const [reviewToDate, setReviewToDate] = useState<string>('')
  const [dateError, setDateError] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectRadio, setSelectRadio] = useState<string>('')

  const appraisalCycles = useTypedSelector(
    reduxServices.reviewList.selectors.appraisalCycles,
  )
  const designations = useTypedSelector(
    reduxServices.reviewList.selectors.designations,
  )

  const departments = useTypedSelector(
    reduxServices.reviewList.selectors.departments,
  )

  const employeeId = useTypedSelector(
    reduxServices.authentication.selectors.selectEmployeeId,
  )

  const dispatch = useAppDispatch()
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
        cycleId: cycle as number,
        departmentName: (selectDepartment as string) || '',
        designationName: (selectDesignation as string) || '',
        empStatus: selectEmpstatus,
        employeeID: (employeeId as string) || '',
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
    setSelectCycleId(cycle as number)
    setIsTableView(true)
    dispatchApiCall()
  }

  const prepareReviewListObject = {
    appraisalFormStatus: '',
    cycleId: cycle as number,
    departmentName: '',
    designationName: '',
    empStatus: '',
    employeeID: employeeId,
    endIndex: 20,
    fromDate: '',
    ratings: [],
    role: '',
    searchString: '',
    startIndex: 0,
    toDate: '',
  }

  const searchBtnHandler = () => {
    console.log('Submit')
    dispatchApiCall(selectRadio, searchValue)
  }

  const searchButtonOnKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      console.log('Enter')
      dispatchApiCall(selectRadio, searchValue)
    }
  }

  return (
    <>
      <CRow className="mt-4">
        <CCol sm={3}>
          <CFormLabel>Configurations :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="reviewStatus"
            data-testid="review-status"
            name="reviewStatus"
            value={cycle}
            onChange={(e) => {
              setCycle(e.target.value)
            }}
          >
            <option value="">Select Appraisal Title</option>
            <option value="">Custom</option>
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
              .slice()
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
            data-testid="categoryNameSelect"
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
            data-testid="subCategoryNameSelect"
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
      <CRow className="mt-4 justify-content-between">
        <CCol sm={2} className="ticket-from-date-col">
          {}
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
              data-testid="ticketsApprovalsFromDate"
              className="form-control form-control-sm sh-date-picker"
              dateFormat="MM/yyyy"
              maxDate={new Date()}
              showMonthYearPicker
              placeholderText="mm/yyyy"
              name="reviewListFromDate"
              value={
                reviewFromDate
                  ? new Date(reviewFromDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
                  : ''
              }
              onChange={(date: Date) =>
                setReviewFromDate(moment(date).format(commonDateFormat))
              }
            />
          </CRow>
        </CCol>

        <CCol sm={2} className="justify-content-md-end">
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
              data-testid="ticketsApprovalsToDate"
              className="form-control form-control-sm sh-date-picker"
              dateFormat="MM/yyyy"
              maxDate={new Date()}
              showMonthYearPicker
              placeholderText="mm/yyyy"
              name="reviewListToDate"
              value={
                reviewToDate
                  ? new Date(reviewToDate).toLocaleDateString(deviceLocale, {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })
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
        <CCol sm={3}>
          <CFormLabel>Ratings:</CFormLabel>
          <CMultiSelect options={reviewRatings} />
        </CCol>
        <CCol sm={3}>
          <CFormLabel>Employee Status :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="employeeStatus"
            data-testid="subCategoryNameSelect"
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
      <CRow className="mt-3">
        <CCol sm={{ span: 6, offset: 4 }}>
          <CButton
            className="cursor-pointer"
            color="success btn-ovh me-1"
            onClick={onViewHandler}
          >
            View
          </CButton>
          <CButton
            className="cursor-pointer"
            disabled={false}
            color="warning btn-ovh me-1"
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
      <ReviewListSearchFilterOptions
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
