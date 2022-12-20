import React, { useEffect } from 'react'
import { CRow, CCol, CButton } from '@coreui/react-pro'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminClearanceDetails from './AdminClearanceDetails'
import AdminClearanceForm from './AdminClearanceForm'
import OCard from '../../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import { ApiLoadingState } from '../../../../middleware/api/apiList'
import OLoadingSpinner from '../../../../components/ReusableComponent/OLoadingSpinner'
import { LoadingType } from '../../../../types/Components/loadingScreenTypes'

const AdminClearanceCertificate = (): JSX.Element => {
  const toggle = useTypedSelector(
    reduxServices.resignationList.selectors.toggleValue,
  )
  const isLoading = useTypedSelector(
    reduxServices.resignationList.selectors.isLoading,
  )

  const adminClearanceDetails = useTypedSelector(
    reduxServices.resignationList.selectors.managerClearanceDetails,
  )
  const dispatch = useDispatch()
  useEffect(() => {
    if (adminClearanceDetails.length > 0) {
      dispatch(reduxServices.resignationList.actions.toggle('clearanceDetails'))
    }
  }, [adminClearanceDetails])
  return (
    <>
      {toggle === '' && (
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
            <AdminClearanceForm />
          </OCard>
        </>
      )}
      {isLoading !== ApiLoadingState.loading ? (
        toggle === 'clearanceDetails' && <AdminClearanceDetails />
      ) : (
        <OLoadingSpinner type={LoadingType.PAGE} />
      )}
    </>
  )
}

export default AdminClearanceCertificate
