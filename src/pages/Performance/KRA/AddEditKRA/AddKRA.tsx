import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import KRATemplate from './KRATemplate'
import { emptyString } from '../../../../constant/constantData'
import {
  getDepartmentId,
  getDesignationId,
  selectDepartment,
  selectDesignation,
} from '../KRAConstants'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { reduxServices } from '../../../../reducers/reduxServices'
import {
  AddKRAProps,
  NewKRABody,
} from '../../../../types/Performance/KRA/KRATypes'
import OToast from '../../../../components/ReusableComponent/OToast'

const AddKRA = (props: AddKRAProps): JSX.Element => {
  const { enteredDescription, setEnteredDescription } = props
  const dispatch = useAppDispatch()
  const [enteredKraName, setEnteredKraName] = useState<string>(emptyString)
  const [enteredDepartment, setEnteredDepartment] =
    useState<string>(selectDepartment)
  const [enteredDesignation, setEnteredDesignation] =
    useState<string>(selectDesignation)
  const [enteredPercentage, setEnteredPercentage] =
    useState<string>(emptyString)
  const [showDescription, setShowDescription] = useState<boolean>(true)
  const [isPercentReadonly, setPercentReadonly] = useState<boolean>(true)

  const [isAddButtonEnabled, setAddButtonEnabled] = useState<boolean>(false)

  const empDeptList = useTypedSelector((state) => state.KRA.empDepartments)
  const desigList = useTypedSelector((state) => state.KRA.designations)
  const currentQueries = useTypedSelector((state) => state.KRA.krasQuery)
  const clearHandler = () => {
    setEnteredKraName(emptyString)
    setEnteredDepartment(selectDepartment)
    setEnteredDesignation(selectDesignation)
    setEnteredPercentage(emptyString)
    setEnteredDescription(emptyString)
    setShowDescription(false)
    setTimeout(() => {
      setShowDescription(true)
    }, 10)
  }

  const clearButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    clearHandler()
  }

  const addButtonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const deptId = getDepartmentId(empDeptList, enteredDepartment)
    const desigId = +getDesignationId(desigList, enteredDesignation)
    const duplicateKRAResponse = await dispatch(
      reduxServices.KRA.checkNewKRADuplicacyThunk({
        kraName: enteredKraName,
        departmentId: deptId,
        designationId: desigId,
      }),
    )
    if (duplicateKRAResponse.payload === false) {
      const newKRAData: NewKRABody = {
        name: enteredKraName,
        departmentId: deptId,
        designationId: desigId,
        description: enteredDescription,
        designationKraPercentage: enteredPercentage,
      }
      const successToast = (
        <OToast toastColor="success" toastMessage="KRA Added Successfully" />
      )
      const result = await dispatch(
        reduxServices.KRA.addNewKRAThunk(newKRAData),
      )
      if (reduxServices.KRA.addNewKRAThunk.fulfilled.match(result)) {
        clearHandler()
        dispatch(reduxServices.app.actions.addToast(successToast))
        dispatch(reduxServices.KRA.searchKRADataThunk(currentQueries))
      }
    } else {
      const errorToast = (
        <OToast toastColor="danger" toastMessage="KRA Already Exists" />
      )
      dispatch(reduxServices.app.actions.addToast(errorToast))
    }
  }

  return (
    <CForm onSubmit={addButtonHandler}>
      <KRATemplate
        enteredKraName={enteredKraName}
        setEnteredKraName={setEnteredKraName}
        enteredDept={enteredDepartment}
        setEnteredDept={setEnteredDepartment}
        enteredDesig={enteredDesignation}
        setEnteredDesig={setEnteredDesignation}
        enteredPercentage={enteredPercentage}
        setEnteredPercentage={setEnteredPercentage}
        enteredDescription={enteredDescription}
        setEnteredDescription={setEnteredDescription}
        showDescription={showDescription}
        isPercentReadonly={isPercentReadonly}
        setPercentReadOnly={setPercentReadonly}
        setIsButtonEnabled={setAddButtonEnabled}
        callDesignationEveryDepartment={true}
      />
      <CContainer>
        <CRow>
          <CFormLabel className="col-form-label category-label col-sm-3 col-form-label text-end"></CFormLabel>
          <CCol sm={4}>
            <CButton
              type="submit"
              color="success"
              className="btn-ovh me-1"
              data-testid="add-kra-btn"
              disabled={!isAddButtonEnabled}
            >
              Add
            </CButton>
            <CButton
              color="warning"
              role="addNewAchiever"
              data-testid="clear-kra-btn"
              className="btn-ovh me-1"
              onClick={clearButtonHandler}
            >
              Clear
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </CForm>
  )
}

export default AddKRA
