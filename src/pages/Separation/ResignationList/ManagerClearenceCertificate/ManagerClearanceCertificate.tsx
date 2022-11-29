import React, { useEffect } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import ManagerClearanceForm from './ManagerClearanceForm'
import ClearanceCertificateDetailsForm from './ClearanceCertificateDetailsForm'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'

const ManagerClearanceCertificate = (): JSX.Element => {
  const toggle = useTypedSelector(
    reduxServices.resignationList.selectors.toggleValue,
  )
  const managerClearanceDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearanceDetails,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (managerClearanceDetails.length > 0) {
      dispatch(reduxServices.resignationList.actions.toggle('clearanceDetails'))
    }
  }, [managerClearanceDetails])
  return (
    <>
      {toggle === 'clearanceCertificate' && (
        <>
          <OCard
            className="mb-4 myprofile-wrapper"
            title="Clearance Certificate"
            CBodyClassName="ps-0 pe-0"
            CFooterClassName="d-none"
          >
            <CRow className="justify-content-end">
              <CCol className="text-end" md={4}>
                <Link to={`/resignationList`}>
                  <CButton color="info" className="btn-ovh me-1">
                    <i className="fa fa-arrow-left  me-1"></i>Back
                  </CButton>
                </Link>
              </CCol>
            </CRow>
            <ManagerClearanceForm />
          </OCard>
        </>
      )}
      {toggle === 'clearanceDetails' && <ClearanceCertificateDetailsForm />}
    </>
  )
}

export default ManagerClearanceCertificate
