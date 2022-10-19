import React, { useEffect, useState } from 'react'
import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import Autocomplete from 'react-autocomplete'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import { useAppDispatch } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import {
  Author,
  NewBookingLoggedEmployeeName,
} from '../../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'
import { showIsRequired } from '../../../../utils/helper'
import {
  commonDateFormat,
  deviceLocale,
} from '../../../../utils/dateFormatUtils'

const NewRoomReservedBy = ({
  loggedEmployeeName,
  allEmployeesProfiles,
  onSelectAuthor,
  fromDate,
  setFromDate,
}: {
  loggedEmployeeName: string
  allEmployeesProfiles: NewBookingLoggedEmployeeName[]
  onSelectAuthor: (value: Author) => void
  fromDate: string
  setFromDate: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()

  useEffect(() => {
    setAutoCompleteTarget(loggedEmployeeName)
  }, [loggedEmployeeName])

  useEffect(() => {
    if (autoCompleteTarget) {
      dispatch(reduxServices.newBooking.getAllEmployees(autoCompleteTarget))
    }
  }, [autoCompleteTarget])

  const onHandleSelectAuthor = (fullName: string) => {
    setAutoCompleteTarget(fullName)
    const author = allEmployeesProfiles.find(
      (value) => value.fullName === fullName,
    )
    onSelectAuthor(author as Author)
  }

  return (
    <>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          Reserved by:
          <span className={autoCompleteTarget ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <Autocomplete
            inputProps={{
              className: 'form-control form-control-sm',
              id: 'author-autocomplete',
              placeholder: 'Reserved By',
            }}
            getItemValue={(item) => item.fullName}
            items={allEmployeesProfiles}
            data-testid="author-input"
            wrapperStyle={{ position: 'relative' }}
            renderMenu={(children) => (
              <div
                className={
                  autoCompleteTarget && autoCompleteTarget.length > 0
                    ? 'autocomplete-dropdown-wrap'
                    : 'autocomplete-dropdown-wrap hide'
                }
              >
                {children}
              </div>
            )}
            renderItem={(item, isHighlighted) => (
              <div
                data-testid="author-option"
                className={
                  isHighlighted
                    ? 'autocomplete-dropdown-item active'
                    : 'autocomplete-dropdown-item '
                }
                key={item.id}
              >
                {item.fullName}
              </div>
            )}
            value={autoCompleteTarget}
            shouldItemRender={(item, value) =>
              item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
            }
            onChange={(e) => setAutoCompleteTarget(e.target.value)}
            onSelect={(value) => onHandleSelectAuthor(value)}
          />
        </CCol>
      </CRow>
      <CRow className="mt-1 mb-3">
        <CFormLabel className="col-sm-2 col-form-label text-end">
          From Date:
          <span className={showIsRequired(fromDate)}>*</span>
        </CFormLabel>
        <CCol sm={4}>
          <ReactDatePicker
            id="fromDate"
            data-testid="dateOptionSelect"
            className="form-control form-control-sm sh-date-picker sh-leave-form-control"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            minDate={new Date()}
            dropdownMode="select"
            dateFormat="dd/mm/yy"
            placeholderText="DD/MM/YY"
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
      </CRow>
    </>
  )
}

export default NewRoomReservedBy
