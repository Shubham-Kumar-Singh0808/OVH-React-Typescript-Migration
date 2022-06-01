import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import React, { useState } from 'react'

import { EmployeeShiftDetails } from '../../../../../types/EmployeeDirectory/EmployeeList/AddNewEmployee/ShiftConfiguration/shiftConfigurationTypes'
import OAddButton from '../../../../../components/ReusableComponent/OAddButton'
import OCard from '../../../../../components/ReusableComponent/OCard'
import ShiftListTable from './ShiftListTable'

const ShiftConfiguration = (): JSX.Element => {
  const [shiftDetails, setShiftDetails] = useState<EmployeeShiftDetails>({
    id: 0,
    name: '',
    startTimeHour: '',
    startTimeMinutes: '',
    endTimeHour: '',
    endTimeMinutes: '',
    graceTime: '',
  })
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    if (name === 'startTimeHour') {
      const startTimeHour = value.replace(/[^0-9]/gi, '')
      let valueCopy = +startTimeHour
      if (valueCopy > 23) valueCopy = 23
      setShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: valueCopy } }
      })
    } else if (name === 'startTimeMinutes') {
      const startTimeMinutes = value.replace(/[^0-9]/gi, '')
      setShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: startTimeMinutes } }
      })
    } else if (name === 'endTimeHour') {
      const endTimeHour = value.replace(/[^0-9]/gi, '')
      setShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: endTimeHour } }
      })
    } else if (name === 'endTimeMinutes') {
      const endTimeMinutes = value.replace(/[^0-9]/gi, '')
      setShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: endTimeMinutes } }
      })
    } else if (name === 'graceTime') {
      const graceTime = value.replace(/[^0-9]/gi, '')
      setShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: graceTime } }
      })
    } else {
      setShiftDetails((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  console.log(shiftDetails)

  return (
    <>
      <OCard
        className="mb-4 category-list-card"
        title="Shift Configuration"
        CFooterClassName="d-none"
      >
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
                  className={shiftDetails.name ? 'text-white' : 'text-danger'}
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
                  value={shiftDetails.name}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Start Time :<span className={'text-danger'}>*</span>
              </CFormLabel>
              <CCol sm={1}>
                <CFormInput
                  id="startTimeHour"
                  size="sm"
                  type="text"
                  name="startTimeHour"
                  placeholder="Hours"
                  maxLength={2}
                  value={shiftDetails.startTimeHour}
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
                  value={shiftDetails.startTimeMinutes}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                End Time :<span className={'text-danger'}>*</span>
              </CFormLabel>
              <CCol sm={1}>
                <CFormInput
                  id="endTimeHour"
                  size="sm"
                  type="text"
                  name="endTimeHour"
                  placeholder="Hours"
                  maxLength={2}
                  value={shiftDetails.endTimeHour}
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
                  value={shiftDetails.endTimeMinutes}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CFormLabel className="col-sm-3 col-form-label text-end">
                Grace period :<span className={'text-danger'}>*</span>
              </CFormLabel>
              <CCol sm={2}>
                <CFormInput
                  id="graceTime"
                  size="sm"
                  type="text"
                  name="graceTime"
                  placeholder="In Minutes"
                  maxLength={3}
                  value={shiftDetails.graceTime}
                  onChange={handleInputChange}
                />
              </CCol>
            </CRow>
            <CRow className="mt-4 mb-4">
              <CCol sm={4}>
                <OAddButton />
              </CCol>
            </CRow>
          </CForm>
          <CCol xs={12} className="ps-0 pe-0">
            <ShiftListTable />
          </CCol>
        </CRow>
      </OCard>
    </>
  )
}

export default ShiftConfiguration
