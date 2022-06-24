import React, { useEffect, useState } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import { CCardHeader, CCardBody } from '@coreui/react-pro'
import OAddButton from '../../../components/ReusableComponent/OAddButton'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'

const EmployeeLeaveCategories = (): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [employeeLeaveCategoryId, setLeaveCategoryId] = useState(0)
  const getEmployeeLeaveCategories = useTypedSelector(
    reduxServices.employeeLeaveSettings.selectors.leaveCategories,
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
        employeeLeaveCategoryId,
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
            toastMessage="Visa Detail deleted successfully"
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
        <OAddButton />
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
                <CTableDataCell scope="row">
                  {leaveCategory.name}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  {leaveCategory.leaveType}
                </CTableDataCell>
                <CTableDataCell scope="row">
                  <CButton color="info btn-ovh me-2">
                    <i className="fa fa-pencil-square-o"></i>
                  </CButton>
                  <CButton
                    color="danger btn-ovh me-2"
                    onClick={() => handleShowDeleteModal(leaveCategory.id)}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
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
          {`Do you really want to delete this ?`}
        </OModal>
      </CCardBody>
    </>
  )
}
export default EmployeeLeaveCategories
