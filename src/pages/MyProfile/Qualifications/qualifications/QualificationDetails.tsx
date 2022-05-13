import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React, { useState } from 'react'
import CertificationsTable from '../certifications/CertificationsTable'
import EmployeeQualifications from './EmployeeQualification'
import OAddButton from '../../../../components/ReusableComponent/OAddButton'
import SkillsTable from '../skills/SkillsTable'
import AddUpdateEmployeeQualification from './AddUpdateEmployeeQualification'
const QualificationDetails = (): JSX.Element => {
  const [toggle, setToggle] = useState('')
  return (
    <>
      {toggle === '' && (
        <>
          <CCardHeader>
            <h4 className="h4">Qualifications</h4>
          </CCardHeader>
          <CCardBody>
            <OAddButton
              addButtonHandler={() => setToggle('addQualificationSection')}
            />
            <EmployeeQualifications />
          </CCardBody>
          <CCardHeader>
            <h4 className="h4">Certifications</h4>
          </CCardHeader>
          <CCardBody>
            <OAddButton />
            <CertificationsTable />
          </CCardBody>
          <CCardHeader>
            <h4 className="h4">Skills</h4>
          </CCardHeader>
          <CCardBody>
            <OAddButton />
            <SkillsTable />
          </CCardBody>
        </>
      )}
      {toggle === 'addQualificationSection' && (
        <AddUpdateEmployeeQualification
          isEmployeeQualificationExist={true}
          backButtonHandler={() => setToggle('')}
        />
      )}
    </>
  )
}
export default QualificationDetails
