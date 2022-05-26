import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'

import { EmployeeSkillInfo } from '../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import OModal from '../../../../components/ReusableComponent/OModal'
import OToast from '../../../../components/ReusableComponent/OToast'
import { employeeSkillThunk } from '../../../../reducers/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillSlice'
import { reduxService } from '../../../../reducers/reduxService'

const SkillsTable: React.FC<EmployeeSkillInfo> = ({
  editSkillButtonHandler,
  striped = false,
  bordered = false,
  isFieldDisabled = false,
  tableClassName = '',
}: EmployeeSkillInfo): JSX.Element => {
  const employeeSkillsData = useTypedSelector(
    (state) => state.employeeSkill.skillDetails,
  )

  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(employeeSkillThunk.getEmployeeSkills())
  }, [dispatch])
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [toDeleteSkillId, setToDeleteSkillId] = useState(0)

  const handleShowDeleteModal = (skillId: number) => {
    setToDeleteSkillId(skillId)
    setIsDeleteModalVisible(true)
  }
  const handleConfirmDeleteVisaDetails = async () => {
    setIsDeleteModalVisible(false)
    const deleteSkillsResultAction = await dispatch(
      employeeSkillThunk.deleteEmployeeSkill(toDeleteSkillId),
    )
    const toastElement = (
      <OToast
        toastMessage="Skill Detail deleted successfully"
        toastColor={'success'}
      />
    )
    if (
      employeeSkillThunk.deleteEmployeeSkill.fulfilled.match(
        deleteSkillsResultAction,
      )
    ) {
      dispatch(employeeSkillThunk.getEmployeeSkills())
      dispatch(dispatch(reduxService.app.actions.addToast(toastElement)))
    }
  }

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
                  <CButton
                    color="info"
                    className="btn-ovh me-1"
                    onClick={() => editSkillButtonHandler?.(skillItem.skillId)}
                  >
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </CButton>
                  <CButton
                    color="danger"
                    className="btn-ovh me-1"
                    onClick={() => handleShowDeleteModal(skillItem.skillId)}
                  >
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
            {employeeSkillsData?.length
              ? `Total Records: ${employeeSkillsData?.length}`
              : `No Records found`}
          </strong>
          <OModal
            alignment="center"
            visible={isDeleteModalVisible}
            setVisible={setIsDeleteModalVisible}
            modalHeaderClass="d-none"
            confirmButtonText="Yes"
            cancelButtonText="No"
            confirmButtonAction={handleConfirmDeleteVisaDetails}
          >
            {`Do you really want to delete this ?`}
          </OModal>
        </>
      )}
    </>
  )
}
export default SkillsTable
