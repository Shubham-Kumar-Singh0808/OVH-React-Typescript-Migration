import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React from 'react'
import CertificationsTable from '../certifications/CertificationsTable'
import EmployeeQualifications from './EmployeeQualification'
import OAddButton from '../../../../../components/ReusableComponent/OAddButton'
import SkillsTable from '../skills/SkillsTable'
const QualificationDetails = (): JSX.Element => {
  return (
    <>
      <>
        <CCardHeader>
          <h4 className="h4">Qualifications</h4>
        </CCardHeader>
        <CCardBody>
          <OAddButton />
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
    </>
  )
}
export default QualificationDetails
