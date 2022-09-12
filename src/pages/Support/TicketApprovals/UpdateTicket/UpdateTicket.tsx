import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import UpdateTicketHistory from './UpdateTicketHistory'
import UpdateTicketEditFields from './UpdateTicketEditFields'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../stateStore'

const UpdateTicket = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const { ticketId } = useParams<{ ticketId: string }>()

  useEffect(() => {
    dispatch(reduxServices.updateTicket.getTicketToEdit(Number(ticketId)))
    dispatch(reduxServices.updateTicket.getAudit(Number(ticketId)))
    dispatch(reduxServices.updateTicket.getActiveEmployeeList())
  }, [dispatch])

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={'Update Ticket'}
      CFooterClassName="d-none"
    >
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <Link to={`/ticketApprovals`}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="backBtn"
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <UpdateTicketEditFields />
      <UpdateTicketHistory />
    </OCard>
  )
}

export default UpdateTicket
