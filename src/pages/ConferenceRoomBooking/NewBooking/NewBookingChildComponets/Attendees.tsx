import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import Autocomplete from 'react-autocomplete'
import { reduxServices } from '../../../../reducers/reduxServices'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { useAppDispatch } from '../../../../stateStore'
import {
  Author,
  NewBookingLoggedEmployeeName,
} from '../../../../types/ConferenceRoomBooking/NewBooking/newBookingTypes'

const Attendees = ({
  allEmployeesProfiles,
  onSelectAuthor,
}: {
  loggedEmployeeName: string
  allEmployeesProfiles: NewBookingLoggedEmployeeName[]
  onSelectAuthor: (value: Author) => void
}): JSX.Element => {
  const [autoCompleteTarget, setAutoCompleteTarget] = useState<string>()

  const dispatch = useAppDispatch()
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
          Attendees:
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
    </>
  )
}

export default Attendees
