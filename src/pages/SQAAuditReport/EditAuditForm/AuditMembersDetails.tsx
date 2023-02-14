import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import Multiselect from 'multiselect-react-dropdown'
import React from 'react'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { GetAllEmployeesNames } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'

const AuditMembersDetails = ({
  auditLable,
  options,
  placeholder,
  selectedValues,
  handleOnSelect,
  handleOnRemove,
}: {
  auditLable: string
  options: GetAllEmployeesNames[]
  placeholder: GetAllEmployeesNames[]
  selectedValues: GetAllEmployeesNames[]
  handleOnSelect: (list: GetAllEmployeesNames[]) => void
  handleOnRemove: (selectedList: GetAllEmployeesNames[]) => void
}): JSX.Element => {
  return (
    <>
      <CRow className="mt-3 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          {auditLable}:
          <span className={placeholder?.length ? TextWhite : TextDanger}>
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <Multiselect
            className="ovh-multiselect"
            data-testid="edit-auditors-option"
            options={options?.map((option) => option) || []}
            displayValue="fullName"
            placeholder={placeholder?.length ? '' : 'Employees Name'}
            selectedValues={selectedValues}
            onSelect={(list: GetAllEmployeesNames[]) => handleOnSelect(list)}
            onRemove={(selectedList: GetAllEmployeesNames[]) =>
              handleOnRemove(selectedList)
            }
          />
        </CCol>
      </CRow>
      {/* <div>AuditMembersDetails</div> */}
    </>
  )
}

export default AuditMembersDetails
