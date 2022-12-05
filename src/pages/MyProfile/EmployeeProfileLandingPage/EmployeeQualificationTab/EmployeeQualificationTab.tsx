import React from 'react'
import { CCardBody, CCardHeader } from '@coreui/react-pro'
import EmployeeProfileCertificateTable from './EmployeeProfileCertificateTable'
import EmployeeProfileQualification from './EmployeeProfileQualification'
import EmployeeProfileSkillTable from './EmployeeProfileSkillTable'

const EmployeeQualificationTab = (): JSX.Element => {
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Qualifications</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0">
        <EmployeeProfileQualification />
      </CCardBody>
      <CCardHeader>
        <h4 className="h4">Certifications</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0">
        <EmployeeProfileCertificateTable />
      </CCardBody>
      <CCardHeader>
        <h4 className="h4">Skills</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0">
        <EmployeeProfileSkillTable />
      </CCardBody>
    </>
  )
}

export default EmployeeQualificationTab
