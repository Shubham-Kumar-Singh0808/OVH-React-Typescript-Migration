import React, { useState } from 'react'
import { CButton, CCol, CRow } from '@coreui/react-pro'
import AppraisalConfigurationsTable from './AppraisalConfigurationsTable'
import AddConfiguration from './AddConfiguration/AddConfiguration'
import OCard from '../../../components/ReusableComponent/OCard'
import { useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'

const AppraisalConfigurations = (): JSX.Element => {
  const [toggle, setToggle] = useState<string>('')

  const userAccessToFeatures = useTypedSelector(
    reduxServices.userAccessToFeatures.selectors.userAccessToFeatures,
  )

  const userAccess = userAccessToFeatures?.find(
    (feature) => feature.name === 'Configurations',
  )

  return (
    <>
      {toggle === '' && (
        <OCard
          className="mb-4 myprofile-wrapper"
          title="Appraisal Configurations"
          CBodyClassName="ps-0 pe-0"
          CFooterClassName="d-none"
        >
          {' '}
          {userAccess?.createaccess && (
            <CRow className="mt-1">
              <CCol md={12} className="pe-0">
                <div className="form-group pull-right ms-4">
                  <CButton
                    color="info"
                    className="text-white btn-ovh"
                    size="sm"
                    onClick={() => setToggle('addConfiguration')}
                  >
                    <i className="fa fa-plus me-1"></i>
                    Add Configuration
                  </CButton>
                </div>
              </CCol>
            </CRow>
          )}
          <AppraisalConfigurationsTable
            userEditAccess={userAccess?.updateaccess as boolean}
          />
        </OCard>
      )}
      {toggle === 'addConfiguration' && (
        <AddConfiguration
          setToggle={() => {
            setToggle('')
          }}
        />
      )}
    </>
  )
}

export default AppraisalConfigurations
