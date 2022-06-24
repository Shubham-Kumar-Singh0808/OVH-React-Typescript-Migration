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
} from '@coreui/react-pro'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import { reduxServices } from '../../../reducers/reduxServices'
import OModal from '../../../components/ReusableComponent/OModal'
import OToast from '../../../components/ReusableComponent/OToast'
type EmployeeLeaveCategoriesType = {
  setToggle: (value: string) => void
}
const EmployeeLeaveCategories = ({
  setToggle,
}: EmployeeLeaveCategoriesType): JSX.Element => {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [leaveCategoryId, setLeaveCategoryId] = useState(0)
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

  return (
    <>
      <CCardHeader>
        <h4 className="h4">Leave categories</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info btn-ovh me-1"
              onClick={() => {
                setToggle('addLeaveCategory')
              }}
            >
              <i className="fa fa-plus me-1"></i>Add
            </CButton>
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
