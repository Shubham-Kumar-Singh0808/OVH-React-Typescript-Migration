import { CRow, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import React from 'react'

const PayrollManagementFilterOptions = ({
  selectMonth,
  setSelectMonth,
  selectYear,
  setSelectYear,
  isPercentageEnable,
}: {
  selectMonth: string
  setSelectMonth: React.Dispatch<React.SetStateAction<string>>
  selectYear: string
  setSelectYear: React.Dispatch<React.SetStateAction<string>>
  isPercentageEnable: boolean
}): JSX.Element => {
  const currentYear = new Date().getFullYear()
  const previousYears = currentYear - 4
  const years = []
  for (let i = currentYear; i >= previousYears; i--) {
    years.push(i)
  }
  return (
    <>
      <CRow className="mb-3">
        <CCol className="col-sm-2 control-label text-left">
          <CFormLabel className="mt-2">
            Select Month:{' '}
            <span className={selectMonth ? 'text-white' : 'text-danger'}>
              *
            </span>
          </CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="Month"
            data-testid="form-select1"
            name="Month"
            value={selectMonth}
            onChange={(e) => {
              setSelectMonth(e.target.value)
            }}
          >
            <option value={''}>Select Month</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>
          </CFormSelect>
        </CCol>
        <CCol className="col-sm-2 control-label text-left">
          <CFormLabel className="mt-1" data-testid="form-select2">
            Select Year:{' '}
            <span className={selectYear ? 'text-white' : 'text-danger'}>*</span>
          </CFormLabel>
        </CCol>
        <CCol sm={2}>
          <CFormSelect
            aria-label="Default select example"
            size="sm"
            id="Year"
            data-testid="form-select2"
            name="Year"
            disabled={!isPercentageEnable}
            value={selectYear}
            onChange={(e) => {
              setSelectYear(e.target.value)
            }}
          >
            <option value={''}>Select Year</option>
            {years.length > 0 &&
              years?.map((year, index) => <option key={index}>{year}</option>)}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default PayrollManagementFilterOptions
