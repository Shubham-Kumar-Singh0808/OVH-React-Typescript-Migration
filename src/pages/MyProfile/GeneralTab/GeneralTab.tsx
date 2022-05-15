import React from 'react'
import { CCardHeader } from '@coreui/react-pro'

import EmployeeGeneralInformation from './GeneralInformation'
import FamilyDetailsTable from '../PersonalInfoTab/FamilyDetailsTable'
import SkillsTable from '../Qualifications/skills/SkillsTable'
const GeneralTab = (): JSX.Element => {
  return (
    <>
      <EmployeeGeneralInformation />
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
