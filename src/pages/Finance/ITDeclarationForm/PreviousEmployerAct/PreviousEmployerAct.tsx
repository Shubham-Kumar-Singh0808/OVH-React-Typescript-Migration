import React from 'react'
import { CCardHeader, CFormInput, CRow } from '@coreui/react-pro'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'
import EmployerEntryItem from './EmployerEntryItem'
import SectionsFilterOptions from '../SectionsFilterOptions'
import { getFormattedDate } from '../ITDeclarationFormHelpers'
import { commonDateFormat } from '../../../../utils/dateFormatUtils'

const PreviousEmployerAct = ({
  enteredOrganization,
  organizationChangeHandler,
  enteredFromDate,
  setEnteredFromDate,
  enteredToDate,
  setEnteredToDate,
}: {
  enteredOrganization: string
  organizationChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  enteredFromDate: string
  setEnteredFromDate: (value: React.SetStateAction<string>) => void
  enteredToDate: string
  setEnteredToDate: (value: React.SetStateAction<string>) => void
}): JSX.Element => {
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
          />
        </EmployerEntryItem>
        <EmployerEntryItem label="From Date">
          <ReactDatePicker
            className="form-control form-control-sm sh-date-picker"
            dropdownMode="select"
            placeholderText="dd/mm/yyyy"
            value={getFormattedDate(enteredFromDate)}
            onChange={(date: Date) =>
              setEnteredFromDate(moment(date).format(commonDateFormat))
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
          />
        </EmployerEntryItem>
      </CRow>
      <SectionsFilterOptions
        showAsterix={false}
        moreSectionButtonText="Add More"
        isOldEmployee={false}
      />
    </>
  )
}

export default PreviousEmployerAct
