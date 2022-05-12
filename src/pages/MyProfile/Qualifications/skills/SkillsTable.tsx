import React, { useEffect } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { getEmployeeSkills } from '../../../../reducers/MyProfile/Qualifications/qualificationSlice'
import { useTypedSelector, useAppDispatch } from '../../../../stateStore'
const SkillsTable = (): JSX.Element => {
  const employeeSkillsData = useTypedSelector(
    (state) => state.employeeQualificationsDetails.skillDetails,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(getEmployeeSkills())
  }, [dispatch])
  return (
    <>
      <CTable striped>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Skill</CTableHeaderCell>
            <CTableHeaderCell scope="col">Competency</CTableHeaderCell>
            <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employeeSkillsData?.map((skillItem, index) => (
            <CTableRow key={index}>
              <CTableDataCell scope="row">{index + 1}</CTableDataCell>
              <CTableDataCell scope="row">
                {skillItem.categoryType}
              </CTableDataCell>
              <CTableDataCell scope="row">{skillItem.skillType}</CTableDataCell>
              <CTableDataCell scope="row">
                {skillItem.competency}
              </CTableDataCell>
              <CTableDataCell scope="row">{`${skillItem.expYear}Year('s) ${skillItem.expMonth}month('s)`}</CTableDataCell>
              <CTableDataCell scope="row">
                <CButton color="info" className="btn-ovh me-1">
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </CButton>
                <CButton color="danger" className="btn-ovh me-1">
                  <i className="fa fa-trash-o" aria-hidden="true"></i>
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      <strong>
        {employeeSkillsData?.length
          ? `Total Records: ${employeeSkillsData.length}`
          : `No Records found`}
      </strong>
    </>
  )
}

export default SkillsTable
