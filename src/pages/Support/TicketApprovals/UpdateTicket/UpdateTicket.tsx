import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UpdateTicketHistory from './UpdateTicketHistory'
import UpdateTicketEditFields from './UpdateTicketEditFields'
import OCard from '../../../../components/ReusableComponent/OCard'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

const UpdateTicket = (): JSX.Element => {
  const dispatch = useAppDispatch()

  const { ticketId } = useParams<{ ticketId: string }>()
  const [reRender, setReRender] = useState(false)

  const routePath = useTypedSelector(
    reduxServices.ticketApprovals.selectors.routePath,
  )

  useEffect(() => {
    dispatch(reduxServices.updateTicket.getTicketToEdit(Number(ticketId)))
    dispatch(reduxServices.updateTicket.getAudit(Number(ticketId)))
    dispatch(reduxServices.updateTicket.getActiveEmployeeList())
  }, [dispatch, reRender])

  const backButtonHandler = () => {
    if (routePath === '/ticketSummary') {
      dispatch(reduxServices.tickets.actions.toggle('ticketHistory'))
    } else {
      dispatch(
        reduxServices.ticketApprovals.actions.setToggle(
          'ticketApprovalHistory',
        ),
      )
    }
  }

  return (
    <OCard
      className="mb-4 myprofile-wrapper"
      title={'Update Ticket'}
      CFooterClassName="d-none"
    >
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <Link
            to={
              routePath === '/ticketApprovals'
                ? '/ticketApprovals'
                : '/ticketSummary'
            }
          >
            <CButton
              color="info"
              className="btn-ovh me-1"
              data-testid="backBtn"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </Link>
        </CCol>
      </CRow>
      <UpdateTicketEditFields setReRender={setReRender} reRender={reRender} />
      <UpdateTicketHistory />
    </OCard>
  )
}

export default UpdateTicket
