import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React, { useState } from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
// import CertificationsTable from '../certifications/CertificationsTable'
// import EmployeeQualifications from './EmployeeQualification'
import SkillsTable from '../skills/SkillsTable'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
// import AddUpdateEmployeeQualifications from './AddUpdateEmployeeQualifications'
const QualificationDetails = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      {toggle === '' && (
        <>
          <OCard className="" CHeaderClassName="Basheer" title="">
            <CCardHeader>
              <h4 className="h4">Qualifications</h4>
            </CCardHeader>
            <CCardBody>
              {/* <OAddButton
                addButtonHandler={() => setToggle('addQualificationSection')}
              />
              <EmployeeQualifications /> */}
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Certifications</h4>
            </CCardHeader>
            <CCardBody>
              <OAddButton />
              {/* <CertificationsTable /> */}
            </CCardBody>
            <CCardHeader>
              <h4 className="h4">Skills</h4>
            </CCardHeader>
            <CCardBody>
              <OAddButton />
              <SkillsTable
                isFieldDisabled={true}
                // responsive={false}
                striped={true}
                bordered={false}
                tableClassName={''}
              />
            </CCardBody>
          </OCard>
        </>
      )}
      {/* {toggle === 'addQualificationSection' && (
        <AddUpdateEmployeeQualifications
          backButtonHandler={() => setToggle('')}
        />
      )} */}
    </>
  )
}
export default QualificationDetails
