import {
  CForm,
  CFormLabel,
  CFormInput,
  CRow,
  CCol,
  CFormCheck,
} from '@coreui/react-pro'
import React from 'react'
import { getUserRolesConfigTestId } from '../UserRolesConfigurationsHelpers'

const AddRoleModal = ({
  newRoleName,
  setNewRoleName,
  newRoleAsterix,
  reportingManagerFlag,
  setReportingManagerFlag,
}: {
  newRoleName: string
  setNewRoleName: React.Dispatch<React.SetStateAction<string>>
  newRoleAsterix: boolean
  reportingManagerFlag: boolean
  setReportingManagerFlag: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const roleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRoleName(e.target.value)
  }

  const reportingManagerChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReportingManagerFlag(e.target.checked)
  }

  return (
    <>
      <CForm>
        <div>
          <CFormLabel className="text-info">
            Add Role:{' '}
            <span className={newRoleAsterix ? 'text-danger' : 'text-white'}>
              *
            </span>
          </CFormLabel>
          <CFormInput
            className="mb-2"
            data-testid={getUserRolesConfigTestId('newRoleInput')}
            type="text"
            size="sm"
            placeholder="Role"
            value={newRoleName}
            onChange={roleChangeHandler}
          />
          <div>
            <CRow className="mb-3">
              <CFormLabel className="col-sm-4 col-form-label pt-0">
                Reporting Manager :
              </CFormLabel>
              <CCol sm={6}>
                <CFormCheck
                  checked={reportingManagerFlag}
                  data-testid={getUserRolesConfigTestId('reportingManagerFlag')}
                  onChange={reportingManagerChangeHandler}
                />
              </CCol>
            </CRow>
          </div>
        </div>
      </CForm>
    </>
  )
}

export default AddRoleModal
