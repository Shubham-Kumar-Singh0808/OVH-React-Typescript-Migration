import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import {
  Author,
  LoggedEmployee,
} from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const ReservedBy = ({
  loggedEmployeeName,
  allEmployeesProfiles,
  onSelectAuthor,
}: {
  loggedEmployeeName: string
  allEmployeesProfiles: LoggedEmployee[]
  onSelectAuthor: (value: Author) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()

  useEffect(() => {
    setAutoCompleteTarget(loggedEmployeeName)
  }, [loggedEmployeeName])

  useEffect(() => {
    if (autoCompleteTarget) {
      dispatch(reduxServices.newEvent.getAllEmployees(autoCompleteTarget))
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
    <CRow className="mt-1 mb-3">
      <CFormLabel
        className="col-sm-3 col-form-label text-end"
        data-testid="pmLabel"
      >
        Reserved by :
        <span className={autoCompleteTarget ? TextWhite : TextDanger}>*</span>
      </CFormLabel>
      <CCol sm={6}>
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
  )
}

export default ReservedBy
