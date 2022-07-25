import React from 'react'
import OCard from '../../../../components/ReusableComponent/OCard'
import { AddEditEmployeeSkillsProps } from '../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'

const EditMailTemplate = ({
  backButtonHandler,
}: AddEditEmployeeSkillsProps): JSX.Element => {
  return (
    <>
      <OCard
        className="mb-4 myprofile-wrapper"
        title="Edit Template"
        CBodyClassName="ps-0 pe-0"
        CFooterClassName="d-none"
      >
        <h1>EDit Template</h1>
      </OCard>
    </>
  )
}
export default EditMailTemplate
