import { CRow, CCol, CButton } from '@coreui/react-pro'
import React, { useEffect, useMemo, useState } from 'react'
import {
  initialUserRole,
  initialUserRoleConfigurationModal,
  getUserRolesConfigTestId,
} from './UserRolesConfigurationsHelpers'
import AddRoleModal from './UserRolesModals/AddRoleModal'
import {
  IncomingUserRole,
  UserRoleConfigurationModal,
} from '../../../types/Settings/UserRolesConfiguration/UserRolesConfigurationTypes'
import { useAppDispatch } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OToast from '../../../components/ReusableComponent/OToast'
import OModal from '../../../components/ReusableComponent/OModal'

const UserRolesAddDelete = ({
  selectedRole,
  setSelectedRole,
}: {
  selectedRole: IncomingUserRole
  setSelectedRole: React.Dispatch<React.SetStateAction<IncomingUserRole>>
}): JSX.Element => {
  const dispatch = useAppDispatch()
  const [showAddModal, setShowAddModal] = useState<boolean>(false)
  const [newRoleName, setNewRoleName] = useState<string>('')
  const [reportingManagerFlag, setReportingManagerFlag] =
    useState<boolean>(false)
  const [isAddRoleModalBtnDisabled, setAddRoleModalBtnDisabled] =
    useState<boolean>(true)

  const [isDeleteButtonEnabled, setDeleteButtonEnabled] =
    useState<boolean>(false)

  useEffect(() => {
    if (selectedRole.roleId === initialUserRole.roleId) {
      setDeleteButtonEnabled(false)
    } else {
      setDeleteButtonEnabled(true)
    }
  }, [selectedRole])

  // returns true if nothing entered
  const newRoleAsterix = useMemo(() => {
    return newRoleName.trim().length === 0
  }, [newRoleName])

  useEffect(() => {
    if (newRoleAsterix) {
      // add role modal button is disabled
      setAddRoleModalBtnDisabled(true)
    } else {
      setAddRoleModalBtnDisabled(false)
    }
  }, [newRoleName])

  const postSuccessCalls = (type: 'Added' | 'Removed') => {
    dispatch(reduxServices.userRolesConfigurations.getUserRolesThunk())
    setSelectedRole(initialUserRole)
    dispatch(
      reduxServices.userRolesConfigurations.actions.setSelectedRole(
        initialUserRole,
      ),
    )
    dispatch(
      reduxServices.app.actions.addToast(
        <OToast
          toastColor="success"
          toastMessage={`Role ${type} Successfully`}
        />,
      ),
    )
  }

  const modalConfirmAddRoleBtn = async () => {
    const roleExistsResult = await dispatch(
      reduxServices.userRolesConfigurations.isRoleExistsThunk(newRoleName),
    )
    if (
      reduxServices.userRolesConfigurations.isRoleExistsThunk.fulfilled.match(
        roleExistsResult,
      )
    ) {
      dispatch(
        reduxServices.userRolesConfigurations.actions.setDisplayConfigurationModal(
          false,
        ),
      )
      if (roleExistsResult.payload === true) {
        dispatch(
          reduxServices.app.actions.addToast(
            <OToast toastColor="danger" toastMessage="Role Already Exists" />,
          ),
        )
        return
      }
      const finalApiCall = await dispatch(
        reduxServices.userRolesConfigurations.addRoleThunk({
          roleName: newRoleName,
          reportingManagerFlag,
        }),
      )
      if (
        reduxServices.userRolesConfigurations.addRoleThunk.fulfilled.match(
          finalApiCall,
        )
      ) {
        setShowAddModal(false)
        postSuccessCalls('Added')
      }
    }
  }

  const addRoleButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setShowAddModal(true)
  }

  const modalConfirmDeleteRoleBtnHandler = async () => {
    const result = await dispatch(
      reduxServices.userRolesConfigurations.deleteUserRoleThunk(
        selectedRole.roleId,
      ),
    )
    if (
      reduxServices.userRolesConfigurations.deleteUserRoleThunk.fulfilled.match(
        result,
      )
    ) {
      dispatch(
        reduxServices.userRolesConfigurations.actions.setDisplayConfigurationModal(
          false,
        ),
      )
      postSuccessCalls('Removed')
    }
  }

  const deleteRoleButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const modalObject: UserRoleConfigurationModal = {
      ...initialUserRoleConfigurationModal,
      displayModal: true,
      description: `Are you sure you want to delete this ${selectedRole.name} role?`,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      confirmButtonAction: modalConfirmDeleteRoleBtnHandler,
      isConfirmButtonDisabled: false,
    }
    dispatch(
      reduxServices.userRolesConfigurations.actions.setConfigurationModal(
        modalObject,
      ),
    )
  }

  return (
    <>
      <CRow className="justify-content-end">
        <CCol className="text-end" md={4}>
          <CButton
            color="info btn-ovh me-1"
            onClick={addRoleButtonHandler}
            data-testid={getUserRolesConfigTestId('addRoleBtn')}
          >
            <i className="fa fa-plus me-1"></i> Add Role
          </CButton>
          <CButton
            data-testid={getUserRolesConfigTestId('deleteRoleBtn')}
            color="danger btn-ovh"
            disabled={!isDeleteButtonEnabled}
            onClick={deleteRoleButtonHandler}
          >
            <i className="fa fa-trash-o me-1"></i>Delete Role
          </CButton>
        </CCol>
      </CRow>
      {/* Had to use seperate modal for add role as the state was not getting updated in the common one */}
      <OModal
        visible={showAddModal}
        setVisible={(val) => setShowAddModal(val)}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={modalConfirmAddRoleBtn}
        isConfirmButtonDisabled={isAddRoleModalBtnDisabled}
      >
        <AddRoleModal
          newRoleName={newRoleName}
          setNewRoleName={setNewRoleName}
          newRoleAsterix={newRoleAsterix}
          reportingManagerFlag={reportingManagerFlag}
          setReportingManagerFlag={setReportingManagerFlag}
        />
      </OModal>
    </>
  )
}

export default UserRolesAddDelete
