import React, { SyntheticEvent } from 'react'
import { CCardHeader, CFormInput, CRow } from '@coreui/react-pro'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import EmployerEntryItem from './EmployerEntryItem'
import { getFormattedDate } from '../ITDeclarationFormHelpers'
import { commonDateFormat } from '../../../../utils/dateFormatUtils'

const PreviousEmployerAct = ({
  enteredOrganization,
  organizationChangeHandler,
  enteredFromDate,
  setEnteredFromDate,
  enteredToDate,
  setEnteredToDate,
  setEnteredFile,
}: {
  enteredOrganization: string
  organizationChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  enteredFromDate: string
  setEnteredFromDate: (value: React.SetStateAction<string>) => void
  enteredToDate: string
  setEnteredToDate: (value: React.SetStateAction<string>) => void
  setEnteredFile: React.Dispatch<React.SetStateAction<File | undefined>>
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
        <h4 className="h4">
          Employees Who Joined After 1st May 2023 (Income from Previous Employer
          ( Joined After 1st-May-2023 ))
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
            openToDate={
              !isNaN(Date.parse(enteredFromDate))
                ? new Date(enteredFromDate)
                : new Date()
            }
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
            openToDate={
              !isNaN(Date.parse(enteredToDate))
                ? new Date(enteredToDate)
                : new Date()
            }
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
