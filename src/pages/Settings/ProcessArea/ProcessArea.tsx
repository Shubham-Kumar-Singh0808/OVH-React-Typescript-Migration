import { CRow, CCol, CFormLabel, CFormSelect } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch } from '../../../stateStore'

const ProcessArea = (): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.roomLists.getMeetingRooms())
    dispatch(reduxServices.addLocationList.getAllMeetingLocationsData())
  }, [dispatch])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Process Area List"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <CRow className="mb-3 mt-3">
          <CCol sm={2} md={1} className="text-end">
            <CFormLabel className="mt-1">Category: </CFormLabel>
          </CCol>
          <CCol sm={3}>
            <CFormSelect
              aria-label="Default select example"
              size="sm"
              id="location"
              data-testid="form-select1"
              name="location"
            >
              <option value={''}>-- Select Category --</option>
            </CFormSelect>
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default ProcessArea
