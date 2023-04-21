/* eslint-disable sonarjs/no-duplicate-string */
// Todd: remove eslint and fix error
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CFormInput,
  CFormSelect,
  CTooltip,
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
import {
  EmployeeAddUpdateLeaveCategory,
  EmployeeLeaveCategoriesProps,
} from '../../../types/Settings/LeaveSettings/employeeLeaveCalenderTypes'

const EmployeeLeaveCategories = ({
  setToggle,
  userAccess,
}: EmployeeLeaveCategoriesProps): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isEditButtonEnabled, setIsEditButtonEnabled] = useState(false)
  const [leaveCategoryId, setLeaveCategoryId] = useState(0)

  const initialEmployeeEditLeaveCategories =
    {} as EmployeeAddUpdateLeaveCategory
  const [isLeaveCategoryDetailEdit, setIsLeaveCategoryDetailEdit] =
    useState<boolean>(false)

  const [
    editEmployeeLeaveCategoryDetails,
    setEditEmployeeCategoryLeaveDetails,
  ] = useState(initialEmployeeEditLeaveCategories)

  const handleEditLeaveCategoryHandler = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target
    if (name === 'name') {
      const nameValue = value.replace(/[^a-zA-Z\s]$/gi, '')
      setEditEmployeeCategoryLeaveDetails((prevState) => {
        return { ...prevState, ...{ [name]: nameValue } }
      })
    } else {
      setEditEmployeeCategoryLeaveDetails((values) => {
        return { ...values, ...{ [name]: value } }
      })
    }
  }

  const getEmployeeLeaveCategories = useTypedSelector(
    reduxServices.employeeLeaveSettings.selectors.employeeLeaveCategories,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(reduxServices.employeeLeaveSettings.getEmployeeLeaveCategories())
  }, [dispatch])

  const handleShowDeleteModal = (categoryId: number) => {
    setLeaveCategoryId(categoryId)
    setIsDeleteModalVisible(true)
  }

  const handleConfirmDeleteLeaveCategories = async () => {
    setIsDeleteModalVisible(false)
    const deleteLeaveCategoryResultAction = await dispatch(
      reduxServices.employeeLeaveSettings.deleteEmployeeLeaveCategory(
        leaveCategoryId,
      ),
    )
    if (
      reduxServices.employeeLeaveSettings.deleteEmployeeLeaveCategory.fulfilled.match(
        deleteLeaveCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.employeeLeaveSettings.getEmployeeLeaveCategories())
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Leave Category deleted successfully"
          />,
        ),
      )
    }
  }

  const cancelLeaveCategoryButtonHandler = () => {
    setIsLeaveCategoryDetailEdit(false)
  }

  useEffect(() => {
    if (
      editEmployeeLeaveCategoryDetails?.name?.replace(/^\s*/, '') &&
      editEmployeeLeaveCategoryDetails.leaveType
    ) {
      setIsEditButtonEnabled(true)
    } else {
      setIsEditButtonEnabled(false)
    }
  }, [
    editEmployeeLeaveCategoryDetails.leaveType,
    editEmployeeLeaveCategoryDetails?.name,
  ])

  const editLeaveCategoryButtonHandler = (
    categoryId: number,
    name: string,
    leaveType: string,
  ): void => {
    setIsLeaveCategoryDetailEdit(true)
    setLeaveCategoryId(categoryId)
    setEditEmployeeCategoryLeaveDetails({
      id: categoryId,
      name,
      leaveType,
    })
  }

  const saveLeaveCategoryButtonHandler = async () => {
    const saveLeaveCategoryResultAction = await dispatch(
      reduxServices.employeeLeaveSettings.updateEmployeeLeaveCategory(
        editEmployeeLeaveCategoryDetails,
      ),
    )
    if (
      reduxServices.employeeLeaveSettings.updateEmployeeLeaveCategory.fulfilled.match(
        saveLeaveCategoryResultAction,
      )
    ) {
      dispatch(reduxServices.employeeLeaveSettings.getEmployeeLeaveCategories())
      setIsLeaveCategoryDetailEdit(false)
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="success"
            toastMessage="Leave Category has been modified."
          />,
        ),
      )
    } else if (
      reduxServices.employeeLeaveSettings.updateEmployeeLeaveCategory.rejected.match(
        saveLeaveCategoryResultAction,
      ) &&
      saveLeaveCategoryResultAction.payload === 500
    ) {
      dispatch(
        reduxServices.app.actions.addToast(
          <OToast
            toastColor="danger"
            toastMessage="Given leave category is already added."
          />,
        ),
      )
    }
  }

  return (
    <>
      <CCardHeader>
        <h4 className="h4">Leave categories</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            {userAccess?.createaccess && (
              <CButton
                color="info btn-ovh me-1"
                onClick={() => {
                  setToggle('addLeaveCategory')
                }}
              >
                <i className="fa fa-plus me-1"></i>Add
              </CButton>
            )}
          </CCol>
        </CRow>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Category</CTableHeaderCell>
              <CTableHeaderCell scope="col">Type</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {getEmployeeLeaveCategories.map((leaveCategory, index) => (
              <CTableRow key={index}>
                {isLeaveCategoryDetailEdit &&
                leaveCategory.id === leaveCategoryId ? (
                  <CTableDataCell scope="row">
                    <div className="edit-time-control">
                      <CFormInput
                        className="form-leave"
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Leave Name"
                        value={editEmployeeLeaveCategoryDetails?.name}
                        onChange={handleEditLeaveCategoryHandler}
                      />
                    </div>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">
                    {leaveCategory.name}
                  </CTableDataCell>
                )}
                {isLeaveCategoryDetailEdit &&
                leaveCategory.id === leaveCategoryId ? (
                  <CTableDataCell scope="row">
                    <div className="edit-time-control">
                      <CFormSelect
                        className="form-leave"
                        data-testid="form-select"
                        aria-label="Default select example"
                        size="sm"
                        id="leaveType"
                        name="leaveType"
                        value={editEmployeeLeaveCategoryDetails.leaveType}
                        onChange={handleEditLeaveCategoryHandler}
                      >
                        <option value="EARNED">EARNED</option>
                        <option value="LOP">LOP</option>
                      </CFormSelect>
                    </div>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">
                    {leaveCategory.leaveType}
                  </CTableDataCell>
                )}
                <CTableDataCell scope="row">
                  {isLeaveCategoryDetailEdit &&
                  leaveCategory.id === leaveCategoryId ? (
                    <>
                      <CButton
                        color="success"
                        data-testid={`sh-save-btn${index}`}
                        className="btn-ovh me-1"
                        onClick={saveLeaveCategoryButtonHandler}
                        disabled={!isEditButtonEnabled}
                      >
                        <i className="fa fa-floppy-o" aria-hidden="true"></i>
                      </CButton>
                      <CTooltip content="Cancel">
                        <CButton
                          color="warning"
                          className="btn-ovh me-1"
                          onClick={cancelLeaveCategoryButtonHandler}
                        >
                          <i className="fa fa-times" aria-hidden="true"></i>
                        </CButton>
                      </CTooltip>
                    </>
                  ) : (
                    <>
                      {userAccess?.updateaccess && (
                        <CTooltip content="Edit">
                          <CButton
                            color="info"
                            data-testid={`sh-edit-btn${index}`}
                            className="btn-ovh me-1"
                            onClick={() => {
                              editLeaveCategoryButtonHandler(
                                leaveCategory.id,
                                leaveCategory.name,
                                leaveCategory.leaveType,
                              )
                            }}
                          >
                            <i
                              className="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                          </CButton>
                        </CTooltip>
                      )}
                      {userAccess?.deleteaccess && (
                        <CTooltip content="Delete">
                          <CButton
                            color="danger btn-ovh me-2"
                            onClick={() =>
                              handleShowDeleteModal(leaveCategory.id)
                            }
                          >
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                          </CButton>
                        </CTooltip>
                      )}
                    </>
                  )}
                </CTableDataCell>

                <></>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        <strong>
          {getEmployeeLeaveCategories?.length
            ? `Total Records: ${getEmployeeLeaveCategories?.length}`
            : `No Records found`}
        </strong>

        <OModal
          alignment="center"
          visible={isDeleteModalVisible}
          setVisible={setIsDeleteModalVisible}
          modalHeaderClass="d-none"
          confirmButtonText="Yes"
          cancelButtonText="No"
          confirmButtonAction={handleConfirmDeleteLeaveCategories}
        >
          {`Do you like to delete this?`}
        </OModal>
      </CCardBody>
    </>
  )
}
export default EmployeeLeaveCategories
