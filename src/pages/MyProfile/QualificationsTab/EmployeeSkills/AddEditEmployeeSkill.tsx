import React, { useState, useEffect, useMemo } from 'react'
import { useAppDispatch, useTypedSelector } from '../../../../stateStore'
import {
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CForm,
  CButton,
  CFormLabel,
  CFormSelect,
} from '@coreui/react-pro'
import {
  AddEditEmployeeSkillsProps,
  AddUpdateEmployeeSkill,
} from '../../../../types/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillTypes'
import {
  employeeSkillThunk,
  employeeSkillSelectors,
} from '../../../../reducers/MyProfile/QualificationsTab/EmployeeSkills/employeeSkillSlice'
import {
  categorySelectors,
  categoryThunk,
} from '../../../../reducers/MyProfile/Categories/categorySlice'
import { OTextEditor } from '../../../../components/ReusableComponent/OTextEditor'
import { useFormik } from 'formik'
import OToast from '../../../../components/ReusableComponent/OToast'
import { appActions } from '../../../../reducers/appSlice'
function AddEditEmployeeSkill({
  isEditSkillsDetails = false,
  headerTitle,
  confirmButtonText,
  backButtonHandler,
}: AddEditEmployeeSkillsProps): JSX.Element {
  const initialEmployeeSkillsDetails = {} as AddUpdateEmployeeSkill
  const employeeId = useTypedSelector(
    (state) => state.authentication.authenticatedUser.employeeId,
  )
  const [employeeSkill, setEmployeeSkill] = useState(
    initialEmployeeSkillsDetails,
  )
  const [isAddButtonEnabled, setIsAddButtonEnabled] = useState(false)
  const [isSkillAddButtonEnabled, setIsSkillAddButtonEnabled] = useState(false)
  const getAllCategoriesDetails = useTypedSelector(
    categorySelectors.selectCategoryList,
  )
  const getCategorySkillDetails = useTypedSelector(
    employeeSkillSelectors.selectCategorySkillList,
  )

  const editFetchSkillsDetails = useTypedSelector(
    employeeSkillSelectors.selectEditSkillDetails,
  )
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(categoryThunk.getAllCategoryList())
    if (employeeSkill?.categoryType) {
      dispatch(
        employeeSkillThunk.getCategorySkills(employeeSkill?.categoryType),
      )
    }
  }, [dispatch, employeeSkill?.categoryType])

  const employeeSkillHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setEmployeeSkill((prevState) => {
      return { ...prevState, ...{ [name]: value } }
    })
  }

  const formik = useFormik({
    initialValues: { name: '', message: '' },
    onSubmit: (values) => {
      console.log('Logging in ', values)
    },
  })

  useEffect(() => {
    if (
      employeeSkill?.categoryType &&
      employeeSkill?.skillType &&
      employeeSkill?.competency
    ) {
      setIsAddButtonEnabled(true)
    } else {
      setIsAddButtonEnabled(false)
    }
  }, [
    employeeSkill?.categoryType,
    employeeSkill?.skillType,
    employeeSkill?.competency,
  ])

  const handleClearDetails = () => {
    setEmployeeSkill({
      categoryType: 0,
      competency: '',
      comments: '',
      expMonth: '',
      expYear: '',
      skillType: 0,
      employee: {
        id: '',
      },
    })
  }

  useEffect(() => {
    if (employeeSkill?.categoryType) {
      setIsSkillAddButtonEnabled(true)
    } else {
      setIsSkillAddButtonEnabled(false)
    }
  }, [employeeSkill?.categoryType])

  useEffect(() => {
    if (isEditSkillsDetails) {
      setEmployeeSkill(editFetchSkillsDetails)
    }
  }, [isEditSkillsDetails, editFetchSkillsDetails])

  const actionMapping = {
    added: 'added',
    updated: 'updated',
  }
  const getToastMessage = (action: string) => {
    return (
      <OToast
        toastColor="success"
        toastMessage={`Your skill have been ${action}  successfully.`}
      />
    )
  }

  const sortedCategoryDetails = useMemo(() => {
    if (getAllCategoriesDetails) {
      return getAllCategoriesDetails
        .slice()
        .sort((sortNode1, sortNode2) =>
          sortNode1.categoryType.localeCompare(sortNode2.categoryType),
        )
    }
  }, [getAllCategoriesDetails])

  const handleAddSkillDetails = async () => {
    const prepareObject = {
      ...employeeSkill,
      ...{
        employee: { id: employeeId },
      },
    }
    const addFamilyMemberResultAction = await dispatch(
      employeeSkillThunk.addEmployeeSkill(prepareObject),
    )
    if (
      employeeSkillThunk.addEmployeeSkill.fulfilled.match(
        addFamilyMemberResultAction,
      )
    ) {
      backButtonHandler()
      dispatch(
        dispatch(appActions.addToast(getToastMessage(actionMapping.added))),
      )
    }
  }

  const handleUpdateSkill = async () => {
    const temp = employeeSkill.categoryId as number
    const prepareObject = {
      ...employeeSkill,
      categoryId: Number(employeeSkill.categoryType),
      categoryType: temp,
    }
    const updateSkillMemberResultAction = await dispatch(
      employeeSkillThunk.updateEmployeeSkill(prepareObject),
    )
    if (
      employeeSkillThunk.updateEmployeeSkill.fulfilled.match(
        updateSkillMemberResultAction,
      )
    ) {
      dispatch(
        dispatch(appActions.addToast(getToastMessage(actionMapping.updated))),
      )
    }
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
            <CFormLabel className="col-sm-3 col-form-label text-end">
              category:
              <span
                className={
                  employeeSkill?.categoryType ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                name="categoryType"
                value={employeeSkill?.categoryType}
                onChange={employeeSkillHandler}
              >
                <option value={''}>category</option>
                {sortedCategoryDetails?.map((categories, index) => (
                  <option key={index} value={categories.categoryId}>
                    {categories.categoryType}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol className="col-sm-3">
              {isEditSkillsDetails ? (
                ''
              ) : (
                <CButton color="info btn-ovh me-1">
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Skills:
              <span
                className={
                  employeeSkill?.skillType ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                name="skillType"
                id=" skillType"
                value={employeeSkill?.skillType}
                onChange={employeeSkillHandler}
                disabled={!isSkillAddButtonEnabled}
              >
                <option value={''}>Skill</option>
                {getCategorySkillDetails?.length > 0 &&
                  getCategorySkillDetails?.map((categoriesSkill, index) => (
                    <option key={index} value={categoriesSkill?.skillType}>
                      {categoriesSkill?.skill}
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
            <CCol className="col-sm-3">
              {isEditSkillsDetails ? (
                ''
              ) : (
                <CButton
                  color="info btn-ovh me-1"
                  disabled={!isSkillAddButtonEnabled}
                >
                  <i className="fa fa-plus me-1"></i>Add
                </CButton>
              )}
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Experience:
            </CFormLabel>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                name="expYear"
                id="expYear"
                value={employeeSkill?.expYear}
                onChange={employeeSkillHandler}
              >
                <option value={''}>Year</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </CFormSelect>
            </CCol>
            <CCol sm={2}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                name="expMonth"
                id="expMonth"
                value={employeeSkill?.expMonth}
                onChange={employeeSkillHandler}
              >
                <option value={''}>Month</option>
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Competency:
              <span
                className={
                  employeeSkill?.competency ? 'text-white' : 'text-danger'
                }
              >
                *
              </span>
            </CFormLabel>
            <CCol sm={3}>
              <CFormSelect
                aria-label="Default select example"
                size="sm"
                name="competency"
                id="Competency"
                value={employeeSkill?.competency}
                onChange={employeeSkillHandler}
              >
                <option value={''}>Competency</option>
                <option value="Exceptional">Exceptional</option>
                <option value="Expert">Expert</option>
                <option value="Good">Good</option>
                <option value="Beginner">Beginner</option>
                <option value="Don t Know">Don t Know</option>
              </CFormSelect>
            </CCol>
          </CRow>
          <CRow className="mt-4 mb-4">
            <CFormLabel className="col-sm-3 col-form-label text-end">
              Comments:
            </CFormLabel>
            <CCol sm={8}>
              <OTextEditor
                setFieldValue={(val) => formik.setFieldValue('', val)}
                value={employeeSkill?.comments}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol md={{ span: 6, offset: 3 }}>
              {isEditSkillsDetails ? (
                <CButton
                  className="btn-ovh me-2"
                  color="success"
                  disabled={!isAddButtonEnabled}
                  onClick={handleUpdateSkill}
                >
                  {confirmButtonText}
                </CButton>
              ) : (
                <>
                  <CButton
                    className="btn-ovh me-1"
                    color="success"
                    disabled={!isAddButtonEnabled}
                    onClick={handleAddSkillDetails}
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
export default AddEditEmployeeSkill
