import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import ProjectInvoicesTable from './ProjectInvoicesTable'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

const ProjectInvoices = (): JSX.Element => {
  const { projectId } = useParams<{ projectId: string }>()
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(reduxServices.projectInvoices.getClosedMilestonesAndCRs(projectId))
  }, [])

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Project-Invoices',
  )
  return (
    <>
      <CRow className="justify-content-end mt-4">
        {userAccess?.createaccess && (
          <CCol className="text-end" md={4}>
            <CButton color="info btn-ovh me-1" data-testid="add-btn">
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
          </CCol>
        )}
      </CRow>
      <div className="mt-4 mb-3">
        <span>
          <b>CR</b> = Change Request, <b>SD</b> = Sent Date, <b>RD</b>= Received
          Date,<br></br> <b>IA</b> = Invoice Amount (Without Discount,Tax and
          Line Item Amount),<br></br> <b>TA</b> = Total Amount (With
          Discount,Tax and Line Item Amount),<br></br> <b>PA</b> = Pending
          Amount to be received.
        </span>
      </div>
      <ProjectInvoicesTable />
    </>
  )
}

export default ProjectInvoices
