import { CCol, CFormLabel, CRow } from '@coreui/react-pro'
import DatePicker from 'react-datepicker'
import React, { useEffect } from 'react'
import moment from 'moment'
import { DateOfJoiningChangeHandlerProp } from '../../../../types/Recruitment/UpComingJoinList/UpComingJoinListTypes'
import { showIsRequired } from '../../../../utils/helper'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'
import { deviceLocale } from '../../../../utils/dateFormatUtils'

const DateOfJoining = ({
  dynamicFormLabelProps,
  dateValue,
  setEmployeeDateOfJoining,
}: DateOfJoiningChangeHandlerProp): JSX.Element => {
  const commonFormatDate = 'l'
  const getJoineeDetails = useTypedSelector(
    reduxServices.upComingJoinList.selectors.getJoineeDetails,
  )
  useEffect(() => {
    if (getJoineeDetails.dateOfJoining) {
      setEmployeeDateOfJoining(getJoineeDetails.dateOfJoining)
    }
  }, [getJoineeDetails.dateOfJoining])
  console.log(dateValue)
  return (
    <>
      <CRow className="mb-3">
        <CFormLabel
          {...dynamicFormLabelProps(
            'dateofJoining',
            'col-sm-3 col-form-label text-end',
          )}
        >
          Date of Joining:
          <span className={showIsRequired(dateValue)}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <DatePicker
            id="joinedDate"
            className="form-control form-control-sm sh-date-picker"
            maxDate={new Date()}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/mm/yy"
            placeholderText="dd/mm/yyyy"
            name="joinedDate"
            value={dateValue}
            // onChange={(date: Date) => setEmployeeDateOfJoining(date)}
            onChange={(date: Date) =>
              setEmployeeDateOfJoining(moment(date).format(commonFormatDate))
            }
          />
        </CCol>
      </CRow>
    </>
  )
}

export default DateOfJoining
