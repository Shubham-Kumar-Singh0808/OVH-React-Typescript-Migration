import React from 'react'
import {
  CCardHeader,
  CCardBody,
  CCard,
  CRow,
  CCol,
  CButton,
} from '@coreui/react-pro'
import FamilyDetailsTable from './FamilyDetailsTable'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
const PersonalInfoTab = (): JSX.Element => {
  return (
    <>
      <CCard>
        <CCardHeader>
          <h4 className="h4">Family Details</h4>
        </CCardHeader>
        <CCardBody>
          <OAddButton />
          <FamilyDetailsTable
            isFieldDisabled={true}
            striped={true}
            bordered={false}
            tableClassName=""
          />
        </CCardBody>
      </CCard>
    </>
  )
}
export default PersonalInfoTab
