import React, { SyntheticEvent } from 'react'
import { CCardHeader, CFormInput, CRow } from '@coreui/react-pro'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import EmployerEntryItem from './EmployerEntryItem'
import { getFormattedDate } from '../ITDeclarationFormHelpers'
import { commonDateFormat } from '../../../../utils/dateFormatUtils'
import { openToDateHandler } from '../../../../utils/datePicketUtils'

const PreviousEmployerAct = ({
  enteredOrganization,
  organizationChangeHandler,
  enteredFromDate,
  setEnteredFromDate,
  enteredToDate,
  setEnteredToDate,
  setEnteredFile,
  dateToShow,
}: {
  enteredOrganization: string
  organizationChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  enteredFromDate: string
  setEnteredFromDate: (value: React.SetStateAction<string>) => void
  enteredToDate: string
  setEnteredToDate: (value: React.SetStateAction<string>) => void
  setEnteredFile: React.Dispatch<React.SetStateAction<File | undefined>>
  dateToShow: Array<string>
}): JSX.Element => {
  const fileUploadHandler = (element: HTMLInputElement) => {
    const file = element.files
    if (file && file !== undefined) {
      setEnteredFile(file[0])
    }
  }

  return (
    <>
      <CCardHeader>
        <h4 className="h4" data-testid="PrevEmpAct-heading">
          Employees Who Joined After {dateToShow[1]} {dateToShow[0]}{' '}
          {dateToShow[2]} (Income from Previous Employer ( Joined After{' '}
          {dateToShow[1]}-{dateToShow[0]}-{dateToShow[2]} ))
        </h4>
      </CCardHeader>
      <CRow className="mt-4 ms-2">
        <EmployerEntryItem label="Organization">
          <CFormInput
            type="text"
            placeholder="Organization"
            value={enteredOrganization}
            onChange={organizationChangeHandler}
            data-testid="itdec-oldOrganizationName"
          />
        </EmployerEntryItem>
        <EmployerEntryItem label="From Date">
          <ReactDatePicker
            className="form-control form-control-sm sh-date-picker"
            dropdownMode="select"
            placeholderText="dd/mm/yyyy"
            value={getFormattedDate(enteredFromDate)}
            highlightDates={[{ 'today-date-highlight': [new Date()] }]}
            onChange={(date: Date) =>
              setEnteredFromDate(moment(date).format(commonDateFormat))
            }
            maxDate={new Date()}
            openToDate={openToDateHandler(enteredFromDate)}
          />
        </EmployerEntryItem>
        <EmployerEntryItem label="To Date">
          <ReactDatePicker
            className="form-control form-control-sm sh-date-picker"
            placeholderText="dd/mm/yyyy"
            dropdownMode="select"
            value={getFormattedDate(enteredToDate)}
            onChange={(date: Date) =>
              setEnteredToDate(moment(date).format(commonDateFormat))
            }
            maxDate={new Date()}
            openToDate={openToDateHandler(enteredFromDate)}
            highlightDates={[{ 'today-date-highlight': [new Date()] }]}
          />
        </EmployerEntryItem>
      </CRow>
      <CRow className="mt-2 ms-2">
        <EmployerEntryItem label="Document">
          <input
            type="file"
            data-testid="prevEmployerActDocUpload"
            onChange={(e: SyntheticEvent) => {
              fileUploadHandler(e.currentTarget as HTMLInputElement)
            }}
          />
        </EmployerEntryItem>
      </CRow>
    </>
  )
}

export default PreviousEmployerAct
