import {
  CButton,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import {
  clearIsRoleExists,
  doAddNewUserRole,
  doDeleteUserRole,
  doFetchUserRoles,
  doIsRoleExists,
} from '../../../reducers/Settings/UserRolesConfiguration/userRolesAndPermissionsSlice'

import OModal from '../../../components/ReusableComponent/OModal'
import { selectedRoleType } from '../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { useAppDispatch } from '../../../stateStore'

interface AddDeleteRolePropsTypes {
  selectedRole: selectedRoleType
  setSelectedRole: (role: selectedRoleType) => void
}
const AddDeleteRole: React.FC<AddDeleteRolePropsTypes> = ({
  selectedRole,
  setSelectedRole,
}: AddDeleteRolePropsTypes): JSX.Element => {
  const [addRoleModalVisibility, setAddRoleModalVisibility] = useState(false)
  const [deleteRoleModalVisibility, setDeleteRoleModalVisibility] =
    useState(false)
  const [roleInput, setRoleInput] = useState('')
  const [reportingManagerFlag, setReportingManagerFlag] = useState(false)
  const [isDeleteRoleBtnEnabled, setIsDeleteRoleBtnEnabled] = useState(false)

  const dispatch = useAppDispatch()

  const handleConfirmAddRole = async () => {
    setAddRoleModalVisibility(false)
    const rolesExistsResultAction = await dispatch(doIsRoleExists(roleInput))
    if (
      doIsRoleExists.fulfilled.match(rolesExistsResultAction) &&
      rolesExistsResultAction.payload === false
    ) {
      const addRoleResultAction = await dispatch(
        doAddNewUserRole({ roleInput, reportingManagerFlag }),
      )
      if (doAddNewUserRole.fulfilled.match(addRoleResultAction)) {
        dispatch(doFetchUserRoles())
        setRoleInput('')
        dispatch(clearIsRoleExists())
      }
    } else {
      dispatch(clearIsRoleExists())
      setRoleInput('')
    }
  }

  const isEmployee = () => {
    if (selectedRole.roleName.toLowerCase() === 'employee') {
      return alert(`You Can't Delete default 'Employee' Role.`)
    }
  }

  // if we want to delete employee role we should display default message i.e,You Can't Delete default 'Employee' Role.
  const handleDeleteButton = () => {
    return (
      setDeleteRoleModalVisibility(
        selectedRole.roleName.toLowerCase() !== 'employee' ? true : false,
      ),
      isEmployee()
    )
  }

  const handleConfirmDeleteRole = async () => {
    setDeleteRoleModalVisibility(false)
    const deleteRoleResultAction = await dispatch(
      doDeleteUserRole(selectedRole.roleId as number),
    )
    if (doDeleteUserRole.fulfilled.match(deleteRoleResultAction)) {
      dispatch(doFetchUserRoles())
      setSelectedRole({
        roleId: '',
        roleName: '',
      })
    }
  }

  useEffect(() => {
    if (selectedRole.roleId) {
      setIsDeleteRoleBtnEnabled(true)
    } else {
      setIsDeleteRoleBtnEnabled(false)
    }
  }, [selectedRole, setIsDeleteRoleBtnEnabled])
  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info btn-ovh me-1"
            onClick={() => setAddRoleModalVisibility(true)}
          >
            <i className="fa fa-plus me-1"></i> Add Role
          </CButton>
          <CButton
            color="danger btn-ovh"
            disabled={!isDeleteRoleBtnEnabled}
            onClick={handleDeleteButton}
          >
            <i className="fa fa-trash-o me-1"></i>Delete Role
          </CButton>
        </CCol>
      </CRow>
      <>
        <OModal
          alignment="center"
          isConfirmButtonDisabled={!roleInput}
          visible={addRoleModalVisibility}
          setVisible={setAddRoleModalVisibility}
          closeButtonClass="d-none"
          modalHeaderClass="d-none"
          confirmButtonText="Yes"
          cancelButtonText="No"
          confirmButtonAction={handleConfirmAddRole}
        >
          <CForm>
            <div>
              <CFormLabel className="text-info">
                Add Role:
                <span className="text-danger">*</span>
              </CFormLabel>
              <CFormInput
                className="mb-2"
                type="text"
                size="sm"
                placeholder="Role"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
              />
              <div>
                <CRow className="mb-3">
                  <CFormLabel className="col-sm-4 col-form-label">
                    Reporting Manager :
                  </CFormLabel>
                  <CCol sm={6}>
                    <CFormCheck
                      onChange={(e) =>
                        setReportingManagerFlag(e.target.checked)
                      }
                    />
                  </CCol>
                </CRow>
              </div>
            </div>
          </CForm>
        </OModal>
        <OModal
          alignment="center"
          visible={deleteRoleModalVisibility}
          setVisible={setDeleteRoleModalVisibility}
          closeButtonClass="d-none"
          modalHeaderClass="d-none"
          confirmButtonText="Yes"
          cancelButtonText="No"
          confirmButtonAction={handleConfirmDeleteRole}
        >
          <p>{`Are you sure you want to delete this ${selectedRole.roleName} Role ?`}</p>
        </OModal>
      </>
    </>
  )
}
export default React.memo(AddDeleteRole)
