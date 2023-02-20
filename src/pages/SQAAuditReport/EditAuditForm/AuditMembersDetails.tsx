import { CRow, CFormLabel, CCol } from '@coreui/react-pro'
import Multiselect from 'multiselect-react-dropdown'
import React from 'react'
import { TextWhite, TextDanger } from '../../../constant/ClassName'
import { reduxServices } from '../../../reducers/reduxServices'
import { useTypedSelector } from '../../../stateStore'
import { GetAllEmployeesNames } from '../../../types/ProjectManagement/AllocateEmployee/allocateEmployeeTypes'

const AuditMembersDetails = ({
  auditLabel,
  options,
  placeholder,
  selectedValues,
  handleOnSelect,
  handleOnRemove,
}: {
  auditLabel: string
  options: GetAllEmployeesNames[]
  placeholder: GetAllEmployeesNames[]
  selectedValues: GetAllEmployeesNames[]
  handleOnSelect: (list: GetAllEmployeesNames[]) => void
  handleOnRemove: (selectedList: GetAllEmployeesNames[]) => void
}): JSX.Element => {
  const selectedAuditDetails = useTypedSelector(
    reduxServices.addNewAuditForm.selectors.selectedAuditDetails,
  )

  const formStatusSubmit = selectedAuditDetails.formStatus === 'Submit'
  const formStatusPMUpdate = selectedAuditDetails.formStatus === 'PM Update'
  return (
    <>
      <CRow className="mt-3 mb-4">
        <CFormLabel className="col-sm-3 col-form-label text-end">
          {auditLabel} :
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
            disable={formStatusSubmit || formStatusPMUpdate}
            placeholder={placeholder?.length ? '' : 'Employees Name'}
            selectedValues={selectedValues}
            onSelect={(list: GetAllEmployeesNames[]) => handleOnSelect(list)}
            onRemove={(selectedList: GetAllEmployeesNames[]) =>
              handleOnRemove(selectedList)
            }
          />
        </CCol>
      </CRow>
    </>
  )
}

export default AuditMembersDetails
