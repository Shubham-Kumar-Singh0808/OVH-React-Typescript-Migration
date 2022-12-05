import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'

const EmployeeProfileSkillTable = (): JSX.Element => {
  const employeeSkillsData = useTypedSelector((state) =>
    reduxServices.employeeSkill.selectors.employeeSkillDetails(state),
  )
  const dispatch = useAppDispatch()
  const { employeeProfileId } = useParams<{ employeeProfileId: string }>()
  useEffect(() => {
    dispatch(
      reduxServices.employeeSkill.getEmployeeSkillsById(employeeProfileId),
    )
  }, [dispatch, employeeProfileId])

  return (
    <>
      <CTable
        // responsive
        // striped={striped || isViewingAnotherEmployee}
        // bordered={bordered || isViewingAnotherEmployee}
        // className={tableClassName}
        align="middle"
      >
        <CTableHead>
          <CTableRow className="fw-bold">
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">Category</CTableHeaderCell>
            <CTableHeaderCell scope="col">Skill</CTableHeaderCell>
            <CTableHeaderCell scope="col">Competency</CTableHeaderCell>
            <CTableHeaderCell scope="col">Experience</CTableHeaderCell>
            <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employeeSkillsData.length > 0 &&
            employeeSkillsData?.map((skillItem, index) => {
              return (
                <CTableRow key={index}>
                  <CTableDataCell scope="row">
                    {skillItem.categoryType}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {skillItem.skillType}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {skillItem.competency}
                  </CTableDataCell>
                  <CTableDataCell scope="row">
                    {skillItem.expYear && `${skillItem.expYear}`} Year(`s)&nbsp;
                    {skillItem.expMonth && `${skillItem.expMonth}`} month(`s)
                  </CTableDataCell>
                </CTableRow>
              )
            })}
        </CTableBody>
      </CTable>
    </>
  )
}
export default EmployeeProfileSkillTable
