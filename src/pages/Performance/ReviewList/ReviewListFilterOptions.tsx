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
import {
  reviewListStatus,
  employeeStatus,
} from '../../../constant/constantData'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { deviceLocale, commonDateFormat } from '../../../utils/dateFormatUtils'

const ReviewListFilterOptions = (): JSX.Element => {
  const [cycle, setCycle] = useState<string>()
  const [reviewFromDate, setReviewFromDate] = useState<string>('')
  const [reviewToDate, setReviewToDate] = useState<string>('')
  const [dateError, setDateError] = useState<boolean>(false)

  const appraisalCycles = useTypedSelector(
    reduxServices.reviewList.selectors.appraisalCycles,
  )

  useEffect(() => {
    const start = moment(reviewFromDate, commonDateFormat).format(
      commonDateFormat,
    )
    const end = moment(reviewToDate, commonDateFormat).format(commonDateFormat)

    setDateError(moment(end).isBefore(start))
  }, [reviewFromDate, reviewToDate])

  useEffect(() => {
    if (appraisalCycles) {
      const getActiveCycle = appraisalCycles?.filter(
        (currentCycle) => currentCycle.active === true,
      )
      setCycle(String(getActiveCycle[0]?.id))
    }
  }, [appraisalCycles])

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
            {appraisalCycles
              .slice()
              .sort((cycle1, cycle2) => cycle1.name.localeCompare(cycle2.name))
              ?.map((title, index) => (
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
            // value={approvalStatus}
            // onChange={(e) => {
            //   setApprovalStatus(e.target.value)
            // }}
          ></CFormSelect>
        </CCol>
        <CCol sm={3}>
          <CFormLabel>Designation :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="categoryName"
            data-testid="categoryNameSelect"
            name="categoryName"
            // value={categoryId}
            // onChange={(e) => {
            //   setCategoryId(Number(e.target.value))
            // }}
          >
            <option value="">Select Designation :</option>
          </CFormSelect>
        </CCol>
        <CCol sm={3}>
          <CFormLabel>Status :</CFormLabel>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="subCategoryName"
            data-testid="subCategoryNameSelect"
            name="subCategoryName"
            // value={subCategoryIdValue}
            // onChange={(e) => {
            //   setSubCategoryIdValue(Number(e.target.value))
            // }}
          >
            {reviewListStatus.map((status, index) => (
              <option key={index} value={status.label}>
                {status.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>
      <CRow className="mt-4 justify-content-between">
        <CCol sm={2}>
          <CFormLabel>Ratings:</CFormLabel>
          <CMultiSelect options={[]} />
        </CCol>
        <CCol sm={7} className="d-md-flex justify-content-md-end">
          <CCol sm={3} className="ticket-from-date-col">
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
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                name="ticketsFromDate"
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
                data-testid="ticketsApprovalsToDate"
                className="form-control form-control-sm sh-date-picker"
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yy"
                name="ticketsToDate"
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
        </CCol>
      </CRow>
      <CRow className="mt-3">
        <CCol sm={{ span: 6, offset: 4 }}>
          <CButton className="cursor-pointer" color="success btn-ovh me-1">
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
    </>
  )
}

export default ReviewListFilterOptions
