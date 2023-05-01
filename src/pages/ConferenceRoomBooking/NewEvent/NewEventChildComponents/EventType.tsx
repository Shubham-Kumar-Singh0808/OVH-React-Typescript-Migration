import { CRow, CFormLabel, CCol, CFormSelect, CButton } from '@coreui/react-pro'
import React from 'react'
import { Link } from 'react-router-dom'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { EventTypeList } from '../../../../types/ConferenceRoomBooking/NewEvent/newEventTypes'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const EventType = ({
  eventTypeList,
  eventTypeValue,
  onHandleEventType,
}: {
  eventTypeList: EventTypeList[]
  eventTypeValue: number
  onHandleEventType: (value: string) => void
}): JSX.Element => {
  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Add Event',
  )
  return (
    <CRow className="mt-1 mb-3">
      <CFormLabel className="col-sm-3 col-form-label text-end">
        EventType :
        <span className={eventTypeValue ? TextWhite : TextDanger}>*</span>
      </CFormLabel>
      <CCol sm={6}>
        <CFormSelect
          aria-label="location"
          id="location"
          data-testid="eventTypeSelect-test"
          name="location"
          value={eventTypeValue}
          onChange={(e) => {
            onHandleEventType(e.target.value)
          }}
        >
          <option value="">Select Event</option>
          {eventTypeList?.map((eventType, eventTypeIndex) => (
            <option key={eventTypeIndex} value={eventType.id}>
              {eventType.name}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol className="col-sm-3">
        {userAccess?.viewaccess && (
          <Link to={'/addEventType'}>
            <CButton color="info btn-ovh me-1">
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
          </Link>
        )}
      </CCol>
    </CRow>
  )
}

export default EventType
