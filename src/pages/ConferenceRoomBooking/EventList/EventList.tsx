import { CCol, CRow } from '@coreui/react-pro'
import React from 'react'
import EventListFilterOptions from './EventListFilterOptions'
import EventListTable from './EventListTable'
import OCard from '../../../components/ReusableComponent/OCard'

const EventList = (): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Event List"
        CFooterClassName="d-none"
      >
        <CRow className="mb-4">
          <EventListFilterOptions />
          <CCol xs={12} className="mt-4 mb-4 ps-0 pe-0">
            <EventListTable />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default EventList
