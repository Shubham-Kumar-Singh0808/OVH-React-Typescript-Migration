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
  const [editEmployeeShiftDetails, setEditEmployeeShiftDetails] = useState({
    id: 0,
    name: '',
    startTimeHour: '',
    startTimeMinutes: '',
    endTimeHour: '',
    endTimeMinutes: '',
    graceTime: '',
  })
  const [deleteShiftModalVisibility, setDeleteShiftModalVisibility] =
    useState<boolean>(false)
  const dispatch = useAppDispatch()

  const deleteShiftToastMessage = (
    <OToast
      toastColor="success"
      toastMessage="Shift details deleted successfully"
    />
  )

  const handleEditButton = (shiftId: number): void => {
    setIsShiftDetailEdit(true)
    setSelectShiftId(shiftId)
  }

  const editEmployeeShiftHandler = () => {
    alert('hello')
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
  const tableHeaderCellPropsSNo = {
    width: '6%',
    scope: 'col',
  }
  const tableHeaderCellPropsShiftName = {
    width: '26%',
    scope: 'col',
  }
  const tableHeaderCellPropsAction = {
    width: '14%',
    scope: 'col',
  }
  const tableHeaderCellPropsGrace = {
    width: '12%',
    scope: 'col',
  }
  const tableHeaderCellPropsStartTime = {
    width: '21%',
    scope: 'col',
  }
  return (
    <>
      <CTable
        striped
        responsive
        className="ps-0 pe-0 shift-configuration-table"
      >
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell {...tableHeaderCellPropsSNo}>#</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsShiftName}>
              Shift Name
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsStartTime}>
              Start time
            </CTableHeaderCell>
            <CTableHeaderCell>End time</CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsGrace}>
              Grace Period
            </CTableHeaderCell>
            <CTableHeaderCell {...tableHeaderCellPropsAction}>
              Action
            </CTableHeaderCell>
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
                    <div className="d-flex align-items-center">
                      <div className="edit-time-control sh-left">
                        <CFormInput
                          id="startTimeHour"
                          size="sm"
                          type="text"
                          name="startTimeHour"
                          placeholder="Hours"
                          maxLength={2}
                          value={employeeShift.startTimeHour}
                          onChange={editEmployeeShiftHandler}
                        />
                      </div>
                      <div className="edit-time-control">
                        <CFormInput
                          id="startTimeMinutes"
                          size="sm"
                          type="text"
                          name="startTimeMinutes"
                          placeholder="Min"
                          maxLength={2}
                          value={employeeShift.startTimeMinutes}
                          onChange={editEmployeeShiftHandler}
                        />
                      </div>
                    </div>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">
                    {`${employeeShift.startTimeHour}:${employeeShift.startTimeMinutes}`}
                  </CTableDataCell>
                )}
                {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                  <CTableDataCell scope="row">
                    <CRow>
                      <CCol sm={3}>
                        <CFormInput
                          id="endTimeHour"
                          size="sm"
                          type="text"
                          name="endTimeHour"
                          placeholder="Hours"
                          maxLength={2}
                          value={employeeShift.endTimeHour}
                          onChange={editEmployeeShiftHandler}
                        />
                      </CCol>
                      :
                      <CCol sm={3}>
                        <CFormInput
                          id="endTimeMinutes"
                          size="sm"
                          type="text"
                          name="endTimeMinutes"
                          placeholder="Min"
                          maxLength={2}
                          value={employeeShift.endTimeMinutes}
                          onChange={editEmployeeShiftHandler}
                        />
                      </CCol>
                    </CRow>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">{`${employeeShift.endTimeHour}:${employeeShift.endTimeMinutes}`}</CTableDataCell>
                )}

                {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                  <CTableDataCell scope="row">
                    <CCol sm={6}>
                      <CFormInput
                        id="graceTime"
                        size="sm"
                        type="text"
                        name="graceTime"
                        placeholder="In Minutes"
                        maxLength={3}
                        value={employeeShift.graceTime}
                        onChange={editEmployeeShiftHandler}
                      />
                    </CCol>
                  </CTableDataCell>
                ) : (
                  <CTableDataCell scope="row">
                    {employeeShift.graceTime}
                  </CTableDataCell>
                )}

                <CTableDataCell scope="row">
                  {isShiftDetailEdit && employeeShift.id === selectShiftId ? (
                    <CButton color="success" className="btn-ovh me-1">
                      <i className="fa fa-floppy-o" aria-hidden="true"></i>
                    </CButton>
                  ) : (
                    <CButton
                      color="info"
                      className="btn-ovh me-1"
                      onClick={() => {
                        handleEditButton(employeeShift.id)
                      }}
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                    </CButton>
                  )}

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
