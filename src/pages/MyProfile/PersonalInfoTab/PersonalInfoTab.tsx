import React, { useState } from 'react'
import { CCardHeader, CCardBody, CCard } from '@coreui/react-pro'
import FamilyDetailsTable from './FamilyDetailsTable'
import VisaDetailsTable from './VisaDetailsTable'
import AddEditVisaDetails from './AddEditVisaDetails'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
const PersonalInfoTab = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      <>
        {toggle === '' && (
          <>
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
              <OAddButton addButtonHandler={() => setToggle('AddVisa')} />
              <VisaDetailsTable />
            </CCardBody>
          </>
        )}

        {toggle === 'AddVisa' && (
          <AddEditVisaDetails backButtonHandler={() => setToggle('')} />
        )}
      </>
    </>
  )
}
export default PersonalInfoTab
