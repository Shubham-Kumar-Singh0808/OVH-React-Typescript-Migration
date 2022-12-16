import moment from 'moment'
import {
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CContainer,
  CFormSelect,
  CButton,
  CFormText,
} from '@coreui/react-pro'
import ReactDatePicker from 'react-datepicker'
import React, { useEffect } from 'react'
import { useTypedSelector } from '../../../stateStore'
import {
  AchieverListFilterOptionsProps,
  SelectMonthOptions,
} from '../../../types/Achievements/AchieverList/AchieverListTypes'
import { commonDateFormat, deviceLocale } from '../../../utils/dateFormatUtils'
import { TextDanger } from '../../../constant/ClassName'
import { AchievementType } from '../../../types/Achievements/commonAchievementTypes'
import { selectAchievementType } from '../AchievementConstants'

const selectMonthConst = 'Select Month'
const selectList = [
  String(SelectMonthOptions.lastMonth),
  String(SelectMonthOptions.currentMonth),
  String(SelectMonthOptions.customDate),
]

const compareTheDates = (fromDate: string, toDate: string) => {
  const fromD = Date.parse(fromDate)
  const toD = Date.parse(toDate)
  return fromD > toD
}

const AchieverListFilterOptions = (
  props: AchieverListFilterOptionsProps,
): JSX.Element => {
  const {
    currentSelectedOption,
    selectedOptionChangeHandler,
    currentAchievement,
    achievementChangeHandler,
    achieverFromDate,
    setAchieverFromDate,
    achieverToDate,
    setAchieverToDate,
    isViewButtonEnabled,
    setViewButton,
    clearButtonHandler,
    filterHandler,
  } = props

  const achievementTypes = useTypedSelector(
    (state) => state.commonAchievements.achievementTypeList,
  )

  const fromDate = achieverFromDate
    ? moment(
        new Date(achieverFromDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      ).format('MM-YYYY')
    : ''

  const toDate = achieverToDate
    ? moment(
        new Date(achieverToDate).toLocaleDateString(deviceLocale, {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
      ).format('MM-YYYY')
    : ''

  useEffect(() => {
    if (
      currentSelectedOption !== selectMonthConst ||
      currentAchievement !== selectAchievementType
    ) {
      setViewButton(true)
      if (
        currentSelectedOption === SelectMonthOptions.customDate &&
        (achieverFromDate === null ||
          achieverFromDate === '' ||
          achieverToDate === null ||
          achieverToDate === '' ||
          compareTheDates(achieverFromDate, achieverToDate))
      ) {
        setViewButton(false)
      }
    } else {
      setViewButton(false)
    }
  }, [
    currentSelectedOption,
    currentAchievement,
    achieverFromDate,
    achieverToDate,
  ])

  const datesErrorMessage = compareTheDates(
    achieverFromDate,
    achieverToDate,
  ) ? (
    <div data-testid="error-msg-date">
      <CFormText className={TextDanger}>
        To month should be greater than From month
      </CFormText>
    </div>
  ) : (
    <></>
  )

  return (
    <CForm onSubmit={filterHandler}>
      <CContainer className="mt-4 ms-2">
        <CRow>
          <CCol xs={12} md={3} className="mb-1">
            <CFormLabel>Select:</CFormLabel>
            <CFormSelect
              data-testid="select-date-type"
              aria-label="Default select example"
              size="sm"
              value={currentSelectedOption}
              onChange={selectedOptionChangeHandler}
            >
              <option
                value={selectMonthConst}
                data-testid="select-month-options-default"
              >
                {selectMonthConst}
              </option>
              {selectList.map((item, index) => (
                <option
                  key={index}
                  value={item}
                  data-testid="select-month-options"
                >
                  {item}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={2}></CCol>
          <CCol xs={12} md={3} className="mb-1">
            <CFormLabel>Achievement Type:</CFormLabel>
            <CFormSelect
              data-testid="achievement-type-select"
              aria-label="Default select example"
              size="sm"
              value={currentAchievement}
              onChange={achievementChangeHandler}
            >
              <option
                value={selectAchievementType}
                data-testid="achievement-option-default"
              >
                {selectAchievementType}
              </option>
              {achievementTypes?.list.map(
                (item: AchievementType, index: number) => (
                  <option
                    key={index}
                    value={item.typeName}
                    data-testid="achievement-option-fetched"
                  >
                    {item.typeName}
                  </option>
                ),
              )}
            </CFormSelect>
          </CCol>
        </CRow>
        {currentSelectedOption !== SelectMonthOptions.customDate ? (
          <></>
        ) : (
          <>
            <CRow className="mt-2" data-testid="check">
              <CCol md={1}></CCol>
              <CCol xs={12} md={2} className="mb-1">
                <CFormLabel className="mb0">
                  From :
                  {(achieverFromDate == null || achieverFromDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
                <ReactDatePicker
                  dateFormat="MMMM yyyy"
                  id="fromDate"
                  data-testid="achieverList-fromDate"
                  autoComplete="off"
                  className="form-control form-control-sm sh-date-picker"
                  placeholderText="MM-YYYY"
                  peekNextMonth
                  showMonthYearPicker
                  dropdownMode="select"
                  value={fromDate}
                  onChange={(date: Date) =>
                    setAchieverFromDate(moment(date).format(commonDateFormat))
                  }
                />
              </CCol>
              <CCol md={1}></CCol>
              <CCol xs={12} md={2}>
                <CFormLabel className="mb0">
                  To :
                  {(achieverToDate == null || achieverToDate === '') && (
                    <span className="text-danger">*</span>
                  )}
                </CFormLabel>
                <ReactDatePicker
                  dateFormat="MMMM yyyy"
                  id="toDate"
                  data-testid="achieverList-toDate"
                  autoComplete="off"
                  className="form-control form-control-sm sh-date-picker"
                  placeholderText="MM-YYYY"
                  peekNextMonth
                  maxDate={new Date()}
                  showMonthYearPicker
                  dropdownMode="select"
                  value={toDate}
                  onChange={(date: Date) =>
                    setAchieverToDate(moment(date).format(commonDateFormat))
                  }
                />
                <>{datesErrorMessage}</>
              </CCol>
            </CRow>
          </>
        )}
      </CContainer>
      <CRow className="mt-4">
        <CFormLabel className="col-form-label category-label col-sm-4 col-form-label text-end"></CFormLabel>
        <CCol sm={4}>
          <CButton
            data-testid="view-btn-id"
            type="submit"
            className="btn-ovh me-1"
            color="success"
            disabled={!isViewButtonEnabled}
          >
            View
          </CButton>
          <CButton
            data-testid="clear-btn-id"
            color="warning "
            className="btn-ovh me-1"
            onClick={clearButtonHandler}
          >
            Clear
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  )
}

export default AchieverListFilterOptions
