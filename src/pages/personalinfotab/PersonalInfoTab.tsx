/* eslint-disable prettier/prettier */
import React from 'react'
import {
  CCardHeader,CCardBody, CCard, CRow,CCol,CButton,
} from '@coreui/react-pro'
import FamilyDetailsTable from './FamilyDetailsTable'
import OCard from '../../components/ReusableComponent/OCard'
import OAddButton from '../../components/ReusableComponent/OAddButton'
 import VisaDetailsTable from './VisaDetailsTable'
 const PersonalInfoTab = (): JSX.Element  => {
  return (
    <>
      <CCard>       
         <CCardHeader >
        <h4 className="h4">Family Details</h4>
      </CCardHeader>
      <CCardBody>
      <OAddButton />
        <FamilyDetailsTable isFieldDisabled={true} striped={true} bordered={false} tableClassName = ''/>
      </CCardBody>
      <CCardHeader >
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