import {
  CButton,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CRow,
} from '@coreui/react-pro'
// eslint-disable-next-line import/named
import { CKEditor, CKEditorEventHandler } from 'ckeditor4-react'
import React, { useEffect } from 'react'
import { TextDanger, TextWhite } from '../../../../constant/ClassName'
import { emptyString } from '../../../../constant/constantData'
import { reduxServices } from '../../../../reducers/reduxServices'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  KRADesignationPercentageQuery,
  KRAPages,
  KRATemplateProps,
} from '../../../../types/Performance/KRA/KRATypes'
import { ckeditorConfig } from '../../../../utils/ckEditorUtils'
import {
  canNewPercentBeUpdatedKRA,
  canPercentageBeAdded,
  getDepartmentId,
  getDesignationId,
  KRAFormLabelClass,
  regexAlphanumeric,
  selectDepartment,
  selectDesignation,
} from '../KRAConstants'
import KRAInputFieldContainer from '../KRAInputFieldContainer'

const KRATemplate = (props: KRATemplateProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const {
    enteredKraName,
    setEnteredKraName,
    enteredDept,
    setEnteredDept,
    enteredDesig,
    setEnteredDesig,
    enteredPercentage,
    setEnteredPercentage,
    enteredDescription,
    setEnteredDescription,
    showDescription,
    isPercentReadonly,
    setPercentReadOnly,
    setIsButtonEnabled,
  } = props
  const empDeptList = useTypedSelector((state) => state.KRA.empDepartments)
  const desigList = useTypedSelector((state) => state.KRA.designations)
  const percentageDone = useTypedSelector(
    (state) => state.KRA.kraDesigPercentage,
  )

  const kraNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredKraName(e.target.value)
  }

  const deptNameChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEnteredDept(e.target.value)
    setEnteredDesig(selectDesignation)
  }

  const designationChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setEnteredDesig(e.target.value)
  }

  const currentPage = useTypedSelector((state) => state.KRA.currentOnScreenPage)
  const incomingKRADataEditKRA = useTypedSelector(
    (state) => state.KRA.editThisKra,
  )
  const isPercentErrorHidden =
    currentPage === KRAPages.editKra
      ? canNewPercentBeUpdatedKRA(
          percentageDone,
          incomingKRADataEditKRA?.designationKraPercentage,
          +enteredPercentage,
        )
      : canPercentageBeAdded(percentageDone, +enteredPercentage)

  const percentChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let orderValue = e.target.value.replace(/\D/g, '')
    if (Number(orderValue) > 100) {
      orderValue = '100'
    }
    setEnteredPercentage(orderValue)
  }

  const descriptionChangeHandler = (value: string) => {
    setEnteredDescription(value)
  }

  // useEffect(() => {
  //   if (callDesignationEveryDepartment) {
  //     dispatch(
  //       reduxServices.KRA.getDesignationThunk(
  //         getDepartmentId(empDeptList, enteredDept),
  //       ),
  //     )
  //   }
  // }, [callDesignationEveryDepartment, enteredDept])

  useEffect(() => {
    if (enteredDesig === selectDesignation) {
      setPercentReadOnly(true)
    } else {
      setPercentReadOnly(false)
      const query: KRADesignationPercentageQuery = {
        departmentId: getDepartmentId(empDeptList, enteredDept),
        designationId: +getDesignationId(desigList, enteredDesig),
      }
      dispatch(reduxServices.KRA.getKRADesigPercentageThunk(query))
    }
    setEnteredPercentage(emptyString)
  }, [enteredDesig])

  const backButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // dispatch(reduxServices.KRA.actions.clearDesignationList())
    dispatch(reduxServices.KRA.actions.setCurrentOnScreenPage(KRAPages.kraList))
  }

  useEffect(() => {
    if (
      enteredKraName?.trim().length === 0 ||
      !enteredKraName?.match(regexAlphanumeric) ||
      enteredDept === selectDepartment ||
      enteredDesig === selectDesignation ||
      enteredDescription?.trim().length === 0 ||
      enteredPercentage?.trim().length === 0 ||
      enteredPercentage === '0' ||
      enteredPercentage === '00' ||
      enteredPercentage === '000' ||
      !isPercentErrorHidden
    ) {
      setIsButtonEnabled(false)
    } else {
      setIsButtonEnabled(true)
    }
  }, [
    enteredKraName,
    enteredDept,
    enteredDesig,
    enteredPercentage,
    enteredDescription,
  ])

  return (
    <CContainer>
      <CRow className="mt-2 justify-content-end">
        <CCol xs={2} className="px-0 text-end">
          <CButton
            color="info"
            data-testid="back-btn"
            className="btn-ovh me-1"
            onClick={backButtonHandler}
          >
            <i className="fa fa-arrow-left me-1"></i>Back
          </CButton>
        </CCol>
      </CRow>
      <KRAInputFieldContainer>
        <CFormLabel data-testid="kra-name-label" className={KRAFormLabelClass}>
          KRA Name:
          <span
            data-testid="kra-name-asterix"
            className={
              enteredKraName?.trim().length === 0 ||
              !enteredKraName?.match(regexAlphanumeric)
                ? TextDanger
                : TextWhite
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormInput
            type="text"
            placeholder="Name"
            value={enteredKraName}
            data-testid="kra-name-inp"
            onChange={kraNameChangeHandler}
          />
        </CCol>
      </KRAInputFieldContainer>
      <KRAInputFieldContainer>
        <CFormLabel data-testid="dept-label" className={KRAFormLabelClass}>
          Department:
          <span
            data-testid="dept-asterix"
            className={
              enteredDept === selectDepartment ? TextDanger : TextWhite
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            data-testid="dept-sel"
            value={enteredDept}
            onChange={deptNameChangeHandler}
          >
            <option data-testid="dept-opt" value={selectDepartment}>
              {selectDepartment}
            </option>
            {empDeptList?.map((item, index) => (
              <option
                data-testid="dept-opt"
                key={index}
                value={item.departmentName}
              >
                {item.departmentName}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </KRAInputFieldContainer>
      <KRAInputFieldContainer>
        <CFormLabel data-testid="desig-label" className={KRAFormLabelClass}>
          Designation:
          <span
            data-testid="desig-asterix"
            className={
              enteredDesig === selectDesignation ? TextDanger : TextWhite
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={3}>
          <CFormSelect
            data-testid="desig-sel"
            value={enteredDesig}
            onChange={designationChangeHandler}
          >
            <option value={selectDesignation}>{selectDesignation}</option>
            {desigList?.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </KRAInputFieldContainer>
      <KRAInputFieldContainer>
        <CFormLabel data-testid="percent-label" className={KRAFormLabelClass}>
          Percentage:
          <span
            data-testid="percent-asterix"
            className={enteredPercentage ? TextWhite : TextDanger}
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={1}>
          <CFormInput
            type="text"
            maxLength={3}
            data-testid="percent-inp"
            readOnly={isPercentReadonly}
            value={enteredPercentage}
            onChange={percentChangeHandler}
          />
        </CCol>
        <CCol sm={1} className="p-0 w-auto">
          <strong>% </strong>
        </CCol>
        {enteredPercentage === '0' ||
        enteredPercentage === '00' ||
        enteredPercentage === '000' ? (
          <>
            <CCol sm={4} className="p-1">
              <strong data-testid="error-percent" className="text-danger">
                Percentage can&apos;t be zero.
              </strong>
            </CCol>
          </>
        ) : (
          <></>
        )}

        <CCol sm={4} className="p-1">
          <strong
            data-testid="error-percent"
            className={isPercentErrorHidden ? TextWhite : TextDanger}
          >
            You can&apos;t add more than 100 % per KRA
          </strong>
        </CCol>
      </KRAInputFieldContainer>
      <KRAInputFieldContainer>
        <CFormLabel
          data-testid="descrip-label"
          className={`${KRAFormLabelClass} align-self-start`}
        >
          Description:
          <span
            data-testid="descrip-asterix"
            className={
              enteredDescription?.trim().length === 0 ? TextDanger : TextWhite
            }
          >
            *
          </span>
        </CFormLabel>
        <CCol sm={8}>
          {showDescription ? (
            <CKEditor<{ onChange: CKEditorEventHandler<'change'> }>
              initData={enteredDescription}
              config={ckeditorConfig}
              debug={true}
              onChange={({ editor }) => {
                descriptionChangeHandler(editor.getData().trim())
              }}
            />
          ) : (
            <></>
          )}
        </CCol>
      </KRAInputFieldContainer>
    </CContainer>
  )
}

export default KRATemplate
