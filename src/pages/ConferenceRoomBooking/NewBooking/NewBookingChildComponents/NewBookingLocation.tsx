import { CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React from 'react'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { useTypedSelector } from '../../../../stateStore'

const NewBookingLocation = ({
  onHandleLocation,
  locationValue,
}: {
  onHandleLocation: (value: string) => void
  locationValue: number
}): JSX.Element => {
  const meetingLocation = useTypedSelector(
    (state) => state.bookingList.meetingLocation,
  )

  return (
    <>
      <CFormLabel className="col-sm-3 col-form-label text-end">
        Location :
        <span className={locationValue ? TextWhite : TextDanger}>*</span>
      </CFormLabel>
      <CCol sm={6}>
        <CFormSelect
          aria-label="location"
          id="location"
          data-testid="location-select"
          name="locationId"
          value={locationValue}
          onChange={(e) => {
            onHandleLocation(e.target.value)
          }}
        >
          <option value={''}>Select Location</option>
          {meetingLocation &&
            meetingLocation?.length > 0 &&
            meetingLocation?.map((location, locationIndex) => (
              <option key={locationIndex} value={location.id}>
                {location.locationName}
              </option>
            ))}
        </CFormSelect>
      </CCol>
    </>
  )
}

export default NewBookingLocation
