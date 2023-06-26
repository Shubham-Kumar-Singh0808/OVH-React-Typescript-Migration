import { CRow, CFormLabel, CCol, CFormSelect } from '@coreui/react-pro'
import React from 'react'
import { TextWhite, TextDanger } from '../../../../constant/ClassName'
import { formLabelProps } from '../../../Finance/ITDeclarationForm/ITDeclarationFormHelpers'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useTypedSelector } from '../../../../stateStore'

const Departments = ({
  departmentList,
  setDepartmentList,
}: {
  departmentList: string
  setDepartmentList: React.Dispatch<React.SetStateAction<string>>
}): JSX.Element => {
  const allDepartments = useTypedSelector(
    reduxServices.expenseForm.selectors.departmentList,
  )
  return (
    <>
      <CRow className="mt-3 mb-3">
        <CFormLabel
          {...formLabelProps}
          className="col-sm-3 col-form-label text-end"
          data-testid="departmentLabel"
        >
          Department:
          <span className={departmentList ? TextWhite : TextDanger}>*</span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            className="mb-1"
            data-testid="departmentList"
            id="departmentList"
            size="sm"
            aria-label="Department"
            name="departmentList"
            onChange={(e) => {
              setDepartmentList(e.target.value)
            }}
            value={departmentList}
          >
            <option value={''}>Select Department</option>
            {allDepartments
              .slice()
              .sort((department1, department2) =>
                department1.departmentName.localeCompare(
                  department2.departmentName,
                ),
              )
              ?.map((departmentItems, department) => (
                <option key={department} value={departmentItems.departmentId}>
                  {departmentItems.departmentName}
                </option>
              ))}
          </CFormSelect>
        </CCol>
      </CRow>
    </>
  )
}

export default Departments
