import {
  AddEditEmployeeFamilyDetails,
  EmployeeFamilyDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import {
  CButton,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
import React, { useEffect, useState } from 'react'
import { personalInfoThunk } from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'

import DatePicker from 'react-datepicker'
import OToast from '../../../components/ReusableComponent/OToast'
import { appActions } from '../../../reducers/appSlice'
import moment from 'moment'
function AddEditFamilyDetails({
  isEditFamilyDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: AddEditEmployeeFamilyDetails): JSX.Element {
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const dispatch = useAppDispatch()
  const initialEmployeeFamilyDetails = {} as EmployeeFamilyDetails
  const [employeeFamily, setEmployeeFamily] = useState(
    initialEmployeeFamilyDetails,
  )
  const [dateOfBirth, setDateOfBirth] = useState<Date | string>()
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)

  const fetchEditFamilyDetails = useTypedSelector(
    (state) => state.personalInfoDetails.editFamilyDetails,
  )
  useEffect(() => {
    if (isEditFamilyDetails) {
      setEmployeeFamily(fetchEditFamilyDetails)
    }
  }, [isEditFamilyDetails, fetchEditFamilyDetails])
  const onChangePersonNameHandler = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target
    if (name === 'contactNumber') {
      const contactValue = value.replace(/[^0-9]/gi, '')
      setEmployeeFamily((prevState) => {
        return { ...prevState, ...{ [name]: contactValue } }
      })
    } else if (name === 'personName') {
      const personValue = value.replace(/[^a-zA-Z\s]/gi, '')
      setEmployeeFamily((prevState) => {
        return { ...prevState, ...{ [name]: personValue } }
      })
    } else {
      setEmployeeFamily((prevState) => {
        return { ...prevState, ...{ [name]: value } }
      })
    }
  }
  const onDateChangeHandler = (date: Date) => {
    if (isEditFamilyDetails) {
      const formatDate = moment(date).format('DD/MM/YYYY')
      const name = 'dateOfBirth'
      setEmployeeFamily((prevState) => {
        return { ...prevState, ...{ [name]: formatDate } }
      })
    } else {
      setDateOfBirth(date)
    }
  }
  useEffect(() => {
    if (employeeFamily?.personName && employeeFamily?.relationShip) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [employeeFamily?.personName, employeeFamily?.relationShip])
  const handleClearDetails = () => {
    setEmployeeFamily({
      personName: '',
      relationShip: '',
      contactNumber: '',
      employeeId: '',
    })
    setDateOfBirth('')
  }
  const actionMapping = {
    added: 'added',
    updated: 'updated',
  }
  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={`Your family member have been ${action} successfully.`}
      />
    )
  }
  const handleAddFamilyMember = async () => {
    const prepareObject = {
      ...employeeFamily,
      ...{
        employeeId: employeeId,
        dateOfBirth: dateOfBirth
          ? moment(dateOfBirth).format('DD/MM/YYYY')
          : undefined,
      },
    }
    const addFamilyMemberResultAction = await dispatch(
      personalInfoThunk.addEmployeeFamilyMember(prepareObject),
    )
    if (
      personalInfoThunk.addEmployeeFamilyMember.fulfilled.match(
        addFamilyMemberResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(appActions.addToast(getToastMessage(actionMapping.added)))
    }
  }
  const handleUpdateFamilyMember = async () => {
    const prepareObject = {
      ...employeeFamily,
      ...{
        employeeId: employeeId,
      },
    }
    const updateFamilyMemberResultAction = await dispatch(
      personalInfoThunk.updateEmployeeFamilyMember(prepareObject),
    )
    if (
      personalInfoThunk.updateEmployeeFamilyMember.fulfilled.match(
        updateFamilyMemberResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(appActions.addToast(getToastMessage(actionMapping.updated)))
    }
  }
  const nameProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'Name',
  }
  const relationShipProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'Relationship',
  }
  const contactNumberProps = {
    className: 'col-sm-3 col-form-label text-end',
    htmlFor: 'ContactNumber',
  }

  return (
    <>
      <CCardHeader>
        <h4 className="h4">{headerTitle}</h4>
      </CCardHeader>
      <CCardBody>
        <CRow className="justify-content-end">
          <CCol className="text-end" md={4}>
            <CButton
              color="info"
              className="btn-ovh me-1"
              onClick={backButtonHandler}
            >
              <i className="fa fa-arrow-left  me-1"></i>Back
            </CButton>
          </CCol>
        </CRow>
        <CForm>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...nameProps}>
              Name:
              <span
                className={
                  employeeFamily?.personName ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="Name"
                name="personName"
                placeholder="Name"
                value={employeeFamily?.personName}
                onChange={onChangePersonNameHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...relationShipProps}>
              Relationship:
              <span
                className={
                  employeeFamily?.relationShip ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Relationship"
                name="relationShip"
                id="Relationship"
                value={employeeFamily?.relationShip}
                onChange={onChangePersonNameHandler}
              >
                <option value={''}>Relationship</option>
                <option value="Brother">Brother</option>
                <option value="Daughter">Daughter</option>
                <option value="Father">Father</option>
                <option value="Friend">Friend</option>
                <option value="Husband">Husband</option>
                <option value="Mother">Mother</option>
                <option value="Sister">Sister</option>
                <option value="Son">Son</option>
                <option value="Wife">Wife</option>
                <option value="Other">Other</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel {...contactNumberProps}>Contact Number:</CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="ContactNumber"
                name="contactNumber"
                placeholder="Contact Number"
                value={employeeFamily?.contactNumber}
                onChange={onChangePersonNameHandler}
                maxLength={10}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Date of Birth :
            </CFormLabel>
            <CCol sm={3}>
              <DatePicker
                className="form-control"
                name="dateOfBirth"
                maxDate={new Date()}
                selected={dateOfBirth as Date}
                onChange={(date: Date) => onDateChangeHandler(date)}
                id="dateOfBirth"
                value={
                  (dateOfBirth as string) ||
                  (employeeFamily?.dateOfBirth as string)
                }
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                placeholderText="dd/mm/yyyy"
                dateFormat="dd/MM/yyyy"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditFamilyDetails ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  onClick={handleUpdateFamilyMember}
                  disabled={!isAddButtonEnabled}
                >
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isAddButtonEnabled}
                    onClick={handleAddFamilyMember}
                  >
                    {confirmButtonText}
                  </CButton>
                  <CButton
                    color="warning "
                    className="btn-ovh"
                    onClick={handleClearDetails}
                  >
                    Clear
                  </CButton>
                </>
              )}
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}
export default AddEditFamilyDetails
