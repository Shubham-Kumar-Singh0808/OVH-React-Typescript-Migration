/* eslint-disable sonarjs/cognitive-complexity */
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
import { employeeStatus, reviewRatings } from '../../../constant/constantData'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { deviceLocale, commonDateFormat } from '../../../utils/dateFormatUtils'
import { ReviewListData } from '../../../types/Performance/ReviewList/reviewListTypes'
import { downloadFile, showIsRequired } from '../../../utils/helper'
import { reviewListApi } from '../../../middleware/api/Performance/ReviewList/reviewListApi'

const ReviewListFilterOptions = ({
  setIsTableView,
}: {
  setIsTableView: (value: boolean) => void
  initialReviewList: ReviewListData
}): JSX.Element => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.reviewList.activeCycle())
  }, [dispatch])
  const isActiveCycle = useTypedSelector(
    reduxServices.reviewList.selectors.isActiveCycle,
  )

  const [cycle, setCycle] = useState<number | string>(isActiveCycle.id)
  const [selectDepartment, setSelectedDepartment] = useState<number | string>()
  const [selectDesignation, setSelectDesignation] = useState<number | string>()
  const [selectStatus, setSelectStatus] = useState<string>()
  const [selectEmpstatus, setSelectEmpStatus] = useState<string>('Active')
  const [reviewFromDate, setReviewFromDate] = useState<string>('')
  const [reviewToDate, setReviewToDate] = useState<string>('')
  const [dateError, setDateError] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [selectRadio, setSelectRadio] = useState<string>('')
  const [showExportButton, setShowExportButton] = useState<boolean>(false)
  const [isButtonEnabled, setIsButtonEnabled] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)
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

  const selectedItem = departments.filter(
    (item) => item.departmentId === Number(selectDepartment),
  )

  const selectedDesignationItem = designations.filter(
    (item) => item.id === Number(selectDesignation),
  )
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccessIndividualReviewListFeature = userAccessToFeatures?.find(
    (feature) => feature.name === 'Individual Review List',
  )

  console.log(cycle)

  useEffect(() => {
    if (cycle) {
      setIsButtonEnabled(true)
    } else {
      setIsButtonEnabled(false)
    }
  }, [cycle])

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
        appraisalFormStatus: (selectStatus as string) || '',
        cycleId: cycle === 'Custom' ? -1 : Number(cycle),
        departmentName: selectedItem[0]?.departmentName || '',
        designationName: selectedDesignationItem[0]?.name || '',
        empStatus: selectEmpstatus,
        employeeID: employeeId,
        endIndex: 20,
        fromDate: reviewFromDate
          ? new Date(reviewFromDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
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
            })
          : '',
      }),
    )
  }

  const onViewHandler = () => {
    setSelectedDepartment(selectDepartment as string)
    setSelectDesignation(selectDesignation as string)
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
            id="cycle"
            data-testid="select-configurations"
            name="cycle"
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
        {userAccessIndividualReviewListFeature?.viewaccess ? (
          ''
        ) : (
          <>
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
                    .sort((catg1, catg2) =>
                      catg1.name.localeCompare(catg2.name),
                    )
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
                <option value="" selected>
                  Select Status
                </option>
                <option value="COMPLETED">Completed</option>
                <option value="CLOSED">Closed</option>
                <option value="OPENFORDISCUSSION">Needs Discussion</option>
                <option value="PENDINGAGREEMENT">Needs Acknowledgement</option>
                <option value="PENDING">Review Pending</option>
                <option value="SAVE">Not-Submitted</option>
              </CFormSelect>
            </CCol>
          </>
        )}
      </CRow>
      {userAccessIndividualReviewListFeature?.viewaccess ? (
        ''
      ) : (
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
              options={reviewRatings}
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
      )}
      {userAccessIndividualReviewListFeature?.viewaccess ? (
        ''
      ) : (
        <>
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
        </>
      )}
      {userAccessIndividualReviewListFeature?.viewaccess ? (
        ''
      ) : (
        <>
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
        </>
      )}
      <ReviewListSearchFilterOptions
        setSelectRadio={setSelectRadio}
        selectRadio={selectRadio}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        searchButtonOnKeyDown={searchButtonOnKeyDown}
        searchBtnHandler={searchBtnHandler}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
    </>
  )
}

export default ReviewListFilterOptions
