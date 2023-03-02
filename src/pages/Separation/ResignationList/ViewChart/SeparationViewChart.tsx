import ReactFusioncharts from 'react-fusioncharts'
import FusionCharts from 'fusioncharts'
import charts from 'fusioncharts/fusioncharts.charts'
import { CRow, CCol, CButton, CFormLabel, CFormSelect } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import {
  deviceLocale,
  commonDateFormat,
} from '../../../../utils/dateFormatUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import OCard from '../../../../components/ReusableComponent/OCard'

charts(FusionCharts)
const SeparationViewChart = (): JSX.Element => {
  const [fromDate, setFromDate] = useState<string>('')
  const [select, setSelect] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const [dateError, setDateError] = useState<boolean>(false)
  const [isViewButtonEnabled, setIsViewButtonEnabled] = useState(false)
  const whiteText = 'text-white'
  const dangerText = 'text-danger'
  const dispatch = useAppDispatch()
  const dataSource = useTypedSelector(
    reduxServices.resignationList.selectors.separationChartDetails,
  )
  useEffect(() => {
    if (select) {
      dispatch(
        reduxServices.resignationList.getSeparationChart({
          dateSelection: select,
          from: select,
          to: '',
        }),
      )
    }
  }, [dispatch, select])

  const commonFormatDate = 'l'
  const viewButtonHandler = () => {
    dispatch(
      reduxServices.resignationList.getSeparationChart({
        dateSelection: select,
        from: fromDate
          ? new Date(fromDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
        to: toDate
          ? new Date(toDate).toLocaleDateString(deviceLocale, {
              year: 'numeric',
              month: 'numeric',
              day: '2-digit',
            })
          : '',
      }),
    )
  }

  const clearBtnHandler = () => {
    setSelect('')
    setFromDate('')
    setToDate('')
  }

  useEffect(() => {
    if (fromDate && toDate) {
      setIsViewButtonEnabled(true)
    } else {
      setIsViewButtonEnabled(false)
    }
  }, [fromDate, toDate])

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
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Resignation List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mb-5">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">Select :</CFormLabel>
          </CCol>
          <CCol sm={2}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="Select"
              data-testid="select-test"
              name="Select"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              <option value="">Select Month</option>
              <option value="Last Month">Last Month</option>
              <option value="Current Month">Current Month</option>
              <option value="Custom">Custom</option>
            </CFormSelect>
          </CCol>
          {select === 'Custom' && (
            <>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">
                  From :
                  <span className={fromDate ? whiteText : dangerText}>*</span>
                </CFormLabel>
              </CCol>
              <CCol sm={2}>
                <ReactDatePicker
                  autoComplete="off"
                  id="fromDate"
                  data-testid="from-date"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yyyy"
                  name="fromDate"
                  value={
                    fromDate
                      ? new Date(fromDate).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })
                      : ''
                  }
                  onChange={(date: Date) =>
                    setFromDate(moment(date).format(commonDateFormat))
                  }
                />
              </CCol>
              <CCol sm={2} md={1} className="text-end">
                <CFormLabel className="mt-1">
                  To :
                  <span className={fromDate ? whiteText : dangerText}>*</span>
                </CFormLabel>
              </CCol>
              <CCol sm={2}>
                <ReactDatePicker
                  autoComplete="off"
                  id="toDate"
                  data-testid="date"
                  className="form-control form-control-sm sh-date-picker"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  placeholderText="dd/mm/yyyy"
                  name="toDate"
                  value={
                    toDate
                      ? new Date(toDate).toLocaleDateString(deviceLocale, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                        })
                      : ''
                  }
                  onChange={(date: Date) =>
                    setToDate(moment(date).format(commonDateFormat))
                  }
                />
                {dateError && (
                  <span className="text-danger">
                    <b>To date should be greater than From date</b>
                  </span>
                )}
              </CCol>
              <CCol sm={2} md={1} className="text-end p-0">
                <CButton
                  color="info"
                  className="btn-ovh me-1"
                  onClick={viewButtonHandler}
                  disabled={!isViewButtonEnabled}
                >
                  <i className="fa fa-eye"></i>View
                </CButton>
              </CCol>
              <CCol sm={2} md={1} className="text-end">
                <CButton
                  color="warning "
                  data-testid="clear-btn"
                  className="btn-ovh"
                  onClick={clearBtnHandler}
                >
                  Clear
                </CButton>
              </CCol>
            </>
          )}
          <CCol className="text-end p-0">
            <Link to={`/resignationList`}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
        <div className="text-center">
          <ReactFusioncharts
            type="pie3d"
            width="600"
            height="400"
            dataFormat="JSON"
            dataSource={dataSource}
          />
        </div>
      </OCard>
    </>
  )
}

export default SeparationViewChart
