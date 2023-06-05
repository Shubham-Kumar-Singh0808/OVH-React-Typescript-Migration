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

const SlotsBookedForRoom = (): JSX.Element => {
  const allBookedDetailsForRoom = useTypedSelector(
    reduxServices.newBooking.selectors.slotsBookedForRoom,
  )
  console.log(allBookedDetailsForRoom)
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
            {allBookedDetailsForRoom.map((currSlot, index) => {
              return (
                <React.Fragment key={index}>
                  <CTableRow>
                    <CTableDataCell>
                      <React.Fragment key={index}>
                        <strong className="panel-time">
                          {currSlot.startTime} {''} to {''} {currSlot.endTime}
                        </strong>
                      </React.Fragment>
                    </CTableDataCell>
                  </CTableRow>
                </React.Fragment>
              )
            })}
          </CTableBody>
        </CTable>
      </CCol>
    </>
  )
}

export default SlotsBookedForRoom
