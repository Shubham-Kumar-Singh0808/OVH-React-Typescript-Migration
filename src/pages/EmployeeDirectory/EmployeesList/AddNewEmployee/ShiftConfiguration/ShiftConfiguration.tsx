import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../../stateStore'

import { ActionMapping } from '../../../../../types/Settings/UserRolesConfiguration/userRolesAndPermissionsTypes'
import { EmployeeShiftDetails } from '../../../../../types/EmployeeDirectory/EmployeeList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import OAddButton from '../../../../../components/ReusableComponent/OAddButton'
import OToast from '../../../../../components/ReusableComponent/OToast'
import ShiftListTable from './ShiftListTable'
import { reduxServices } from '../../../../../reducers/reduxServices'

const ShiftConfiguration = (): JSX.Element => {
  const employeeShifts = useTypedSelector(
    reduxServices.shiftConfiguration.selectors.employeeShifts,
  )
  const [employeeShiftDetails, setEmployeeShiftDetails] =
    useState<EmployeeShiftDetails>({
      id: 0,
      name: '',
      startTimeHour: '',
      startTimeMinutes: '',
      endTimeHour: '',
      endTimeMinutes: '',
      graceTime: '',
    })
  const [isAddBtnEnabled, setIsAddBtnEnabled] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'startTimeHour') {
      const startTimeHour = value.replace(/[^0-9]/gi, '')
      // let valueCopy = +startTimeHour
      // if (valueCopy > 23) valueCopy = 23
      setEmployeeShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: startTimeHour } }
      })
    } else if (name === 'startTimeMinutes') {
      const startTimeMinutes = value.replace(/[^0-9]/gi, '')
      setEmployeeShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: startTimeMinutes } }
      })
    } else if (name === 'endTimeHour') {
      const endTimeHour = value.replace(/[^0-9]/gi, '')
      setEmployeeShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: endTimeHour } }
      })
    } else if (name === 'endTimeMinutes') {
      const endTimeMinutes = value.replace(/[^0-9]/gi, '')
      setEmployeeShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: endTimeMinutes } }
      })
    } else if (name === 'graceTime') {
      const graceTime = value.replace(/[^0-9]/gi, '')
      setEmployeeShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: graceTime } }
      })
    } else if (name === 'name') {
      const shiftName = value.replace(/^\s*/, '')
      setEmployeeShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: shiftName } }
      })
    } else {
      setEmployeeShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }

  // const minutesValidation = () => {
  //   if (
  //     employeeShiftDetails.endTimeHour !== undefined ||
  //     employeeShiftDetails.endTimeHour !== '' ||
  //     employeeShiftDetails.endTimeHour !== null
  //   ) {
  //     if (employeeShiftDetails.endTimeHour.length === 1) {
  //       employeeShiftDetails.endTimeHour =
  //         '0' + employeeShiftDetails.endTimeHour
  //     } else {
  //       if (+employeeShiftDetails.endTimeHour > 23) {
  //         employeeShiftDetails.endTimeHour = '23'
  //       }
  //     }
  //   }
  // }

  const shiftAlreadyExistToastMessage = (
    <OToast toastColor="danger" toastMessage="Shift already exists!" />
  )

  const actionMapping: ActionMapping = {
    added: 'added',
    deleted: 'deleted',
  }

  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={`Shift ${action} successfully`}
      />
    )
  }
  const handleAddEmployeeTimeSlot = async () => {
    const createEmployeeTimeSlotResultAction = await dispatch(
      reduxServices.shiftConfiguration.createEmployeeTimeSlot(
        employeeShiftDetails,
      ),
    )
    if (
      reduxServices.shiftConfiguration.createEmployeeTimeSlot.fulfilled.match(
        createEmployeeTimeSlotResultAction,
      )
    ) {
      dispatch(reduxServices.shiftConfiguration.getEmployeeShifts())
      dispatch(
        reduxServices.app.actions.addToast(
          getToastMessage(actionMapping.added),
        ),
      )
      setEmployeeShiftDetails({
        id: 0,
        name: '',
        startTimeHour: '',
        startTimeMinutes: '',
        endTimeHour: '',
        endTimeMinutes: '',
        graceTime: '',
      })
    } else if (
      reduxServices.shiftConfiguration.createEmployeeTimeSlot.rejected.match(
        createEmployeeTimeSlotResultAction,
      ) &&
      createEmployeeTimeSlotResultAction.payload === 409
    ) {
      dispatch(
        reduxServices.app.actions.addToast(shiftAlreadyExistToastMessage),
      )
      setEmployeeShiftDetails({
        id: 0,
        name: '',
        startTimeHour: '',
        startTimeMinutes: '',
        endTimeHour: '',
        endTimeMinutes: '',
        graceTime: '',
      })
    }
  }

  useEffect(() => {
    dispatch(reduxServices.shiftConfiguration.getEmployeeShifts())
  }, [dispatch])

  useEffect(() => {
    if (
      employeeShiftDetails.name &&
      employeeShiftDetails.startTimeHour &&
      employeeShiftDetails.startTimeMinutes &&
      employeeShiftDetails.endTimeHour &&
      employeeShiftDetails.endTimeMinutes &&
      employeeShiftDetails.graceTime
    ) {
      setIsAddBtnEnabled(true)
    } else {
      setIsAddBtnEnabled(false)
    }
  }, [
    employeeShiftDetails.endTimeHour,
    employeeShiftDetails.endTimeMinutes,
    employeeShiftDetails.graceTime,
    employeeShiftDetails.name,
    employeeShiftDetails.startTimeHour,
    employeeShiftDetails.startTimeMinutes,
  ])
  return (
    <>
      <CCardHeader>
        <h4 className="h4">Shift Configuration</h4>
      </CCardHeader>
      <CCardBody className="ps-0 pe-0">
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton color="info" className="btn-ovh me-1">
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
          <CForm>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Name :
                <span
                  className={
                    employeeShiftDetails.name ? 'text-white' : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={3}>
                <CFormInput
                  id="name"
                  size="sm"
                  type="text"
                  name="name"
                  placeholder="Shift Name"
                  value={employeeShiftDetails.name}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Start Time :
                <span
                  className={
                    employeeShiftDetails.startTimeHour &&
                    employeeShiftDetails.startTimeMinutes
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={1}>
                <CFormInput
                  id="startTimeHour"
                  size="sm"
                  type="text"
                  name="startTimeHour"
                  placeholder="Hours"
                  maxLength={2}
                  value={employeeShiftDetails.startTimeHour}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol sm={1}>
                <CFormInput
                  id="startTimeMinutes"
                  size="sm"
                  type="text"
                  name="startTimeMinutes"
                  placeholder="Min"
                  maxLength={2}
                  value={employeeShiftDetails.startTimeMinutes}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                End Time :
                <span
                  className={
                    employeeShiftDetails.endTimeHour &&
                    employeeShiftDetails.endTimeMinutes
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={1}>
                <CFormInput
                  id="endTimeHour"
                  size="sm"
                  type="text"
                  name="endTimeHour"
                  placeholder="Hours"
                  maxLength={2}
                  value={employeeShiftDetails.endTimeHour}
                  onChange={handleInputChange}
                />
              </CCol>
              <CCol sm={1}>
                <CFormInput
                  id="endTimeMinutes"
                  size="sm"
                  type="text"
                  name="endTimeMinutes"
                  placeholder="Min"
                  maxLength={2}
                  value={employeeShiftDetails.endTimeMinutes}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Grace period :
                <span
                  className={
                    employeeShiftDetails.graceTime
                      ? 'text-white'
                      : 'text-danger'
                  }
                >
                  *
                </span>
              </CFormLabel>
              <CCol sm={2}>
                <CFormInput
                  id="graceTime"
                  size="sm"
                  type="text"
                  name="graceTime"
                  placeholder="In Minutes"
                  maxLength={3}
                  value={employeeShiftDetails.graceTime}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CCol sm={{ span: 6, offset: 3 }}>
                <OAddButton
                  addButtonHandler={handleAddEmployeeTimeSlot}
                  isAddBtnEnabled={!isAddBtnEnabled}
                />
              </CCol>
            </CRow>
          </CForm>
          <CCol xs={12} className="ps-0 pe-0">
            <ShiftListTable employeeShifts={employeeShifts} />
          </CCol>
        </CRow>
      </CCardBody>
    </>
  )
}

export default ShiftConfiguration
