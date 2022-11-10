import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React from 'react'
import OLoadingSpinner from '../../../components/ReusableComponent/OLoadingSpinner'
import { ApiLoadingState } from '../../../middleware/api/apiList'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { LoadingType } from '../../../types/Components/loadingScreenTypes'

const EmployeeTimeInOfficeReport = (): JSX.Element => {
  const timeInOfficeEmployeeReport = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.timeInOfficeEmployeeReport,
  )

  const isLoading = useTypedSelector(
    reduxServices.timeInOfficeReport.selectors.isLoading,
  )

  return (
    <>
      <CTable
        striped
        responsive
        className="time-in-office-table text-center align-middle"
      >
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
        {isLoading !== ApiLoadingState.loading ? (
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
        ) : (
          <OLoadingSpinner type={LoadingType.PAGE} />
        )}
      </CTable>
    </>
  )
}

export default EmployeeTimeInOfficeReport
