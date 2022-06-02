import {
  CButton,
  CCol,
  CFormInput,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'

import OModal from '../../../../../components/ReusableComponent/OModal'
import OToast from '../../../../../components/ReusableComponent/OToast'
import { ShiftListTableProps } from '../../../../../types/EmployeeDirectory/EmployeeList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import { reduxServices } from '../../../../../reducers/reduxServices'
import { useAppDispatch } from '../../../../../stateStore'

const ShiftListTable = ({
  employeeShifts,
}: ShiftListTableProps): JSX.Element => {
  const [isShiftDetailEdit, setIsShiftDetailEdit] = useState<boolean>(false)
  const [selectShiftId, setSelectShiftId] = useState<number>(0)
  const [selectShiftName, setSelectShiftName] = useState<string>('')
  const [deleteShiftModalVisibility, setDeleteShiftModalVisibility] =
    useState<boolean>(false)
  const dispatch = useAppDispatch()

  const deleteShiftToastMessage = (
    <OToast
      toastColor="success"
      toastMessage="Shift details deleted successfully"
    />
  )

  const handleEditAndSaveButton = (shiftId: number): void => {
    if (isShiftDetailEdit) {
      alert('submit')
    } else {
      setIsShiftDetailEdit(true)
      setSelectShiftId(shiftId)
    }
  }

  const handleConfirmDeleteShift = async () => {
    setDeleteShiftModalVisibility(false)

    const deleteEmployeeShiftDetailResultAction = await dispatch(
      reduxServices.shiftConfiguration.deleteEmployeeShiftDetail(selectShiftId),
    )
    if (
      reduxServices.shiftConfiguration.deleteEmployeeShiftDetail.fulfilled.match(
        deleteEmployeeShiftDetailResultAction,
      )
    ) {
      dispatch(reduxServices.shiftConfiguration.getEmployeeShifts())
      dispatch(reduxServices.app.actions.addToast(deleteShiftToastMessage))
    }
  }

  const handleDeleteShiftDetail = async (shiftId: number, name: string) => {
    setDeleteShiftModalVisibility(true)
    setSelectShiftId(shiftId)
    setSelectShiftName(name)
  }
  return (
    <>
      <CTable striped responsive className="ps-0 pe-0">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>#</CTableHeaderCell>
            <CTableHeaderCell>Shift Name</CTableHeaderCell>
            <CTableHeaderCell>Start time</CTableHeaderCell>
            <CTableHeaderCell>End time</CTableHeaderCell>
            <CTableHeaderCell>Grace Period</CTableHeaderCell>
            <CTableHeaderCell>Action</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {employeeShifts?.map((employeeShift, index) => {
            return (
              <CTableRow key={index}>
                <CTableDataCell scope="row">{index + 1}</CTableDataCell>
                <CTableDataCell scope="row">
                  {employeeShift.name}
                </CTableDataCell>
                {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                  <CTableDataCell scope="row">
                    <CRow>
                      <CCol sm={2}>
                        <CFormInput
                          id="startTimeHour"
                          size="sm"
                          type="text"
                          name="startTimeHour"
                          placeholder="Hours"
                          maxLength={2}
                        />
                      </CCol>
                      :
                      <CCol sm={2}>
                        <CFormInput
                          id="startTimeMinutes"
                          size="sm"
                          type="text"
                          name="startTimeMinutes"
                          placeholder="Min"
                          maxLength={2}
                        />
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">
                    {`${employeeShift.startTimeHour}:${employeeShift.startTimeMinutes}`}
                  </CTableDataCell>
                )}
                {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                  <CTableDataCell scope="row">
                    <CRow>
                      <CCol sm={2}>
                        <CFormInput
                          id="endTimeHour"
                          size="sm"
                          type="text"
                          name="endTimeHour"
                          placeholder="Hours"
                          maxLength={2}
                        />
                      </CCol>
                      :
                      <CCol sm={2}>
                        <CFormInput
                          id="endTimeMinutes"
                          size="sm"
                          type="text"
                          name="endTimeMinutes"
                          placeholder="Min"
                          maxLength={2}
                        />
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">{`${employeeShift.endTimeHour}:${employeeShift.endTimeMinutes}`}</CTableDataCell>
                )}

                {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                  <CTableDataCell scope="row">
                    <CCol sm={2}>
                      <CFormInput
                        id="graceTime"
                        size="sm"
                        type="text"
                        name="graceTime"
                        placeholder="In Minutes"
                        maxLength={3}
                      />
                    </CCol>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">
                    {employeeShift.graceTime}
                  </CTableDataCell>
                )}

                <CTableDataCell scope="row">
                  <CButton
                    color={
                      isShiftDetailEdit && employeeShift.id === selectShiftId
                        ? 'success'
                        : 'info'
                    }
                    className="btn-ovh me-1"
                    onClick={() => {
                      handleEditAndSaveButton(employeeShift.id)
                    }}
                  >
                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                  </CButton>
                  <CButton
                    color="danger"
                    className="btn-ovh me-1"
                    onClick={() => {
                      handleDeleteShiftDetail(
                        employeeShift.id,
                        employeeShift.name,
                      )
                    }}
                  >
                    <i className="fa fa-trash-o" aria-hidden="true"></i>
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            )
          })}
        </CTableBody>
      </CTable>
      <CRow>
        <CCol xs={4}>
          <p>
            <strong>Total Records: {employeeShifts.length}</strong>
          </p>
        </CCol>
      </CRow>
      <OModal
        alignment="center"
        visible={deleteShiftModalVisibility}
        setVisible={setDeleteShiftModalVisibility}
        modalHeaderClass="d-none"
        confirmButtonText="Yes"
        cancelButtonText="No"
        confirmButtonAction={handleConfirmDeleteShift}
      >
        <p>
          Are you sure you want to delete this
          <strong>{` ${selectShiftName}`}</strong> Role ?
        </p>
      </OModal>
    </>
  )
}

export default ShiftListTable
