import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { reduxServices } from '../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

const MyTicketsTable = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const getAllTickets = useTypedSelector(
    reduxServices.myTickets.selectors.allTickets,
  )

  useEffect(() => {
    dispatch(
      reduxServices.myTickets.getTickets({
        endIndex: 20,
        multiSearch: '',
        startIndex: 0,
      }),
    )
  }, [dispatch])
  console.log(getAllTickets)
  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">Ticket No</CTableHeaderCell>
            <CTableHeaderCell scope="col">Subject</CTableHeaderCell>
            <CTableHeaderCell scope="col">Description</CTableHeaderCell>
            <CTableHeaderCell scope="col">Priority</CTableHeaderCell>
            <CTableHeaderCell scope="col">Start Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">End Date</CTableHeaderCell>
            <CTableHeaderCell scope="col">Approval Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Ticket Status</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {getAllTickets &&
            getAllTickets?.map((ticket, index) => {
              return (
                <CTableRow key={index}>
                  <CTableHeaderCell scope="row">{ticket.id}</CTableHeaderCell>
                  <CTableDataCell>{ticket.subject}</CTableDataCell>
                  <CTableDataCell>{ticket.description}</CTableDataCell>
                  <CTableDataCell>{ticket.priority}</CTableDataCell>
                  <CTableDataCell>{ticket.startDate}</CTableDataCell>
                  <CTableDataCell>{ticket.endDate}</CTableDataCell>
                  <CTableDataCell>{ticket.approvalStatus}</CTableDataCell>
                  <CTableDataCell>{ticket.status}</CTableDataCell>
                  <CTableDataCell>
                    <CButton color="info" className="btn-ovh me-2">
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                    <CButton color="info" className="btn-ovh me-2">
                      <i
                        className="fa fa-times text-white"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                    <CButton color="info" className="btn-ovh me-2">
                      <i
                        className="fa fa-bar-chart text-white"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}

export default MyTicketsTable
