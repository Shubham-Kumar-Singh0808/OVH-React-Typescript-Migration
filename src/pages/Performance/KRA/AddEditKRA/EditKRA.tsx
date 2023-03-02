import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormLabel,
  CRow,
} from '@coreui/react-pro'
import KRATemplate from './KRATemplate'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import { emptyString } from '../../../Achievements/AchievementConstants'
import {
  getDepartmentId,
  getDesignationId,
  selectDepartment,
  selectDesignation,
} from '../KRAConstants'
import { reduxServices } from '../../../../reducers/reduxServices'
import OToast from '../../../../components/ReusableComponent/OToast'
import {
  KRAPages,
  UpdateKRABody,
} from '../../../../types/Performance/KRA/KRATypes'

const EditKRA = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const [enteredKraName, setEnteredKraName] = useState<string>(emptyString)
  const [enteredDepartment, setEnteredDepartment] =
    useState<string>(selectDepartment)
  const [enteredDesignation, setEnteredDesignation] =
    useState<string>(selectDesignation)
  const [enteredPercentage, setEnteredPercentage] =
    useState<string>(emptyString)
  const [enteredDescription, setEnteredDescription] =
    useState<string>(emptyString)
  const [showDescription, setShowDescription] = useState<boolean>(true)
  const [isPercentReadonly, setPercentReadonly] = useState<boolean>(true)
  const [isUpdateButtonEnabled, setUpdateButtonEnabled] =
    useState<boolean>(false)

  const incomingKRAData = useTypedSelector((state) => state.KRA.editThisKra)
  const empDeptList = useTypedSelector((state) => state.KRA.empDepartments)
  const desigList = useTypedSelector((state) => state.KRA.designations)

  useEffect(() => {
    if (incomingKRAData !== null) {
      const descrip =
        incomingKRAData?.description === null
          ? emptyString
          : incomingKRAData?.description
      setEnteredKraName(incomingKRAData?.name)
      setEnteredDepartment(incomingKRAData?.departmentName)
      setEnteredDescription(descrip)
      setEnteredDesignation(incomingKRAData?.designationName)
      setShowDescription(false)
      setTimeout(() => {
        setShowDescription(true)
        setEnteredPercentage(
          incomingKRAData.designationKraPercentage.toString(),
        )
      }, 5)
    }
  }, [incomingKRAData])

  const updateButtonHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const deptId = getDepartmentId(empDeptList, enteredDepartment)
    const desigId = +getDesignationId(desigList, enteredDesignation)
    const isNewKraDuplicate = await dispatch(
      reduxServices.KRA.checkNewKRADuplicacyThunk({
        kraName: enteredKraName,
        departmentId: deptId,
        designationId: desigId,
      }),
    )
    if (isNewKraDuplicate.payload === false) {
      const newKRAData: UpdateKRABody = {
        ...incomingKRAData,
        name: enteredKraName,
        departmentId: deptId,
        designationId: desigId,
        description: enteredDescription,
        designationKraPercentage: enteredPercentage,
        designationName: emptyString,
        departmentName: emptyString,
        kpiLookps: null,
      }
      const successToast = (
        <OToast toastColor="success" toastMessage="KRA Added Successfully" />
      )
      const result = await dispatch(
        reduxServices.KRA.updateKRAThunk(newKRAData),
      )
      if (reduxServices.KRA.updateKRAThunk.fulfilled.match(result)) {
        dispatch(reduxServices.app.actions.addToast(successToast))
        dispatch(
          reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.kraList),
        )
      }
    } else {
      const errorToast = (
        <OToast toastColor="danger" toastMessage="KRA Already Exists" />
      )
      dispatch(reduxServices.app.actions.addToast(errorToast))
    }
  }

  return (
    <CForm onSubmit={updateButtonHandler}>
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
        setIsButtonEnabled={setUpdateButtonEnabled}
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
              data-testid="update-kra-btn"
              disabled={!isUpdateButtonEnabled}
            >
              Update
            </CButton>
          </CCol>
        </CRow>
      </CContainer>
    </CForm>
  )
}

export default EditKRA
