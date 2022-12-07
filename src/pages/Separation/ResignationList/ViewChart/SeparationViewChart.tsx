import { CRow, CCol, CButton, CFormLabel, CFormSelect } from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReactDatePicker from 'react-datepicker'
import OCard from '../../../../components/ReusableComponent/OCard'
import {
  deviceLocale,
  commonDateFormat,
} from '../../../../utils/dateFormatUtils'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'

const SeparationViewChart = (): JSX.Element => {
  const [select, setSelect] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>('')
  const [toDate, setToDate] = useState<string>('')
  const whiteText = 'text-white'
  const dangerText = 'text-danger'
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (select) {
      dispatch(
        reduxServices.resignationList.getSeparationChart({
          dateSelection: select,
          from: '',
          to: '',
        }),
      )
    }
  }, [dispatch, select])
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
              data-testid="meetingStatus-select"
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
                  data-testid="date"
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
              </CCol>
              <CCol sm={2} md={1} className="text-end">
                <CButton
                  color="info"
                  className="btn-ovh me-1"
                  onClick={viewButtonHandler}
                >
                  <i className="fa fa-eye"></i>View
                </CButton>
              </CCol>
              <CCol sm={2} md={1} className="text-end">
                <CButton
                  color="warning "
                  data-testid="clear-btn"
                  className="btn-ovh"
                >
                  Clear
                </CButton>
              </CCol>
            </>
          )}
          <CCol className="text-end" md={4}>
            <Link to={`/resignationList`}>
              <CButton color="info" className="btn-ovh me-1">
                <i className="fa fa-arrow-left  me-1"></i>Back
              </CButton>
            </Link>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default SeparationViewChart
