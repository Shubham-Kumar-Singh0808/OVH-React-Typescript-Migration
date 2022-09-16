import {
  CRow,
  CCol,
  CButton,
  CForm,
  CFormLabel,
  CFormInput,
} from '@coreui/react-pro'
import React from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { TextDanger } from '../../../../constant/ClassName'

const EventTypeList = (): JSX.Element => {
  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="EventType List"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info"
            className="btn-ovh me-1"
            data-testid="back-button"
          >
            <i className="fa fa-arrow-left  me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <CForm>
        <CRow className="mt-3 mb-3">
          <CFormLabel className="col-sm-3 col-form-label text-end">
            EventType:
          </CFormLabel>
          <CCol sm={3}>
            <CFormInput
              data-testid="eventType"
              type="text"
              id="Name"
              size="sm"
              name="eventType"
              placeholder="Enter EventType"
            />
          </CCol>
          <CCol sm={3}>
            <CButton
              data-testid="addEventTypeBtn"
              color="info"
              className="btn-ovh me-1"
            >
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
          </CCol>
          <CRow>
            <p className={TextDanger} data-testid="Location-name-already-exist">
              <b>Location name already exist</b>
            </p>
          </CRow>
        </CRow>
      </CForm>
    </OCard>
  )
}
export default EventTypeList
