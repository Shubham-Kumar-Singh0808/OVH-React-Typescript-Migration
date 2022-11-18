import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import { LoggedEmployee } from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const Attendees = ({
  allEmployeesProfiles,
  isProjectAndAttendeesEnable,
}: {
  allEmployeesProfiles: LoggedEmployee[]
  isProjectAndAttendeesEnable: boolean
}): JSX.Element => {
  const dispatch = useAppDispatch()

  const [attendeesAutoCompleteTarget, setAttendeesAutoCompleteTarget] =
    useState<string>()

  useEffect(() => {
    if (attendeesAutoCompleteTarget) {
      dispatch(
        reduxServices.newEvent.getAllEmployees(attendeesAutoCompleteTarget),
      )
    }
  }, [attendeesAutoCompleteTarget])

  const onHandleSelectTrainer = (fullName: string) => {
    setAttendeesAutoCompleteTarget(fullName)
    // const attendee = allEmployeesProfiles.find(
    //   (value) => value.fullName === fullName,
    // )
  }
  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel className="col-sm-2 col-form-label text-end">
        Attendees:
        <span className={attendeesAutoCompleteTarget ? TextWhite : TextDanger}>
          *
        </span>
      </CFormLabel>
      <CCol sm={4}>
        <Autocomplete
          inputProps={{
            className: 'form-control form-control-sm',
            id: 'trainer-autocomplete',
            placeholder: 'Trainer',
            disabled: isProjectAndAttendeesEnable,
          }}
          getItemValue={(item) => item.fullName}
          items={allEmployeesProfiles}
          data-testid="author-input"
          wrapperStyle={{ position: 'relative' }}
          renderMenu={(children) => (
            <div
              className={
                attendeesAutoCompleteTarget &&
                attendeesAutoCompleteTarget.length > 0
                  ? 'autocomplete-dropdown-wrap'
                  : 'autocomplete-dropdown-wrap hide'
              }
            >
              {children}
            </div>
          )}
          renderItem={(item, isHighlighted) => (
            <div
              data-testid="trainer-option"
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
          value={attendeesAutoCompleteTarget}
          shouldItemRender={(item, value) =>
            item.fullName.toLowerCase().indexOf(value.toLowerCase()) > -1
          }
          onChange={(e) => setAttendeesAutoCompleteTarget(e.target.value)}
          onSelect={(value) => onHandleSelectTrainer(value)}
        />
      </CCol>
    </CRow>
  )
}

export default Attendees
