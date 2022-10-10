import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'

const EmployeeTimeInOfficeReport = (): JSX.Element => {
  const timeInOfficeEmployeeReport = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.timeInOfficeEmployeeReport,
  )

  return (
    <>
      <CTable striped className="time-in-office-table">
        <CTableHead>
          <CTableRow>
            {timeInOfficeEmployeeReport.dayList &&
              timeInOfficeEmployeeReport.dayList.map((value, index) => {
                return (
                  <CTableHeaderCell key={index} scope="col">
                    {value}
                  </CTableHeaderCell>
                )
              })}
            <CTableHeaderCell scope="col">Total</CTableHeaderCell>
            <CTableHeaderCell scope="col"></CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          <CTableRow>
            {timeInOfficeEmployeeReport.inOfficeDTOs &&
              timeInOfficeEmployeeReport.inOfficeDTOs.map((value, index) => {
                return (
                  <CTableDataCell
                    key={index}
                    className={`color-for-time-${value.colorForTime}`}
                  >
                    {value.spentHours}
                  </CTableDataCell>
                )
              })}
            <CTableDataCell className="color-for-time-total">
              {timeInOfficeEmployeeReport.totalTimeInOfficeHours}
            </CTableDataCell>
          </CTableRow>
        </CTableBody>
      </CTable>
    </>
  )
}

export default EmployeeTimeInOfficeReport
