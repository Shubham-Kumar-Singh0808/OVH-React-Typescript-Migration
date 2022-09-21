import {
  CButton,
  CCol,
  CForm,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect } from 'react'
import {
  Attendees,
  EventEndDate,
  EventFromDate,
  EventType,
  LocationAndRoom,
  ReservedBy,
  SelectProject,
  StartTimeEndTime,
  Trainer,
} from './NewEventChildComponents'
import OCard from '../../../components/ReusableComponent/OCard'
import { ckeditorConfig } from '../../../utils/ckEditorUtils'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const NewEvent = (): JSX.Element => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.eventTypeList.getEventTypes())
  }, [dispatch])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title="New Event"
      CBodyClassName="ps-0 pe-0"
      CFooterClassName="d-none"
    >
      <CForm>
        <LocationAndRoom />
        <ReservedBy />
        <Trainer />
        <EventType />
        <EventFromDate />
        <EventEndDate />
        <StartTimeEndTime />
        <CRow className="mt-1 mb-3">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Subject:
            <span>*</span>
          </CFormLabel>
          <CCol sm={5}>
            <CFormTextarea
              placeholder="Purpose"
              aria-label="textarea"
            ></CFormTextarea>
          </CCol>
        </CRow>
        <CRow className="mt-1 mb-3">
          <CFormLabel className="col-sm-2 col-form-label text-end">
            Description:
            <span>*</span>
          </CFormLabel>
          <CCol sm={6}>
            <CKEditor<{
              onChange: CKEditorEventHandler<'change'>
            }>
              initData={''}
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                console.log(editor.getData().trim())
              }}
            />
          </CCol>
        </CRow>
        <SelectProject />
        <Attendees />
        <CRow className="mt-5 mb-4">
          <CCol md={{ span: 6, offset: 2 }}>
            <>
              <CButton
                className="btn-ovh me-1"
                data-testid="confirmBtn"
                color="success"
              >
                Confirm
              </CButton>
              <CButton
                color="warning "
                data-testid="clearBtn"
                className="btn-ovh"
              >
                Clear
              </CButton>
            </>
          </CCol>
        </CRow>
      </CForm>
    </OCard>
  )
}
export default NewEvent
