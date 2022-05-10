import {
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CButton,
  CFormLabel,
  CFormInput,
  CFormSelect,
} from '@coreui/react-pro'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../stateStore'
import {
  doUpdateFamilyDetails,
  doAddNewFamilyMember,
} from '../../../reducers/MyProfile/PersonalInfoTab/personalInfoTabSlice'
import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
import {
  EmployeeFamilyDetails,
  AddEditEmployeeFamilyDetails,
} from '../../../types/MyProfile/PersonalInfoTab/personalInfoTypes'
import OToast from '../../../components/ReusableComponent/OToast'
import { addToast } from '../../../reducers/appSlice'

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
    (state) => state.familyDetails.editFamilyDetails,
  )
  useEffect(() => {
    if (isEditFamilyDetails) {
      setEmployeeFamily(fetchEditFamilyDetails)
    }
  }, [isEditFamilyDetails, fetchEditFamilyDetails])
  console.log(fetchEditFamilyDetails)
  const onChangeHandler = (
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
      const personValue = value.replace(/[^a-zA-Z]/gi, '')
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
        dateOfBirth: moment(dateOfBirth).format('DD/MM/YYYY'),
      },
    }
    const addFamilyMemberResultAction = await dispatch(
      doAddNewFamilyMember(prepareObject),
    )
    if (doAddNewFamilyMember.fulfilled.match(addFamilyMemberResultAction)) {
      backButtonHandler()
      dispatch(addToast(getToastMessage(actionMapping.added)))
    }
  }
  const handleUpdateFamilyMember = async () => {
    const prepareObject = {
      ...employeeFamily,
      ...{
        employeeId: employeeId,
      },
    }
    const addFamilyMemberResultAction = await dispatch(
      doUpdateFamilyDetails(prepareObject),
    )
    if (doUpdateFamilyDetails.fulfilled.match(addFamilyMemberResultAction)) {
      backButtonHandler()
      dispatch(addToast(getToastMessage(actionMapping.updated)))
    }
  }
  const formLabelProps = {
    htmlFor: 'Name',
    className: 'col-sm-3 col-form-label text-end',
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
            <CFormLabel
              {...formLabelProps}
              className="col-sm-3 col-form-label text-end"
            >
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
                size="sm"
                placeholder="Name"
                value={employeeFamily?.personName}
                onChange={onChangeHandler}
              />
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
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
                size="sm"
                value={employeeFamily?.relationShip}
                onChange={onChangeHandler}
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
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Contact Number:
            </CFormLabel>
            <CCol sm={3}>
              <CFormInput
                type="text"
                id="ContactNumber"
                size="sm"
                name="contactNumber"
                placeholder="Contact Number"
                value={employeeFamily?.contactNumber}
                onChange={onChangeHandler}
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
                className="form-control form-control-sm"
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
              <CButton
                className="btn-ovh btn btn-success m-1 mt-4"
                type="button"
                disabled={!isAddButtonEnabled}
                onClick={
                  isEditFamilyDetails
                    ? handleUpdateFamilyMember
                    : handleAddFamilyMember
                }
              >
                {confirmButtonText}
              </CButton>
            </CCol>
          </CRow>
        </CForm>
      </CCardBody>
    </>
  )
}
export default AddEditFamilyDetails
