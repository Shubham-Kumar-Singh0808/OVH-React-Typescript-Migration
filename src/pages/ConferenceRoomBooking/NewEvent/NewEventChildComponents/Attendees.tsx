import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import Autocomplete from 'react-autocomplete'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'
import { LoggedEmployee } from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'

const Attendees = ({
  allEmployeesProfiles,
  isProjectAndAttendeesEnable,
  onSelectAttendee,
  isAttendeeErrorShow,
  setIsAttendeeErrorShow,
  setIsErrorShow,
  attendeesAutoCompleteTarget,
  setAttendeesAutoCompleteTarget,
}: {
  allEmployeesProfiles: LoggedEmployee[]
  isProjectAndAttendeesEnable: boolean
  onSelectAttendee: (attendeeId: number, attendeeName: string) => void
  isErrorShow: boolean
  isAttendeeErrorShow: boolean
  setIsAttendeeErrorShow: (value: boolean) => void
  setIsErrorShow: (value: boolean) => void
  attendeesAutoCompleteTarget: string
  setAttendeesAutoCompleteTarget: (value: string) => void
}): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (attendeesAutoCompleteTarget) {
      dispatch(
        reduxServices.newEvent.getAllEmployees(attendeesAutoCompleteTarget),
      )
    }
  }, [attendeesAutoCompleteTarget])

  const onHandleSelectTrainer = (fullName: string) => {
    setAttendeesAutoCompleteTarget(fullName)
  }

  const onAttendeeFocusOut = () => {
    const selectedProject = allEmployeesProfiles.find(
      (value) => value.fullName === attendeesAutoCompleteTarget,
    )
    if (selectedProject) {
      onSelectAttendee(selectedProject?.id, selectedProject?.fullName)
      setIsErrorShow(false)
    }
  }

  const handleSearchBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const selectedProject = allEmployeesProfiles.find(
        (value) => value.fullName === attendeesAutoCompleteTarget,
      )
      if (selectedProject) {
        onSelectAttendee(selectedProject?.id, selectedProject?.fullName)
        setIsErrorShow(false)
      }
    }
  }

  return (
    <CRow className="mt-3">
      <CFormLabel
        className="col-sm-3 col-form-label text-end  pe-18"
        data-testid="pmLabel"
      >
        Attendees :
      </CFormLabel>
      <CCol sm={6}>
        <Autocomplete
          inputProps={{
            className: 'form-control form-control-sm',
            id: 'trainer-autocomplete',
            placeholder: 'Attendee Name',
            disabled: isProjectAndAttendeesEnable,
            onBlur: onAttendeeFocusOut,
            onKeyDown: handleSearchBtn,
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
          onChange={(e) => {
            setAttendeesAutoCompleteTarget(e.target.value)
            setIsAttendeeErrorShow(false)
          }}
          onSelect={(value) => onHandleSelectTrainer(value)}
        />
        {isAttendeeErrorShow && (
          <CRow className="mt-1">
            <CCol>
              <span className="sh-span-red">
                The employee already added to Attendees
              </span>
            </CCol>
          </CRow>
        )}
      </CCol>
    </CRow>
  )
}
export default Attendees
