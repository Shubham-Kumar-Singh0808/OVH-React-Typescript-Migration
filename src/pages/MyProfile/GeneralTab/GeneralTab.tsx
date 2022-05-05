import React from 'react'
import { CCardHeader } from '@coreui/react-pro'

import GeneralInformation from './GeneralInformation'
import FamilyDetailsTable from '../PersonalInfoTab/FamilyDetailsTable'
import SkillsTable from '../QualificationTab/EmployeeSkill/SkillsTable'
const GeneralTab = () => {
  return (
    <>
      <GeneralInformation />
      <CCardHeader className="fw-semibold">Other Information</CCardHeader>
      <FamilyDetailsTable
        striped={true}
        bordered={true}
        isFieldDisabled={false}
        tableClassName="mt-4"
      />
      <SkillsTable
        striped={true}
        bordered={true}
        isFieldDisabled={false}
        tableClassName={''}
      />
    </>
  )
}
export default GeneralTab
