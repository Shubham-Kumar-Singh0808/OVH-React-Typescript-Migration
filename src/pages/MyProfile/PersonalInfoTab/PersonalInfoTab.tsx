import React, { useState } from 'react'
import { CCardHeader, CCardBody, CCard } from '@coreui/react-pro'
import FamilyDetailsTable from './FamilyDetailsTable'
import VisaDetailsTable from './VisaDetailsTable'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
const PersonalInfoTab = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      <CCard>
        <CCardHeader>
          <h4 className="h4">Family Details</h4>
        </CCardHeader>
        <CCardBody>
          <OAddButton />
          <FamilyDetailsTable />
        </CCardBody>
        <CCardHeader>
          <h4 className="h4">Visa Details</h4>
        </CCardHeader>
        <CCardBody>
          <OAddButton />
          <VisaDetailsTable />
        </CCardBody>
      </CCard>
    </>
  )
}
export default PersonalInfoTab
