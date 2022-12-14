import {
  CCol,
  CTable,
  CTableHeaderCell,
  CTableBody,
  CTableRow,
  CTableDataCell,
} from '@coreui/react-pro'
import React from 'react'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const SlotsBooked = (): JSX.Element => {
  const allBookedDetailsForEvent = useTypedSelector(
    reduxServices.newEvent.selectors.allBookedDetailsForEvent,
  )

  return (
    <>
      <CCol sm={7} className="sh-slots-col">
        <CTable className="table-slots-booked">
          <CTableBody>
            <CTableRow>
              <CTableHeaderCell className="panel-title">
                Slots Booked
              </CTableHeaderCell>
            </CTableRow>
            {allBookedDetailsForEvent.map((currSlot, index) => {
              return (
                <React.Fragment key={index}>
                  <CTableDataCell className="pt-4">
                    <span className="panel-title pt-4">{currSlot.date}</span>
                    {currSlot.timings.map((slotTimes, slotIndex) => {
                      return (
                        <React.Fragment key={slotIndex}>
                          <p className="panel-time">{slotTimes}</p>
                        </React.Fragment>
                      )
                    })}
                  </CTableDataCell>
                </React.Fragment>
              )
            })}
          </CTableBody>
        </CTable>
      </CCol>
    </>
  )
}

export default SlotsBooked
