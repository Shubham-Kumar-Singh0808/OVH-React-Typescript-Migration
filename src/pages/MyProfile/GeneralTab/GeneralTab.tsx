import React from 'react'
import { CCardHeader } from '@coreui/react-pro'

import EmployeeGeneralInformation from './GeneralInformation'
import FamilyDetailsTable from '../PersonalInfoTab/FamilyDetailsTable'
import EmployeeSkillsTable from '../../../pages/MyProfile/QualificationsTab/Skills/EmployeeSkillsTable'
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
      <EmployeeSkillsTable
        striped={true}
        bordered={true}
        isFieldDisabled={false}
        tableClassName={''}
      />
    </>
  )
}
export default GeneralTab
