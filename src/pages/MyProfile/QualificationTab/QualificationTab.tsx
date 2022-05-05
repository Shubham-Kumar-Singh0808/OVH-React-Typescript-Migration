import { CCardBody, CCardHeader } from '@coreui/react-pro'
import React, { useState } from 'react'
import OCard from '../../../components/ReusableComponent/OCard'
import SkillsTable from './EmployeeSkill/SkillsTable'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
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
            <CCardHeader>
              <h4 className="h4">Certifications</h4>
            </CCardHeader>
            <CCardHeader>
              <h4 className="h4">Skills</h4>
            </CCardHeader>
            <CCardBody>
              <OAddButton />
              <SkillsTable
                isFieldDisabled={true}
                striped={true}
                bordered={false}
                tableClassName={''}
              />
            </CCardBody>
          </OCard>
        </>
      )}
    </>
  )
}
export default QualificationDetails
