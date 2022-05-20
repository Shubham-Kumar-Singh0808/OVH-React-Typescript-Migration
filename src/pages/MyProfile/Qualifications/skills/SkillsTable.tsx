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
import { qualificationSelectors } from '../../../../reducers/MyProfile/Qualifications/qualificationSlice'
import { useTypedSelector, useAppDispatch } from '../../../../stateStore'
import { EmployeeSkillInfo } from '../../../../types/MyProfile/Qualifications/qualificationTypes'
const SkillsTable: React.FC<EmployeeSkillInfo> = ({
  striped = false,
  bordered = false,
  isFieldDisabled = false,
  tableClassName = '',
}: EmployeeSkillInfo): JSX.Element => {
  const employeeSkillsData = useTypedSelector(
    (state) => state.employeeQualificationsDetails.skillDetails,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(qualificationSelectors.getEmployeeSkills())
  }, [dispatch])
  const tableHeaderCellProps = {
    width: '25%',
    scope: 'col',
  }
  const tableDataCellProps = {
    colSpan: 4,
    className: 'fw-semibold',
  }
  return (
    <>
      <CTable
        responsive
        striped={striped}
        bordered={bordered}
        className={tableClassName}
      >
        {!isFieldDisabled ? (
          <CTableHead color="primary">
            <CTableRow>
              <CTableDataCell {...tableDataCellProps}>Skill Set</CTableDataCell>
            </CTableRow>
            {!isFieldDisabled && (
              <CTableRow>
                <CTableHeaderCell {...tableHeaderCellProps}>
                  Category
                </CTableHeaderCell>
                <CTableHeaderCell {...tableHeaderCellProps}>
                  Skill
                </CTableHeaderCell>
                <CTableHeaderCell {...tableHeaderCellProps}>
                  Competency
                </CTableHeaderCell>
                <CTableHeaderCell {...tableHeaderCellProps}>
                  Experience
                </CTableHeaderCell>
              </CTableRow>
            )}
          </CTableHead>
        ) : (
          <>
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
          </>
        )}

        <CTableBody>
          {employeeSkillsData?.map((skillItem, index) => (
            <CTableRow key={index}>
              {isFieldDisabled ? (
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
              ) : (
                <></>
              )}
              <CTableDataCell scope="row">
                {skillItem.categoryType}
              </CTableDataCell>
              <CTableDataCell scope="row">{skillItem.skillType}</CTableDataCell>
              <CTableDataCell scope="row">
                {skillItem.competency}
              </CTableDataCell>
              <CTableDataCell scope="row">{`${skillItem.expYear}Year('s) ${skillItem.expMonth}month('s)`}</CTableDataCell>
              {isFieldDisabled ? (
                <CTableDataCell scope="row">
                  <CButton color="info" className="btn-ovh me-1">
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </CButton>
                  <CButton color="danger" className="btn-ovh me-1">
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                </CTableDataCell>
              ) : (
                <></>
              )}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
      {isFieldDisabled && (
        <>
          <strong>
            {employeeSkillsData.length
              ? `Total Records: ${employeeSkillsData.length}`
              : `No Records found`}
          </strong>
        </>
      )}
    </>
  )
}

export default SkillsTable
