import React, { useState, useEffect } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import { Link, useParams } from 'react-router-dom'
import UpdateTicketEditFields from './UpdateTicketEditFields'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useAppDispatch } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import UpdateTicketHistory from '../../TicketApprovals/UpdateTicket/UpdateTicketHistory'

const UpdateTicket = (): JSX.Element => {
  const { ticketId } = useParams<{ ticketId: string }>()
  const [reRender, setReRender] = useState(false)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.updateTicket.getTicketToEdit(Number(ticketId)))
    dispatch(reduxServices.updateTicket.getAudit(Number(ticketId)))
  }, [dispatch, reRender])
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title={'Update Ticket'}
        CFooterClassName="d-none"
      >
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <Link to={`/ticketSummary`}>
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
        <UpdateTicketEditFields setReRender={setReRender} reRender={reRender} />
        <UpdateTicketHistory />
      </OCard>
    </>
  )
}
export default UpdateTicket
